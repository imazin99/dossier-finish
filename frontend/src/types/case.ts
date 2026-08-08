import type { LucideIcon } from "lucide-react";
import type { DifficultyLevel } from "@components/ui";
import type { LocalizedText } from "./localized";

export type { LocalizedText };

export interface CaseSummary {
  id: string;
  number: string;
  title: LocalizedText;
  description: LocalizedText;
  difficulty: DifficultyLevel;
  minutes: number;
  /** Fallback icon shown only if a case has no coverImage (kept for resilience/future cases). */
  posterIcon: LucideIcon;
  /** Portrait cover art (960×1200) — case archive card + Case Details poster hero. */
  coverImage?: string;
  /** Landscape scene/location art (960×540) — Briefing screen scene hero. */
  locationImage?: string;
  /** Investigation type/category shown on the details screen, e.g. "Murder Mystery". */
  category: LocalizedText;
  /** Brief story introduction for the details screen. */
  story: LocalizedText;
  /** "Your Mission" checklist items. */
  objectives: LocalizedText[];
  /** Optional age/content notice — omitted entirely when a case has none. */
  warning?: LocalizedText;
  /** Case-file summary shown on the pre-game briefing screen (and case details, before player count is chosen). */
  briefing: CaseBriefing;
  /** Discussion phase countdown duration, in minutes — configurable per case. */
  discussionMinutes: number;
  /** Ordered clues revealed one per investigation round (vaguest first). */
  progressiveClues: ProgressiveClue[];
  /** Reveal-screen explanation content, keyed per killer candidate since the killer is chosen randomly each session. */
  solution: CaseSolution;
}

/** The case-file facts shown on the briefing screen, right before investigation starts. */
export interface CaseBriefing {
  crimeDescription: LocalizedText;
  victim: LocalizedText;
  location: LocalizedText;
  timeOfCrime: LocalizedText;
  objective: LocalizedText;
}

/**
 * How a clue functions in the deduction arc — authored explicitly so the
 * investigation flow can be balanced on purpose instead of by accident.
 *
 * Revised philosophy (content redesign — the four values below are
 * unchanged, only what each is authored to DO changed, to stop clues
 * from forming a deterministic "A or B -> A is cleared -> therefore B"
 * elimination chain):
 * - "neutral": sets the scene — timing, environment, circumstances.
 *   Applies to everyone, accuses no one.
 * - "suspicious": introduces an inconsistency without naming just one
 *   suspect-pair. Should read as compatible with at least 3 people/
 *   explanations, never framed as "these two, everyone else is clear."
 * - "eliminating": despite the name (kept for schema stability), this
 *   round should NOT fully clear anyone. It connects earlier details and
 *   may confirm PART of a candidate's story — while leaving a genuine gap
 *   unexplained, and explicitly leaving at least 2-3 other candidates
 *   with their own unresolved details. An innocent character can still
 *   look suspicious after this round; the killer can have one piece of
 *   evidence that looks innocent.
 * - "finalDeduction": the strongest clue — combines several independent
 *   details (access, timing, behavior) into a fact that fits only the
 *   killer. Still shouldn't flatly announce a name; it should read as
 *   evidence a group has to reason through, not a gotcha.
 */
export type ClueType = "neutral" | "suspicious" | "eliminating" | "finalDeduction";

/**
 * One round's clue. Since the killer is randomly selected per session (see
 * killerCandidateIds on CaseRecord, types/caseRecord.ts), the clue's wording is authored per candidate
 * so it always points at whoever actually is the killer this session.
 */
export interface ProgressiveClue {
  id: string;
  /** 1 = vaguest, higher = clearer. Revealed in this order. */
  order: number;
  /** See ClueType — governs how much this clue is allowed to reveal. */
  type: ClueType;
  /** Keyed by killer candidate role id. */
  textByKiller: Record<string, LocalizedText>;
}

/** Reveal-screen explanation content — also keyed per killer candidate. */
export interface CaseSolution {
  /** Why this candidate (when they're the actual killer) did it, referencing the clues. */
  killerExplanationByCandidate: Record<string, LocalizedText>;
  /** Why this candidate (when they're a suspect but NOT the killer) is innocent. */
  innocenceExplanationByCandidate: Record<string, LocalizedText>;
}

/** Every investigation supports the same player range — not a per-case setting. */
export const CASE_PLAYER_RANGE = "3-8";
