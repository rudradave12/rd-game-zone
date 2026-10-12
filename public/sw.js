const CACHE_NAME = "rd-game-zone-static-v3";
const CACHEABLE_DESTINATIONS = new Set(["style", "script", "image", "font"]);

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
      self.clients.claim(),
    ]),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // HTML routes always come from the network. This avoids an older build
  // being pinned in a browser cache after a Cloudflare deployment.
  if (
    request.method !== "GET" ||
    request.mode === "navigate" ||
    url.origin !== self.location.origin ||
    !CACHEABLE_DESTINATIONS.has(request.destination)
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.type !== "opaque") {
          void caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then(
          (cached) => cached || new Response("Offline", { status: 503, statusText: "Offline" }),
        ),
      ),
  );
});
