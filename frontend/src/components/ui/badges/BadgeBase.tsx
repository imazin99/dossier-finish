import type { LucideIcon } from "lucide-react";
import { cn } from "@lib/utils";

interface BadgeBaseProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  /** accent = red-tinted (for emphasis, e.g. active difficulty); default = neutral glass */
  tone?: "default" | "accent";
  className?: string;
  /** Use the mono/case-file typeface — for case numbers, timestamps, counts. */
  mono?: boolean;
}

/**
 * Internal shared pill used by CaseBadge / DifficultyBadge / PlayersBadge /
 * TimeBadge so their spacing, radius, and border treatment never drift
 * apart from each other.
 */
export function BadgeBase({ children, icon: Icon, tone = "default", className, mono }: BadgeBaseProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs backdrop-blur-glass backdrop-saturate-150 shadow-glass-glow",
        mono ? "font-mono tracking-wide" : "font-body",
        tone === "accent"
          ? "border-primary/35 bg-primary/10 text-primary-light"
          : "border-border/60 bg-card/50 text-text-secondary",
        className
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />}
      {children}
    </span>
  );
}
