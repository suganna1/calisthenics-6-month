const STORAGE_KEY = "calisthenics-6mo-v1";
const TOTAL_WORKOUTS = PROGRAM.months.length * PROGRAM.weeksPerMonth * WEEKDAYS.length;
const MET = 8;
const ACTIVITY = { sedentary: 1.2, light: 1.375, moderate: 1.55, very: 1.725, extra: 1.9 };
const FLOOR = { male: 1500, female: 1200 };

function mondayOf(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + offset);
  return d;
}
function iso(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function parseISO(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function addDays(date, n) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + n);
  return d;
}
function defaultStart() { return iso(mondayOf(new Date())); }
function $(id) { return document.getElementById(id); }

function defaultProfile() {
  return { sex: "", age: "", heightUnit: "cm", heightCm: null, weightUnit: "kg", weightKg: null, goalKg: null, activity: "light" };
}

function loadState() {
  const base = { startDate: defaultStart(), completed: {}, profile: defaultProfile(), weightLog: [], calorieLog: {}, bpLog: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return base;
    return {
      startDate: data.startDate || base.startDate,
      completed: data.completed && typeof data.completed === "object" ? data.completed : {},
      profile: Object.assign(defaultProfile(), data.profile || {}),
      weightLog: Array.isArray(data.weightLog) ? data.weightLog : [],
      calorieLog: data.calorieLog && typeof data.calorieLog === "object" ? data.calorieLog : {},
      bpLog: parseBpLog(data.bpLog)
    };
  } catch (e) { return base; }
}

function parseBpLog(list) {
  if (!Array.isArray(list)) return [];
  return list.map((e, i) => {
    const sys = Number(e && e.sys);
    const dia = Number(e && e.dia);
    if (!e || !e.date || !isFinite(sys) || !isFinite(dia)) return null;
    const pulse = e.pulse == null || e.pulse === "" ? null : Number(e.pulse);
    return {
      id: String(e.id || (e.date + "-" + i)),
      date: e.date,
      sys: Math.round(sys),
      dia: Math.round(dia),
      pulse: pulse != null && isFinite(pulse) ? Math.round(pulse) : null
    };
  }).filter(Boolean);
}

function isUrgentBp(e) {
  return e && (e.sys >= 180 || e.dia >= 120);
}

function sortedBp() {
  return (state.bpLog || []).slice().sort((a, b) => {
    const d = String(a.date).localeCompare(String(b.date));
    if (d) return d;
    return String(a.id).localeCompare(String(b.id));
  });
}
function saveState(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

let state = loadState();
let view = { month: 1, week: 1, tab: "plan", day: null, dietMonth: 1 };
let player = null;

function dayId(month, week, day) { return `${month}-${week}-${day}`; }
function dateFor(month, week, dayName) {
  const start = mondayOf(parseISO(state.startDate));
  const weekIndex = (month - 1) * PROGRAM.weeksPerMonth + (week - 1);
  const dayOffset = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }[dayName];
  return addDays(start, weekIndex * 7 + dayOffset);
}
function findToday() {
  const today = iso(new Date());
  const start = mondayOf(parseISO(state.startDate));
  for (let m = 1; m <= 6; m++) {
    for (let w = 1; w <= PROGRAM.weeksPerMonth; w++) {
      for (const day of [...WEEKDAYS, ...WEEKEND]) {
        if (iso(dateFor(m, w, day)) === today) return { month: m, week: w, day };
      }
    }
  }
  const first = iso(start);
  const last = iso(dateFor(6, PROGRAM.weeksPerMonth, "Sun"));
  if (today < first) return { month: 1, week: 1, day: null, before: true };
  if (today > last) return { month: 6, week: PROGRAM.weeksPerMonth, day: null, after: true };
  return { month: view.month, week: view.week, day: null };
}
function completedCount() {
  return Object.keys(state.completed).filter((k) => state.completed[k] && /^\d+-\d+-(Mon|Tue|Wed|Thu|Fri)$/.test(k)).length;
}
function weekComplete(month, week) {
  return WEEKDAYS.every((d) => state.completed[dayId(month, week, d)]);
}
function streak() {
  const today = iso(new Date());
  const items = [];
  for (let m = 1; m <= 6; m++) {
    for (let w = 1; w <= PROGRAM.weeksPerMonth; w++) {
      for (const day of WEEKDAYS) items.push({ id: dayId(m, w, day), date: iso(dateFor(m, w, day)) });
    }
  }
  const due = items.filter((it) => it.date <= today);
  if (!due.length) return 0;
  let i = due.length - 1;
  if (due[i].date === today && !state.completed[due[i].id]) i -= 1;
  let n = 0;
  for (; i >= 0; i--) {
    if (state.completed[due[i].id]) n += 1;
    else break;
  }
  return n;
}

function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 1600);
}

function cmToFtIn(cm) {
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  const inch = Math.round((totalIn - ft * 12) * 10) / 10;
  return { ft, inch };
}
function ftInToCm(ft, inch) { return (Number(ft) || 0) * 30.48 + (Number(inch) || 0) * 2.54; }
function kgToStLb(kg) {
  const totalLb = kg / 0.45359237;
  const st = Math.floor(totalLb / 14);
  const lb = Math.round((totalLb - st * 14) * 10) / 10;
  return { st, lb };
}
function stLbToKg(st, lb) { return (Number(st) || 0) * 6.35029318 + (Number(lb) || 0) * 0.45359237; }
function formatKg(kg, unit) {
  if (kg == null || !isFinite(kg)) return "—";
  if (unit === "st") {
    const x = kgToStLb(kg);
    return `${x.st} st ${x.lb.toFixed(1)} lb`;
  }
  return `${kg.toFixed(1)} kg`;
}

function sortedLog() {
  return state.weightLog.slice().sort((a, b) => a.date.localeCompare(b.date));
}
function currentKg() {
  const log = sortedLog();
  if (log.length) return log[log.length - 1].kg;
  return state.profile.weightKg;
}
function startKg() {
  const log = sortedLog();
  if (log.length) return log[0].kg;
  return state.profile.weightKg;
}

function compute() {
  const p = state.profile;
  const kg = currentKg();
  const age = Number(p.age);
  const cm = Number(p.heightCm);
  if (!p.sex || !age || !cm || !kg) return null;
  const bmr = p.sex === "male"
    ? 10 * kg + 6.25 * cm - 5 * age + 5
    : 10 * kg + 6.25 * cm - 5 * age - 161;
  const factor = ACTIVITY[p.activity] || 1.375;
  const tdee = bmr * factor;
  const floor = FLOOR[p.sex] || 1200;
  const raw = tdee - 500;
  const target = Math.max(floor, raw);
  const deficit = Math.max(0, tdee - target);
  const protein = 1.6 * kg;
  const goal = p.goalKg;
  let weeks = null;
  let weeksNote = "";
  if (goal != null && kg > goal && deficit > 0) {
    weeks = ((kg - goal) * 7700) / (deficit * 7);
    weeksNote = "Estimate only, using about 7,700 kcal per kg. Weight loss is not linear.";
  } else if (goal != null && kg <= goal) {
    weeksNote = "Current weight is at or below the goal, so no weight-loss estimate is shown.";
  } else if (deficit === 0) {
    weeksNote = "The daily target is at the general floor, so the deficit may be smaller than 500 kcal.";
  }
  return { bmr, tdee, target, floor, deficit, protein, kg, goal, weeks, weeksNote, floored: raw < floor };
}

function workoutKcal(minutes) {
  const kg = currentKg();
  if (!kg) return null;
  return MET * kg * ((minutes || 20) / 60);
}
function totalWorkoutKcal() {
  const per = workoutKcal(20);
  if (per == null) return null;
  return per * completedCount();
}

function beep(times) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const n = times || 1;
    for (let i = 0; i < n; i++) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.frequency.value = i === n - 1 ? 880 : 700;
      osc.type = "sine";
      g.gain.value = 0.08;
      osc.connect(g); g.connect(ctx.destination);
      const t = ctx.currentTime + i * 0.18;
      osc.start(t); osc.stop(t + 0.12);
    }
  } catch (e) { /* ignore */ }
  if (navigator.vibrate) navigator.vibrate(times > 1 ? [120, 80, 180] : 180);
}

function renderChrome() {
  const done = completedCount();
  const pct = Math.round((done / TOTAL_WORKOUTS) * 100);
  $("done-count").textContent = `${done} / ${TOTAL_WORKOUTS} workouts`;
  $("pct").textContent = `${pct}%`;
  $("bar-fill").style.width = `${pct}%`;
  $("streak-num").textContent = String(streak());
  const burn = totalWorkoutKcal();
  const extra = $("kcal-line");
  if (extra) {
    if (burn != null) extra.textContent = `Est. workout burn: ${Math.round(burn)} kcal`;
    else extra.textContent = "";
  }
}

function renderMonths() {
  $("months").innerHTML = PROGRAM.months.map((m) => {
    const total = PROGRAM.weeksPerMonth * WEEKDAYS.length;
    let n = 0;
    for (let w = 1; w <= PROGRAM.weeksPerMonth; w++) {
      WEEKDAYS.forEach((d) => { if (state.completed[dayId(m.id, w, d)]) n += 1; });
    }
    const active = view.month === m.id ? " active" : "";
    return `<button class="pill${active}" data-month="${m.id}">Month ${m.id}<small>${m.name} · ${n}/${total}</small></button>`;
  }).join("");
}
function renderWeeks() {
  $("weeks").innerHTML = Array.from({ length: PROGRAM.weeksPerMonth }, (_, i) => {
    const w = i + 1;
    const active = view.week === w ? " active" : "";
    const mark = weekComplete(view.month, w) ? `<span class="dot"></span>` : "";
    return `<button class="week-pill${active}" data-week="${w}">Week ${w}${mark}</button>`;
  }).join("");
}
function paceNoteHtml(month) {
  const swap = month && month.lowImpact
    ? `<span class="swap">${escapeHtml(month.lowImpact)}</span>`
    : "";
  return `<div class="pace-note"><strong>Talk test.</strong> Work at a pace where you can still speak in short sentences. <strong>Don’t hold your breath.</strong> Breathe out as you push, stand or sit up.${swap}</div>`;
}

function renderPhase() {
  const m = PROGRAM.months[view.month - 1];
  $("phase").innerHTML = `<h2>Month ${m.id} · ${escapeHtml(m.name)}</h2><p>${escapeHtml(m.goal)}</p><div class="rule"><span>This week</span>${escapeHtml(m.rule)}</div>${paceNoteHtml(m)}`;
}
function renderGrid() {
  const today = iso(new Date());
  const m = PROGRAM.months[view.month - 1];
  $("grid").innerHTML = WEEKDAYS.map((day) => {
    const wd = m.days[day];
    const id = dayId(view.month, view.week, day);
    const done = !!state.completed[id];
    const date = dateFor(view.month, view.week, day);
    const isToday = iso(date) === today;
    const cls = ["day-card", done ? "done" : "", isToday ? "today" : ""].filter(Boolean).join(" ");
    return `<button class="${cls}" data-day="${day}" type="button">
      <span class="check" aria-hidden="true"></span>
      <span class="day-name">${day}</span>
      <span class="mins">${wd.mins}<em>m</em></span>
      <span class="focus">${wd.focus}</span>
      <span class="date-label">${date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
    </button>`;
  }).join("");
  $("weekend").innerHTML = WEEKEND.map((day) => {
    const date = dateFor(view.month, view.week, day);
    const isToday = iso(date) === today;
    return `<div class="day-card rest${isToday ? " today" : ""}">
      <span class="day-name">${day}</span>
      <span class="mins" style="color:var(--muted);font-size:16px;margin-top:10px;">Rest</span>
      <span class="date-label">${date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
    </div>`;
  }).join("");
}

function openDay(day) {
  view.day = day;
  const m = PROGRAM.months[view.month - 1];
  const wd = m.days[day];
  const id = dayId(view.month, view.week, day);
  const done = !!state.completed[id];
  const date = dateFor(view.month, view.week, day);
  const session = buildSession(wd);
  const mins = Math.round(session.total / 60);
  const burn = workoutKcal(20);
  $("plan-main").classList.add("hidden");
  $("sheet").classList.add("open");
  const burnHtml = burn != null
    ? `<div class="burn-chip">Estimate: about <strong>${Math.round(burn)} kcal</strong> for a 20-minute session (MET 8 × ${currentKg().toFixed(1)} kg × 20 min). This is an estimate, not a measurement.</div>`
    : `<div class="burn-chip">Add your weight in Progress to see an estimated calorie burn (MET 8 × body weight × 20 min).</div>`;
  $("sheet").innerHTML = `
    <button class="back" id="back-btn" type="button">← Week view</button>
    <div class="sheet-head">
      <div>
        <div class="eyebrow">${day} · ${date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</div>
        <h2>${wd.focus}</h2>
      </div>
      <span class="badge">${mins} min</span>
    </div>
    <div class="rule" style="margin-top:12px"><span>This week</span>${escapeHtml(m.rule)}</div>
    ${paceNoteHtml(m)}
    <ul class="ex-list">
      ${wd.exercises.map((ex) => `
        <li>
          <span class="name">${ex.name}</span>
          <span class="dose">${ex.dose}</span>
          <span class="rest">${ex.rest && ex.rest !== "—" ? "Rest: " + ex.rest : ""}</span>
        </li>
      `).join("")}
    </ul>
    ${wd.note ? `<p class="note">${wd.note}</p>` : ""}
    ${burnHtml}
    <button class="btn" id="start-workout" type="button">Start workout</button>
    <button class="btn${done ? " done" : ""}" id="toggle-done" type="button">${done ? "Done ✓  Tap to undo" : "Mark as done"}</button>
  `;
  $("back-btn").addEventListener("click", closeDay);
  $("start-workout").addEventListener("click", () => startWorkout(wd, id));
  $("toggle-done").addEventListener("click", () => {
    if (state.completed[id]) delete state.completed[id];
    else state.completed[id] = true;
    saveState(state);
    toast(state.completed[id] ? "Saved to this device" : "Marked not done");
    renderAll();
    openDay(day);
  });
}
function closeDay() {
  view.day = null;
  $("sheet").classList.remove("open");
  $("sheet").innerHTML = "";
  $("plan-main").classList.remove("hidden");
}

function showTab(tab) {
  view.tab = tab;
  ["plan", "progress", "diet", "notes"].forEach((t) => {
    const btn = $("tab-" + t);
    if (btn) btn.classList.toggle("active", tab === t);
  });
  closeDay();
  $("plan-wrap").classList.toggle("hidden", tab !== "plan");
  $("progress").classList.toggle("open", tab === "progress");
  $("diet").classList.toggle("open", tab === "diet");
  $("notes").classList.toggle("open", tab === "notes");
  if (tab === "notes") $("start-date").value = state.startDate;
  if (tab === "progress") { fillProfileForm(); renderProgress(); }
  if (tab === "diet") renderDiet();
}

function jumpToToday() {
  const t = findToday();
  view.month = t.month;
  view.week = t.week;
  closeDay();
  showTab("plan");
  renderAll();
  if (t.day && WEEKDAYS.includes(t.day)) openDay(t.day);
  else if (t.before) toast("Programme starts this week");
  else if (t.after) toast("Programme dates have finished");
}

function setSeg(id, attr, value) {
  document.querySelectorAll("#" + id + " button").forEach((b) => {
    b.classList.toggle("on", b.getAttribute(attr) === value);
  });
}
function fillProfileForm() {
  const p = state.profile;
  setSeg("sex-seg", "data-sex", p.sex);
  $("age").value = p.age || "";
  $("activity").value = p.activity || "light";
  setSeg("height-unit-seg", "data-hunit", p.heightUnit || "cm");
  setSeg("weight-unit-seg", "data-wunit", p.weightUnit || "kg");
  toggleUnits();
  if (p.heightCm) {
    if (p.heightUnit === "ft") {
      const x = cmToFtIn(p.heightCm);
      $("height-ft").value = x.ft;
      $("height-in").value = x.inch;
    } else $("height-cm").value = Math.round(p.heightCm * 10) / 10;
  }
  const kg = p.weightKg;
  const goal = p.goalKg;
  if (p.weightUnit === "st") {
    if (kg) { const x = kgToStLb(kg); $("weight-st").value = x.st; $("weight-lb").value = x.lb; }
    if (goal) { const x = kgToStLb(goal); $("goal-st").value = x.st; $("goal-lb").value = x.lb; }
  } else {
    if (kg) $("weight-kg").value = Math.round(kg * 10) / 10;
    if (goal) $("goal-kg").value = Math.round(goal * 10) / 10;
  }
  $("log-date").value = iso(new Date());
  if ($("bp-date")) $("bp-date").value = iso(new Date());
  $("eaten").value = state.calorieLog[iso(new Date())] || "";
}
function toggleUnits() {
  const h = state.profile.heightUnit || "cm";
  const w = state.profile.weightUnit || "kg";
  $("height-cm-wrap").classList.toggle("hidden", h !== "cm");
  $("height-ft-wrap").classList.toggle("hidden", h !== "ft");
  $("weight-kg-wrap").classList.toggle("hidden", w !== "kg");
  $("weight-st-wrap").classList.toggle("hidden", w !== "st");
  $("goal-kg-wrap").classList.toggle("hidden", w !== "kg");
  $("goal-st-wrap").classList.toggle("hidden", w !== "st");
  $("log-weight-field").classList.toggle("hidden", w !== "kg");
  $("log-st-wrap").classList.toggle("hidden", w !== "st");
  $("log-weight").placeholder = "kg";
}
function readHeightCm() {
  if (state.profile.heightUnit === "ft") return ftInToCm($("height-ft").value, $("height-in").value);
  const v = Number($("height-cm").value);
  return v > 0 ? v : null;
}
function readWeightKg(prefix) {
  if (state.profile.weightUnit === "st") {
    const st = $(prefix === "goal" ? "goal-st" : prefix === "log" ? "log-st" : "weight-st").value;
    const lb = $(prefix === "goal" ? "goal-lb" : prefix === "log" ? "log-lb" : "weight-lb").value;
    const kg = stLbToKg(st, lb);
    return kg > 0 ? kg : null;
  }
  const v = Number($(prefix === "goal" ? "goal-kg" : prefix === "log" ? "log-weight" : "weight-kg").value);
  return v > 0 ? v : null;
}
function saveProfile() {
  const p = state.profile;
  p.age = $("age").value;
  p.activity = $("activity").value;
  p.heightCm = readHeightCm();
  const kg = readWeightKg("weight");
  const goal = readWeightKg("goal");
  if (kg) {
    p.weightKg = kg;
    const today = iso(new Date());
    const existing = state.weightLog.find((e) => e.date === today);
    if (existing) existing.kg = kg;
    else state.weightLog.push({ date: today, kg });
  }
  p.goalKg = goal;
  if (!p.sex) { toast("Choose male or female first"); return; }
  if (!p.age || !p.heightCm || !p.weightKg) { toast("Add age, height and weight"); return; }
  saveState(state);
  renderProgress();
  renderChrome();
  toast("Details saved on this phone");
}

function renderProgress() {
  const c = compute();
  const unit = state.profile.weightUnit || "kg";
  const out = $("calc-out");
  if (!c) {
    out.innerHTML = `<p class="fine">Add your sex, age, height and weight, then tap Save details. BMR uses the Mifflin-St Jeor equation.</p>`;
  } else {
    const weeksTxt = c.weeks != null ? (c.weeks < 1 ? "under 1 week" : `about ${c.weeks.toFixed(0)} weeks`) : "—";
    out.innerHTML = `
      <div class="metrics">
        <div class="metric"><div class="k">BMR</div><div class="v">${Math.round(c.bmr)}<em>kcal</em></div></div>
        <div class="metric"><div class="k">TDEE</div><div class="v">${Math.round(c.tdee)}<em>kcal</em></div></div>
        <div class="metric"><div class="k">Daily target</div><div class="v accent">${Math.round(c.target)}<em>kcal</em></div></div>
        <div class="metric"><div class="k">Protein</div><div class="v">${Math.round(c.protein)}<em>g</em></div></div>
        <div class="metric wide"><div class="k">Estimated time to goal</div><div class="v">${weeksTxt}</div></div>
      </div>
      <p class="fine">Daily target is TDEE minus about 500 kcal, and is not set below ${c.floor.toLocaleString("en-GB")} kcal (${state.profile.sex === "male" ? "men" : "women"}). That floor is a commonly used general figure, not a personal medical limit.${c.floored ? " Your calculated deficit would have been below that floor, so the target was raised." : ""} Protein is about 1.6 g per kg of current body weight. ${c.weeksNote} These figures are estimates, not medical advice.</p>
    `;
  }
  const today = iso(new Date());
  const eaten = Number(state.calorieLog[today] || 0);
  const food = $("food-status");
  if (!c) {
    food.className = "food-status missing";
    food.textContent = "Add your details first to see a target.";
  } else if (!state.calorieLog[today] && state.calorieLog[today] !== 0) {
    food.className = "food-status missing";
    food.textContent = `Today’s target: ${Math.round(c.target)} kcal. Optional: enter what you ate.`;
  } else {
    const left = Math.round(c.target - eaten);
    food.className = "food-status " + (left >= 0 ? "under" : "over");
    food.textContent = left >= 0
      ? `${Math.round(eaten)} / ${Math.round(c.target)} kcal · ${left} remaining`
      : `${Math.round(eaten)} / ${Math.round(c.target)} kcal · ${Math.abs(left)} over`;
  }
  const burn = totalWorkoutKcal();
  $("burn-summary").innerHTML = burn != null
    ? `<p>Estimated calories from ticked workouts: <strong>${Math.round(burn)} kcal</strong> (${completedCount()} × about ${Math.round(workoutKcal(20))} kcal). Uses MET 8 for a calisthenics circuit × your current weight × 20 minutes. This is an estimate.</p>`
    : `<p class="lead" style="margin:0">Tick workouts after you add your weight to accumulate an estimated burn total.</p>`;
  renderWeight();
  renderBp();
}

function renderWeight() {
  const unit = state.profile.weightUnit || "kg";
  const log = sortedLog();
  const start = startKg();
  const cur = currentKg();
  const goal = state.profile.goalKg;
  let stats = "";
  if (cur != null && start != null) {
    const lost = start - cur;
    let prog = "";
    if (goal != null && start > goal) {
      const pct = Math.max(0, Math.min(100, Math.round(((start - cur) / (start - goal)) * 100)));
      prog = ` Progress to goal: ${pct}%.`;
    }
    const lostTxt = lost >= 0 ? `${formatKg(lost, unit)} lost` : `${formatKg(-lost, unit)} gained`;
    stats = `<p class="fine">Current: <strong>${formatKg(cur, unit)}</strong> · ${lostTxt} since the first log.${prog}</p>`;
  }
  $("weight-stats").innerHTML = stats;
  $("chart-wrap").innerHTML = weightChart(log, goal, unit);
  $("weight-list").innerHTML = log.slice().reverse().map((e, i) => {
    return `<li><span>${parseISO(e.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · ${formatKg(e.kg, unit)}</span><button type="button" data-del="${e.date}">Remove</button></li>`;
  }).join("");
}

function weightChart(log, goal, unit) {
  if (!log.length) return `<div class="chart-empty">Log a weight to see the chart.</div>`;
  const w = 360, h = 180, l = 44, r = 12, t = 16, b = 28;
  const vals = log.map((e) => e.kg);
  if (goal != null) vals.push(goal);
  let min = Math.min(...vals) - 1;
  let max = Math.max(...vals) + 1;
  if (max === min) { max += 1; min -= 1; }
  const x = (i) => l + (log.length === 1 ? (w - l - r) / 2 : (i * (w - l - r)) / (log.length - 1));
  const y = (kg) => t + ((max - kg) / (max - min)) * (h - t - b);
  const pts = log.map((e, i) => `${x(i).toFixed(1)},${y(e.kg).toFixed(1)}`).join(" ");
  const dots = log.map((e, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(e.kg).toFixed(1)}" r="3.5" fill="#ff7a1a" />`).join("");
  const goalLine = goal != null
    ? `<line x1="${l}" y1="${y(goal).toFixed(1)}" x2="${w - r}" y2="${y(goal).toFixed(1)}" stroke="#3ddc97" stroke-dasharray="4 4" stroke-width="1.5" /><text x="${l + 4}" y="${(y(goal) - 4).toFixed(1)}" fill="#8b97ab" font-size="10">Goal ${formatKg(goal, unit)}</text>`
    : "";
  const y0 = formatKg(max, unit);
  const y1 = formatKg(min, unit);
  const d0 = parseISO(log[0].date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const d1 = parseISO(log[log.length - 1].date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Weight over time">
    <text x="4" y="${t + 4}" fill="#8b97ab" font-size="10">${y0}</text>
    <text x="4" y="${h - b}" fill="#8b97ab" font-size="10">${y1}</text>
    ${goalLine}
    <polyline fill="none" stroke="#ff7a1a" stroke-width="2.5" points="${pts}" />
    ${dots}
    <text x="${l}" y="${h - 8}" fill="#8b97ab" font-size="10">${d0}</text>
    <text x="${w - r}" y="${h - 8}" fill="#8b97ab" font-size="10" text-anchor="end">${d1}</text>
  </svg>`;
}

function addWeight() {
  const date = $("log-date").value || iso(new Date());
  const kg = readWeightKg("log");
  if (!kg) { toast("Enter a weight"); return; }
  const existing = state.weightLog.find((e) => e.date === date);
  if (existing) existing.kg = kg;
  else state.weightLog.push({ date, kg });
  state.profile.weightKg = currentKg();
  saveState(state);
  renderProgress();
  renderChrome();
  toast("Weight saved");
}

function addBp() {
  const date = ($("bp-date") && $("bp-date").value) || iso(new Date());
  const sys = Number($("bp-sys").value);
  const dia = Number($("bp-dia").value);
  const pulseRaw = $("bp-pulse").value;
  if (!sys || !dia) { toast("Enter systolic and diastolic"); return; }
  if (sys < 60 || sys > 250 || dia < 30 || dia > 180) { toast("Check the numbers and try again"); return; }
  if (dia >= sys) { toast("Diastolic should be lower than systolic"); return; }
  let pulse = null;
  if (pulseRaw !== "") {
    pulse = Number(pulseRaw);
    if (!isFinite(pulse) || pulse < 30 || pulse > 220) { toast("Check the pulse and try again"); return; }
  }
  state.bpLog = state.bpLog || [];
  state.bpLog.push({
    id: date + "-" + Date.now(),
    date,
    sys: Math.round(sys),
    dia: Math.round(dia),
    pulse
  });
  $("bp-sys").value = "";
  $("bp-dia").value = "";
  $("bp-pulse").value = "";
  saveState(state);
  renderProgress();
  toast("Reading saved");
}

function renderBp() {
  const alertEl = $("bp-alert");
  const chartEl = $("bp-chart");
  const listEl = $("bp-list");
  if (!chartEl || !listEl) return;
  const log = sortedBp();
  const latest = log[log.length - 1];
  if (alertEl) alertEl.classList.toggle("hidden", !(latest && isUrgentBp(latest)));
  chartEl.innerHTML = bpChart(log);
  listEl.innerHTML = log.slice().reverse().map((e) => {
    const pulse = e.pulse != null ? ` · pulse ${e.pulse}` : "";
    const flag = isUrgentBp(e) ? ' <span class="meta">180/120 or higher</span>' : "";
    const cls = isUrgentBp(e) ? " urgent" : "";
    return `<li class="${cls}"><span>${parseISO(e.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · ${e.sys}/${e.dia}${pulse}${flag}</span><button type="button" data-bp-del="${escapeHtml(e.id)}">Remove</button></li>`;
  }).join("");
}

function bpChart(log) {
  if (!log.length) return `<div class="chart-empty">Log a reading to see the chart.</div>`;
  const w = 360, h = 180, l = 36, r = 12, t = 16, b = 28;
  const vals = log.flatMap((e) => [e.sys, e.dia]);
  let min = Math.min(...vals) - 10;
  let max = Math.max(...vals) + 10;
  if (max === min) { max += 10; min -= 10; }
  min = Math.max(0, min);
  const x = (i) => l + (log.length === 1 ? (w - l - r) / 2 : (i * (w - l - r)) / (log.length - 1));
  const y = (v) => t + ((max - v) / (max - min)) * (h - t - b);
  const sysPts = log.map((e, i) => `${x(i).toFixed(1)},${y(e.sys).toFixed(1)}`).join(" ");
  const diaPts = log.map((e, i) => `${x(i).toFixed(1)},${y(e.dia).toFixed(1)}`).join(" ");
  const sysDots = log.map((e, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(e.sys).toFixed(1)}" r="3.5" fill="#ff7a1a" />`).join("");
  const diaDots = log.map((e, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(e.dia).toFixed(1)}" r="3.5" fill="#5b8cff" />`).join("");
  const d0 = parseISO(log[0].date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const d1 = parseISO(log[log.length - 1].date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const thresh = (max >= 180 && min <= 180)
    ? `<line x1="${l}" y1="${y(180).toFixed(1)}" x2="${w - r}" y2="${y(180).toFixed(1)}" stroke="rgba(255,92,106,0.5)" stroke-dasharray="4 4" stroke-width="1" />`
    : "";
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Blood pressure over time">
    <text x="4" y="${t + 4}" fill="#8b97ab" font-size="10">${Math.round(max)}</text>
    <text x="4" y="${h - b}" fill="#8b97ab" font-size="10">${Math.round(min)}</text>
    ${thresh}
    <polyline fill="none" stroke="#ff7a1a" stroke-width="2.5" points="${sysPts}" />
    <polyline fill="none" stroke="#5b8cff" stroke-width="2.5" points="${diaPts}" />
    ${sysDots}${diaDots}
    <text x="${l}" y="${h - 8}" fill="#8b97ab" font-size="10">${d0}</text>
    <text x="${w - r}" y="${h - 8}" fill="#8b97ab" font-size="10" text-anchor="end">${d1}</text>
  </svg>
  <div class="chart-legend"><span><i style="background:#ff7a1a"></i>Systolic</span><span><i style="background:#5b8cff"></i>Diastolic</span></div>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

function renderDiet() {
  const month = DIET[view.dietMonth - 1];
  const c = compute();
  const scale = c ? c.target / DIET_BASE_KCAL : 1;
  const used = Math.max(scale, 1e-6);
  const dietEl = $("diet");
  if (dietEl) dietEl.setAttribute("data-version", "nigeria-diet-v5");
  $("diet-months").innerHTML = DIET.map((m) => {
    const active = view.dietMonth === m.id ? " active" : "";
    return `<button class="pill${active}" data-diet="${m.id}">Month ${m.id}<small>${escapeHtml(m.name)}</small></button>`;
  }).join("");
  const scaleNote = c
    ? `Menus are written at about ${DIET_BASE_KCAL} kcal and ${DIET_BASE_PROTEIN} g protein (estimates). Your daily target is ${Math.round(c.target)} kcal and ${Math.round(c.protein)} g protein, so use about ${used.toFixed(2)}× these portions.`
    : `Menus are written at about ${DIET_BASE_KCAL} kcal and ${DIET_BASE_PROTEIN} g protein a day (estimates). Add your details in Progress to scale portions to your target.`;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const meals = days.map((d) => {
    const row = month.days[d];
    const slots = ["breakfast", "lunch", "dinner", "snacks"];
    const blocks = slots.map((s) => {
      const m = row[s];
      const kcal = Math.round(m.kcal * used);
      const pro = Math.round(m.protein * used);
      const tip = m.tip ? `<p class="meal-tip">${escapeHtml(m.tip)}</p>` : "";
      const salt = m.salt ? `<p class="meal-salt">${escapeHtml(m.salt)}</p>` : "";
      const yt = m.video
        ? `<a class="meal-yt" href="${escapeHtml(m.video.url)}" target="_blank" rel="noopener noreferrer">
            <span class="meal-yt-badge">▶</span>
            <span class="meal-yt-meta"><strong>${escapeHtml(m.video.title)}</strong><small>${escapeHtml(m.video.channel)} · Cast to TV in YouTube</small></span>
          </a>`
        : "";
      return `<div class="meal"><div class="k">${s}</div><div class="name">${escapeHtml(m.name)}</div><div class="items">${escapeHtml(m.items.join(" · "))}</div><div class="dose">~${kcal} kcal · ~${pro} g protein <span class="est">estimates</span></div>${tip}${salt}${yt}</div>`;
    }).join("");
    return `<div class="day-menu"><h3>${d}</h3>${blocks}</div>`;
  }).join("");
  const shop = month.shopping.map((g) => `<h4>${escapeHtml(g.aisle)}</h4><ul>${g.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`).join("");
  const saltTip = typeof SALT_TIP !== "undefined"
    ? `<div class="salt-tip"><h3>${escapeHtml(SALT_TIP.title)}</h3><p>${escapeHtml(SALT_TIP.body)}</p></div>`
    : "";
  const meatGuide = typeof MEAT_GUIDE !== "undefined"
    ? `<div class="meat-guide"><h3>${escapeHtml(MEAT_GUIDE.title)}</h3><p class="lead">${escapeHtml(MEAT_GUIDE.lead)}</p><dl>${MEAT_GUIDE.items.map((it) => `<dt>${escapeHtml(it.k)}</dt><dd>${escapeHtml(it.v)}</dd>`).join("")}</dl><p class="fine">${escapeHtml(MEAT_GUIDE.foot)}</p></div>`
    : "";
  const tips = typeof COOK_TIPS !== "undefined"
    ? `<div class="cook-tips"><h3>Lower-fat cooking</h3><ul>${COOK_TIPS.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}</ul></div>`
    : "";
  $("diet-body").innerHTML = `
    <h2>Month ${month.id} · ${escapeHtml(month.name)}</h2>
    <p class="lead">${escapeHtml(month.intro)}</p>
    <p class="fine">${scaleNote} Figures on each meal are estimates, not lab-measured values. Swap a similar Nigerian meal if you need to (for example chicken pepper soup for catfish, spinach for ugu). This is a simple food plan, not medical advice. Speak to a GP or a registered dietitian if you have a health condition, or before a large change to how you eat.</p>
    ${saltTip}
    ${meatGuide}
    ${tips}
    ${meals}
    <h3>Shopping list (one person, one week)</h3>
    <p class="fine">Written for the base menu, including UK supermarket and African grocery items. Buy a little more or less to match your portion scale above.</p>
    <div class="shop">${shop}</div>
  `;
}


function prepareVideoCast(video) {
  if (!video) return;
  video.setAttribute("x-webkit-airplay", "allow");
  video.setAttribute("airplay", "allow");
  video.setAttribute("webkit-playsinline", "");
  video.playsInline = true;
  video.disableRemotePlayback = false;
}

function watchWorkoutOnTv() {
  const video = $("player-video");
  if (!video) return;
  prepareVideoCast(video);
  const help = "Phone and TV need the same Wi-Fi. On iPhone, Watch on TV opens AirPlay. If your Samsung does not appear, open Control Center and use Screen Mirroring (AirPlay).";
  video.play().catch(() => {});
  if (typeof video.webkitShowPlaybackTargetPicker === "function") {
    try {
      video.webkitShowPlaybackTargetPicker();
      return;
    } catch (err) {
      toast(help);
      return;
    }
  }
  const remote = video.remote;
  if (remote && typeof remote.prompt === "function") {
    Promise.resolve(remote.prompt()).then(() => {}).catch(() => {
      toast(help);
    });
    return;
  }
  toast(help);
}

function reelsTodayId() { return "reels-" + iso(new Date()); }

function latestBp() {
  const list = sortedBp();
  return list.length ? list[list.length - 1] : null;
}

function openBpLog(ev) {
  if (ev) ev.preventDefault();
  showTab("progress");
  const box = $("bp-box");
  if (box) setTimeout(() => box.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
}

function renderReelsCard() {
  const el = $("daily-reels");
  if (!el) return;
  const done = !!state.completed[reelsTodayId()];
  el.className = "daily-reels" + (done ? " done" : "");
  el.innerHTML = `
    <div class="kicker">${done ? "Done today" : "Today’s session"}</div>
    <h2>${escapeHtml(REELS_ROUTINE.title)} (${REELS_ROUTINE.mins} min)</h2>
    <p class="lead">${escapeHtml(REELS_ROUTINE.subtitle)}</p>
    <div class="meta"><span class="badge">${REELS_ROUTINE.mins} min</span><span class="badge">${escapeHtml(REELS_ROUTINE.focus)}</span></div>
    <button class="btn" id="open-reels" type="button">${done ? "View or repeat" : "Open Daily Reels Routine"}</button>
  `;
  $("open-reels").addEventListener("click", openReelsRoutine);
}

function listBlock(title, items) {
  return `<div class="ex-group"><h3>${escapeHtml(title)}</h3>
    <ul class="ex-list">
      ${items.map((ex) => `
        <li>
          <span class="name">${escapeHtml(ex.name)}</span>
          <span class="dose">${escapeHtml(ex.dose)}</span>
          <span class="rest">${ex.rest && ex.rest !== "—" ? "Rest: " + escapeHtml(ex.rest) : ""}</span>
          <span class="cue">${escapeHtml(ex.cue)}</span>
        </li>
      `).join("")}
    </ul>
  </div>`;
}

function openReelsRoutine() {
  view.day = "reels";
  const id = reelsTodayId();
  const done = !!state.completed[id];
  const session = buildReelsSession();
  const mins = Math.round(session.total / 60);
  const burn = workoutKcal(20);
  $("plan-main").classList.add("hidden");
  $("sheet").classList.add("open");
  const burnHtml = burn != null
    ? `<div class="burn-chip">Estimate: about <strong>${Math.round(burn)} kcal</strong> for a 20-minute session (MET 8 × ${currentKg().toFixed(1)} kg × 20 min). This is an estimate, not a measurement.</div>`
    : `<div class="burn-chip">Add your weight in Progress to see an estimated calorie burn (MET 8 × body weight × 20 min).</div>`;
  const bp = latestBp();
  const urgent = bp && isUrgentBp(bp);
  const bpHtml = urgent
    ? `<div class="safety-note warn" id="reels-bp-block" role="alert">Skip this session. Your latest reading is <strong>${bp.sys}/${bp.dia}</strong>. Do not train if it is 180/120 or higher. <a href="#bp-box" id="open-bp-log-warn">Log a new reading</a> if you have rechecked.</div>`
    : `<div class="safety-note hidden" id="reels-bp-block" role="alert"></div>`;
  $("sheet").innerHTML = `
    <button class="back" id="back-btn" type="button">← Week view</button>
    <div class="sheet-head">
      <div>
        <div class="eyebrow">Daily session</div>
        <h2>${escapeHtml(REELS_ROUTINE.title)}</h2>
      </div>
      <span class="badge">${mins} min</span>
    </div>
    <p class="note">${escapeHtml(REELS_ROUTINE.subtitle)} Warm-up 3 min, then 2 rounds of 40 seconds work and 20 seconds rest, with 1 minute between rounds, then a 3-minute cool-down.</p>
    <div class="safety-note"><strong>Before you start.</strong> ${escapeHtml(REELS_ROUTINE.safety)} <a href="#bp-box" id="open-bp-log">Open your blood pressure log</a>.</div>
    ${bpHtml}
    ${listBlock("Warm-up · 3 minutes", REELS_ROUTINE.warmup)}
    ${listBlock("Main · 2 rounds, 40s work / 20s rest, 1 min between rounds", REELS_ROUTINE.main)}
    ${listBlock("Cool-down · 3 minutes", REELS_ROUTINE.cooldown)}
    <p class="note"><strong>Progression.</strong> ${escapeHtml(REELS_ROUTINE.progression)}</p>
    ${paceNoteHtml({ lowImpact: "One foot always stays on the floor during marches. Kick only to a comfortable height. Use a wall or worktop for all push-ups for now." })}
    ${burnHtml}
    <button class="btn" id="start-workout" type="button">Start workout</button>
    <button class="btn${done ? " done" : ""}" id="toggle-done" type="button">${done ? "Done today ✓  Tap to undo" : "Mark as done"}</button>
  `;
  $("back-btn").addEventListener("click", closeDay);
  $("open-bp-log").addEventListener("click", openBpLog);
  const warnLink = $("open-bp-log-warn");
  if (warnLink) warnLink.addEventListener("click", openBpLog);
  $("start-workout").addEventListener("click", () => startReelsWorkout(id));
  $("toggle-done").addEventListener("click", () => {
    if (state.completed[id]) delete state.completed[id];
    else state.completed[id] = true;
    saveState(state);
    toast(state.completed[id] ? "Saved to this device" : "Marked not done");
    renderAll();
    openReelsRoutine();
  });
}

function startReelsWorkout(completeId) {
  const bp = latestBp();
  if (bp && isUrgentBp(bp)) {
    const box = $("reels-bp-block");
    if (box) {
      box.classList.remove("hidden");
      box.classList.add("warn");
      box.innerHTML = `Skip this session. Your latest reading is <strong>${bp.sys}/${bp.dia}</strong>. Do not train if it is 180/120 or higher. <a href="#bp-box" id="open-bp-log-block">Open your blood pressure log</a>.`;
      const link = $("open-bp-log-block");
      if (link) link.addEventListener("click", openBpLog);
    }
    toast("Skip this session: latest BP is " + bp.sys + "/" + bp.dia);
    return;
  }
  const session = buildReelsSession();
  startBuiltSession(session, completeId, "Talk test: keep a pace where you can speak in short sentences. Don’t hold your breath — breathe out on the effort. One foot always stays on the floor during marches. Stop if you feel dizzy, have chest pain, or become very short of breath.");
}

function startBuiltSession(session, completeId, paceText) {
  player = { steps: session.steps, i: 0, left: session.steps[0].seconds, total: session.total, remain: session.total, paused: false, timer: null, completeId, lastBeep: 0, month: view.month };
  $("player").classList.remove("hidden");
  const pace = $("player-pace");
  if (pace) pace.textContent = paceText;
  prepareVideoCast($("player-video"));
  showPlayerStep(true);
  tickPlayer();
}

function startWorkout(wd, completeId) {
  const session = buildSession(wd);
  player = { steps: session.steps, i: 0, left: session.steps[0].seconds, total: session.total, remain: session.total, paused: false, timer: null, completeId, lastBeep: 0, month: view.month };
  $("player").classList.remove("hidden");
  const pace = $("player-pace");
  if (pace) {
    const swap = view.month === 1
      ? " Month 1 is low-impact: no jumping — step or march."
      : " Low-impact swap: march or step instead of any jump.";
    pace.textContent = "Talk test: keep a pace where you can speak in short sentences. Don’t hold your breath — breathe out on the effort." + swap;
  }
  prepareVideoCast($("player-video"));
  showPlayerStep(true);
  tickPlayer();
}
function showPlayerStep(fresh) {
  if (!player) return;
  const step = player.steps[player.i];
  const video = $("player-video");
  const still = $("player-still");
  $("player").classList.toggle("is-rest", step.type === "rest");
  $("player-phase").textContent = step.type === "rest" ? "Rest" : (String(step.name || "").indexOf("Cool-down") === 0 ? "Cool-down" : (String(step.name || "").indexOf("Warm-up") === 0 ? "Warm-up" : "Work"));
  $("player-name").textContent = step.type === "work" ? step.name : ("Rest" + (step.nextName ? " · next: " + step.nextName : ""));
  $("player-next").textContent = step.type === "rest" && step.nextName ? "Up next: " + step.nextName : (player.steps[player.i + 1] && player.steps[player.i + 1].type === "rest" && player.steps[player.i + 1].nextName ? "Next: " + player.steps[player.i + 1].nextName : "");
  const cue = step.type === "work" ? (step.instruction || "") : (step.nextInstruction || "");
  const cueEl = $("player-cue");
  if (cueEl) {
    cueEl.textContent = cue;
    cueEl.classList.toggle("hidden", !cue);
  }
  const clip = step.type === "work" ? step.clip : step.nextClip;
  const pose = step.type === "work" ? step.pose : step.nextPose;
  const vidSrc = clip ? clipSrc(clip) : "";
  const imgSrc = pose ? cueSrc(pose) : "";
  if (vidSrc) {
    if (still) still.classList.add("hidden");
    video.classList.remove("hidden");
    if (fresh || video.getAttribute("data-src") !== vidSrc) {
      video.src = vidSrc;
      video.setAttribute("data-src", vidSrc);
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {});
    }
    if (step.type === "rest") video.classList.add("dim");
    else video.classList.remove("dim");
  } else if (imgSrc) {
    video.pause();
    video.removeAttribute("src");
    video.removeAttribute("data-src");
    video.load();
    video.classList.add("hidden");
    if (still) {
      still.classList.remove("hidden");
      if (fresh || still.getAttribute("data-src") !== imgSrc) {
        still.src = imgSrc;
        still.setAttribute("data-src", imgSrc);
        still.alt = step.type === "work" ? (step.name || "") : (step.nextName || "");
      }
      if (step.type === "rest") still.classList.add("dim");
      else still.classList.remove("dim");
    }
  } else {
    video.pause();
    if (still) still.classList.add("hidden");
  }
  const tvBtn = $("player-tv");
  const tvHelp = $("player-tv-help");
  if (tvBtn) tvBtn.classList.toggle("hidden", !vidSrc);
  if (tvHelp) tvHelp.classList.toggle("hidden", !vidSrc);
  renderPlayerTime();
}
function renderPlayerTime() {
  if (!player) return;
  const m = Math.floor(player.left / 60);
  const s = player.left % 60;
  $("player-clock").textContent = `${m}:${String(s).padStart(2, "0")}`;
  const done = player.total - player.remain + (player.steps[player.i].seconds - player.left);
  $("player-total").textContent = `${Math.floor((player.total - done) / 60)}:${String((player.total - done) % 60).padStart(2, "0")} left`;
  $("player-bar-fill").style.width = `${Math.min(100, (done / player.total) * 100)}%`;
}
function tickPlayer() {
  if (!player || player.paused) return;
  clearInterval(player.timer);
  player.timer = setInterval(() => {
    if (!player || player.paused) return;
    if (player.left === 3 || player.left === 2 || player.left === 1) beep(1);
    player.left -= 1;
    player.remain -= 1;
    if (player.left <= 0) {
      beep(2);
      player.i += 1;
      if (player.i >= player.steps.length) {
        finishWorkout(true);
        return;
      }
      player.left = player.steps[player.i].seconds;
      showPlayerStep(true);
    } else renderPlayerTime();
  }, 1000);
}
function finishWorkout(completed) {
  if (player && player.timer) clearInterval(player.timer);
  $("player").classList.add("hidden");
  const vid = $("player-video");
  vid.pause(); vid.removeAttribute("src"); vid.removeAttribute("data-src"); vid.load();
  const still = $("player-still");
  if (still) {
    still.removeAttribute("src");
    still.removeAttribute("data-src");
    still.alt = "";
    still.classList.add("hidden");
  }
  if (completed && player && player.completeId) {
    state.completed[player.completeId] = true;
    saveState(state);
    renderAll();
    toast("Workout saved as done");
  }
  player = null;
}

function renderAll() {
  renderChrome();
  renderReelsCard();
  renderMonths();
  renderWeeks();
  renderPhase();
  renderGrid();
}

function init() {
  const t = findToday();
  view.month = t.month;
  view.week = t.week;
  view.dietMonth = t.month;
  renderAll();
  fillProfileForm();

  $("months").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-month]");
    if (!btn) return;
    view.month = Number(btn.dataset.month);
    closeDay();
    renderAll();
  });
  $("weeks").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-week]");
    if (!btn) return;
    view.week = Number(btn.dataset.week);
    closeDay();
    renderAll();
  });
  $("grid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-day]");
    if (!btn) return;
    openDay(btn.dataset.day);
  });
  $("tab-plan").addEventListener("click", () => showTab("plan"));
  $("tab-progress").addEventListener("click", () => showTab("progress"));
  $("tab-diet").addEventListener("click", () => showTab("diet"));
  $("tab-notes").addEventListener("click", () => showTab("notes"));
  $("jump-today").addEventListener("click", jumpToToday);
  $("start-date").addEventListener("change", (e) => {
    const v = e.target.value;
    if (!v) return;
    state.startDate = iso(mondayOf(parseISO(v)));
    saveState(state);
    $("start-date").value = state.startDate;
    toast("Start set to the Monday of that week");
    renderAll();
  });
  $("reset-progress").addEventListener("click", () => {
    if (!confirm("Clear all ticks on this device? The programme itself stays. Weight, food and profile are not cleared.")) return;
    state.completed = {};
    saveState(state);
    renderAll();
    toast("Workout ticks cleared");
  });

  $("sex-seg").addEventListener("click", (e) => {
    const b = e.target.closest("[data-sex]");
    if (!b) return;
    state.profile.sex = b.getAttribute("data-sex");
    setSeg("sex-seg", "data-sex", state.profile.sex);
  });
  $("height-unit-seg").addEventListener("click", (e) => {
    const b = e.target.closest("[data-hunit]");
    if (!b) return;
    state.profile.heightUnit = b.getAttribute("data-hunit");
    setSeg("height-unit-seg", "data-hunit", state.profile.heightUnit);
    toggleUnits();
  });
  $("weight-unit-seg").addEventListener("click", (e) => {
    const b = e.target.closest("[data-wunit]");
    if (!b) return;
    state.profile.weightUnit = b.getAttribute("data-wunit");
    setSeg("weight-unit-seg", "data-wunit", state.profile.weightUnit);
    toggleUnits();
  });
  $("save-profile").addEventListener("click", saveProfile);
  $("save-eaten").addEventListener("click", () => {
    const today = iso(new Date());
    const v = $("eaten").value;
    if (v === "") delete state.calorieLog[today];
    else state.calorieLog[today] = Number(v);
    saveState(state);
    renderProgress();
    toast("Today’s calories saved");
  });
  $("add-weight").addEventListener("click", addWeight);
  $("weight-list").addEventListener("click", (e) => {
    const b = e.target.closest("[data-del]");
    if (!b) return;
    state.weightLog = state.weightLog.filter((x) => x.date !== b.getAttribute("data-del"));
    saveState(state);
    renderProgress();
  });
  $("add-bp").addEventListener("click", addBp);
  $("bp-list").addEventListener("click", (e) => {
    const b = e.target.closest("[data-bp-del]");
    if (!b) return;
    state.bpLog = (state.bpLog || []).filter((x) => x.id !== b.getAttribute("data-bp-del"));
    saveState(state);
    renderProgress();
  });
  $("diet-months").addEventListener("click", (e) => {
    const b = e.target.closest("[data-diet]");
    if (!b) return;
    view.dietMonth = Number(b.getAttribute("data-diet"));
    renderDiet();
  });

  $("player-tv").addEventListener("click", watchWorkoutOnTv);
  $("player-pause").addEventListener("click", () => {
    if (!player) return;
    player.paused = !player.paused;
    $("player-pause").textContent = player.paused ? "Resume" : "Pause";
    if (player.paused) { clearInterval(player.timer); $("player-video").pause(); }
    else { $("player-video").play().catch(() => {}); tickPlayer(); }
  });
  $("player-skip").addEventListener("click", () => {
    if (!player) return;
    player.remain -= player.left;
    player.left = 0;
    player.left = 0;
    beep(2);
    player.i += 1;
    if (player.i >= player.steps.length) { finishWorkout(true); return; }
    player.left = player.steps[player.i].seconds;
    showPlayerStep(true);
  });
  $("player-end").addEventListener("click", () => finishWorkout(false));

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").then((reg) => { reg.update(); });
    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloaded) return;
      reloaded = true;
      location.reload();
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
