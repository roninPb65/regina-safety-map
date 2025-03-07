self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open('v1');
        await cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/scripts.js',
          '/Saskatchewan-Provincial-Legislative-Building-in-Wascana-Centre.jpg'
        ]);
        console.log('Assets cached successfully!');
      } catch (err) {
        console.error('Failed to cache resources:', err);
      }
    })()
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['v1'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return the cached response if it exists
      }

      return fetch(event.request).catch(() => {
        return caches.match('/fallback.html'); // Fallback if the network fails
      });
    })
  );
});
