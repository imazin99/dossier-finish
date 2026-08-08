import type { CaseRecord } from "@/types/caseRecord";
import { apiClient, ApiRequestError } from "./apiClient";
import { getLocalCases } from "./localCaseStorage";

export interface ImportSummary {
  created: string[];
  skipped: string[];
  failed: { id: string; error: string }[];
}

/**
 * TEMPORARY migration tool for the localStorage -> MongoDB transition.
 *
 * Reads whatever cases currently exist in this browser's localStorage
 * (data/localCaseStorage.ts) and copies each one to the server — but only
 * if the server doesn't already have a case with that `id`. This makes it
 * safe to click more than once, on more than one device: cases already on
 * the server are always skipped, never overwritten, and nothing is ever
 * deleted from localStorage as part of running this.
 *
 * Not wired into any automatic flow — the Admin Dashboard exposes this as
 * an explicit, manually-triggered action.
 */
export async function importLocalCasesToServer(): Promise<ImportSummary> {
  const localCases = getLocalCases();
  const summary: ImportSummary = { created: [], skipped: [], failed: [] };

  for (const record of localCases) {
    try {
      const existsOnServer = await caseExistsOnServer(record.id);
      if (existsOnServer) {
        summary.skipped.push(record.id);
        continue;
      }
      await apiClient.post<CaseRecord>("/cases", record);
      summary.created.push(record.id);
    } catch (err) {
      summary.failed.push({
        id: record.id,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return summary;
}

async function caseExistsOnServer(id: string): Promise<boolean> {
  try {
    await apiClient.get<CaseRecord>(`/cases/${encodeURIComponent(id)}`);
    return true;
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) return false;
    throw err;
  }
}
