// Central route path constants.
// Import these instead of hardcoding path strings in components.
export const ROUTES = {
  cases: "/cases",
  howToPlay: "/how-to-play",
  settings: "/settings",
  about: "/about",
} as const;

/** Route pattern registered with the router (dynamic segment). */
export const CASE_DETAILS_PATTERN = "/cases/:caseId";

/** Build a concrete case-details path for navigation/links. */
export function buildCaseDetailsPath(caseId: string): string {
  return `/cases/${caseId}`;
}

/** Route pattern for choosing players ahead of a given case. */
export const CHOOSE_PLAYERS_PATTERN = "/cases/:caseId/players";

/** Build a concrete choose-players path for navigation/links. */
export function buildChoosePlayersPath(caseId: string): string {
  return `/cases/${caseId}/players`;
}

/** Parent route pattern for the whole role-distribution flow (holds the shared session state). */
export const ROLE_DISTRIBUTION_PATTERN = "/cases/:caseId/roles";
/** Child patterns, relative to ROLE_DISTRIBUTION_PATTERN. */
export const ROLE_HANDOFF_SEGMENT = "handoff";
export const ROLE_VIEW_SEGMENT = "role";
export const ROLE_CONFIRMATION_SEGMENT = "confirmation";

export function buildRoleHandoffPath(caseId: string): string {
  return `/cases/${caseId}/roles/${ROLE_HANDOFF_SEGMENT}`;
}

export function buildRoleViewPath(caseId: string): string {
  return `/cases/${caseId}/roles/${ROLE_VIEW_SEGMENT}`;
}

export function buildRoleConfirmationPath(caseId: string): string {
  return `/cases/${caseId}/roles/${ROLE_CONFIRMATION_SEGMENT}`;
}

/**
 * Route pattern for the case briefing screen — shown once, after every
 * player has seen their role, right before investigation gameplay begins.
 * Wrapped by the pathless GameSessionLayout (see game-session feature),
 * not nested under ROLE_DISTRIBUTION_PATTERN — it needs the fixed
 * player/role/killer data, not per-player turn-taking state.
 */
export const BRIEFING_PATTERN = "/cases/:caseId/briefing";

/** Build a concrete briefing path for navigation/links. */
export function buildBriefingPath(caseId: string): string {
  return `/cases/${caseId}/briefing`;
}

/** Route pattern for the investigation phase — public evidence review. */
export const INVESTIGATION_PATTERN = "/cases/:caseId/investigation";

/** Build a concrete investigation path for navigation/links. */
export function buildInvestigationPath(caseId: string): string {
  return `/cases/${caseId}/investigation`;
}

/** Route pattern for the discussion phase — countdown + free discussion. */
export const DISCUSSION_PATTERN = "/cases/:caseId/discussion";

/** Build a concrete discussion path for navigation/links. */
export function buildDiscussionPath(caseId: string): string {
  return `/cases/${caseId}/discussion`;
}

/**
 * Parent route pattern for the voting phase (holds the shared per-round
 * voting state — whose turn it is to vote, votes cast so far). Pass-and-play,
 * mirroring the role-distribution flow's structure.
 */
export const VOTING_PATTERN = "/cases/:caseId/voting";
/** Child patterns, relative to VOTING_PATTERN. */
export const VOTING_HANDOFF_SEGMENT = "handoff";
export const VOTING_CAST_SEGMENT = "vote";
export const VOTING_RESULTS_SEGMENT = "results";

export function buildVotingPath(caseId: string): string {
  return `/cases/${caseId}/voting`;
}

export function buildVotingHandoffPath(caseId: string): string {
  return `/cases/${caseId}/voting/${VOTING_HANDOFF_SEGMENT}`;
}

export function buildVotingCastPath(caseId: string): string {
  return `/cases/${caseId}/voting/${VOTING_CAST_SEGMENT}`;
}

export function buildVotingResultsPath(caseId: string): string {
  return `/cases/${caseId}/voting/${VOTING_RESULTS_SEGMENT}`;
}

/** Route pattern for the elimination-check screen (asks whether to keep investigating). */
export const ELIMINATION_CHECK_PATTERN = "/cases/:caseId/elimination-check";

export function buildEliminationCheckPath(caseId: string): string {
  return `/cases/${caseId}/elimination-check`;
}

/** Route pattern for the final ending/reveal screen. */
export const ENDING_PATTERN = "/cases/:caseId/ending";

export function buildEndingPath(caseId: string): string {
  return `/cases/${caseId}/ending`;
}

/**
 * Case Management Dashboard (admin tool) — deliberately NOT linked from
 * the game's bottom navigation, to keep the player-facing UI untouched.
 * Reach it by navigating directly to /admin in the browser.
 */
export const ADMIN_DASHBOARD_PATTERN = "/admin";
export const ADMIN_LOGIN_PATTERN = "/admin/login";
export const ADMIN_NEW_CASE_PATTERN = "/admin/cases/new";
export const ADMIN_EDIT_CASE_PATTERN = "/admin/cases/:caseId/edit";

export function buildAdminEditCasePath(caseId: string): string {
  return `/admin/cases/${caseId}/edit`;
}
