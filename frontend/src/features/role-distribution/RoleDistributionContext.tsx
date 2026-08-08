import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { CharacterRole } from "@/types/role";

interface RoleDistributionContextValue {
  playerNames: string[];
  /** All assigned roles, in player order — needed to forward the full session onward after this flow completes. */
  assignedRoles: CharacterRole[];
  currentIndex: number;
  currentPlayerName: string;
  /** The role assigned to the player whose turn it currently is. */
  currentPlayerRole: CharacterRole;
  /** The role id selected as the killer for this session. Fixed for the whole session. */
  selectedKillerId: string;
  /** Whether the player whose turn it currently is happens to be the killer. */
  isCurrentPlayerKiller: boolean;
  isLastPlayer: boolean;
  /** Move to the next player. Only meaningful when !isLastPlayer. */
  advance: () => void;
}

const RoleDistributionContext = createContext<RoleDistributionContextValue | undefined>(undefined);

/**
 * Wraps the handoff → role-view cycle for one round of role distribution.
 * Holds navigation-relevant state (whose turn it is) plus the fixed,
 * pre-computed role assignment and killer selection for this session —
 * it does NOT do the shuffling/selection itself. `assignedRoles` must
 * already be a unique role per player, in player order, and
 * `selectedKillerId` must already be one of those assigned roles' ids —
 * both computed once by the caller (see RoleDistributionLayout) so they
 * stay fixed for the whole session.
 */
export function RoleDistributionProvider({
  playerNames,
  assignedRoles,
  selectedKillerId,
  children,
}: {
  playerNames: string[];
  assignedRoles: CharacterRole[];
  selectedKillerId: string;
  children: ReactNode;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const value = useMemo<RoleDistributionContextValue>(() => {
    const isLastPlayer = currentIndex === playerNames.length - 1;
    const currentPlayerRole = assignedRoles[currentIndex];
    return {
      playerNames,
      assignedRoles,
      currentIndex,
      currentPlayerName: playerNames[currentIndex] ?? "",
      currentPlayerRole,
      selectedKillerId,
      isCurrentPlayerKiller: currentPlayerRole?.id === selectedKillerId,
      isLastPlayer,
      advance: () => setCurrentIndex((i) => Math.min(i + 1, playerNames.length - 1)),
    };
  }, [playerNames, assignedRoles, selectedKillerId, currentIndex]);

  return <RoleDistributionContext.Provider value={value}>{children}</RoleDistributionContext.Provider>;
}

export function useRoleDistribution(): RoleDistributionContextValue {
  const ctx = useContext(RoleDistributionContext);
  if (!ctx) {
    throw new Error("useRoleDistribution must be used within a RoleDistributionProvider");
  }
  return ctx;
}
