self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('regina-safety-map').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        'Saskatchewan-Provincial-Legislative-Building-in-Wascana-Centre.jpg',
        'Saskatchewan-Provincial-Legislative-Building-in-Wascana-Centre.jpg',
        // Add any other assets you want to cache
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
