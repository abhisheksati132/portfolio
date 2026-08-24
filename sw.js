/**
 * Portfolio Service Worker
 * Offline-first caching: precache shell, stale-while-revalidate assets,
 * network-first navigations with offline fallbacks.
 */
const VERSION = 'v3';
const CACHE_NAME = `portfolio-${VERSION}`;

const PRECACHE = [
  '/',
  '/index.html',
  '/404.html',
  '/styles.css?v=20260824',
  '/script.js?v=20260824',
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
        } catch (err) {
          return cached;
        }
      })
    );
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first, fall back to cache, then 404 page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/404.html'))
        )
    );
    return;
  }

  // Static assets: stale-while-revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
