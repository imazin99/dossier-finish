import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BadgeBase } from "./BadgeBase";

interface TimeBadgeProps {
  minutes: number;
  className?: string;
}

/** Duration badge, e.g. "45 د" / "45 min". */
export function TimeBadge({ minutes, className }: TimeBadgeProps) {
  const { t } = useTranslation();

  return (
    <BadgeBase icon={Clock} className={className}>
      {minutes} {t("badges.minutesShort")}
    </BadgeBase>
  );
}
