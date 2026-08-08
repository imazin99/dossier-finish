/**
 * DOSSIER service worker — asset/app-shell runtime cache.
 *
 * SCOPE, DELIBERATELY NARROW:
 * This worker never intercepts `/api/*` requests — case data, auth, and
 * every Admin Dashboard mutation always go straight to the network,
 * completely untouched by this file. Structured case data has its own
 * offline story (IndexedDB, src/data/offlineCache.ts + caseSync.ts);
 * this worker is ONLY responsible for making previously-seen images,
 * audio, and the app shell itself (HTML/JS/CSS) available with no
 * network at all.
 *
 * STRATEGY: runtime cache-first, not build-time precache.
 * A precache manifest (e.g. Workbox) needs to know every hashed
 * filename Vite's production build produces, generated at build time.
 * This worker takes the simpler, still-correct route: cache whatever
 * gets requested, the first time it's requested, then serve from cache
 * on every later request (revalidating in the background when online).
 * This means "offline boot" and "images survive offline" both work for
 * anything the player has already visited/seen while online — exactly
 * the "previously downloaded" behavior asked for — without the app
 * needing to know its own build output ahead of time.
 *
 * Registered only in production (see src/lib/registerServiceWorker.ts) —
 * intentionally never in dev, so it can't interfere with Vite's dev
 * server or HMR.
 */

const CACHE_NAME = "dossier-assets-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only GET requests are cacheable; POST/PUT/PATCH/DELETE (every
  // mutation, including all Admin Dashboard actions) must always hit the
  // network and are never intercepted here.
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Same-origin only — never intercept the backend API (a different
  // origin in production; see .env's VITE_API_BASE_URL) or any other
  // third-party request.
  if (url.origin !== self.location.origin) return;

  // Never intercept API calls even if the app is ever configured to
  // call a same-origin "/api" path (e.g. behind a platform rewrite).
  if (url.pathname.startsWith("/api/")) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);

      if (cached) {
        // Cache-first: instant, works offline. Revalidate in the
        // background so the cache stays fresh on the NEXT load when
        // online, without making this load wait on the network.
        fetch(request)
          .then((response) => {
            if (response.ok) cache.put(request, response.clone());
          })
          .catch(() => {
            // Offline — the cached response above is what the player sees; nothing else to do.
          });
        return cached;
      }

      try {
        const response = await fetch(request);
        if (response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      } catch (err) {
        // Not cached yet AND offline — nothing this worker can do; let
        // it fail naturally (browser shows its normal offline/broken-
        // image handling for that one request) rather than masking it.
        throw err;
      }
    })
  );
});
