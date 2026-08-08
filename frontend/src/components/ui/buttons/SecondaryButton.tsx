import { motion, type HTMLMotionProps } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@lib/utils";
import { pressTap, buttonHover, buttonTap } from "@lib/motion";
import { useHapticFeedback } from "@hooks/useHapticFeedback";
import { useSoundEffect } from "@hooks/useSoundEffect";

interface SecondaryButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  icon?: LucideIcon;
  fullWidth?: boolean;
  /** Light haptic tick on press — reserve for decisive confirmations. */
  haptic?: boolean;
}

/**
 * Secondary action button — glass surface with a quiet border.
 * Used alongside PrimaryButton for "cancel", "back", or alternate actions.
 */
export function SecondaryButton({
  children,
  icon: Icon,
  fullWidth,
  haptic,
  disabled,
  className,
  onClick,
  ...props
}: SecondaryButtonProps) {
  const { trigger } = useHapticFeedback();
  const { play } = useSoundEffect();

  const handleClick: SecondaryButtonProps["onClick"] = (event) => {
    if (haptic) trigger("tap");
    play("click");
    onClick?.(event);
  };

  return (
    <motion.button
      type="button"
      whileHover={disabled ? undefined : buttonHover}
      whileTap={disabled ? undefined : pressTap}
      transition={buttonTap}
      className={cn(
        "glass-panel inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5",
        "text-text font-body font-medium",
        "transition-[color,border-color,box-shadow] duration-300",
        !disabled && "hover:border-primary/40 hover:shadow-card-hover",
        disabled && "opacity-40 pointer-events-none",
        fullWidth && "w-full",
        className
      )}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />}
      <span>{children}</span>
    </motion.button>
  );
}
