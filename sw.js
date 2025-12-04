const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  './',
  './index.html',
  './Portfolio.html',
  './profile-photo.png',
  './profile-photo-240w.png',
  './profile-photo-360w.png',
  './profile-photo-480w.png',
  './profile-photo-600w.png',
  './case-study-forensics.png',
  './case-study-forensics-320w.png',
  './case-study-forensics-480w.png',
  './case-study-forensics-640w.png',
  './osint-framework.png',
  './osint-framework-320w.png',
  './osint-framework-480w.png',
  './osint-framework-640w.png',
  './3d-logo-thumbnail.png',
  './3d-logo-thumbnail-320w.png',
  './3d-logo-thumbnail-480w.png',
  './3d-logo-thumbnail-640w.png',
  './portfolio.mp4',
  './portfolio.webm',
  './cv.pdf',
  './manifest.json',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://unpkg.com/tsparticles-confetti@2.12.0/tsparticles.confetti.bundle.min.js',
  'https://cdn.emailjs.com/dist/email.min.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(() => console.log(`Failed to cache: ${url}`))
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if available
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Return a fallback response if offline
        return new Response('Offline - content not available', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});
