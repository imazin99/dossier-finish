import type { CaseRecord } from "@/types/caseRecord";

const text = (ar: string, en: string) => ({ ar, en });

/** Builds a minimal but fully-typed CaseRecord for tests, so each test
 * only needs to specify the one or two fields it actually cares about. */
export function makeTestCase(overrides: Partial<CaseRecord> & { id: string }): CaseRecord {
  return {
    number: "001",
    status: "published",
    basicInfo: {
      title: text("قضية اختبار", "Test Case"),
      shortDescription: text("وصف", "Description"),
      fullStory: text("قصة", "Story"),
      location: text("مكان", "Location"),
      time: text("وقت", "Time"),
      difficulty: "medium",
      playerCountRange: "3-8",
      durationMinutes: 45,
      discussionMinutes: 7,
      coverImage: undefined,
      category: text("فئة", "Category"),
      objectives: [],
      briefingObjective: text("هدف", "Objective"),
      warning: undefined,
    },
    victim: {
      name: text("الضحية", "Victim"),
      description: text("وصف الضحية", "Victim description"),
    },
    characters: [],
    killerCandidateIds: [],
    clues: [],
    solution: {
      killerExplanationByCandidate: {},
      innocenceExplanationByCandidate: {},
    },
    ...overrides,
  };
}
