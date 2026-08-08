import { motion, type HTMLMotionProps } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@lib/utils";

type IconButtonSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<IconButtonSize, string> = {
  sm: "h-9 w-9 [&_svg]:h-4 [&_svg]:w-4",
  md: "h-11 w-11 [&_svg]:h-5 [&_svg]:w-5",
  lg: "h-[3.25rem] w-[3.25rem] [&_svg]:h-6 [&_svg]:w-6",
};

interface GlassIconButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  icon: LucideIcon;
  size?: IconButtonSize;
  /** Required — icon-only buttons must always have an accessible label. */
  "aria-label": string;
  active?: boolean;
}

/**
 * Circular glass button for icon-only actions (back, more, filter, close).
 * Set `active` for a toggled/selected state (soft red glow behind the icon).
 */
export function GlassIconButton({
  icon: Icon,
  size = "md",
  active,
  disabled,
  className,
  ...props
}: GlassIconButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={disabled ? undefined : { scale: 1.06 }}
      whileTap={disabled ? undefined : { scale: 0.9 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass-panel relative flex items-center justify-center rounded-full",
        "text-text-secondary transition-colors duration-200 hover:text-text",
        active && "text-text border-primary/40 shadow-accent-glow bg-primary/10",
        disabled && "opacity-40 pointer-events-none",
        SIZE_CLASSES[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      <Icon strokeWidth={active ? 2.25 : 1.75} />
    </motion.button>
  );
}
