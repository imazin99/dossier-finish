import { openDB, type IDBPDatabase } from "idb";
import type { CaseRecord } from "@/types/caseRecord";

/**
 * DOSSIER offline case cache — IndexedDB, not localStorage.
 *
 * Why IndexedDB here specifically: the published-cases payload is
 * structured, potentially large (full stories, every character's known
 * clues, all 4 clue rounds per killer candidate, both reveal texts —
 * see types/caseRecord.ts), and grows with every case the Admin
 * Dashboard publishes. localStorage is synchronous (blocks the main
 * thread on every read/write), string-only (would mean JSON.stringify
 * on every write and JSON.parse on every read of the *entire* cached
 * set), and capped at ~5MB in most browsers. IndexedDB is async,
 * stores structured objects natively, has a much higher practical
 * storage ceiling, and — importantly for the Android/Capacitor phase
 * later — is the same API a Capacitor WebView already supports natively,
 * so this layer doesn't need to change when that phase starts.
 *
 * Uses the `idb` package purely as a thin promise wrapper around the
 * native IndexedDB API (callback/event based otherwise) — no behavior
 * beyond what IndexedDB itself does.
 *
 * Deliberately NOT used for language/sound/vibration/music-volume
 * preferences — those stay in localStorage via LanguageContext /
 * SettingsContext exactly as before. This module only ever stores case
 * game data.
 */

const DB_NAME = "dossier-offline";
const DB_VERSION = 1;
const CASES_STORE = "cases";
const META_STORE = "meta";
const LAST_SYNCED_KEY = "lastSyncedAt";

interface DossierOfflineSchema {
  [CASES_STORE]: {
    key: string;
    value: CaseRecord;
  };
  [META_STORE]: {
    key: string;
    value: number;
  };
}

let dbPromise: Promise<IDBPDatabase<DossierOfflineSchema>> | null = null;

function getDb(): Promise<IDBPDatabase<DossierOfflineSchema>> {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("IndexedDB is not available in this environment."));
  }
  if (!dbPromise) {
    dbPromise = openDB<DossierOfflineSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(CASES_STORE)) {
          db.createObjectStore(CASES_STORE, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE);
        }
      },
    });
  }
  return dbPromise;
}

/** Every cached case, in whatever order IndexedDB returns them (order is
 * re-established by the caller — CasesContext doesn't rely on this). */
export async function getCachedCases(): Promise<CaseRecord[]> {
  try {
    const db = await getDb();
    return await db.getAll(CASES_STORE);
  } catch {
    // No IndexedDB support, a blocked/corrupt DB, private-browsing
    // restrictions, etc. — treat as "nothing cached" rather than
    // crashing the caller. Offline boot with zero cache and zero
    // network is a legitimate, already-handled state (see
    // CasesContext's existing error path), not a new failure mode.
    return [];
  }
}

/**
 * Replaces the ENTIRE cached set with `cases` — this is what makes sync
 * correct with zero per-case diffing: whatever the server currently
 * reports as published is, by definition, the full authoritative set.
 * A case that's been unpublished/deleted server-side simply isn't in
 * `cases` anymore and is removed from the cache in the same transaction;
 * a case with edited content is simply overwritten; a brand-new
 * published case is simply added. Never called with a partial/failed
 * fetch result — see data/caseSync.ts, which only calls this after a
 * successful network response.
 */
export async function setCachedCases(cases: CaseRecord[]): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(CASES_STORE, "readwrite");
  await tx.store.clear();
  await Promise.all(cases.map((c) => tx.store.put(c)));
  await tx.done;
}

export async function getLastSyncedAt(): Promise<number | null> {
  try {
    const db = await getDb();
    const value = await db.get(META_STORE, LAST_SYNCED_KEY);
    return typeof value === "number" ? value : null;
  } catch {
    return null;
  }
}

export async function setLastSyncedAt(timestamp: number): Promise<void> {
  const db = await getDb();
  await db.put(META_STORE, timestamp, LAST_SYNCED_KEY);
}

/** Test-only escape hatch — lets the test suite start each case from a
 * clean, known DB state without reaching into module internals. Not used
 * anywhere in application code. */
export async function __clearAllForTests(): Promise<void> {
  const db = await getDb();
  await db.clear(CASES_STORE);
  await db.clear(META_STORE);
}
