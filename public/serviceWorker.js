const CACHE_NAME = 'capacitor-pwa-app-v1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install service worker

self.addEventListener('install', (event) => {
  // Install service worker as the first step to be able to cache data
  // Register URLs that should be cached in browser's Cache Storage
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }),
  );
});

// Listen to requests
self.addEventListener('fetch', (event) => {
  // Try to find match for event request in cache
  // If network error occures, fallback to offline html
  event.respondWith(
    caches.match(event.request)
      .then(() => {
        return fetch(event.request).catch(() => {
          console.log('Returning offline html file');
          caches.match('offline.html');
        });
      }),
  );
});

// Activate service worker
self.addEventListener('activate', (event) => {
  const cacheList = [CACHE_NAME];

  // Delete all previous versions and keep only the cache version we need
  event.waitUntil(
    caches.keys()
      .then((cacheKeys) => Promise.all(
        cacheKeys.map((c) => {
          if (!cacheList.includes(c)) {
            return caches.delete(c);
          }
        }),
      )),
  );
});
