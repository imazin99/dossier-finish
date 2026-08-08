import { motion, type HTMLMotionProps } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@lib/utils";
import { pressTap, buttonHover, buttonTap } from "@lib/motion";
import { useHapticFeedback } from "@hooks/useHapticFeedback";
import { useSoundEffect } from "@hooks/useSoundEffect";
import type { SoundKey } from "@lib/audioManager";

interface PrimaryButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  icon?: LucideIcon;
  fullWidth?: boolean;
  loading?: boolean;
  /** Soft pulsing glow — reserve for the single most important CTA on a
   * screen (e.g. "Start Investigation", a killer-reveal confirmation).
   * Off by default; most primary buttons should stay still. */
  glow?: boolean;
  /** Light haptic tick on press — use for decisive/important confirmations
   * (submitting a vote, confirming a role, answering elimination-check). */
  haptic?: boolean;
  /** UI sound played on press. Defaults to the generic "click" cue; pass
   * e.g. "transition" for buttons that move between major game phases. */
  sound?: SoundKey;
}

/**
 * The app's primary call-to-action button.
 * Filled deep-red surface with a soft accent glow — reserved for the single
 * most important action on a screen (e.g. "Start Case", "Confirm").
 */
export function PrimaryButton({
  children,
  icon: Icon,
  fullWidth,
  loading,
  glow,
  haptic,
  sound = "click",
  disabled,
  className,
  onClick,
  ...props
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  const { trigger } = useHapticFeedback();
  const { play } = useSoundEffect();

  const handleClick: PrimaryButtonProps["onClick"] = (event) => {
    if (haptic) trigger("tap");
    play(sound);
    onClick?.(event);
  };

  return (
    <motion.button
      type="button"
      whileHover={isDisabled ? undefined : buttonHover}
      whileTap={isDisabled ? undefined : pressTap}
      transition={buttonTap}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5",
        "bg-primary text-text font-body font-medium",
        "border border-primary-light/30 shadow-accent-glow",
        "transition-[opacity,box-shadow] duration-300",
        !isDisabled && "hover:shadow-button-glow",
        !isDisabled && glow && "animate-glow-pulse",
        isDisabled && "opacity-40 pointer-events-none",
        fullWidth && "w-full",
        className
      )}
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />}
      <span>{children}</span>
    </motion.button>
  );
}
