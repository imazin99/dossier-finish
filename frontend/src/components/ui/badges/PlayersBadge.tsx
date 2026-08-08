import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BadgeBase } from "./BadgeBase";

interface PlayersBadgeProps {
  /** A count (3) or a range ("2-4") */
  count: number | string;
  className?: string;
}

/** Player count badge, e.g. "2-4 لاعبين" / "2-4 players". */
export function PlayersBadge({ count, className }: PlayersBadgeProps) {
  const { t } = useTranslation();

  return (
    <BadgeBase icon={Users} className={className}>
      {count} {t("badges.players")}
    </BadgeBase>
  );
}
