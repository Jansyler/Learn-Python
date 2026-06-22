// Minimal service worker so PyLingo is installable and the app shell loads
// even when offline. (The Python runtime itself is fetched from a CDN the
// first time and then cached by the browser, so the first run needs internet.)
const CACHE = 'pylingo-shell-v1';
// Relative to the service worker scope, so it works under a subpath too.
const SHELL = ['./', './index.html', './icon.svg', './manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  // Network-first for navigation so updates show up; fall back to cached shell.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('./index.html')));
    return;
  }
  // Cache-first for same-origin static assets.
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((hit) => hit || fetch(request))
    );
  }
});
