const CACHE_NAME = 'curry-posts-v1';
const urlsToCache = [
  '/',
  '/admin',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// インストール時
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// フェッチ時
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにあればそれを返す
        if (response) {
          return response;
        }

        // APIリクエストはキャッシュしない
        if (event.request.url.includes('/api/')) {
          return fetch(event.request);
        }

        // その他のリクエストはネットワークから取得
        return fetch(event.request);
      })
  );
});

// アップデート時
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});