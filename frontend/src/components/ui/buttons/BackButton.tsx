import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/LanguageContext";
import { GlassIconButton } from "./GlassIconButton";

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * Glass icon button pointing the correct way for the active reading
 * direction (an arrow "back" points right in RTL, left in LTR).
 * Falls back to the shared "common.back" i18n key for its label.
 */
export function BackButton({ onClick, className }: BackButtonProps) {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const Icon = direction === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <GlassIconButton
      icon={Icon}
      aria-label={t("common.back")}
      onClick={onClick}
      className={className}
    />
  );
}
