var cacheName = "ginko-v1";
var contentToCache = [];
var icons=["32","64","96","128","168","180","192","256","512"];

for(var i=0; i<icons.length; i++){
    contentToCache.push('/icons/icon-'+icons[i]+'.png');
}

contentToCache.push('index.html');
contentToCache.push('app.js');

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(contentToCache);
      })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then((response) => {
                  return caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response || fetchPromise;
          });
        });
      })
    );
  });