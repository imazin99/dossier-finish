import type { CharacterClue, CharacterRole } from "@/types/role";
import { shuffle } from "./shuffle";

/**
 * Keeps only the clues that are either self-contained, or reference a
 * character (`refersToRoleId`) that's actually assigned to a player this
 * session. Prevents a card from mentioning "the fifth suspect" in a
 * 4-player game.
 */
export function filterKnownClues(
  clues: CharacterClue[],
  assignedRoleIds: ReadonlySet<string>
): CharacterClue[] {
  return clues.filter((clue) => !clue.refersToRoleId || assignedRoleIds.has(clue.refersToRoleId));
}

/**
 * Secrets should never appear on every character. Given the roles actually
 * assigned this session, returns the subset (by id) that should keep their
 * authored secret — roughly proportional to player count (3 secrets at 8
 * players, scaling down, minimum 1). If fewer assigned roles have an
 * authored secret than the target, every one of them keeps it (we don't
 * invent secrets that weren't written).
 */
export function pickSecretHolderIds(assignedRoles: CharacterRole[], playerCount: number): Set<string> {
  const candidatesWithSecret = assignedRoles.filter((role) => role.secret);
  const target = Math.max(1, Math.round((playerCount / 8) * 3));

  if (candidatesWithSecret.length <= target) {
    return new Set(candidatesWithSecret.map((role) => role.id));
  }

  const chosen = shuffle(candidatesWithSecret).slice(0, target);
  return new Set(chosen.map((role) => role.id));
}

/**
 * Applies pickSecretHolderIds and returns a new array where every role NOT
 * chosen to keep its secret has it stripped for this session (the
 * underlying case data is untouched — this only affects what's displayed).
 */
export function applySecretProportionality(
  assignedRoles: CharacterRole[],
  playerCount: number
): CharacterRole[] {
  const keepIds = pickSecretHolderIds(assignedRoles, playerCount);
  return assignedRoles.map((role) =>
    role.secret && !keepIds.has(role.id) ? { ...role, secret: undefined } : role
  );
}
