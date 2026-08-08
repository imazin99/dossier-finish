import type { LocalizedText } from "./localized";

/**
 * One thing a character personally knows. If `refersToRoleId` is set,
 * this clue name-drops another character — it should only be shown when
 * that role is actually among the roles assigned this session (see
 * filterKnownClues in lib/session.ts). Clues with no refersToRoleId are
 * always shown regardless of player count.
 */
export interface CharacterClue {
  text: LocalizedText;
  refersToRoleId?: string;
}

export interface CharacterRole {
  id: string;
  characterName: LocalizedText;
  /** Role / job. */
  occupation: LocalizedText;
  relationshipToVictim: LocalizedText;
  /** Why this character was at the scene. */
  whyAtScene: LocalizedText;
  /** 2-4 concrete, discussion-worthy observations. */
  whatYouKnow: CharacterClue[];
  /** Only a small number of characters in a case should have one. */
  secret?: LocalizedText;
}
