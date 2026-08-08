import type { CaseRecord } from "@/types/caseRecord";
import { nextCaseIdentity } from "./caseStore";

const empty = { ar: "", en: "" };

export async function createBlankCase(): Promise<CaseRecord> {
  const { id, number } = await nextCaseIdentity();
  return {
    id,
    number,
    status: "draft",
    basicInfo: {
      title: { ...empty },
      shortDescription: { ...empty },
      fullStory: { ...empty },
      location: { ...empty },
      time: { ...empty },
      difficulty: "medium",
      playerCountRange: "3-8",
      durationMinutes: 45,
      discussionMinutes: 7,
      coverImage: undefined,
      category: { ...empty },
      objectives: [],
      briefingObjective: { ...empty },
      warning: undefined,
    },
    victim: {
      name: { ...empty },
      description: { ...empty },
      background: undefined,
      relevantInfo: undefined,
    },
    characters: [],
    killerCandidateIds: [],
    clues: [
      { id: `${id}-clue-01`, order: 1, type: "neutral", textByKiller: {} },
      { id: `${id}-clue-02`, order: 2, type: "suspicious", textByKiller: {} },
      { id: `${id}-clue-03`, order: 3, type: "eliminating", textByKiller: {} },
      { id: `${id}-clue-04`, order: 4, type: "finalDeduction", textByKiller: {} },
    ],
    solution: {
      killerExplanationByCandidate: {},
      innocenceExplanationByCandidate: {},
    },
  };
}

export function createBlankCharacterId(caseId: string, existingCount: number): string {
  return `${caseId}-role-${String(existingCount + 1).padStart(2, "0")}`;
}
