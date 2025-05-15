

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            return cache.addAll([
                './',
                './index.html',
                './style.css',
                './subpages/favourite.html',
                './subpages/search.html',
                './scripts/db-script.js',
                './scripts/favourites-script.js',
                './scripts/search-script.js'
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