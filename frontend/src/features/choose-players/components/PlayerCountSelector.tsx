import { motion } from "framer-motion";
import { cn } from "@lib/utils";
import { pressTap, springSnap } from "@lib/motion";

const PLAYER_COUNTS = [3, 4, 5, 6, 7, 8] as const;

interface PlayerCountSelectorProps {
  value: number;
  onChange: (count: number) => void;
  className?: string;
}

/**
 * Row of six glass pills (3 through 8) for choosing the player count.
 * A soft red-glow pill slides between selections, matching the same
 * sliding-highlight language used in BottomNavigation and LanguageSwitcher.
 */
export function PlayerCountSelector({ value, onChange, className }: PlayerCountSelectorProps) {
  return (
    <div className={cn("grid grid-cols-6 gap-2", className)}>
      {PLAYER_COUNTS.map((count) => {
        const isActive = count === value;
        return (
          <motion.button
            key={count}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={pressTap}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onChange(count)}
            aria-pressed={isActive}
            className={cn(
              "relative flex aspect-square items-center justify-center rounded-2xl border font-display text-base font-bold transition-colors duration-200",
              "bg-card/50 backdrop-blur-glass backdrop-saturate-150",
              isActive
                ? "border-primary/40 text-text"
                : "border-border/60 text-text-secondary hover:text-text/80"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="player-count-active"
                className="absolute inset-0 rounded-2xl bg-primary/20 shadow-accent-glow"
                transition={springSnap}
              />
            )}
            <span className="relative z-10">{count}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
