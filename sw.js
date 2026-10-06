/**
 * Portfolio Service Worker
 * Offline-first caching: precache shell, stale-while-revalidate assets,
 * network-first navigations with offline fallbacks.
 */
const VERSION = 'v4';
const CACHE_NAME = `portfolio-${VERSION}`;

const PRECACHE = [
  '/',
  '/index.html',
  '/404.html',
  '/styles.css?v=20261006',
  '/script.js?v=20261006',
  '/manifest.webmanifest',
  '/robots.txt',
  '/sitemap.xml',
  '/assets/Abhishek_Sati_Resume.pdf',
  '/assets/apple-touch-icon.png',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/news_atlas.webp',
  '/assets/news_atlas.jpg',
  '/assets/klipport.webp',
  '/assets/klipport.jpg',
  '/assets/whispr.webp',
  '/assets/whispr.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Google Fonts: cache-first (opaque responses), so the site works offline
  if (/^https:\/\/fonts\.(googleapis|gstatic)\.com/.test(request.url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await caches.match(request);
        if (cached) return cached;
        try {
          const response = await fetch(request);
          if (response && (response.ok || response.type === 'opaque')) {
            cache.put(request, response.clone());
          }
          return response;
        } catch (e) {
          return cached || Response.error();
        }
      })
    );
    return;
  }

  // Precached static shell
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          if (request.mode === 'navigate') {
            return caches.match('/404.html');
          }
          return Response.error();
        });
    })
  );
});
