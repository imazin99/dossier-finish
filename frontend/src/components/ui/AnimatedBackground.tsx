import { motion, useReducedMotion } from "framer-motion";

/**
 * Fixed layered cinematic background sitting behind every screen:
 * - a slow-pulsing red glow from the top (the "ambient embers" layer)
 * - a second, static, much larger and dimmer red glow lower down, off-
 *   center, purely for depth — never animated, so it doesn't compete
 *   - a faint film-grain texture (inline SVG turbulence, no external
 *   asset needed) to keep the matte black from reading as flat/dead
 * - the existing base vignette darkening the edges
 * All of this is deliberately quiet — atmosphere, not decoration.
 * Mount once near the root (RootLayout), never per-page.
 */
export function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Primary glow — top center, slow breathing pulse */}
      <motion.div
        className="absolute left-1/2 top-[-10%] h-[60vh] w-[140vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.5, 0.8, 0.5], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary glow — lower, off-center, static for quiet depth */}
      <div className="absolute bottom-[-15%] right-[-10%] h-[45vh] w-[90vw] rounded-full bg-primary/[0.06] blur-[140px]" />

      {/* Film-grain texture — inline SVG turbulence, extremely subtle */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Base vignette darkening the edges */}
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
}
