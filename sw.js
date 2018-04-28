const currentCache = 'my-first-sw-cache';

self.addEventListener('install', (event) => {
  const cachedUrls = [
    '/',
    '/js/app.js',
    '/index.html',
    '/css/main.css',
    '/data/data.json',
    '/manifest.json',
    '/img/logo/logo@48.png',
    '/img/logo/logo@192.png',
    '/img/logo/logo@512.png'
  ];
  event.waitUntil(
    caches.open(currentCache).then((cache) => {
      cache.addAll(cachedUrls);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return caches.open(currentCache)
              .then((cache) => {
                cache.put(event.request, response.clone());
                return response;
              });
          } else {
            return response;
          }
        })
        .catch((error) => {
          return new Response(
            'The requested resource is currently not available, ' +
            'please try again later', {
              status: 404,
              statusText: error.message
            });
        });
    })
  );
});