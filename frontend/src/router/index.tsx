import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "@components/layout";
import { HomeScreen } from "@/features/home/HomeScreen";
import { CaseDetailsScreen } from "@/features/case-details/CaseDetailsScreen";
import { ChoosePlayersScreen } from "@/features/choose-players/ChoosePlayersScreen";
import { RoleDistributionLayout } from "@/features/role-distribution/RoleDistributionLayout";
import { HandoffScreen } from "@/features/role-distribution/components/HandoffScreen";
import { PlayerRoleScreen } from "@/features/role-distribution/components/PlayerRoleScreen";
import { ConfirmationScreen } from "@/features/role-distribution/components/ConfirmationScreen";
import { GameSessionLayout } from "@/features/game-session/GameSessionLayout";
import { BriefingScreen } from "@/features/briefing/BriefingScreen";
import { InvestigationScreen } from "@/features/investigation/InvestigationScreen";
import { DiscussionScreen } from "@/features/discussion/DiscussionScreen";
import { VotingLayout } from "@/features/voting/VotingLayout";
import { VotingHandoffScreen } from "@/features/voting/components/VotingHandoffScreen";
import { CastVoteScreen } from "@/features/voting/components/CastVoteScreen";
import { VotingResultsScreen } from "@/features/voting/components/VotingResultsScreen";
import { EliminationCheckScreen } from "@/features/investigation/components/EliminationCheckScreen";
import { EndingScreen } from "@/features/ending/EndingScreen";
import { AdminDashboardScreen } from "@/features/admin/AdminDashboardScreen";
import { AdminCaseEditorScreen } from "@/features/admin/AdminCaseEditorScreen";
import { AdminLoginScreen } from "@/features/admin/AdminLoginScreen";
import { AdminProtectedRoute } from "@/features/admin/AdminProtectedRoute";
import { HowToPlayScreen } from "@/features/how-to-play/HowToPlayScreen";
import { SettingsScreen } from "@/features/settings/SettingsScreen";
import { AboutScreen } from "@/features/about/AboutScreen";
import {
  ROUTES,
  CASE_DETAILS_PATTERN,
  CHOOSE_PLAYERS_PATTERN,
  ROLE_DISTRIBUTION_PATTERN,
  ROLE_HANDOFF_SEGMENT,
  ROLE_VIEW_SEGMENT,
  ROLE_CONFIRMATION_SEGMENT,
  BRIEFING_PATTERN,
  INVESTIGATION_PATTERN,
  DISCUSSION_PATTERN,
  VOTING_PATTERN,
  VOTING_HANDOFF_SEGMENT,
  VOTING_CAST_SEGMENT,
  VOTING_RESULTS_SEGMENT,
  ELIMINATION_CHECK_PATTERN,
  ENDING_PATTERN,
  ADMIN_DASHBOARD_PATTERN,
  ADMIN_LOGIN_PATTERN,
  ADMIN_NEW_CASE_PATTERN,
  ADMIN_EDIT_CASE_PATTERN,
} from "./paths";

export const router = createBrowserRouter([
  // Case Management Dashboard — an internal authoring tool, intentionally
  // NOT nested under RootLayout (no bottom nav / phone-width shell) since
  // it's a desktop-friendly admin surface, not part of the player-facing
  // game. Reached directly at /admin — not linked from in-game navigation.
  // /admin/login is the only one of these NOT behind AdminProtectedRoute.
  { path: ADMIN_LOGIN_PATTERN, element: <AdminLoginScreen /> },
  {
    path: ADMIN_DASHBOARD_PATTERN,
    element: (
      <AdminProtectedRoute>
        <AdminDashboardScreen />
      </AdminProtectedRoute>
    ),
  },
  {
    path: ADMIN_NEW_CASE_PATTERN,
    element: (
      <AdminProtectedRoute>
        <AdminCaseEditorScreen />
      </AdminProtectedRoute>
    ),
  },
  {
    path: ADMIN_EDIT_CASE_PATTERN,
    element: (
      <AdminProtectedRoute>
        <AdminCaseEditorScreen />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to={ROUTES.cases} replace /> },
      { path: ROUTES.cases, element: <HomeScreen /> },
      { path: CASE_DETAILS_PATTERN, element: <CaseDetailsScreen /> },
      { path: CHOOSE_PLAYERS_PATTERN, element: <ChoosePlayersScreen /> },
      {
        path: ROLE_DISTRIBUTION_PATTERN,
        element: <RoleDistributionLayout />,
        children: [
          { index: true, element: <Navigate to={ROLE_HANDOFF_SEGMENT} replace /> },
          { path: ROLE_HANDOFF_SEGMENT, element: <HandoffScreen /> },
          { path: ROLE_VIEW_SEGMENT, element: <PlayerRoleScreen /> },
          { path: ROLE_CONFIRMATION_SEGMENT, element: <ConfirmationScreen /> },
        ],
      },
      {
        // Pathless layout: carries the fixed game session (players, roles,
        // killer) across every screen from here on, without adding a URL segment.
        element: <GameSessionLayout />,
        children: [
          { path: BRIEFING_PATTERN, element: <BriefingScreen /> },
          { path: INVESTIGATION_PATTERN, element: <InvestigationScreen /> },
          { path: DISCUSSION_PATTERN, element: <DiscussionScreen /> },
          {
            path: VOTING_PATTERN,
            element: <VotingLayout />,
            children: [
              { index: true, element: <Navigate to={VOTING_HANDOFF_SEGMENT} replace /> },
              { path: VOTING_HANDOFF_SEGMENT, element: <VotingHandoffScreen /> },
              { path: VOTING_CAST_SEGMENT, element: <CastVoteScreen /> },
              { path: VOTING_RESULTS_SEGMENT, element: <VotingResultsScreen /> },
            ],
          },
          { path: ELIMINATION_CHECK_PATTERN, element: <EliminationCheckScreen /> },
          { path: ENDING_PATTERN, element: <EndingScreen /> },
        ],
      },
      { path: ROUTES.howToPlay, element: <HowToPlayScreen /> },
      { path: ROUTES.settings, element: <SettingsScreen /> },
      { path: ROUTES.about, element: <AboutScreen /> },
    ],
  },
]);
