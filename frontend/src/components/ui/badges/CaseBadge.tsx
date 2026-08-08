import { useTranslation } from "react-i18next";
import { BadgeBase } from "./BadgeBase";

interface CaseBadgeProps {
  /** The case number/id, e.g. 14 or "014-B" */
  number: string | number;
  className?: string;
}

/** Small case-file tag, e.g. "ملف رقم 014" / "Case No. 014" — set in mono type. */
export function CaseBadge({ number, className }: CaseBadgeProps) {
  const { t } = useTranslation();

  return (
    <BadgeBase mono className={className}>
      {t("badges.case")} {number}
    </BadgeBase>
  );
}
