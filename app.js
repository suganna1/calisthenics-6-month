const STORAGE_KEY = "calisthenics-6mo-v1";
const TOTAL_WORKOUTS = PROGRAM.months.length * PROGRAM.weeksPerMonth * WEEKDAYS.length;

function mondayOf(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay(); // 0 Sun
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

function defaultStart() {
  return iso(mondayOf(new Date()));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data && typeof data === "object") {
        return {
          startDate: data.startDate || defaultStart(),
          completed: data.completed && typeof data.completed === "object" ? data.completed : {}
        };
      }
    }
  } catch (e) { /* keep defaults */ }
  return { startDate: defaultStart(), completed: {} };
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();
let view = { month: 1, week: 1, tab: "plan", day: null };

function dayId(month, week, day) {
  return `${month}-${week}-${day}`;
}

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
  return Object.keys(state.completed).filter((k) => state.completed[k]).length;
}

function weekComplete(month, week) {
  return WEEKDAYS.every((d) => state.completed[dayId(month, week, d)]);
}

function streak() {
  const today = iso(new Date());
  const items = [];
  for (let m = 1; m <= 6; m++) {
    for (let w = 1; w <= PROGRAM.weeksPerMonth; w++) {
      for (const day of WEEKDAYS) {
        items.push({ id: dayId(m, w, day), date: iso(dateFor(m, w, day)) });
      }
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

function $(id) { return document.getElementById(id); }

function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 1600);
}

function renderChrome() {
  const done = completedCount();
  const pct = Math.round((done / TOTAL_WORKOUTS) * 100);
  $("done-count").textContent = `${done} / ${TOTAL_WORKOUTS} workouts`;
  $("pct").textContent = `${pct}%`;
  $("bar-fill").style.width = `${pct}%`;
  const s = streak();
  $("streak-num").textContent = String(s);
  $("streak-label").textContent = s === 1 ? "day streak" : "day streak";
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

function renderPhase() {
  const m = PROGRAM.months[view.month - 1];
  $("phase").innerHTML = `
    <h2>Month ${m.id} · ${m.name}</h2>
    <p>${m.goal}</p>
    <div class="rule"><span>This week</span>${m.rule}</div>
  `;
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
  $("plan-main").classList.add("hidden");
  $("sheet").classList.add("open");
  $("sheet").innerHTML = `
    <button class="back" id="back-btn" type="button">← Week view</button>
    <div class="sheet-head">
      <div>
        <div class="eyebrow">${day} · ${date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</div>
        <h2>${wd.focus}</h2>
      </div>
      <span class="badge">${wd.mins} min</span>
    </div>
    <div class="rule" style="margin-top:12px"><span>This week</span>${m.rule}</div>
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
    <div class="video-card">
      <div class="kicker">Follow-along video</div>
      <h3>${wd.video.title}</h3>
      <div class="channel">${wd.video.channel} · YouTube</div>
      <a class="btn" href="${wd.video.url}" target="_blank" rel="noopener noreferrer">Open on YouTube</a>
    </div>
    <button class="btn${done ? " done" : ""}" id="toggle-done" type="button">${done ? "Done ✓  Tap to undo" : "Mark as done"}</button>
  `;
  $("back-btn").addEventListener("click", closeDay);
  $("toggle-done").addEventListener("click", () => {
    state.completed[id] = !state.completed[id];
    if (!state.completed[id]) delete state.completed[id];
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
  $("tab-plan").classList.toggle("active", tab === "plan");
  $("tab-notes").classList.toggle("active", tab === "notes");
  if (tab === "notes") {
    closeDay();
    $("plan-wrap").classList.add("hidden");
    $("notes").classList.add("open");
    $("start-date").value = state.startDate;
  } else {
    $("plan-wrap").classList.remove("hidden");
    $("notes").classList.remove("open");
  }
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

function renderAll() {
  renderChrome();
  renderMonths();
  renderWeeks();
  renderPhase();
  renderGrid();
}

function init() {
  const t = findToday();
  view.month = t.month;
  view.week = t.week;
  renderAll();
  if (t.day && WEEKDAYS.includes(t.day)) {
    /* stay on the week grid so the today card is visible */
  }

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
    if (!confirm("Clear all ticks on this device? The programme itself stays.")) return;
    state.completed = {};
    saveState(state);
    renderAll();
    toast("Progress cleared");
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
}

document.addEventListener("DOMContentLoaded", init);
