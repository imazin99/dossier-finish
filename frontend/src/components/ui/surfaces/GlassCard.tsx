import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@lib/utils";
import { pressTap, cardHover } from "@lib/motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  /** Pass an onClick (or set interactive) to enable hover-lift + press feedback. */
  interactive?: boolean;
  padding?: "sm" | "md" | "lg";
}

const PADDING_CLASSES = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

/**
 * The primary content surface across the app — case tiles, list rows,
 * detail sections. Static by default; pass `interactive` (or an onClick)
 * to get the hover-lift + tap feedback used for tappable cards.
 */
export function GlassCard({
  children,
  interactive,
  padding = "md",
  className,
  onClick,
  ...props
}: GlassCardProps) {
  const isInteractive = interactive || Boolean(onClick);

  return (
    <motion.div
      onClick={onClick}
      whileHover={isInteractive ? cardHover : undefined}
      whileTap={isInteractive ? pressTap : undefined}
      className={cn(
        "glass-panel rounded-3xl transition-shadow duration-300",
        PADDING_CLASSES[padding],
        isInteractive && "cursor-pointer select-none hover:shadow-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
