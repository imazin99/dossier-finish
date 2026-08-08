import { motion } from "framer-motion";
import { cn } from "@lib/utils";
import { springSnap } from "@lib/motion";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Required — a visually-only switch always needs an accessible label. */
  "aria-label": string;
  disabled?: boolean;
}

/**
 * A small pill-shaped on/off switch — the glass-track/red-glow-when-on
 * equivalent of a native checkbox, used across Settings rows (sound,
 * vibration, etc). Kept generic/reusable rather than settings-specific.
 */
export function ToggleSwitch({ checked, onChange, disabled, ...props }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-300",
        checked ? "border-primary-light/40 bg-primary/25 shadow-accent-glow" : "border-border/60 bg-white/5",
        disabled && "opacity-40 pointer-events-none"
      )}
      {...props}
    >
      <motion.span
        className={cn(
          "absolute top-0.5 h-6 w-6 rounded-full shadow-sm",
          checked ? "bg-primary-light" : "bg-text-secondary/70"
        )}
        animate={{ left: checked ? "calc(100% - 1.625rem)" : "0.125rem" }}
        transition={springSnap}
      />
    </button>
  );
}
