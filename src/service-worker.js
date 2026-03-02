const CACHE_NAME = 'cache-media-v2'; // Cambiamos la versión para forzar la actualización

// Solo cacheamos lo esencial para que la app arranque (App Shell)
const PRECACHE_URLS = [
  '/css/style.css',
  '/src/index.js',
  '/src/listaTrabajos.json',
  '/src/publicidadTrabajos.json',
];

self.addEventListener('install', (event) => {
  // Fuerza al SW a activarse inmediatamente
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
});

self.addEventListener('activate', (event) => {
  // Limpieza de cachés antiguas
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // ESTRATEGIA PARA VIDEOS: Network Only
  // Excluimos los videos del SW para evitar problemas con Range Headers (status 206)
  if (url.pathname.endsWith('.webm') || url.pathname.endsWith('.mp4')) {
    return; // El navegador maneja la solicitud directamente
  }

  // ESTRATEGIA PARA EL RESTO: Cache First, falling back to Network
  // (Imágenes, JSON, CSS, JS)
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si está en caché, lo devolvemos
      if (response) {
        return response;
      }

      // Si no, hacemos la petición a la red
      return fetch(event.request).then((networkResponse) => {
        // Verificamos que la respuesta sea válida (status 200) y de tipo basic (mismo origen)
        // Si usas recursos externos (CORS), podrías necesitar ajustar la validación
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== 'basic'
        ) {
          return networkResponse;
        }

        // Clonamos la respuesta porque el stream solo se puede consumir una vez
        const responseToCache = networkResponse.clone();

        // Guardamos en caché para la próxima vez
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    }),
  );
});
