import { Fingerprint } from "lucide-react";
import type { CaseSummary } from "@/types/case";
import type { CharacterRole } from "@/types/role";
import type { CaseRecord, CaseCharacterRecord } from "@/types/caseRecord";
import { LEGACY_DEMO_CASES } from "./legacy/demoCases.seed";
import { LEGACY_MOCK_ROLES_BY_CASE, LEGACY_KILLER_CANDIDATES_BY_CASE } from "./legacy/mockRoles.seed";

/**
 * CaseRecord (dashboard model) -> CaseSummary (gameplay model).
 * This is the ONLY place case-record fields get mapped onto the shape
 * the game screens actually render.
 */
export function caseRecordToSummary(record: CaseRecord): CaseSummary {
  const { basicInfo } = record;
  return {
    id: record.id,
    number: record.number,
    title: basicInfo.title,
    description: basicInfo.shortDescription,
    difficulty: basicInfo.difficulty,
    minutes: basicInfo.durationMinutes,
    posterIcon: Fingerprint,
    coverImage: basicInfo.coverImage,
    locationImage: basicInfo.coverImage,
    category: basicInfo.category,
    story: basicInfo.fullStory,
    objectives: basicInfo.objectives,
    warning: basicInfo.warning,
    briefing: {
      crimeDescription: basicInfo.shortDescription,
      victim: record.victim.description,
      location: basicInfo.location,
      timeOfCrime: basicInfo.time,
      objective: basicInfo.briefingObjective,
    },
    discussionMinutes: basicInfo.discussionMinutes,
    progressiveClues: record.clues,
    solution: record.solution,
  };
}

/** CaseRecord character -> the exact shape the role-distribution/reveal system needs. */
export function caseCharacterToRole(character: CaseCharacterRecord): CharacterRole {
  return {
    id: character.id,
    characterName: character.characterName,
    occupation: character.occupation,
    relationshipToVictim: character.relationshipToVictim,
    whyAtScene: character.whyAtScene,
    whatYouKnow: character.whatYouKnow,
    secret: character.secret,
  };
}

export function caseRecordToRoles(record: CaseRecord): CharacterRole[] {
  return record.characters.map(caseCharacterToRole);
}

const emptyLocalized = { ar: "", en: "" };

/**
 * One-time migration: rebuilds the 7 hand-authored legacy cases
 * (previously split across demoCases.ts + mockRoles.ts) as CaseRecords,
 * all pre-published so the game behaves exactly as before. This is only
 * ever called by caseStore.ts to seed local storage the first time the
 * app runs after this update — it never re-runs once a case store exists.
 */
export function migrateLegacyCasesToRecords(): CaseRecord[] {
  return LEGACY_DEMO_CASES.map((legacyCase): CaseRecord => {
    const legacyRoles = LEGACY_MOCK_ROLES_BY_CASE[legacyCase.id] ?? [];
    const killerCandidateIds = LEGACY_KILLER_CANDIDATES_BY_CASE[legacyCase.id] ?? [];

    const characters: CaseCharacterRecord[] = legacyRoles.map((role) => ({
      id: role.id,
      characterName: role.characterName,
      occupation: role.occupation,
      relationshipToVictim: role.relationshipToVictim,
      whyAtScene: role.whyAtScene,
      whatYouKnow: role.whatYouKnow,
      secret: role.secret,
    }));

    return {
      id: legacyCase.id,
      number: legacyCase.number,
      status: "published",
      basicInfo: {
        title: legacyCase.title,
        shortDescription: legacyCase.description,
        fullStory: legacyCase.story,
        location: legacyCase.briefing.location,
        time: legacyCase.briefing.timeOfCrime,
        difficulty: legacyCase.difficulty,
        playerCountRange: "3-8",
        durationMinutes: legacyCase.minutes,
        discussionMinutes: legacyCase.discussionMinutes,
        coverImage: legacyCase.coverImage,
        category: legacyCase.category,
        objectives: legacyCase.objectives,
        briefingObjective: legacyCase.briefing.objective,
        warning: legacyCase.warning,
      },
      victim: {
        name: emptyLocalized, // legacy data folded the victim's name into `briefing.victim` as one paragraph
        description: legacyCase.briefing.victim,
        background: undefined,
        relevantInfo: undefined,
      },
      characters,
      killerCandidateIds,
      clues: legacyCase.progressiveClues,
      solution: legacyCase.solution,
    };
  });
}
