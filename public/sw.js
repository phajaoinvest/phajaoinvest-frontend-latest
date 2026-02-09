const STATIC_CACHE_NAME = "phajaoinvest-static-v1";
const DYNAMIC_CACHE_NAME = "phajaoinvest-dynamic-v1";

const PRECACHE_ASSETS = [
  "/",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/placeholder-logo.svg",
  "/placeholder-logo.png",
];

const hasCaches = typeof caches !== "undefined";

// Install: precache critical static assets
self.addEventListener("install", (event) => {
  if (!hasCaches) {
    self.skipWaiting();
    return;
  }
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  if (!hasCaches) {
    event.waitUntil(self.clients.claim());
    return;
  }
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (name) =>
                name !== STATIC_CACHE_NAME && name !== DYNAMIC_CACHE_NAME
            )
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch: routing strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // If Cache API is not available, let all requests go to network
  if (!hasCaches) return;

  // Skip cross-origin requests (except CDN)
  if (url.origin !== self.location.origin) {
    if (
      !url.hostname.includes("bunny") &&
      !url.hostname.includes("b-cdn")
    ) {
      return;
    }
  }

  // Skip Next.js HMR
  if (url.pathname.startsWith("/_next/webpack-hmr")) return;

  // Navigation requests: network-first (auth middleware must always run)
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
    return;
  }

  // Next.js static chunks: cache-first (content-hashed, immutable)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
    return;
  }

  // Static assets: cache-first
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
    return;
  }

  // API calls: network-first
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
    return;
  }

  // Default: network-first
  event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
});

function isStaticAsset(url) {
  return (
    /\.(png|jpg|jpeg|svg|gif|webp|ico|woff|woff2|ttf|eot|css|js)$/i.test(
      url.pathname
    ) && !url.pathname.startsWith("/api/")
  );
}

async function cacheFirst(request, cacheName) {
  try {
    const cached = await caches.match(request);
    if (cached) return cached;
  } catch {
    // Cache API failed, fall through to network
  }

  try {
    const response = await fetch(request);
    try {
      if (response.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, response.clone());
      }
    } catch {
      // Cache write failed, ignore
    }
    return response;
  } catch {
    return new Response("Offline", { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    try {
      if (response.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, response.clone());
      }
    } catch {
      // Cache write failed, ignore
    }
    return response;
  } catch {
    try {
      const cached = await caches.match(request);
      if (cached) return cached;
      if (request.mode === "navigate") {
        const fallback = await caches.match("/");
        if (fallback) return fallback;
      }
    } catch {
      // Cache read failed, ignore
    }
    return new Response("Offline", { status: 503 });
  }
}
