import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TriangleAlert, WifiOff } from "lucide-react";
import { BottomNavigation } from "./BottomNavigation";
import { SceneBackground } from "./SceneBackground";
import { getRouteGroupKey } from "@/router/routeGroup";
import { useCases } from "@context/CasesContext";
import { musicManager } from "@lib/musicManager";
import { LoadingSpinner, GlassCard, PrimaryButton } from "@components/ui";

/** Menu screens where background music plays: Home, Case Details, How To
 * Play, Settings, About. From Choose Players onward is active gameplay,
 * where music should already have faded out (see the effect below). */
function isMenuRoute(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "cases") return true; // /how-to-play, /settings, /about
  return segments.length <= 2; // /cases or /cases/:caseId
}

/**
 * Shell layout for all app routes.
 * SceneBackground mounts once here (not per-page) — see that file for the
 * full layered background system (final case photography + blur + dark
 * overlay + vignette, crossfading per :caseId). Pages render into
 * <Outlet />; bottom padding reserves space so content never sits under
 * the floating glass nav.
 *
 * AnimatePresence is what makes screen changes actually crossfade instead
 * of cutting instantly: without it, React Router swaps the outgoing
 * page's DOM for the incoming one in the same tick, so the exit half of
 * PageContainer's pageFadeVariants (see @lib/motion) never gets a chance
 * to play. The key is a route-GROUP key (see @/router/routeGroup), not
 * the raw pathname — RoleDistributionLayout and GameSessionLayout are
 * stateful pathless layouts that must stay mounted across their own
 * internal navigation, so keying by exact pathname here would wipe an
 * in-progress game session on every round. Those two layouts handle their
 * own finer-grained crossfades internally (see their own AnimatePresence).
 * Deliberately no `mode="wait"`: that would force the outgoing page's
 * exit animation to finish completely before the incoming page starts
 * animating in at all, turning every navigation into two back-to-back
 * animations (a real, measurable stall, worst on Android WebView) instead
 * of the overlapping crossfade pageFadeVariants' own durations (220ms in,
 * 160ms out) were written for.
 *
 * Gated behind the initial published-cases load (see
 * context/CasesContext.tsx, now offline-first: cache first if present,
 * then a background sync). `error` only fires when there's genuinely
 * nothing to show — no cache AND no network. A sync failure with a
 * usable cache instead surfaces as the small, non-blocking "offline"
 * pill below, never a full error screen.
 */
export function RootLayout() {
  const location = useLocation();
  const routeGroupKey = getRouteGroupKey(location.pathname);
  const { isLoading, error, isOffline, refetch } = useCases();
  const { t } = useTranslation();

  // Background music: play on menu screens, fade out the moment a case
  // is actually entered (Choose Players onward). Only re-runs when the
  // menu/game boundary is crossed, not on every sub-navigation within a
  // game session (Investigation -> Discussion -> Voting, etc.), so it
  // never restarts or re-fades mid-game. musicManager.play()/fadeOut()
  // are both no-ops when already in the requested state. App-background/
  // exit handling lives inside musicManager itself (see that file), not
  // here, so it can't be skipped by this component unmounting.
  const menuRoute = isMenuRoute(location.pathname);
  useEffect(() => {
    if (menuRoute) {
      musicManager.play();
    } else {
      musicManager.fadeOut();
    }
  }, [menuRoute]);

  if (isLoading) {
    return (
      <div className="relative flex min-h-dvh items-center justify-center bg-background">
        <SceneBackground />
        <LoadingSpinner size="lg" className="relative z-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex min-h-dvh items-center justify-center bg-background px-4">
        <SceneBackground />
        <GlassCard className="relative z-10 flex max-w-sm flex-col items-center gap-3 text-center">
          <TriangleAlert className="h-6 w-6 text-primary-light" />
          <p className="text-sm text-text-secondary">{error}</p>
          <PrimaryButton onClick={refetch}>{t("common.retry")}</PrimaryButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh bg-background">
      <SceneBackground />
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-3 z-30 flex justify-center px-4"
          >
            <div className="flex items-center gap-1.5 rounded-full border border-border-light/50 bg-card/80 px-3 py-1.5 text-xs text-text-secondary shadow-lg backdrop-blur-md">
              <WifiOff className="h-3.5 w-3.5 shrink-0" />
              <span>{t("common.offlineBanner")}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="relative z-10 min-h-dvh overflow-x-hidden px-4 pb-28 pt-6">
        <AnimatePresence initial={false}>
          <Outlet key={routeGroupKey} />
        </AnimatePresence>
      </main>
      <div className="relative z-20">
        <BottomNavigation />
      </div>
    </div>
  );
}
