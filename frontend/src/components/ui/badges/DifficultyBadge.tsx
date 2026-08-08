import { useTranslation } from "react-i18next";
import { cn } from "@lib/utils";
import { BadgeBase } from "./BadgeBase";

export type DifficultyLevel = "easy" | "medium" | "hard";

const DOT_CLASSES: Record<DifficultyLevel, string> = {
  easy: "bg-primary-light/80",
  medium: "bg-primary shadow-[0_0_6px_rgba(139,0,0,0.6)]",
  hard: "bg-primary-dark shadow-[0_0_8px_rgba(139,0,0,0.8)]",
};

interface DifficultyBadgeProps {
  level: DifficultyLevel;
  className?: string;
}

/** Difficulty indicator — a glowing dot in the theme's red scale (lighter = easier) plus the label. */
export function DifficultyBadge({ level, className }: DifficultyBadgeProps) {
  const { t } = useTranslation();

  return (
    <BadgeBase tone={level !== "easy" ? "accent" : "default"} className={className}>
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT_CLASSES[level])} />
      {t(`badges.difficulty.${level}`)}
    </BadgeBase>
  );
}
