import { cn } from "@lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Elevated = brighter border + stronger shadow, for surfaces that float above content (nav, sheets, modals). */
  elevated?: boolean;
  rounded?: "xl" | "2xl" | "3xl" | "full";
}

const ROUNDED_CLASSES = {
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

/**
 * Non-interactive glass surface — the structural building block behind
 * BottomNavigation, modals, sheets, and section headers. For tappable
 * content surfaces (case tiles, list rows), use GlassCard instead.
 */
export function GlassPanel({
  children,
  elevated,
  rounded = "3xl",
  className,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        elevated ? "glass-panel-elevated" : "glass-panel",
        ROUNDED_CLASSES[rounded],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
