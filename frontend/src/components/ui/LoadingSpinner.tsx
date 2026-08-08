import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@lib/utils";

type SpinnerSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-9 w-9",
};

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  /** Optional label shown beside the spinner; defaults to the shared "loading" copy. */
  label?: string;
  className?: string;
}

/**
 * Themed loading indicator. Uses Tailwind's `animate-spin` (a CSS
 * animation) rather than a Framer Motion loop, so it's automatically
 * paused by the global prefers-reduced-motion rule in globals.css.
 */
export function LoadingSpinner({ size = "md", label, className }: LoadingSpinnerProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("inline-flex items-center gap-2.5 text-text-secondary", className)}>
      <span className="relative inline-flex items-center justify-center">
        <span className="absolute inset-0 animate-pulse rounded-full bg-primary/25 blur-md" />
        <Loader2
          className={cn("relative animate-spin text-primary-light", SIZE_CLASSES[size])}
          strokeWidth={2}
        />
      </span>
      <span className="text-sm">{label ?? t("common.loading")}</span>
    </div>
  );
}
