const CACHE_NAME = 'supermercado-rpg-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  'https://i.ibb.co/wZjkdpHX/Photoroom-20250919-104355-4.png',
  'https://i.ibb.co/C5P8VdG5/Photoroom-20250919-104355-1.png',
  'https://i.ibb.co/DHk739Hf/Photoroom-20250919-104355-3.png',
  'https://i.ibb.co/LDQs25ty/Photoroom-20250919-104355-2.png',
  'https://i.ibb.co/XxZtrwQn/Photoroom-20250920-141511-2.png',
  'https://i.ibb.co/ZzzVNLQ2/Photoroom-20250920-141511-1.png',
  'https://i.ibb.co/m5MbkMxJ/Photoroom-20250920-141511-3.png',
  'https://z-cdn-media.chatglm.cn/files/09a8cb5b-7c5f-4271-9e63-d6a5ee11060c_Generated%20Image%20October%2007%2C%202025%20-%202_24PM.png?auth_key=1791394823-a9c6ef47457e4dd7ab8fc0203e5d69b9-0-9ddd8f0fbd325a699003feaba6577922',
  'https://z-cdn-media.chatglm.cn/files/4ded9ec1-8d87-446f-8bd0-bf4b80c95cc2_IMG_20251007_143331.png?auth_key=1791394823-e147468b14fc4330b1298f250a6fafbc-0-b207c0afc4bf6007a0f23ef00e419fae',
  'https://z-cdn-media.chatglm.cn/files/466b0d09-f98d-4b6b-801e-f7d0d571f22a_IMG_20251007_143216.png?auth_key=1791394823-095936b543384290abf15ef33a2821c9-0-bce4afda889830b9db194c832bf2c20b'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        const cachePromises = urlsToCache.map(urlToCache => {
            return cache.add(urlToCache).catch(err => {
                console.warn(`Failed to cache ${urlToCache}:`, err);
            });
        });
        return Promise.all(cachePromises);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
            // Return a fallback or an offline message if fetch fails
            console.warn(`Fetch failed for: ${event.request.url}`);
        });
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
