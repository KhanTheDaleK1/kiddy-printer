// Kiddy3D Service Worker - Offline Caching for iPad PWA
const CACHE_NAME = 'kiddy3d-v10.0';

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Let external webcam streams or video streams pass through directly without caching
  const url = new URL(event.request.url);
  if (url.protocol.startsWith('http') && (
      url.pathname.includes('/webcam') || 
      url.pathname.includes('/nozzle') || 
      url.pathname.includes('/stream') || 
      url.pathname.includes('/video') ||
      url.hostname.includes('youtube') ||
      url.hostname.includes('youtu.be')
  )) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache external static assets (like fonts) dynamically if successful
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          (event.request.url.includes('fonts.googleapis.com') ||
           event.request.url.includes('fonts.gstatic.com'))
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for HTML documents
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
