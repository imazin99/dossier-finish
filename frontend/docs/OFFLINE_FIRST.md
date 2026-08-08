# DOSSIER — Offline-First / Local Caching

## The flow

```
Backend → API → Local Cache (IndexedDB) → Game
```

```
Internet available  →  Sync  →  Update Local Cache
No internet          →  Read Local Cache  →  Continue Playing
```

On every app load, `CasesProvider` (`src/context/CasesContext.tsx`) does this,
in order:

1. **Read the local cache first, instantly, with no network call.**
   If it has anything, the player sees their cases immediately — no
   spinner, no waiting on a request that might be slow or fail.
2. **Then sync in the background.** A real `GET /api/cases?status=published`
   call is made regardless of step 1 (`src/data/caseSync.ts`).
   - **Success:** the fresh list replaces both the on-screen data and the
     IndexedDB cache (see "Why a full replace" below). This is how a
     newly-published case appears, an edited case updates, and a case that
     got unpublished disappears — all without any per-case diffing logic.
   - **Failure** (offline, DNS, Railway down, timeout — anything): the
     cache is **never touched**. Whatever was already cached (or just
     read in step 1) keeps being shown. A small non-blocking "you're
     offline" pill appears (`RootLayout.tsx`); nothing resembling the old
     hard error screen shows up unless there's truly no data at all.
3. **Recovery:** a `window` `online` event listener retries the sync
   automatically the moment the browser reports connectivity again — the
   player doesn't have to do anything, including reload the app.

The one case that still needs the network to succeed: the **very first
launch on a device that has never synced before**, with no connectivity.
There is nothing to fall back to yet — this is the same "no cache, no
network" state the app already handled before this phase (full-screen
error card with Retry).

## Why IndexedDB, not localStorage

Published-case data is structured and can be large — full bilingual
stories, every character's known-clues, all 4 clue rounds × every killer
candidate, both reveal texts, per case (see `types/caseRecord.ts`).
localStorage is synchronous (blocks the main thread), string-only (the
*entire* cached set has to be `JSON.stringify`/`parse`d on every write/read),
and capped around 5MB in most browsers. IndexedDB is async, stores
structured objects natively, and has a much higher practical ceiling.

It's also the same storage API a Capacitor WebView supports natively on
Android — this layer doesn't need to be rebuilt when that phase starts.

`src/data/offlineCache.ts` uses the `idb` package purely as a thin
promise wrapper around the native (callback/event-based) IndexedDB API —
no behavior beyond what IndexedDB itself provides.

## Why a full cache replace on every successful sync

`GET /api/cases?status=published` already returns the complete,
authoritative set of currently-published cases. Replacing the whole
cached set with it (`offlineCache.setCachedCases`) is simpler than
per-case diffing and is still exactly correct: a case missing from the
response (unpublished/deleted) is removed from the cache, an edited case
is overwritten, and a new one is added — all in one pass, one
transaction.

## Case images / audio

Handled separately, by a small service worker
(`public/sw.js` + `src/lib/registerServiceWorker.ts`), not IndexedDB —
binary assets don't belong in a structured-data cache. Strategy:
runtime cache-first with background revalidation, for same-origin GET
requests only (`/api/*` is explicitly never intercepted, so case data,
auth, and every Admin Dashboard mutation are untouched by this file).
The first time an image/script/stylesheet is requested it's cached; every
request after that — online or offline — is served from that cache
instantly, then quietly revalidated in the background when online. This
also covers the app shell (HTML/JS/CSS) itself, which is what makes
**offline boot** possible: a device that has loaded the app at least once
can reopen it with zero connectivity.

Registered production-only — never in dev, to avoid fighting Vite's dev
server/HMR.

## Failure modes, and what happens

| Situation | Behavior |
|---|---|
| First-ever launch, online | Normal load — this phase changes nothing here. |
| First-ever launch, offline | No cache, no network → the existing error/retry screen (unchanged). |
| Returning player, online, backend reachable | Cache shown instantly, then silently refreshed from the server. |
| Returning player, offline | Cache shown instantly; small "offline" pill; no error. |
| Returning player, backend reachable but errors (5xx, etc.) | Same as offline — cache is preserved and shown, sync error is not fatal. |
| Sync fails repeatedly | Cache is never cleared or corrupted by a failed sync — verified by tests (`caseSync.test.ts`). |
| Connectivity returns mid-session | Automatic resync via the `online` event, no reload needed. |
| Case images previously viewed, now offline | Served from the service worker's cache — no broken images. |
| Case images never viewed before, now offline | Not cached yet — normal browser broken-image behavior, same as any site. |

## Tests

`src/data/offlineCache.test.ts` and `src/data/caseSync.test.ts`
(Vitest + `fake-indexeddb`, run with `npm test`) cover exactly the four
required scenarios: cache write/read, a successful sync replacing stale
data (including an added case and a removed one), a failed sync
preserving the existing cache untouched, and reading the cache with zero
network calls (the "offline boot" path). See those files for the full
list of cases.

## What this phase deliberately does NOT do

- No Android/Capacitor packaging (next phase).
- No build-time asset precache manifest (Workbox-style) — the service
  worker here is a simpler runtime cache; revisit if a guaranteed-
  complete offline-on-first-launch experience is needed later.
- No UI for manually clearing the cache or forcing a sync (`refetch()`
  already exists on `useCases()` for that, just not exposed as a button
  anywhere yet).
- No change to the online architecture, the Express/Mongoose API, the
  Admin Dashboard, or authentication — all untouched.
