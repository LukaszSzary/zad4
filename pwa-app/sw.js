

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            return cache.addAll([
                '/pwa-app',
                '/pwa-app/index.html',
                '/pwa-app/style.css',
                '/pwa-app/subpages/favourite.html',
                '/pwa-app/subpages/search.html',
                '/pwa-app/scripts/script.js',
                '/pwa-app/scripts/db-script.js',
                '/pwa-app/scripts/favourites-script.js',
                '/pwa-app/scripts/search-script.js'
            ]).catch(function(error) {
                    console.error('Error :', error);
                });
        })
    );
  console.log("Service Worker installed.");
});

self.addEventListener("activate", event => {
  console.log("Service Worker activated.");
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {

            return response || fetch(event.request);

        })
    );
});