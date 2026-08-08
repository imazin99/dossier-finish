import { useEffect } from "react";
import { motion } from "framer-motion";
import { revealVariants } from "@lib/motion";
import { useHapticFeedback } from "@hooks/useHapticFeedback";
import { useSoundEffect } from "@hooks/useSoundEffect";
import type { SoundKey } from "@lib/audioManager";
import { cn } from "@lib/utils";

interface RevealStageProps {
  children: React.ReactNode;
  className?: string;
  /** Pair this to a value that changes per reveal (e.g. currentRound) so
   * the animation + feedback replay for each new moment, not just the
   * first mount of the parent screen. */
  revealKey?: string | number;
  /** Fires the light "reveal" haptic pattern once, on mount. */
  haptic?: boolean;
  /** Plays this UI sound once, on mount (no-op until real audio exists). */
  sound?: SoundKey;
}

/**
 * Cinematic entrance used for the app's three "big moment" beats — role
 * reveal, clue reveal, killer reveal (see @lib/motion's revealVariants).
 * Centralizes the haptic + sound cue for those moments too, so each
 * screen doesn't need to hand-roll the same "trigger once on mount"
 * effect three separate times.
 */
export function RevealStage({ children, className, revealKey, haptic, sound }: RevealStageProps) {
  const { trigger } = useHapticFeedback();
  const { play } = useSoundEffect();

  useEffect(() => {
    if (haptic) trigger("reveal");
    if (sound) play(sound);
    // Deliberately re-fires whenever revealKey changes (a new clue round,
    // a fresh mount) — haptic/sound/trigger are stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealKey]);

  return (
    <motion.div key={revealKey} variants={revealVariants} initial="initial" animate="animate" className={cn(className)}>
      {children}
    </motion.div>
  );
}
