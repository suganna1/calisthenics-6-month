// Voice instructor, background Afrobeats music, and "My Music" app links
// for the Daily Reels Routine player.

const COACH_KEY = "calisthenics-coach-v1";
const COACH_TRACKS = ["./music/afrobeat-1.mp3", "./music/afrobeat-2.mp3", "./music/afrobeat-3.mp3"];

const VOICE_CUES = {
  "march-running-arms": "Lift each knee, swing your arms. One foot stays on the floor.",
  "march-guard": "Hands on hips or fists up. Keep marching, steady pace.",
  "march-crossed": "Arms crossed on your chest. Steady march, no bouncing.",
  "toe-touch": "Kick one leg, reach the opposite hand. Left, then right.",
  "kneeling-twist": "Kneel tall, hands behind your head. Twist left, then right. Slow.",
  "wall-diamond": "Hands in a diamond on the wall. Lower your chest, push back.",
  "wall-sphinx": "Forearms on the wall. Push to straight arms, lower slowly.",
  "cross-crunch": "Elbow to the opposite knee. Switch sides each rep.",
  "seated-tuck": "Lean back on your hands. Pull your knees in, small range.",
  "wall-push-up": "Hands on the wall or worktop. Lower your chest, push back.",
  "chest-stretch": "Open your chest. Breathe slowly, do not force it.",
  "breathing": "Breathe in through your nose, out through your mouth."
};

const CHEERS = [
  "Good work, keep going.",
  "Nice and steady. You are doing well.",
  "Breathe out on the effort. Keep it up.",
  "Strong. Halfway there.",
  "Well done. Stay with it.",
  "Great pace. Remember to breathe."
];

const MY_MUSIC_QUERY = "Burna Boy Davido Rema Kizz Daniel Zlatan";
const MY_MUSIC_APPS = [
  { id: "ytmusic", label: "YouTube Music", url: "https://music.youtube.com/search?q=" + encodeURIComponent(MY_MUSIC_QUERY) },
  { id: "spotify", label: "Spotify", url: "https://open.spotify.com/search/" + encodeURIComponent(MY_MUSIC_QUERY) },
  { id: "boomplay", label: "Boomplay", url: "https://www.boomplay.com/search/default/" + encodeURIComponent(MY_MUSIC_QUERY) },
  { id: "audiomack", label: "Audiomack", url: "https://audiomack.com/search?q=" + encodeURIComponent(MY_MUSIC_QUERY) }
];

const coach = {
  prefs: loadCoachPrefs(),
  audio: null,
  track: 0,
  active: false,
  speaking: 0,
  voice: null,
  cheerFlip: false
};

function loadCoachPrefs() {
  const def = { voice: true, music: true, volume: 0.5, lastApp: "" };
  try {
    const raw = JSON.parse(localStorage.getItem(COACH_KEY) || "{}");
    return Object.assign(def, raw);
  } catch (e) { return def; }
}
function saveCoachPrefs() {
  try { localStorage.setItem(COACH_KEY, JSON.stringify(coach.prefs)); } catch (e) { /* ignore */ }
}

function pickVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = speechSynthesis.getVoices() || [];
  return voices.find((v) => /en[-_]GB/i.test(v.lang) && /female|libby|sonia|serena|kate|martha|google uk english/i.test(v.name))
    || voices.find((v) => /en[-_]GB/i.test(v.lang))
    || voices.find((v) => /^en/i.test(v.lang))
    || null;
}
if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = () => { coach.voice = pickVoice(); };
}

function musicVolume() {
  return coach.speaking > 0 ? coach.prefs.volume * 0.25 : coach.prefs.volume;
}
function applyMusicVolume() {
  if (coach.audio) coach.audio.volume = Math.max(0, Math.min(1, musicVolume()));
}

function coachSay(text, opts) {
  if (!coach.active || !coach.prefs.voice || !text || !("speechSynthesis" in window)) return;
  const o = opts || {};
  if (o.interrupt !== false) speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (!coach.voice) coach.voice = pickVoice();
  if (coach.voice) { u.voice = coach.voice; u.lang = coach.voice.lang; }
  else u.lang = "en-GB";
  u.rate = o.rate || 1;
  u.pitch = 1;
  u.volume = 1;
  let done = false;
  const end = () => { if (done) return; done = true; coach.speaking = Math.max(0, coach.speaking - 1); applyMusicVolume(); };
  u.onstart = () => { coach.speaking += 1; applyMusicVolume(); };
  u.onend = end;
  u.onerror = end;
  speechSynthesis.speak(u);
}

function cleanStepName(name) {
  return String(name || "")
    .replace(/^(Warm-up|Cool-down|Finisher)\s*·\s*/i, "")
    .replace(/\s*·\s*Round\s*\d+$/i, "");
}

function coachStep(step, isFirst) {
  if (!coach.active || !step) return;
  if (step.type === "work") {
    const name = cleanStepName(step.name);
    const cue = VOICE_CUES[step.pose || step.clip] || "";
    const lead = isFirst ? "Let's go. " : "";
    coachSay(lead + name + ". " + cue);
  } else {
    const next = cleanStepName(step.nextName);
    const cue = VOICE_CUES[step.nextPose || step.nextClip] || "";
    coachSay("Rest. Breathe. Next up, " + next + ". " + cue);
  }
}

// Called once per second with the seconds left in the current step.
function coachTick(step, left) {
  if (!coach.active || !step || !coach.prefs.voice) return false;
  if (step.type === "work" && left >= 1 && left <= 3) {
    coachSay(String(left), { rate: 1.1 });
    return true;
  }
  if (step.type === "work" && step.seconds >= 40 && left === Math.floor(step.seconds / 2)) {
    coach.cheerFlip = !coach.cheerFlip;
    if (coach.cheerFlip) coachSay(CHEERS[Math.floor(Math.random() * CHEERS.length)], { interrupt: false });
  }
  if (step.type === "rest" && left === 5) coachSay("Get ready.", { interrupt: false });
  return false;
}

function startMusic() {
  if (!coach.prefs.music) return;
  if (!coach.audio) {
    coach.audio = new Audio();
    coach.audio.preload = "auto";
    coach.audio.addEventListener("ended", () => {
      coach.track = (coach.track + 1) % COACH_TRACKS.length;
      coach.audio.src = COACH_TRACKS[coach.track];
      coach.audio.play().catch(() => {});
    });
  }
  if (!coach.audio.src) coach.audio.src = COACH_TRACKS[coach.track];
  applyMusicVolume();
  coach.audio.play().catch(() => {});
}
function pauseMusic() {
  if (coach.audio) coach.audio.pause();
}
function stopMusic() {
  if (!coach.audio) return;
  coach.audio.pause();
  coach.audio.currentTime = 0;
}

function coachStart() {
  coach.active = true;
  coach.voice = pickVoice();
  coach.cheerFlip = false;
  const box = document.getElementById("coach-controls");
  if (box) box.classList.remove("hidden");
  renderCoachControls();
  startMusic();
}
function coachPause(paused) {
  if (!coach.active) return;
  if (paused) {
    pauseMusic();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  } else {
    startMusic();
  }
}
function coachStop() {
  coach.active = false;
  coach.speaking = 0;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  stopMusic();
  const box = document.getElementById("coach-controls");
  if (box) box.classList.add("hidden");
}

function orderedMusicApps() {
  const last = coach.prefs.lastApp;
  const list = MY_MUSIC_APPS.slice();
  list.sort((a, b) => (a.id === last ? -1 : b.id === last ? 1 : 0));
  return list;
}

function renderCoachControls() {
  const v = document.getElementById("coach-voice");
  const m = document.getElementById("coach-music");
  const vol = document.getElementById("coach-volume");
  if (v) { v.textContent = "Voice: " + (coach.prefs.voice ? "On" : "Off"); v.classList.toggle("off", !coach.prefs.voice); v.setAttribute("aria-pressed", String(coach.prefs.voice)); }
  if (m) { m.textContent = "Music: " + (coach.prefs.music ? "On" : "Off"); m.classList.toggle("off", !coach.prefs.music); m.setAttribute("aria-pressed", String(coach.prefs.music)); }
  if (vol) vol.value = String(Math.round(coach.prefs.volume * 100));
  const apps = document.getElementById("my-music-apps");
  if (apps) {
    apps.innerHTML = orderedMusicApps().map((a) =>
      `<a class="my-music-btn${a.id === coach.prefs.lastApp ? " last" : ""}" data-app="${a.id}" href="${a.url}" target="_blank" rel="noopener noreferrer">${a.label}${a.id === coach.prefs.lastApp ? " · last used" : ""}</a>`
    ).join("");
  }
}

function initCoachControls() {
  const v = document.getElementById("coach-voice");
  const m = document.getElementById("coach-music");
  const vol = document.getElementById("coach-volume");
  const apps = document.getElementById("my-music-apps");
  if (v) v.addEventListener("click", () => {
    coach.prefs.voice = !coach.prefs.voice;
    saveCoachPrefs();
    if (!coach.prefs.voice && "speechSynthesis" in window) { speechSynthesis.cancel(); coach.speaking = 0; applyMusicVolume(); }
    else coachSay("Voice on.");
    renderCoachControls();
  });
  if (m) m.addEventListener("click", () => {
    coach.prefs.music = !coach.prefs.music;
    saveCoachPrefs();
    if (coach.prefs.music) { if (coach.active) startMusic(); }
    else pauseMusic();
    renderCoachControls();
  });
  if (vol) vol.addEventListener("input", () => {
    coach.prefs.volume = Number(vol.value) / 100;
    saveCoachPrefs();
    applyMusicVolume();
  });
  if (apps) apps.addEventListener("click", (e) => {
    const a = e.target.closest("[data-app]");
    if (!a) return;
    coach.prefs.lastApp = a.getAttribute("data-app");
    // Built-in music turns off when you open your own music app.
    coach.prefs.music = false;
    saveCoachPrefs();
    pauseMusic();
    renderCoachControls();
  });
  renderCoachControls();
}

function speakFinal() {
  if (!coach.prefs.voice || !("speechSynthesis" in window)) return;
  coach.active = true;
  coachSay("Session complete. Well done. Check how you feel, and drink some water.");
  coach.active = false;
}
