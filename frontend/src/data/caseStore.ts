import type { CaseRecord } from "@/types/caseRecord";
import { apiClient, ApiRequestError } from "./apiClient";

/**
 * DOSSIER Case Manager — API-backed store.
 *
 * MongoDB (via the Express API from Phase 1) is now the single source of
 * truth for cases. Both the Admin Dashboard (full CRUD) and the Player
 * App (read-only, published cases only — see context/CasesContext.tsx)
 * go through this file. Nothing here touches localStorage; every
 * function is a thin, always-fresh wrapper around a Phase 1 endpoint.
 *
 * All functions are now async — this is the one deliberate, necessary
 * behavior change from the localStorage-backed version of this file.
 */

// ---------------------------------------------------------------------
// Dashboard-facing CRUD — operates on the full CaseRecord list.
// ---------------------------------------------------------------------

/** Every case (draft + published) — what the Admin Dashboard list needs. */
export async function getAllCases(): Promise<CaseRecord[]> {
  return apiClient.get<CaseRecord[]>("/cases");
}

export async function getCaseById(id: string): Promise<CaseRecord | undefined> {
  try {
    return await apiClient.get<CaseRecord>(`/cases/${encodeURIComponent(id)}`);
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) return undefined;
    throw err;
  }
}

/**
 * Creates a new case or overwrites an existing one with the same id —
 * same "upsert" semantics the old localStorage version had. Phase 1
 * deliberately only exposes separate POST (create) / PUT (update)
 * endpoints, so this tries an update first and falls back to create,
 * rather than adding a new upsert endpoint.
 */
export async function saveCase(record: CaseRecord): Promise<CaseRecord> {
  try {
    return await apiClient.put<CaseRecord>(`/cases/${encodeURIComponent(record.id)}`, record);
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) {
      return apiClient.post<CaseRecord>("/cases", record);
    }
    throw err;
  }
}

export async function deleteCase(id: string): Promise<void> {
  await apiClient.delete(`/cases/${encodeURIComponent(id)}`);
}

/**
 * Duplicates a case as a new Draft with a fresh id, "(Copy)" appended to
 * both titles — identical logic to the old localStorage version, just
 * now reading the source from the API and POSTing the copy as a new
 * case, since Phase 1 doesn't have (and wasn't asked to add) a dedicated
 * duplicate endpoint.
 */
export async function duplicateCase(id: string): Promise<CaseRecord | undefined> {
  const source = await getCaseById(id);
  if (!source) return undefined;

  const newId = `${source.id}-copy-${Date.now().toString(36)}`;
  const copy: CaseRecord = {
    ...source,
    id: newId,
    status: "draft",
    basicInfo: {
      ...source.basicInfo,
      title: {
        ar: `${source.basicInfo.title.ar} (نسخة)`,
        en: `${source.basicInfo.title.en} (Copy)`,
      },
    },
    characters: source.characters.map((char) => ({ ...char, id: `${char.id}-${newId}` })),
    killerCandidateIds: source.killerCandidateIds.map((id2) => `${id2}-${newId}`),
  };

  return apiClient.post<CaseRecord>("/cases", copy);
}

export async function setCaseStatus(id: string, status: CaseRecord["status"]): Promise<CaseRecord> {
  return apiClient.patch<CaseRecord>(`/cases/${encodeURIComponent(id)}/status`, { status });
}

/** Generates the next free case id/number pair for a brand-new case. */
export async function nextCaseIdentity(): Promise<{ id: string; number: string }> {
  const cases = await getAllCases();
  const numbers = cases.map((c) => parseInt(c.number, 10)).filter((n) => !Number.isNaN(n));
  const nextNumber = (numbers.length > 0 ? Math.max(...numbers) : 0) + 1;
  return { id: `case-${Date.now().toString(36)}`, number: String(nextNumber).padStart(3, "0") };
}

// ---------------------------------------------------------------------
// Game-facing read — Published cases only, straight from the API.
// ---------------------------------------------------------------------

export async function getPublishedCaseRecords(): Promise<CaseRecord[]> {
  return apiClient.get<CaseRecord[]>("/cases?status=published");
}
