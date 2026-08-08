import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation, useParams, Navigate } from "react-router-dom";
import { buildChoosePlayersPath } from "@/router/paths";
import { useCases } from "@context/CasesContext";
import { shuffle } from "@lib/shuffle";
import { applySecretProportionality } from "@lib/session";
import type { CharacterRole } from "@/types/role";
import { RoleDistributionProvider } from "./RoleDistributionContext";

interface RoleDistributionLocationState {
  playerNames?: string[];
}

interface RoleDistributionSession {
  playerNames: string[];
  assignedRoles: CharacterRole[];
  selectedKillerId: string;
}

/**
 * Parent layout for the role-distribution flow. Expects to be entered
 * via navigate(..., { state: { playerNames } }) from Choose Players.
 * If that state is missing (e.g. a direct/refreshed URL), or the case
 * doesn't have enough unique roles/killer candidates for the chosen
 * player count, there's nothing valid to distribute, so it sends the
 * player back to set up players again rather than rendering a broken flow.
 *
 * IMPORTANT: the whole session (playerNames + a shuffled, unique role per
 * player + the selected killer) is captured ONCE via a lazy useState
 * initializer, not recomputed on every render. Internal navigations within
 * this flow (Handoff -> Role -> Handoff ...) don't pass state along, so
 * location.state is null on those — reading it live would incorrectly
 * look like "no players set up" after the very first screen, and
 * recomputing on every render would reassign roles/killer mid-game. This
 * component stays mounted for the whole flow (only its child route
 * changes), so computing everything once here keeps it fixed for the
 * entire session, as required.
 *
 * Roles/killer candidates now come from the Case Manager API (published
 * cases only), already loaded into CasesContext by the time this layout
 * mounts — see context/CasesContext.tsx.
 *
 * Killer selection order matters: the killer is chosen FIRST from the
 * case's killer candidates, and their role is then guaranteed a spot in
 * the assignment (not just randomly hoped for) — otherwise, on a session
 * with fewer players than the case has roles, the selected killer's role
 * might never actually be handed to anyone. The final player order is
 * shuffled afterward so the killer isn't predictably "always player 1".
 */
export function RoleDistributionLayout() {
  const location = useLocation();
  const { caseId } = useParams();
  const { rolesByCase, killerCandidatesByCase } = useCases();
  const [session] = useState<RoleDistributionSession | undefined>(() => {
    const state = location.state as RoleDistributionLocationState | null;
    const playerNames = state?.playerNames;
    if (!playerNames || playerNames.length === 0 || !caseId) return undefined;

    const availableRoles = rolesByCase[caseId];
    if (!availableRoles || availableRoles.length < playerNames.length) return undefined;

    const killerCandidateIds = killerCandidatesByCase[caseId];
    if (!killerCandidateIds || killerCandidateIds.length === 0) return undefined;

    // Pick the killer once, from this case's candidates.
    const selectedKillerId = killerCandidateIds[Math.floor(Math.random() * killerCandidateIds.length)];
    const killerRole = availableRoles.find((role) => role.id === selectedKillerId);
    if (!killerRole) return undefined; // data integrity guard

    // Guarantee the killer's role is actually assigned to a player this
    // session — fill the remaining slots from the rest of the pool.
    const otherRoles = availableRoles.filter((role) => role.id !== selectedKillerId);
    const fillerRoles = shuffle(otherRoles).slice(0, playerNames.length - 1);
    const assignedRoles = applySecretProportionality(
      shuffle([killerRole, ...fillerRoles]),
      playerNames.length
    );

    return { playerNames, assignedRoles, selectedKillerId };
  });

  if (!session) {
    return <Navigate to={buildChoosePlayersPath(caseId ?? "")} replace />;
  }

  return (
    <RoleDistributionProvider
      playerNames={session.playerNames}
      assignedRoles={session.assignedRoles}
      selectedKillerId={session.selectedKillerId}
    >
      <AnimatePresence mode="wait" initial={false}>
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </RoleDistributionProvider>
  );
}
