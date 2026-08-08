import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation, useParams, Navigate } from "react-router-dom";
import { buildChoosePlayersPath } from "@/router/paths";
import type { CharacterRole } from "@/types/role";
import { GameSessionProvider } from "./GameSessionContext";

interface GameSessionLocationState {
  playerNames?: string[];
  assignedRoles?: CharacterRole[];
  selectedKillerId?: string;
}

interface GameSession {
  playerNames: string[];
  assignedRoles: CharacterRole[];
  selectedKillerId: string;
}

/**
 * Pathless layout wrapping Briefing, Investigation, Discussion, Voting,
 * the elimination check, and the ending (everything after role
 * distribution finishes). Expects to be entered via
 * navigate(..., { state: { playerNames, assignedRoles, selectedKillerId } })
 * from the role-distribution Confirmation screen.
 *
 * Same pattern as RoleDistributionLayout: the session is captured ONCE via
 * a lazy useState initializer, not re-read from location.state on every
 * render, since internal navigations between these sibling screens don't
 * carry state along. This component stays mounted across all of them
 * (only the child route changes), so capturing once here keeps the whole
 * game's data alive for the rest of the session.
 */
export function GameSessionLayout() {
  const location = useLocation();
  const { caseId } = useParams();
  const [session] = useState<GameSession | undefined>(() => {
    const state = location.state as GameSessionLocationState | null;
    if (!state?.playerNames || !state.assignedRoles || !state.selectedKillerId) return undefined;
    return {
      playerNames: state.playerNames,
      assignedRoles: state.assignedRoles,
      selectedKillerId: state.selectedKillerId,
    };
  });

  if (!session || !caseId) {
    return <Navigate to={buildChoosePlayersPath(caseId ?? "")} replace />;
  }

  // Only the sub-segment right after :caseId (briefing / investigation /
  // discussion / voting / elimination-check / ending) — NOT the full
  // pathname. Voting has its own internal handoff/vote/results steps
  // nested under the single "voting" segment, and VotingLayout holds
  // per-round state (current voter, votes cast) in plain useState with no
  // location.state fallback, so it must stay mounted across those steps.
  // Keying on the shared "voting" segment here (rather than deeper) keeps
  // it mounted for the whole voting phase; VotingLayout's own nested
  // AnimatePresence handles the finer crossfade between its steps.
  const subSegment = location.pathname.split("/")[3] ?? "";

  return (
    <GameSessionProvider
      caseId={caseId}
      playerNames={session.playerNames}
      assignedRoles={session.assignedRoles}
      selectedKillerId={session.selectedKillerId}
    >
      <AnimatePresence mode="wait" initial={false}>
        <Outlet key={subSegment} />
      </AnimatePresence>
    </GameSessionProvider>
  );
}
