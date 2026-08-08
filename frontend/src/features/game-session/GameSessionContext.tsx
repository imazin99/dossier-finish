import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { CharacterRole } from "@/types/role";

interface GameSessionContextValue {
  caseId: string;
  playerNames: string[];
  /** Roles assigned to players, in the same order as playerNames. Fixed for the session. */
  assignedRoles: CharacterRole[];
  /** The role id selected as the killer for this session. Fixed for the session. */
  selectedKillerId: string;
  /** Current investigation round, starting at 1 — one progressive clue is revealed per round. */
  currentRound: number;
  /** Indices (into playerNames/assignedRoles) of players eliminated as suspects so far. */
  eliminatedIndices: number[];
  /** Marks a player as eliminated (voted out as a suspect) for the rest of the game. */
  eliminatePlayer: (index: number) => void;
  /** Moves to the next investigation round (reveals the next clue). */
  advanceRound: () => void;
}

const GameSessionContext = createContext<GameSessionContextValue | undefined>(undefined);

/**
 * Carries the whole-game session facts established during role
 * distribution (see RoleDistributionContext) forward through the rest of
 * the game — briefing, investigation, discussion, voting, elimination
 * checks, and the ending. Those phases live in separate route branches
 * from the role-distribution subtree, so without this, the player/role/
 * killer data would be lost the moment the role-distribution routes
 * unmount. Round/elimination state (added for the progressive
 * investigation loop) lives here too, since it also needs to survive
 * navigating between Investigation -> Discussion -> Voting and back.
 */
export function GameSessionProvider({
  caseId,
  playerNames,
  assignedRoles,
  selectedKillerId,
  children,
}: {
  caseId: string;
  playerNames: string[];
  assignedRoles: CharacterRole[];
  selectedKillerId: string;
  children: ReactNode;
}) {
  const [currentRound, setCurrentRound] = useState(1);
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);

  const value = useMemo<GameSessionContextValue>(
    () => ({
      caseId,
      playerNames,
      assignedRoles,
      selectedKillerId,
      currentRound,
      eliminatedIndices,
      eliminatePlayer: (index: number) =>
        setEliminatedIndices((prev) => (prev.includes(index) ? prev : [...prev, index])),
      advanceRound: () => setCurrentRound((round) => round + 1),
    }),
    [caseId, playerNames, assignedRoles, selectedKillerId, currentRound, eliminatedIndices]
  );

  return <GameSessionContext.Provider value={value}>{children}</GameSessionContext.Provider>;
}

export function useGameSession(): GameSessionContextValue {
  const ctx = useContext(GameSessionContext);
  if (!ctx) {
    throw new Error("useGameSession must be used within a GameSessionProvider");
  }
  return ctx;
}
