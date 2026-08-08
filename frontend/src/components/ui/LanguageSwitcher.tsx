import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/LanguageContext";
import { springSnap } from "@lib/motion";

// Language names are shown in their own script regardless of the active
// UI language — that's the convention for a language picker (you don't
// translate "English" to "الإنجليزية" inside the switch itself).
const LABELS = { ar: "العربية", en: "English" } as const;
const COMPACT_LABELS = { ar: "AR", en: "EN" } as const;

interface LanguageSwitcherProps {
  /** compact = "AR / EN" (default, fits tight spaces). full = "العربية | English". */
  variant?: "compact" | "full";
  className?: string;
}

/**
 * AR/EN toggle. Used compact in tight spaces (e.g. a settings row) and
 * full in the home header where the complete language names read better.
 */
export function LanguageSwitcher({ variant = "compact", className }: LanguageSwitcherProps) {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const labels = variant === "full" ? LABELS : COMPACT_LABELS;

  return (
    <motion.button
      type="button"
      onClick={toggleLanguage}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-panel relative flex w-fit items-center gap-1 rounded-full p-1 transition-shadow duration-300 hover:shadow-card-hover ${className ?? ""}`}
      aria-label={t("common.language")}
    >
      {(["ar", "en"] as const).map((lang) => (
        <span key={lang} className="relative z-10 px-3 py-1.5 text-sm whitespace-nowrap">
          {lang === language && (
            <motion.span
              layoutId={`language-switch-pill-${variant}`}
              className="absolute inset-0 -z-10 rounded-full bg-primary/20 shadow-accent-glow"
              transition={springSnap}
            />
          )}
          <span className={lang === language ? "text-text" : "text-text-secondary"}>
            {labels[lang]}
          </span>
        </span>
      ))}
    </motion.button>
  );
}
