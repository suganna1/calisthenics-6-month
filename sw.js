const CACHE = "calisthenics-6mo-v7";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./program.js",
  "./clips.js",
  "./diet.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-192-maskable.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./clips/back-extension.mp4",
  "./clips/bicycle-crunch.mp4",
  "./clips/calf-raise.mp4",
  "./clips/curtsy-lunge.mp4",
  "./clips/dead-bug.mp4",
  "./clips/glute-bridge.mp4",
  "./clips/hollow-hold.mp4",
  "./clips/pike-push-up.mp4",
  "./clips/plank.mp4",
  "./clips/push-up.mp4",
  "./clips/reverse-lunge.mp4",
  "./clips/russian-twist.mp4",
  "./clips/shoulder-taps.mp4",
  "./clips/side-lunge.mp4",
  "./clips/side-plank.mp4",
  "./clips/split-squat.mp4",
  "./clips/squat.mp4",
  "./clips/v-up.mp4",
  "./clips/y-raise.mp4",
  "./clips/march-running-arms.mp4",
  "./clips/march-guard.mp4",
  "./clips/march-crossed.mp4",
  "./clips/toe-touch.mp4",
  "./clips/kneeling-twist.mp4",
  "./clips/wall-diamond.mp4",
  "./clips/wall-sphinx.mp4",
  "./clips/cross-crunch.mp4",
  "./clips/seated-tuck.mp4",
  "./clips/wall-push-up.mp4",
  "./clips/chest-stretch.mp4",
  "./clips/breathing.mp4",
  "./cues/march-running-arms.jpg",
  "./cues/march-guard.jpg",
  "./cues/march-crossed.jpg",
  "./cues/toe-touch.jpg",
  "./cues/kneeling-twist.jpg",
  "./cues/wall-diamond.jpg",
  "./cues/wall-sphinx.jpg",
  "./cues/cross-crunch.jpg",
  "./cues/seated-tuck.jpg",
  "./cues/wall-push-up.jpg",
  "./cues/chest-stretch.jpg",
  "./cues/breathing.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          }
          return res;
        })
        .catch(() => cached || caches.match("./index.html"));
      return cached || fetched;
    })
  );
});
