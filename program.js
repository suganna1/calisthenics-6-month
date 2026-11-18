/* 6-month calisthenics programme. Videos were checked with the YouTube oembed API. */
const PROGRAM = {
  title: "Calisthenics 6-Month",
  tagline: "Lose weight and build muscle. No equipment. 20 minutes, Monday to Friday.",
  weeksPerMonth: 4,
  months: [
    {
      id: 1,
      name: "Foundation",
      goal: "Learn the basic moves slowly, with control, at a gentle low-impact pace.",
      rule: "Month 1 is low-impact: no jumping or hopping. Use the easier variation (wall or knee push-ups, a smaller range, or a march in place). Talk test: you should be able to speak in short sentences. Breathe out on the effort; do not hold your breath. Stop if you feel dizzy, unwell, or have chest pain.",
      lowImpact: "This month is already low-impact. Keep every landing soft, and step or march rather than jump.",
      days: {
        Mon: {
          focus: "Upper body",
          mins: 20,
          exercises: [
            { name: "Wall or knee push-ups", dose: "3 sets × 8–10", rest: "30s" },
            { name: "Pike shoulder presses (knees down if needed)", dose: "3 sets × 6–8", rest: "30s" },
            { name: "Prone Y raises", dose: "3 sets × 10", rest: "30s" },
            { name: "Knee diamond push-ups", dose: "3 sets × 6–8", rest: "30s" },
            { name: "Plank shoulder taps (from knees if needed)", dose: "3 sets × 8 each side", rest: "30s" }
          ],
          video: {
            title: "20 MINUTE UPPER BODY WORKOUT(NO EQUIPMENT)",
            channel: "BullyJuice",
            url: "https://www.youtube.com/watch?v=mm47bCaCzpQ"
          }
        },
        Tue: {
          focus: "Lower body",
          mins: 20,
          exercises: [
            { name: "Bodyweight squats (slow, no jump)", dose: "45s on", rest: "20s" },
            { name: "Reverse lunges (alternate legs, step — do not hop)", dose: "45s on", rest: "20s" },
            { name: "Glute bridges", dose: "45s on", rest: "20s" },
            { name: "Curtsy lunges (step, no hop)", dose: "45s on", rest: "20s" },
            { name: "Calf raises (soft landing, no bounce)", dose: "45s on", rest: "20s" }
          ],
          note: "The follow-along video uses 45 seconds of work and 15 seconds of rest. Repeat the circuit until the 20 minutes are up, or just follow the video.",
          video: {
            title: "20 MIN LEG WORKOUT - Beginner Lower Body Strength (at-home workout)",
            channel: "Megan The Trainer",
            url: "https://www.youtube.com/watch?v=x9Pv_emZyy4"
          }
        },
        Wed: {
          focus: "Core",
          mins: 20,
          exercises: [
            { name: "Alternating V-ups (or crunches)", dose: "30–40s", rest: "20s" },
            { name: "W-shape back extensions", dose: "30–40s", rest: "20s" },
            { name: "Oblique crunches (each side)", dose: "30–40s", rest: "20s" },
            { name: "Hollow hold or half-hollow", dose: "30–40s", rest: "20s" },
            { name: "Dead bugs", dose: "30–40s", rest: "20s" }
          ],
          note: "Two rounds, then use the stretch at the end of the video. Keep your lower back on the floor during holds.",
          video: {
            title: "20 Min Core Strength Workout & Stretch | No Equipment | Follow Along",
            channel: "Tom Peto Training",
            url: "https://www.youtube.com/watch?v=OAgGNYUO0WE"
          }
        },
        Thu: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "Warm-up: single-leg RDL, wrist circles, Kang squat, angel wings", dose: "40s each", rest: "flow" },
            { name: "Narrow-stance split squat (switch halfway)", dose: "40s on × 3 rounds", rest: "20s" },
            { name: "Negative (slow lower) push-ups", dose: "40s on × 3 rounds", rest: "20s" },
            { name: "Seated compression leg lifts", dose: "40s on × 3 rounds", rest: "20s" },
            { name: "Cossack / side lunges", dose: "40s on × 3 rounds", rest: "20s" }
          ],
          video: {
            title: "20 Min BEGINNER CALISTHENICS WORKOUT at Home | No Equipment",
            channel: "Tom Peto Training",
            url: "https://www.youtube.com/watch?v=kuUZYUBHryw"
          }
        },
        Fri: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "Reverse lunges (step, no hop)", dose: "45s", rest: "20s" },
            { name: "Curtsy lunge to narrow squat (no jump)", dose: "45s", rest: "20s" },
            { name: "Side lunges (each side, step — no hop)", dose: "45s", rest: "20s" },
            { name: "Push-ups (knees or wall if you prefer)", dose: "45s", rest: "20s" },
            { name: "Forearm plank (knees down if you need) — keep breathing", dose: "45s", rest: "20s" },
            { name: "Bicycle crunches (steady pace, do not hold your breath)", dose: "45s", rest: "20s" }
          ],
          video: {
            title: "20 Min Full Body Workout (No Equipment)",
            channel: "MadFit",
            url: "https://www.youtube.com/watch?v=H38ach0TmWM"
          }
        }
      }
    },
    {
      id: 2,
      name: "Build",
      goal: "Add a little more work on the same movement patterns.",
      rule: "Keep the quality from Month 1. If last week felt comfortable, add a few reps or shorten rest by a few seconds. Stay with a harder variation only when it is clean. Talk test: you should still be able to speak in short sentences. Do not hold your breath. A low-impact swap (march or step instead of any jump) is always fine.",
      lowImpact: "Low-impact swap: march or step instead of jumping or hopping. Drop to your knees for push-ups if you need to.",
      days: {
        Mon: {
          focus: "Upper body",
          mins: 20,
          exercises: [
            { name: "Push-ups (knees or toes)", dose: "3 sets × 10–12", rest: "30s" },
            { name: "Pike push-ups or pike holds", dose: "3 sets × 6–8", rest: "30s" },
            { name: "Prone Y and T raises", dose: "3 sets × 10", rest: "30s" },
            { name: "Tricep floor extensions or diamond push-ups", dose: "3 sets × 8–10", rest: "30s" },
            { name: "Plank up-downs (knees if needed)", dose: "3 sets × 6–8", rest: "30s" }
          ],
          video: {
            title: "20 Minute Weightless Arm Isolate Workout | At-home, no equipment arm toning exercises!",
            channel: "blogilates",
            url: "https://www.youtube.com/watch?v=x6eyr0wxlmk"
          }
        },
        Tue: {
          focus: "Lower body",
          mins: 20,
          exercises: [
            { name: "Squats", dose: "40s on", rest: "20s" },
            { name: "Reverse lunges", dose: "40s on", rest: "20s" },
            { name: "Glute bridges, 2-second squeeze at the top", dose: "40s on", rest: "20s" },
            { name: "Side-lying leg lifts or clams (each side)", dose: "40s on", rest: "20s" },
            { name: "Calf raises", dose: "40s on", rest: "20s" }
          ],
          video: {
            title: "20 min HIPS, LEGS & GLUTES No Equipment Workout | Toning & Shaping",
            channel: "MrandMrsMuscle",
            url: "https://www.youtube.com/watch?v=zDvAZHO4svI"
          }
        },
        Wed: {
          focus: "Core",
          mins: 20,
          exercises: [
            { name: "Reverse crunches", dose: "40s", rest: "15s" },
            { name: "Side crunches (each side)", dose: "40s", rest: "15s" },
            { name: "Single-leg V-sits (or reach crunches)", dose: "40s", rest: "15s" },
            { name: "Russian twists", dose: "40s", rest: "15s" },
            { name: "Plank with optional knee-to-elbow", dose: "40s", rest: "15s" }
          ],
          note: "The video runs two rounds. Move with control rather than speed.",
          video: {
            title: "20 MIN TOTAL CORE/AB WORKOUT (At Home No Equipment)",
            channel: "MadFit",
            url: "https://www.youtube.com/watch?v=KFcUwNl7eXo"
          }
        },
        Thu: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "Warm-up: inchworms, palm-ups, Spider-Man lunges, wipers", dose: "40s each", rest: "flow" },
            { name: "Hand-release push-ups (kneeling is fine)", dose: "40s", rest: "20s" },
            { name: "Prone Y raises", dose: "40s", rest: "20s" },
            { name: "Pike push-ups or a pike hold", dose: "40s", rest: "20s" },
            { name: "Follow the remaining no-repeat moves in the video", dose: "40s each", rest: "20s" }
          ],
          note: "This is a no-repeat session with easier options shown on screen.",
          video: {
            title: "20 Min FULL BODY CALISTHENICS WORKOUT | No Repeat | Beginner Options",
            channel: "Tom Peto Training",
            url: "https://www.youtube.com/watch?v=IUzf6gP8zRI"
          }
        },
        Fri: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "Follow the 20-minute beginner session", dose: "work to the on-screen count", rest: "as shown" },
            { name: "Use the easier rep option whenever form slips", dose: "—", rest: "—" }
          ],
          note: "This follow-along adjusts the reps as you go. Stay with the lower number if you need to.",
          video: {
            title: "Beginner Calisthenics Workout at Home (20 Minute Follow Along)",
            channel: "Kace Hollingsworth",
            url: "https://www.youtube.com/watch?v=QoK8Tk1z67o"
          }
        }
      }
    },
    {
      id: 3,
      name: "Strength",
      goal: "Move toward harder variations of the same exercises.",
      rule: "When you can do the easier variation with control, switch to the harder one for as many clean reps as you can, then drop back to finish the set. Talk test still applies if the pace feels too hard. Breathe out on the effort; do not hold your breath.",
      lowImpact: "Low-impact swap: march or step instead of jumping or hopping. Drop to your knees for push-ups, and shorten the range on lunges or squats if you need to.",
      days: {
        Mon: {
          focus: "Upper body",
          mins: 20,
          exercises: [
            { name: "Push-ups (toes if you can)", dose: "3 sets × 8–12", rest: "45s" },
            { name: "Pike push-ups", dose: "3 sets × 6–8", rest: "45s" },
            { name: "Tricep bench or floor dips (floor if you have no chair)", dose: "3 sets × 8–10", rest: "45s" },
            { name: "Prone T and W raises", dose: "3 sets × 10–12", rest: "30s" },
            { name: "Shoulder-tap plank", dose: "3 sets × 20s–30s", rest: "30s" }
          ],
          note: "The video is a follow-along chest, shoulders and triceps session. A pull-up bar is optional and not required.",
          video: {
            title: "20 Minute Chest, Shoulders, & Triceps Workout (Follow Along Home Workout)",
            channel: "Kace Hollingsworth",
            url: "https://www.youtube.com/watch?v=JFmcfKW-x5Q"
          }
        },
        Tue: {
          focus: "Lower body",
          mins: 20,
          exercises: [
            { name: "Squats or split squats", dose: "30s", rest: "giant-set pace" },
            { name: "Reverse lunges", dose: "30s", rest: "giant-set pace" },
            { name: "Glute bridges or hip thrusts", dose: "30s", rest: "giant-set pace" },
            { name: "Calf raises", dose: "30s", rest: "20s between giant sets" }
          ],
          note: "Caroline Girvan’s session is bodyweight giant sets: 30s + 30s + 30s + 30s, then 20s rest. Do both sides when a move is single-leg.",
          video: {
            title: "20 Minute Bodyweight Leg Workout | Calisthenics Giant Sets",
            channel: "Caroline Girvan",
            url: "https://www.youtube.com/watch?v=0tN8gx1_7sI"
          }
        },
        Wed: {
          focus: "Core",
          mins: 20,
          exercises: [
            { name: "Dead bugs, slow", dose: "40s", rest: "20s" },
            { name: "Hollow hold or half-hollow", dose: "30s", rest: "20s" },
            { name: "Side plank (each side, knees down if needed)", dose: "20–30s", rest: "15s" },
            { name: "Reverse crunches", dose: "40s", rest: "20s" },
            { name: "Bird dogs", dose: "40s", rest: "20s" }
          ],
          note: "This video is designed to stay friendly on the neck and lower back. If anything bothers your neck, keep your head down and shorten the range.",
          video: {
            title: "20 MIN CORE & ABS WORKOUT | Neck & Back Friendly | No equipment | Rasa Is",
            channel: "Rasa Is",
            url: "https://www.youtube.com/watch?v=uH1xkCVzFgY"
          }
        },
        Thu: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "Follow this full-body calisthenics session", dose: "40s on", rest: "20s, as shown" },
            { name: "Use the easier variation whenever you lose form", dose: "—", rest: "—" }
          ],
          video: {
            title: "20 Min FULL BODY CALISTHENICS WORKOUT | Alex Crockford x Tom Peto",
            channel: "Tom Peto Training",
            url: "https://www.youtube.com/watch?v=36gncH0KAN0"
          }
        },
        Fri: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "Low-impact bodyweight circuit", dose: "follow the video", rest: "as shown" },
            { name: "Low-impact swap: keep landings soft; march instead of jumping", dose: "use this option any time", rest: "—" }
          ],
          video: {
            title: "20-Minute Bodyweight Workout for Beginners (No Repeats)",
            channel: "nourishmovelove",
            url: "https://www.youtube.com/watch?v=C7-xW9mRNiI"
          }
        }
      }
    },
    {
      id: 4,
      name: "Conditioning",
      goal: "Keep the strength work, and add short, hard efforts.",
      rule: "Work intervals can feel harder, but rest should actually be rest. Walk, march, or skip jumps whenever you need to — the low-impact swap is always available. Use the talk test; do not hold your breath. Stop if you feel dizzy, unwell, or have chest pain.",
      lowImpact: "Low-impact swap: march or step instead of any jump or hop. Keep landings soft. You can stay with the Month 1 pace at any time.",
      days: {
        Mon: {
          focus: "Upper body",
          mins: 20,
          exercises: [
            { name: "Push-ups", dose: "40s", rest: "20s" },
            { name: "Pike push-ups or holds", dose: "40s", rest: "20s" },
            { name: "Prone Y raises", dose: "40s", rest: "20s" },
            { name: "Diamond or tricep push-ups", dose: "40s", rest: "20s" },
            { name: "Plank shoulder taps", dose: "40s", rest: "20s" }
          ],
          note: "Two to three rounds, or follow the BullyJuice session again with stricter form than Month 1.",
          video: {
            title: "20 MINUTE UPPER BODY WORKOUT(NO EQUIPMENT)",
            channel: "BullyJuice",
            url: "https://www.youtube.com/watch?v=mm47bCaCzpQ"
          }
        },
        Tue: {
          focus: "Lower body",
          mins: 20,
          exercises: [
            { name: "Squats", dose: "45s", rest: "15s" },
            { name: "Reverse lunges", dose: "45s", rest: "15s" },
            { name: "Glute bridges", dose: "45s", rest: "15s" },
            { name: "Curtsy lunges", dose: "45s", rest: "15s" },
            { name: "Calf raises", dose: "45s", rest: "15s" }
          ],
          video: {
            title: "20 MIN LEG WORKOUT - Beginner Lower Body Strength (at-home workout)",
            channel: "Megan The Trainer",
            url: "https://www.youtube.com/watch?v=x9Pv_emZyy4"
          }
        },
        Wed: {
          focus: "Core",
          mins: 20,
          exercises: [
            { name: "Reverse crunches", dose: "40s", rest: "15s" },
            { name: "Side crunches (each side)", dose: "40s", rest: "15s" },
            { name: "Dead bugs", dose: "40s", rest: "15s" },
            { name: "Hollow hold", dose: "30s", rest: "20s" },
            { name: "Plank", dose: "40s", rest: "15s" }
          ],
          video: {
            title: "20 MIN TOTAL CORE/AB WORKOUT (At Home No Equipment)",
            channel: "MadFit",
            url: "https://www.youtube.com/watch?v=KFcUwNl7eXo"
          }
        },
        Thu: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "20 moves, about 40s on / 20s rest", dose: "follow the video", rest: "20s, as shown" },
            { name: "Low-impact swap: march or step instead of any jumping move", dose: "use this option any time", rest: "—" }
          ],
          video: {
            title: "20 Moves in 20 Minutes  - Bodyweight HIIT | Joe Wicks Workouts",
            channel: "The Body Coach TV by Joe Wicks",
            url: "https://www.youtube.com/watch?v=g1aBZBV9ebM"
          }
        },
        Fri: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "Full-body bodyweight HIIT", dose: "follow the video", rest: "as shown" },
            { name: "Low-impact swap: take the quieter, no-jump variation of every move", dose: "use this option any time", rest: "—" }
          ],
          video: {
            title: "20 Minute FULL BODY HIIT Workout (Bodyweight/No Equipment)",
            channel: "Juice & Toya",
            url: "https://www.youtube.com/watch?v=owhvNm37Mv4"
          }
        }
      }
    },
    {
      id: 5,
      name: "Advanced",
      goal: "Use harder variations of moves you already know.",
      rule: "Start each set with the harder variation. When form slips, move to the easier one and finish the time. Do not rush the lowering part of a rep. Talk test: ease off if you cannot speak in short sentences. Do not hold your breath.",
      lowImpact: "Low-impact swap: march or step instead of jumping or hopping. Drop to knees for push-ups, and use a smaller range on single-leg work if you need to.",
      days: {
        Mon: {
          focus: "Upper body",
          mins: 20,
          exercises: [
            { name: "Full push-ups, slow lower", dose: "3 sets × 8–12", rest: "45s" },
            { name: "Pike push-ups", dose: "3 sets × 6–10", rest: "45s" },
            { name: "Diamond push-ups", dose: "3 sets × 6–10", rest: "45s" },
            { name: "Prone Y, T and W raises", dose: "3 sets × 8 each", rest: "30s" },
            { name: "Shoulder-tap or archer-support plank", dose: "3 × 30s", rest: "30s" }
          ],
          video: {
            title: "20 Minute Chest, Shoulders, & Triceps Workout (Follow Along Home Workout)",
            channel: "Kace Hollingsworth",
            url: "https://www.youtube.com/watch?v=JFmcfKW-x5Q"
          }
        },
        Tue: {
          focus: "Lower body",
          mins: 20,
          exercises: [
            { name: "Bodyweight squats or close-stance squats", dose: "30s", rest: "giant-set pace" },
            { name: "Reverse or walking lunges", dose: "30s", rest: "giant-set pace" },
            { name: "Single-leg glute bridges (each side if you can)", dose: "30s", rest: "giant-set pace" },
            { name: "Calf raises, pause at the top", dose: "30s", rest: "20s between giant sets" }
          ],
          video: {
            title: "20 Minute Bodyweight Leg Workout | Calisthenics Giant Sets",
            channel: "Caroline Girvan",
            url: "https://www.youtube.com/watch?v=0tN8gx1_7sI"
          }
        },
        Wed: {
          focus: "Core",
          mins: 20,
          exercises: [
            { name: "Hollow hold", dose: "3 × 20–40s", rest: "20s" },
            { name: "V-ups or tuck-ups", dose: "3 × 8–12", rest: "20s" },
            { name: "Side plank (each side)", dose: "3 × 20–30s", rest: "15s" },
            { name: "Dead bugs, long lever", dose: "3 × 8 each side", rest: "20s" }
          ],
          note: "Chris Heria’s session is a 20-minute abs follow-along from the floor. Skip any move that needs a bar or parallettes if it appears; the listed moves need none.",
          video: {
            title: "COMPLETE 20 MIN ABS WORKOUT (From Home)",
            channel: "CHRIS HERIA",
            url: "https://www.youtube.com/watch?v=8PwoytUU06g"
          }
        },
        Thu: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "Warm-up: frog-to-pike, angel wings, ankle circles, Cossack squats", dose: "40s each", rest: "flow" },
            { name: "Negative pike push-ups (5-second lower)", dose: "40s × 3 rounds", rest: "20s" },
            { name: "One-down, two-up squat (pistol regression)", dose: "40s × 3 rounds", rest: "20s" },
            { name: "Seated double-leg compressions", dose: "40s × 3 rounds", rest: "20s" },
            { name: "Reverse Nordics (small range if needed)", dose: "40s × 3 rounds", rest: "20s" },
            { name: "Hollow holds", dose: "40s × 3 rounds", rest: "20s" }
          ],
          video: {
            title: "20 Min INTERMEDIATE CALISTHENICS WORKOUT at Home | No Equipment",
            channel: "Tom Peto Training",
            url: "https://www.youtube.com/watch?v=sF_ICnyxXnw"
          }
        },
        Fri: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "Intermediate to hard no-talking calisthenics session", dose: "follow the video", rest: "as shown" },
            { name: "Drop to the easier variation as soon as form slips", dose: "—", rest: "—" }
          ],
          video: {
            title: "20-Minute PSYCHO Calisthenics Workout | Intermediate to Hard Level, No Equipment (No Talking)",
            channel: "Dynamics",
            url: "https://www.youtube.com/watch?v=gPVFZdtlcrU"
          }
        }
      }
    },
    {
      id: 6,
      name: "Peak",
      goal: "Put the harder variations together in a steady 20-minute session.",
      rule: "Treat this month as a polish: full range, steady breathing, and the harder variation only when it is clean. Talk test still applies. Do not hold your breath. Do not add extra work beyond the 20-minute session. Rest fully on Saturday and Sunday.",
      lowImpact: "Low-impact swap: march or step instead of any jump. The easier variation of each move is always acceptable.",
      days: {
        Mon: {
          focus: "Upper body",
          mins: 20,
          exercises: [
            { name: "Slow push-ups", dose: "3 sets × 10–15", rest: "45s" },
            { name: "Pike push-ups", dose: "3 sets × 8–10", rest: "45s" },
            { name: "Diamond push-ups", dose: "3 sets × 8–10", rest: "45s" },
            { name: "Prone Y, T and W raises", dose: "3 sets × 10", rest: "30s" },
            { name: "Plank shoulder taps", dose: "3 × 30s", rest: "30s" }
          ],
          video: {
            title: "20 Minute Weightless Arm Isolate Workout | At-home, no equipment arm toning exercises!",
            channel: "blogilates",
            url: "https://www.youtube.com/watch?v=x6eyr0wxlmk"
          }
        },
        Tue: {
          focus: "Lower body",
          mins: 20,
          exercises: [
            { name: "Squats or split squats, full depth you can control", dose: "40s", rest: "20s" },
            { name: "Reverse lunges", dose: "40s", rest: "20s" },
            { name: "Single-leg glute bridges", dose: "40s each side if you can", rest: "20s" },
            { name: "Cossack squats", dose: "40s", rest: "20s" },
            { name: "Calf raises, pause at the top", dose: "40s", rest: "20s" }
          ],
          video: {
            title: "20 min HIPS, LEGS & GLUTES No Equipment Workout | Toning & Shaping",
            channel: "MrandMrsMuscle",
            url: "https://www.youtube.com/watch?v=zDvAZHO4svI"
          }
        },
        Wed: {
          focus: "Core",
          mins: 20,
          exercises: [
            { name: "Hollow hold", dose: "40s", rest: "20s" },
            { name: "Alternating V-ups", dose: "40s", rest: "20s" },
            { name: "W-shape back extensions", dose: "40s", rest: "20s" },
            { name: "Oblique crunches (each side)", dose: "40s", rest: "20s" },
            { name: "Dead bugs, long lever", dose: "40s", rest: "20s" }
          ],
          video: {
            title: "20 Min Core Strength Workout & Stretch | No Equipment | Follow Along",
            channel: "Tom Peto Training",
            url: "https://www.youtube.com/watch?v=OAgGNYUO0WE"
          }
        },
        Thu: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "Intermediate calisthenics strength session", dose: "40s on × 3 rounds", rest: "20s" },
            { name: "Negative pike push-ups, one-down two-up squats, compressions, reverse Nordics, hollow holds", dose: "as in Month 5 Thursday", rest: "20s" }
          ],
          video: {
            title: "20 Min INTERMEDIATE CALISTHENICS WORKOUT at Home | No Equipment",
            channel: "Tom Peto Training",
            url: "https://www.youtube.com/watch?v=sF_ICnyxXnw"
          }
        },
        Fri: {
          focus: "Full body",
          mins: 20,
          exercises: [
            { name: "Advanced bodyweight full-body session", dose: "follow the video", rest: "as shown" },
            { name: "Use the easier variation the moment form slips", dose: "—", rest: "—" }
          ],
          video: {
            title: "20 MIN FULL BODY CALISTHENICS (Advanced) - Bodyweight Only, No Equipment",
            channel: "growingannanas",
            url: "https://www.youtube.com/watch?v=YWoZfzEs8Nc"
          }
        }
      }
    }
  ]
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const WEEKEND = ["Sat", "Sun"];


const REELS_ROUTINE = {
  id: "reels-daily",
  title: "Daily Reels Routine",
  mins: 20,
  focus: "Full body",
  subtitle: "Low-impact session built from your reels, made safe for you.",
  safety: "Breathe out on the effort and never hold your breath. Use the talk test: keep a pace where you can still speak. Stop if you feel dizzy, have chest pain, or become very short of breath. Check your blood pressure first and skip this session if it is 180/120 or higher.",
  progression: "From month 2, move the push-ups to kneeling on the floor (kneeling diamond and kneeling forearm push-ups, as in the reels). Burpees, jumping high knees, V-crunches and flip push-up combos are left out until your weight is under about 110 kg and your blood pressure is controlled, with your doctor's okay.",
  warmup: [
    { name: "Standing marches, running arms", dose: "1 min", rest: "—", cue: "March in place. Lift each knee toward your waist at a steady pace. Swing your arms as if jogging. Keep one foot on the floor at all times — do not hop or jump." },
    { name: "Standing marches, hands on hips or guard", dose: "1 min", rest: "—", cue: "Keep marching, one foot always on the floor. Hands on your hips, or fists up in a light guard. Steady pace." },
    { name: "Standing marches, arms crossed", dose: "1 min", rest: "—", cue: "Keep marching, one foot always on the floor. Cross your arms on your chest. Steady pace, no bouncing." }
  ],
  main: [
    { name: "Standing cross-body toe touches", dose: "40s × 2 rounds", rest: "20s", cue: "Stand tall. Kick one leg only as high as is comfortable, with a soft knee. Reach the opposite hand toward that foot. Alternate sides. Do not force the height." },
    { name: "Kneeling oblique twists", dose: "40s × 2 rounds", rest: "20s", cue: "Kneel tall on a cushion, core braced, hands behind your head. Slowly twist left, then right. Do not rush or yank." },
    { name: "Wall diamond push-ups", dose: "40s × 2 rounds", rest: "20s", cue: "Place your hands on the wall at chest height, thumbs and index fingers making a diamond. Lower your chest toward your hands, then push back. Keep a straight body." },
    { name: "Wall forearm (sphinx) push-ups", dose: "40s × 2 rounds", rest: "20s", cue: "Forearms on the wall, elbows under your shoulders. Push until your arms straighten, then lower slowly back to the forearms." },
    { name: "Standing cross crunches", dose: "40s × 2 rounds", rest: "20s", cue: "Stand tall. Bring your right elbow toward a raised left knee, then switch. Steady pace, one foot always grounded." },
    { name: "Seated knee tucks", dose: "40s × 2 rounds", rest: "20s", cue: "Sit on a mat or the edge of a chair. Hands on the floor or seat behind you for support. Extend your legs slightly, then pull your knees in. Use a small, comfortable range." },
    { name: "Wall or worktop push-ups", dose: "40s × 2 rounds", rest: "20s", cue: "Hands on a wall or a sturdy worktop, standard shoulder-width grip. Lower your chest toward your hands, then push back. Keep your body in a straight line." }
  ],
  cooldown: [
    { name: "Slow marching", dose: "1 min", rest: "—", cue: "March slowly in place. One foot always on the floor. Let your breathing ease." },
    { name: "Chest and arm stretch", dose: "1 min", rest: "—", cue: "Stand tall. Open your chest and stretch your arms — for example, clasp your hands behind you, or reach one arm across your chest, then switch. Breathe slowly. Do not force the stretch." },
    { name: "Deep slow breathing", dose: "1 min", rest: "—", cue: "Stand or sit still. Breathe in slowly through your nose, and breathe out slowly through your mouth. Do not hold your breath." }
  ]
};
