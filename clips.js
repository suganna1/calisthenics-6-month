const CLIPS = {
  "push-up": "Push-up",
  "pike-push-up": "Pike push-up",
  "y-raise": "Y raise",
  "shoulder-taps": "Plank shoulder taps",
  "plank": "Forearm plank",
  "side-plank": "Side plank",
  "squat": "Bodyweight squat",
  "reverse-lunge": "Reverse lunge",
  "split-squat": "Split squat",
  "curtsy-lunge": "Curtsy lunge",
  "side-lunge": "Side lunge",
  "glute-bridge": "Glute bridge",
  "calf-raise": "Calf raise",
  "hollow-hold": "Hollow hold",
  "dead-bug": "Dead bug",
  "v-up": "V-up",
  "bicycle-crunch": "Bicycle crunch",
  "russian-twist": "Russian twist",
  "back-extension": "Back extension"
};

function clipSrc(id) {
  return "./clips/" + id + ".mp4";
}

function clipFromName(name) {
  const n = String(name || "").toLowerCase();
  if (/follow the|use the easier|march or step|keep landings|take the quieter|drop to the|warm-up:/.test(n)) return null;
  if (/pike/.test(n)) return "pike-push-up";
  if (/diamond|tricep/.test(n)) return "push-up";
  if (/(push-up|press-up|hand-release)/.test(n)) return "push-up";
  if (/(y raise|t raise|w raise|prone y|prone t|prone w)/.test(n)) return "y-raise";
  if (/shoulder-tap|shoulder tap/.test(n)) return "shoulder-taps";
  if (/side plank/.test(n)) return "side-plank";
  if (/plank/.test(n)) return "plank";
  if (/curtsy/.test(n)) return "curtsy-lunge";
  if (/cossack|side lunge/.test(n)) return "side-lunge";
  if (/split squat|narrow-stance|pistol|one-down/.test(n)) return "split-squat";
  if (/reverse lunge|walking lunge/.test(n)) return "reverse-lunge";
  if (/glute|hip thrust|bridge/.test(n)) return "glute-bridge";
  if (/calf/.test(n)) return "calf-raise";
  if (/squat/.test(n)) return "squat";
  if (/hollow/.test(n)) return "hollow-hold";
  if (/dead bug/.test(n)) return "dead-bug";
  if (/v-up|v up|v-sit|tuck-up/.test(n)) return "v-up";
  if (/bicycle/.test(n)) return "bicycle-crunch";
  if (/russian/.test(n)) return "russian-twist";
  if (/oblique|side crunch|reverse crunch/.test(n)) return "bicycle-crunch";
  if (/back extension|w-shape|superman/.test(n)) return "back-extension";
  if (/compression|seated|leg lift|leg raise/.test(n)) return "v-up";
  if (/bird dog/.test(n)) return "dead-bug";
  if (/reverse nordic/.test(n)) return "split-squat";
  return null;
}

const FOCUS_CIRCUITS = {
  "Upper body": ["push-up", "pike-push-up", "y-raise", "shoulder-taps", "plank"],
  "Lower body": ["squat", "reverse-lunge", "glute-bridge", "curtsy-lunge", "calf-raise"],
  "Core": ["hollow-hold", "dead-bug", "v-up", "bicycle-crunch", "russian-twist"],
  "Full body": ["squat", "push-up", "reverse-lunge", "shoulder-taps", "plank"]
};

const WARMUPS = ["squat", "reverse-lunge", "y-raise", "calf-raise"];
const FINISHERS = {
  "Upper body": ["plank", "y-raise", "shoulder-taps"],
  "Lower body": ["glute-bridge", "calf-raise", "squat"],
  "Core": ["hollow-hold", "side-plank", "back-extension"],
  "Full body": ["hollow-hold", "plank", "bicycle-crunch"]
};

function mainClipsFor(wd) {
  const seen = new Set();
  const ids = [];
  (wd.exercises || []).forEach((ex) => {
    const id = clipFromName(ex.name);
    if (id && !seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
  });
  const fallback = FOCUS_CIRCUITS[wd.focus] || FOCUS_CIRCUITS["Full body"];
  fallback.forEach((id) => {
    if (ids.length < 5 && !seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
  });
  return ids.slice(0, 5);
}

function buildSession(wd) {
  const main = mainClipsFor(wd);
  const steps = [];
  WARMUPS.forEach((id, i) => {
    steps.push({ type: "work", clip: id, name: "Warm-up · " + CLIPS[id], seconds: 30 });
    if (i < WARMUPS.length - 1) {
      steps.push({ type: "rest", seconds: 10, nextClip: WARMUPS[i + 1], nextName: "Warm-up · " + CLIPS[WARMUPS[i + 1]] });
    } else {
      steps.push({ type: "rest", seconds: 20, nextClip: main[0], nextName: CLIPS[main[0]] });
    }
  });
  const rounds = 3;
  for (let r = 0; r < rounds; r++) {
    main.forEach((id, i) => {
      const last = r === rounds - 1 && i === main.length - 1;
      steps.push({ type: "work", clip: id, name: CLIPS[id] + " · Round " + (r + 1), seconds: 40 });
      const nxt = last
        ? null
        : (i < main.length - 1 ? main[i + 1] : main[0]);
      const nxtName = last
        ? ((FINISHERS[wd.focus] || FINISHERS["Full body"])[0])
        : nxt;
      steps.push({
        type: "rest",
        seconds: 20,
        nextClip: last ? (FINISHERS[wd.focus] || FINISHERS["Full body"])[0] : nxt,
        nextName: last
          ? "Finisher · " + CLIPS[(FINISHERS[wd.focus] || FINISHERS["Full body"])[0]]
          : CLIPS[nxt]
      });
    });
  }
  const fin = FINISHERS[wd.focus] || FINISHERS["Full body"];
  fin.forEach((id, i) => {
    steps.push({ type: "work", clip: id, name: "Finisher · " + CLIPS[id], seconds: 40 });
    if (i < fin.length - 1) {
      steps.push({ type: "rest", seconds: 20, nextClip: fin[i + 1], nextName: "Finisher · " + CLIPS[fin[i + 1]] });
    }
  });
  const total = steps.reduce((s, st) => s + st.seconds, 0);
  return { steps, total };
}


function cueSrc(id) {
  return id ? "./cues/" + id + ".jpg" : "";
}

function buildReelsSession() {
  const steps = [];
  const warm = [
    { pose: "march-running-arms", name: "Warm-up · Standing marches, running arms", seconds: 60, instruction: REELS_ROUTINE.warmup[0].cue },
    { pose: "march-guard", name: "Warm-up · Standing marches, hands on hips or guard", seconds: 60, instruction: REELS_ROUTINE.warmup[1].cue },
    { pose: "march-crossed", name: "Warm-up · Standing marches, arms crossed", seconds: 60, instruction: REELS_ROUTINE.warmup[2].cue }
  ];
  warm.forEach((s) => steps.push(Object.assign({ type: "work" }, s)));

  const main = [
    { pose: "toe-touch", name: REELS_ROUTINE.main[0].name, instruction: REELS_ROUTINE.main[0].cue },
    { pose: "kneeling-twist", name: REELS_ROUTINE.main[1].name, instruction: REELS_ROUTINE.main[1].cue },
    { pose: "wall-diamond", name: REELS_ROUTINE.main[2].name, instruction: REELS_ROUTINE.main[2].cue },
    { pose: "wall-sphinx", name: REELS_ROUTINE.main[3].name, instruction: REELS_ROUTINE.main[3].cue },
    { pose: "cross-crunch", name: REELS_ROUTINE.main[4].name, instruction: REELS_ROUTINE.main[4].cue },
    { pose: "seated-tuck", name: REELS_ROUTINE.main[5].name, instruction: REELS_ROUTINE.main[5].cue },
    { pose: "wall-push-up", name: REELS_ROUTINE.main[6].name, instruction: REELS_ROUTINE.main[6].cue }
  ];

  for (let r = 0; r < 2; r++) {
    main.forEach((ex, i) => {
      const lastInRound = i === main.length - 1;
      const lastOverall = r === 1 && lastInRound;
      steps.push({
        type: "work",
        pose: ex.pose,
        name: ex.name + " · Round " + (r + 1),
        seconds: 40,
        instruction: ex.instruction
      });
      if (lastOverall) return;
      if (lastInRound) {
        steps.push({
          type: "rest",
          seconds: 60,
          nextPose: main[0].pose,
          nextName: main[0].name + " · Round " + (r + 2),
          nextInstruction: main[0].instruction
        });
      } else {
        steps.push({
          type: "rest",
          seconds: 20,
          nextPose: main[i + 1].pose,
          nextName: main[i + 1].name + " · Round " + (r + 1),
          nextInstruction: main[i + 1].instruction
        });
      }
    });
  }

  const cool = [
    { pose: "march-running-arms", name: "Cool-down · Slow marching", seconds: 60, instruction: REELS_ROUTINE.cooldown[0].cue },
    { pose: "chest-stretch", name: "Cool-down · Chest and arm stretch", seconds: 60, instruction: REELS_ROUTINE.cooldown[1].cue },
    { pose: "breathing", name: "Cool-down · Deep slow breathing", seconds: 60, instruction: REELS_ROUTINE.cooldown[2].cue }
  ];
  cool.forEach((s) => steps.push(Object.assign({ type: "work" }, s)));

  const total = steps.reduce((s, st) => s + st.seconds, 0);
  return { steps, total };
}
