/**
 * Registers public/sw.js, which caches the app shell and static assets
 * (images, sounds, music) for offline use — see that file for the full
 * strategy. Deliberately a no-op:
 *   - in development (`import.meta.env.DEV`) — a caching service worker
 *     fighting Vite's dev server / HMR is a well-known footgun;
 *   - in any environment without service worker support (e.g. this
 *     never breaks the app on a browser that lacks it — it's a pure
 *     progressive enhancement, not a requirement to run).
 * Registration failures (unsupported, blocked, etc.) are swallowed for
 * the same reason: the app must work identically whether or not this
 * succeeds, per the offline-first requirement that a missing/failed
 * caching layer never breaks normal gameplay.
 */
export function registerServiceWorker(): void {
  if (import.meta.env.DEV) return;
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // No-op — see doc comment above.
    });
  });
}
