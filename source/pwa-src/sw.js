/* ARE Academy service worker: offline app shell.
   The whole app is one HTML file, so caching it makes every lesson,
   question, exam, flashcard and video lesson available offline. */
const VERSION = "are-academy-__VERSION__";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  // never cache AI, sync or API traffic
  if (/generativelanguage\.googleapis\.com|api\.github\.com|api\.groq\.com|:11434|\/v1\/(chat|models|completions)/.test(url.href)) return;
  if (url.origin === location.origin) {
    // app shell: network first (to pick up updates), fall back to cache offline
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; }).catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
  } else if (/fonts\.(googleapis|gstatic)\.com/.test(url.host)) {
    // fonts: cache first
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; }).catch(() => r)));
  }
});
