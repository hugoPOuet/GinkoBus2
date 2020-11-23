var cacheName = "ginko-v1";
var contentToCache = [
    './index;html',
    './js13kpwa.webmanifest',
    './style.css',
    './app.js',
    './icons/favicon.ico',
    './icons/icon-32.png',
    './icons/icon-64.png',
    './icons/icon-96.png',
    './icons/icon-128.png',
    './icons/icon-168.png',
    './icons/icon-180.png',
    './icons/icon-192.png',
    './icons/icon-256.png',
    './icons/icon-512.png',
    './icons/maskable_icon.png',
];
var icons=["32","64","96","128","168","180","192","256","512"];


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


self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.open(cacheName).then(function (cache) {
        return cache.match(event.request).then(function (response) {
          return (
            response ||
            fetch(event.request).then(function (response) {
              cache.put(event.request, response.clone());
              return response;
            })
          );
        });
      }),
    );
  });