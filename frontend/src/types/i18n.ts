export type SupportedLanguage = "ar" | "en";

export type TextDirection = "rtl" | "ltr";

export const LANGUAGE_DIRECTION: Record<SupportedLanguage, TextDirection> = {
  ar: "rtl",
  en: "ltr",
};
