import type { CaseRecord } from "@/types/caseRecord";
import { apiClient } from "@/data/apiClient";
import { getCachedCases, setCachedCases, getLastSyncedAt, setLastSyncedAt } from "@/data/offlineCache";

export type CaseDataSource = "network" | "cache";

export interface SyncOutcome {
  cases: CaseRecord[];
  /** Where `cases` actually came from for this call. */
  source: CaseDataSource;
  /** Timestamp of the most recent successful sync, if any (even if THIS call fell back to cache). */
  lastSyncedAt: number | null;
  /** Set only when the network fetch failed AND there was cached data to fall back to —
   * i.e. "sync failed, but you're still looking at valid (possibly stale) data". */
  syncError: string | null;
}

/**
 * The full offline-first flow in one function:
 *
 *   1. Try the network first (GET /api/cases?status=published).
 *   2. On success: overwrite the local cache with the fresh set (see
 *      offlineCache.setCachedCases for why a full replace is correct
 *      here), record the sync time, return it with source: "network".
 *   3. On failure (offline, DNS, backend down, timeout — anything):
 *      NEVER touch the existing cache. Read whatever's already cached
 *      and return it with source: "cache" and a populated syncError.
 *
 * `fetchPublishedCases` is injectable purely for testing — real callers
 * never need to pass it; it defaults to the real API call.
 */
export async function syncPublishedCases(
  fetchPublishedCases: () => Promise<CaseRecord[]> = () => apiClient.get<CaseRecord[]>("/cases?status=published")
): Promise<SyncOutcome> {
  try {
    const fresh = await fetchPublishedCases();
    const syncedAt = Date.now();
    await setCachedCases(fresh);
    await setLastSyncedAt(syncedAt);
    return { cases: fresh, source: "network", lastSyncedAt: syncedAt, syncError: null };
  } catch (err) {
    const cached = await getCachedCases();
    const lastSyncedAt = await getLastSyncedAt();
    return {
      cases: cached,
      source: "cache",
      lastSyncedAt,
      syncError: err instanceof Error ? err.message : "Sync failed.",
    };
  }
}

/**
 * Cache-only read, no network call at all — used for the very first
 * paint so the UI can show previously-downloaded cases instantly instead
 * of waiting on a request that might time out (slow/absent connection).
 * CasesContext calls this first, then calls syncPublishedCases() right
 * after to reconcile with the server in the background.
 */
export async function readCachedCasesOnly(): Promise<CaseRecord[]> {
  return getCachedCases();
}
