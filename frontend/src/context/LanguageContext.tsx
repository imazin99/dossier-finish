import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { SupportedLanguage } from "@/types/i18n";
import { LANGUAGE_DIRECTION } from "@/types/i18n";

interface LanguageContextValue {
  language: SupportedLanguage;
  direction: "rtl" | "ltr";
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "dossier_language";

function readStoredLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "ar";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "ar";
}

/**
 * Wraps the app and owns the active language + text direction.
 * Any component can read/change language via useLanguage() instead of
 * touching i18next or <html> attributes directly.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<SupportedLanguage>(readStoredLanguage);

  const direction = LANGUAGE_DIRECTION[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    window.localStorage.setItem(STORAGE_KEY, language);
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
  }, [language, direction, i18n]);

  const setLanguage = (lang: SupportedLanguage) => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState((prev) => (prev === "ar" ? "en" : "ar"));

  const value = useMemo(
    () => ({ language, direction, setLanguage, toggleLanguage }),
    [language, direction]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
