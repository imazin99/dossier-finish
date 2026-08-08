/**
 * Derives a stable "which top-level branch is active" key from a pathname,
 * for keying the AnimatePresence in RootLayout.
 *
 * This is deliberately NOT just `location.pathname`: RoleDistributionLayout
 * and GameSessionLayout are pathless layouts that capture their session
 * state ONCE (players, assigned roles, selected killer) via a lazy
 * useState initializer read from location.state on first mount — internal
 * navigation between their child screens does not carry that state again
 * (see the comments on those components). If RootLayout keyed its
 * AnimatePresence by the raw pathname, every internal step (e.g.
 * Investigation -> Discussion) would change the key, forcing React to
 * unmount and remount the whole layout — wiping the in-progress game
 * session. Grouping every child of those two layouts under one constant
 * key keeps them mounted for their entire flow, while still changing key
 * (and therefore crossfading) when moving between genuinely different top
 * branches (Home, Case Details, Choose Players, How To Play, Settings,
 * About) or between two different cases.
 *
 * The finer-grained transitions *within* the role-distribution, voting,
 * and game-session flows are handled by their own nested AnimatePresence
 * (see RoleDistributionLayout, VotingLayout, GameSessionLayout), which is
 * safe to key by the exact pathname since remounting there only replaces
 * the leaf screen, not the provider holding the session state.
 */
export function getRouteGroupKey(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== "cases") {
    // /how-to-play, /settings, /about, or anything unrecognized — each is
    // its own standalone leaf with no internal sub-navigation, so the
    // exact pathname is a safe, correctly-changing key.
    return pathname;
  }

  if (segments.length === 1) return "home"; // /cases

  const caseId = segments[1];
  if (segments.length === 2) return `case-details:${caseId}`; // /cases/:caseId

  const sub = segments[2];
  if (sub === "players") return `choose-players:${caseId}`;
  if (sub === "roles") return `role-distribution:${caseId}`;
  if (["briefing", "investigation", "discussion", "voting", "elimination-check", "ending"].includes(sub)) {
    return `game-session:${caseId}`;
  }

  return pathname;
}
