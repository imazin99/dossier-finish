import { useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import backgroundMain from "@/assets/backgrounds/background-main.webp";
import { useCases } from "@context/CasesContext";

/**
 * Fixed, layered cinematic background — replaces the old procedural
 * AnimatedBackground with the final approved photography.
 *
 * Mounted once in RootLayout (never per-page) so it persists across
 * navigation instead of remounting. It reacts to the current :caseId
 * route param (available here even though this component sits above the
 * nested case routes — React Router merges the whole matched branch's
 * params into useParams()) and crossfades to that case's own coverImage,
 * read straight from CasesContext — the same already-loaded, API-backed
 * case data PosterHero (case-details) uses for its poster art. This is
 * intentionally NOT a hardcoded id->asset map: every published case
 * (legacy or Admin-Dashboard-created) supplies its own background purely
 * through its coverImage field, with no per-case code required. Falls
 * back to the main Cases-page background when there's no matching case
 * (Home, How To Play, Settings, About) or when a case has no coverImage
 * set at all.
 *
 * Four separate layers, per spec — the source image itself is never
 * blurred directly:
 *   1. Background Image  — crossfades on change (AnimatePresence)
 *   2. Blur Layer         — backdrop-blur only, image stays sharp underneath
 *   3. Dark Overlay Layer — flat black, keeps UI readable
 *   4. Dark-red Vignette  — very subtle, edges only
 * The actual UI renders above all of this via RootLayout's <main>.
 */
export function SceneBackground() {
  const { caseId } = useParams<{ caseId?: string }>();
  const shouldReduceMotion = useReducedMotion();
  const { caseSummaries } = useCases();

  const activeCase = caseId ? caseSummaries.find((c) => c.id === caseId) : undefined;
  const activeImage = activeCase?.coverImage || backgroundMain;

  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden bg-background">
      {/* 1. Background Image — fullscreen, cover, centered, crossfades between cases */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeImage}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${activeImage})`, willChange: "opacity" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* 2. Blur Layer — backdrop-filter only; the image above is never filter:blur'd itself */}
      <div className="absolute inset-0 backdrop-blur-[12px]" />

      {/* 3. Dark Overlay Layer — keeps UI readable over any photo */}
      <div className="absolute inset-0 bg-black/10" />

      {/* 4. Subtle dark-red vignette, edges only */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(139,0,0,0.16) 100%)",
        }}
      />
    </div>
  );
}
