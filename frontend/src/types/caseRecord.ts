import type { DifficultyLevel } from "@components/ui";
import type { LocalizedText } from "./localized";
import type { CharacterClue } from "./role";
import type { ProgressiveClue, CaseSolution } from "./case";

export type { CharacterClue, ProgressiveClue, CaseSolution };

/** Draft cases never appear in the game archive; only Published ones do. */
export type CaseStatus = "draft" | "published";

/**
 * A character/suspect as authored in the Case Manager.
 *
 * The first six fields are exactly what the existing gameplay role system
 * (`CharacterRole`, see types/role.ts) requires and renders in-game.
 * `background`, `objective`, and `hiddenInfo` are additional dashboard
 * fields requested for fuller case-writing context; the current game UI
 * doesn't render them yet, but they're preserved on the record so nothing
 * authored in the dashboard is ever lost.
 */
export interface CaseCharacterRecord {
  id: string;
  characterName: LocalizedText;
  occupation: LocalizedText;
  relationshipToVictim: LocalizedText;
  whyAtScene: LocalizedText;
  whatYouKnow: CharacterClue[];
  secret?: LocalizedText;
  /** Fuller backstory context for the case writer — not shown in-game. */
  background?: LocalizedText;
  /** What this character is trying to achieve this session — not shown in-game. */
  objective?: LocalizedText;
  /** Information this character actively hides (distinct from a `secret`,
   * which is the one thing surfaced to players holding this role). */
  hiddenInfo?: LocalizedText;
}

export interface CaseVictimRecord {
  name: LocalizedText;
  description: LocalizedText;
  background?: LocalizedText;
  relevantInfo?: LocalizedText;
}

export interface CaseBasicInfoRecord {
  title: LocalizedText;
  shortDescription: LocalizedText;
  fullStory: LocalizedText;
  location: LocalizedText;
  time: LocalizedText;
  difficulty: DifficultyLevel;
  /** Every case currently supports the same 3-8 range — kept editable per
   * case for future flexibility, but the game's player-count screen isn't
   * wired to a per-case range yet, so changing it has no gameplay effect. */
  playerCountRange: string;
  durationMinutes: number;
  discussionMinutes: number;
  coverImage?: string;
  category: LocalizedText;
  /** "Your Mission" checklist shown on the case-details screen. */
  objectives: LocalizedText[];
  /** The single paragraph shown on the briefing screen, just before play. */
  briefingObjective: LocalizedText;
  /** Optional age/content notice. */
  warning?: LocalizedText;
}

/**
 * The full Case Manager record — one source of truth per case. The game
 * never reads this shape directly; see data/caseAdapters.ts for the
 * conversion into the CaseSummary / CharacterRole[] shapes gameplay code
 * already consumes.
 */
export interface CaseRecord {
  id: string;
  number: string;
  status: CaseStatus;
  basicInfo: CaseBasicInfoRecord;
  victim: CaseVictimRecord;
  characters: CaseCharacterRecord[];
  /** Subset of `characters[].id` — who is eligible to be randomly chosen as killer. */
  killerCandidateIds: string[];
  /** Exactly 4 entries (Round 1-4: Context / Contradiction / Connection / Final Deduction). */
  clues: ProgressiveClue[];
  solution: CaseSolution;
}

export const CLUE_ROUND_LABELS: { order: number; type: ProgressiveClue["type"]; label: string }[] = [
  { order: 1, type: "neutral", label: "Round 1 — Context" },
  { order: 2, type: "suspicious", label: "Round 2 — Contradiction" },
  { order: 3, type: "eliminating", label: "Round 3 — Connection" },
  { order: 4, type: "finalDeduction", label: "Round 4 — Final Deduction" },
];
