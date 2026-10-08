const CACHE_NAME = 'kasir-rsba-v2';
const urlsToCache = [
  './',
  './rekap-rsba.html',
  './hitung-sharing.html',
  './manifest.json'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch dari Cache kalau offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan file offline
        }
        return fetch(event.request); // Ambil dari internet kalau ada
      })
  );
});
