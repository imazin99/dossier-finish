import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@components/ui";

/**
 * Home screen header. The hamburger menu was removed — every destination
 * is now reachable from the bottom nav — so the top bar only holds the
 * language switch. It stays pinned to the same visual corner regardless
 * of reading direction (a deliberate, spec'd exception), hence the
 * forced dir="ltr" wrapper.
 */
export function HomeHeader() {
  const { t } = useTranslation();

  return (
    <header className="flex flex-col items-center gap-7 pt-2">
      <div className="flex w-full items-center justify-end" dir="ltr">
        <LanguageSwitcher variant="full" />
      </div>

      <div className="flex flex-col items-center gap-2.5 text-center">
        <h1 className="metallic-logo font-display text-4xl font-extrabold tracking-[0.08em]">
          DOSSIER
        </h1>
        <p className="font-body text-sm text-text-secondary">{t("home.subtitle")}</p>
      </div>
    </header>
  );
}
