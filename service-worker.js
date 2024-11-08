const cacheName = "Snake Game";
const preCache = ["/"];

self.addEventListener("install", (e) => {
  console.log("Service Worker installed");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(preCache);
    })()
  );
});

self.addEventListener("activate", () => {
  console.log("Service Worker ready");
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);
      const resCache = await cache.match(e.request);
      if (resCache) return resCache;

      try {
        const res = await fetch(e.request);
        cache.put(e.request, res.clone());
        return res;
      } catch (error) {
        console.log(error);
      }
    })()
  );
});
