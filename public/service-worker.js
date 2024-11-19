const CACHE_NAME = 'pwa-cache-v1';
const OFFLINE_URL = '/offline.html';

// Step 1: Install Event - Cache Offline Fallback Page
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching offline fallback page');
      return cache.addAll([OFFLINE_URL]);
    })
  );
});

// Step 2: Activate Event - Clean Up Old Caches (Optional but Recommended)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Step 3: Fetch Event - Serve Offline Fallback When Network Fails
self.addEventListener('fetch', (event) => {
  // Only handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
  }
});
