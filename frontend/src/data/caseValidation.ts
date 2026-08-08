import type { CaseRecord } from "@/types/caseRecord";
import type { LocalizedText } from "@/types/localized";

function isEmpty(text: LocalizedText | undefined): boolean {
  return !text || !text.ar.trim() || !text.en.trim();
}

export interface ValidationResult {
  /** Must be fixed before the case can be Published. */
  errors: string[];
  /** Won't block publishing, but the case will look/feel incomplete. */
  warnings: string[];
}

/**
 * Checks a CaseRecord against what the game actually needs to run a
 * session end-to-end without breaking (missing killer-candidate clue
 * text, no killer candidates, too few characters for the 3-8 player
 * range, etc). Used to gate the Publish action and to show the case
 * writer a clear checklist of what's missing.
 */
export function validateForPublish(record: CaseRecord): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { basicInfo, victim, characters, killerCandidateIds, clues, solution } = record;

  if (isEmpty(basicInfo.title)) errors.push("Basic Info: title (Arabic + English) is required.");
  if (isEmpty(basicInfo.shortDescription)) errors.push("Basic Info: short description is required.");
  if (isEmpty(basicInfo.fullStory)) errors.push("Basic Info: full story is required.");
  if (isEmpty(basicInfo.location)) errors.push("Basic Info: location is required.");
  if (isEmpty(basicInfo.time)) errors.push("Basic Info: time of crime is required.");
  if (isEmpty(basicInfo.category)) errors.push("Basic Info: category is required.");
  if (isEmpty(basicInfo.briefingObjective)) errors.push("Basic Info: briefing objective is required.");
  if (!basicInfo.coverImage) warnings.push("Basic Info: no cover image set — a placeholder icon will show instead.");
  if (basicInfo.objectives.length === 0) warnings.push("Basic Info: no \"Your Mission\" checklist items added.");

  if (isEmpty(victim.name)) errors.push("Victim: name is required.");
  if (isEmpty(victim.description)) errors.push("Victim: description is required.");
  if (!victim.background) warnings.push("Victim: no background provided.");

  if (characters.length < 3) errors.push("Characters: at least 3 characters are required (the game supports 3-8 players).");
  characters.forEach((c, i) => {
    if (isEmpty(c.characterName)) errors.push(`Character ${i + 1}: name is required.`);
    if (isEmpty(c.occupation)) errors.push(`Character ${i + 1}: occupation is required.`);
    if (isEmpty(c.relationshipToVictim)) errors.push(`Character ${i + 1}: relationship to victim is required.`);
    if (isEmpty(c.whyAtScene)) errors.push(`Character ${i + 1}: "why at scene" is required.`);
    if (c.whatYouKnow.length === 0) warnings.push(`Character ${i + 1}: has no known clues yet.`);
  });

  if (killerCandidateIds.length < 2) {
    errors.push("Killer Candidates: at least 2 are required, so the killer is meaningfully random each session.");
  }
  const characterIds = new Set(characters.map((c) => c.id));
  killerCandidateIds.forEach((id) => {
    if (!characterIds.has(id)) errors.push(`Killer Candidates: "${id}" doesn't match any current character.`);
  });

  if (clues.length !== 4) {
    errors.push("Clues: exactly 4 rounds are required (Context / Contradiction / Connection / Final Deduction).");
  }
  clues.forEach((clue) => {
    killerCandidateIds.forEach((candidateId) => {
      if (isEmpty(clue.textByKiller[candidateId])) {
        errors.push(`Clues: Round ${clue.order} is missing text for killer candidate "${candidateId}".`);
      }
    });
  });

  killerCandidateIds.forEach((candidateId) => {
    if (isEmpty(solution.killerExplanationByCandidate[candidateId])) {
      errors.push(`Killer Reveal: missing killer explanation for candidate "${candidateId}".`);
    }
    if (isEmpty(solution.innocenceExplanationByCandidate[candidateId])) {
      errors.push(`Killer Reveal: missing innocence explanation for candidate "${candidateId}".`);
    }
  });

  return { errors, warnings };
}
