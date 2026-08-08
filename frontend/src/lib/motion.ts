import type { Transition, Variants } from "framer-motion";

// DOSSIER motion language — one set of presets every component pulls from.
// Never hand-roll a spring/duration inline; add a preset here instead so
// press/hover/page-transition feel stays identical across the whole app.

/** Snappy spring used for active-state indicators (nav pill, tab underline). */
export const springSnap: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 32,
};

/** Softer spring for larger surfaces (cards lifting, panels expanding). */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 28,
};

/** Every tappable surface (buttons, icon buttons, badges-as-links) uses this. */
export const pressTap = { scale: 0.96 };

/** Cards and tappable panels lift slightly on hover — subtle scale added for a premium "surface rising toward you" feel. */
export const cardHover = {
  y: -6,
  scale: 1.01,
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } as Transition,
};

/** Buttons get a touch of lift on hover (kept small — buttons shouldn't float far). */
export const buttonHover = {
  y: -1,
  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } as Transition,
};

/** Standard page-level fade used for route transitions. A soft, small
 * drift accompanies the fade — subtle "slide", never a flashy swipe.
 * Kept inside the 150–250ms "fast, never jarring" range requested for
 * screen transitions: 220ms in, 160ms out (out is quicker so the next
 * screen doesn't feel like it's waiting on the old one). */
export const pageFadeVariants: Variants = {
  initial: { opacity: 0, y: 8, x: 4 },
  animate: { opacity: 1, y: 0, x: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, x: -4, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } },
};

/**
 * Cinematic reveal used for the app's three "big moment" beats: role
 * reveal, clue reveal, killer reveal. Slightly slower and adds a scale-in
 * so it reads as a deliberate unveiling rather than a routine page fade —
 * but stays clean/minimal (no rotation, no bounce, no overshoot).
 */
export const revealVariants: Variants = {
  initial: { opacity: 0, scale: 0.94, y: 8 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Subtle entrance for section headings — a small upward fade, quicker
 * and smaller than card entrances since it's just a label. */
export const sectionTitleVariants: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

/** Dialog/sheet content — a touch of scale plus fade, quick since dialogs
 * demand an immediate response to the action that opened them. */
export const dialogContentVariants: Variants = {
  initial: { opacity: 0, scale: 0.97, y: 6 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.98, y: 4, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } },
};

/** Crisp, premium press feedback for buttons — snappier than the default
 * spring so a tap reads as an immediate, precise response. */
export const buttonTap: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

/** Small entrance used for cards/list items appearing in place. */
export const fadeInUpVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Stagger pair for lists (e.g. the case archive): put listContainerVariants
 * on the wrapping motion.div (initial="hidden" animate="show"), and
 * listItemVariants on each child — no initial/animate needed on the
 * children, they inherit timing from the container automatically.
 */
export const listContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};
