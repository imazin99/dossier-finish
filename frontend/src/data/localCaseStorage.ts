import type { CaseRecord } from "@/types/caseRecord";
import { migrateLegacyCasesToRecords } from "./caseAdapters";

/**
 * Phase 2 note: MongoDB/the API is now the source of truth for cases
 * (see data/caseStore.ts). This file is what data/caseStore.ts used to
 * be — the old localStorage-backed store — kept ONLY as a read source for
 * the one-time migration utility (data/caseMigration.ts) that copies
 * whatever's sitting in a browser's localStorage up to the server.
 *
 * Nothing here writes new data or is called from gameplay/admin screens.
 * Existing localStorage data is deliberately left untouched — this phase
 * does not clear it.
 */

const STORAGE_KEY = "dossier.cases.v1";

function readRaw(): CaseRecord[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed as CaseRecord[];
  } catch {
    return null;
  }
}

/**
 * Returns whatever cases are in this browser's localStorage. If none are
 * there yet (a browser that never ran the pre-API version of the app),
 * falls back to the same legacy migration used historically — this keeps
 * the function total/predictable, but does NOT write anything back to
 * localStorage; it's purely a read.
 */
export function getLocalCases(): CaseRecord[] {
  return readRaw() ?? migrateLegacyCasesToRecords();
}
