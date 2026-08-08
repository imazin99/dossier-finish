import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { useGameSession } from "@/features/game-session/GameSessionContext";
import { VotingProvider } from "./VotingContext";

/**
 * Parent layout for the voting phase. Player names come from the already-
 * established GameSessionContext (set up back at role distribution) —
 * this layout just starts a fresh turn-taking/votes cycle on top of it.
 *
 * The nested AnimatePresence is safe to key by the exact pathname here
 * (unlike the layouts above it): VotingProvider sits above the Outlet, so
 * remounting the Outlet's leaf on each handoff/vote/results step never
 * touches the votes-cast/current-voter state living in the provider.
 */
export function VotingLayout() {
  const location = useLocation();
  const { playerNames } = useGameSession();

  return (
    <VotingProvider playerNames={playerNames}>
      <AnimatePresence mode="wait" initial={false}>
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </VotingProvider>
  );
}
