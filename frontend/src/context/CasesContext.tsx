import { createContext, useContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { CaseSummary } from "@/types/case";
import type { CharacterRole } from "@/types/role";
import type { CaseRecord } from "@/types/caseRecord";
import { caseRecordToSummary, caseRecordToRoles } from "@/data/caseAdapters";
import { syncPublishedCases, readCachedCasesOnly, type CaseDataSource } from "@/data/caseSync";

interface CasesContextValue {
  /** Published cases, in the shape the game screens already render. */
  caseSummaries: CaseSummary[];
  /** Published cases' characters, keyed by case id — same shape RoleDistributionLayout already expects. */
  rolesByCase: Record<string, CharacterRole[]>;
  /** Killer candidate ids per case — unchanged input to the existing random killer selection. */
  killerCandidatesByCase: Record<string, string[]>;
  /** True only on the very first load, before EITHER the cache or the network has answered. */
  isLoading: boolean;
  /** Set only when there is truly nothing to show — no network AND no
   * usable cache (e.g. first-ever launch, fully offline). Once any data
   * has ever loaded successfully, later sync failures do NOT populate
   * this — see `isOffline` instead. */
  error: string | null;
  /** True when the most recent sync attempt failed but cached cases are
   * still being served — "you're offline/unreachable, showing saved
   * data" rather than a hard error. Screens aren't required to show
   * anything for this; it's here for optional, non-intrusive UI. */
  isOffline: boolean;
  /** Where the currently-shown data most recently came from. */
  source: CaseDataSource | null;
  refetch: () => void;
}

const CasesContext = createContext<CasesContextValue | undefined>(undefined);

/**
 * Offline-first published-cases provider. Flow, per the implementation
 * note (docs/OFFLINE_FIRST.md):
 *
 *   Backend -> API -> Local Cache (IndexedDB) -> Game
 *   Internet available -> sync -> update local cache
 *   No internet -> read local cache -> keep playing
 *
 * On mount: read whatever's already cached (IndexedDB, instant, no
 * network) and show it immediately if present, THEN attempt a real sync
 * in the background to reconcile with the server. A cold start with no
 * cache yet still waits on that first network call, same as before this
 * phase — there's nothing to show offline-first on a device that has
 * never successfully synced.
 *
 * Also listens for the browser's `online` event to retry a sync
 * automatically the moment connectivity returns, without the player
 * needing to do anything.
 *
 * Mounted once in App.tsx, same as LanguageProvider/SettingsProvider —
 * every game screen reads from this context instead of touching the
 * cache or the API itself.
 */
export function CasesProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<CaseRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [source, setSource] = useState<CaseDataSource | null>(null);
  const hasLoadedOnce = useRef(false);

  const sync = useCallback(async () => {
    const result = await syncPublishedCases();
    hasLoadedOnce.current = true;

    if (result.cases.length > 0) {
      setRecords(result.cases);
      setSource(result.source);
      setIsOffline(result.source === "cache" && result.syncError !== null);
      setError(null);
    } else if (result.syncError) {
      // Nothing cached AND the network call failed — genuinely nothing
      // to show. Same user-facing state as before this phase.
      setError(result.syncError);
    } else {
      // Network succeeded but returned zero published cases — not an
      // error, just an empty archive.
      setRecords([]);
      setSource(result.source);
      setIsOffline(false);
      setError(null);
    }
    setIsLoading(false);
  }, []);

  // Initial load: paint from cache instantly if we have it, then
  // reconcile with the server. Skips the loading spinner entirely when a
  // previous session already synced successfully.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cached = await readCachedCasesOnly();
      if (!cancelled && cached.length > 0) {
        setRecords(cached);
        setSource("cache");
        setIsLoading(false);
      }
      if (!cancelled) {
        await sync();
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Offline -> online recovery: the moment the browser reports
  // connectivity again, retry a sync automatically.
  useEffect(() => {
    const handleOnline = () => {
      if (hasLoadedOnce.current) sync();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [sync]);

  const value = useMemo<CasesContextValue>(() => {
    const rolesByCase: Record<string, CharacterRole[]> = {};
    const killerCandidatesByCase: Record<string, string[]> = {};
    for (const record of records) {
      rolesByCase[record.id] = caseRecordToRoles(record);
      killerCandidatesByCase[record.id] = record.killerCandidateIds;
    }
    return {
      caseSummaries: records.map(caseRecordToSummary),
      rolesByCase,
      killerCandidatesByCase,
      isLoading,
      error,
      isOffline,
      source,
      refetch: sync,
    };
  }, [records, isLoading, error, isOffline, source, sync]);

  return <CasesContext.Provider value={value}>{children}</CasesContext.Provider>;
}

export function useCases(): CasesContextValue {
  const ctx = useContext(CasesContext);
  if (!ctx) throw new Error("useCases must be used within a CasesProvider");
  return ctx;
}
