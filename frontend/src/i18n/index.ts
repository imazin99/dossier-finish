import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

// DOSSIER i18n setup.
// Arabic (ar) is the default and fallback language across the whole app.
// English (en) is available via the language switcher in Settings.
// Direction (rtl/ltr) is derived from the active language — see
// src/context/LanguageContext.tsx, which owns the <html dir="..."> sync.
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    lng: "ar",
    fallbackLng: "ar",
    supportedLngs: ["ar", "en"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "dossier_language",
    },
  });

export default i18n;
