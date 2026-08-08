import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages, Volume2, Vibrate, Music, Moon, RotateCcw } from "lucide-react";
import {
  PageContainer,
  SectionTitle,
  GlassCard,
  LanguageSwitcher,
  ToggleSwitch,
  VolumeSlider,
  SecondaryButton,
} from "@components/ui";
import { useLanguage } from "@context/LanguageContext";
import { useSettings } from "@context/SettingsContext";
import { useHapticFeedback } from "@hooks/useHapticFeedback";

/**
 * The "الإعدادات" tab — local player preferences only (language, sound,
 * vibration). Never touches game data, cases, or anything backend-owned;
 * see context/SettingsContext.tsx and context/LanguageContext.tsx for
 * where these actually persist.
 */
export function SettingsScreen() {
  const { t } = useTranslation();
  const { setLanguage } = useLanguage();
  const { soundEnabled, vibrationEnabled, musicVolume, toggleSound, toggleVibration, setMusicVolume, resetSettings } =
    useSettings();
  const { trigger } = useHapticFeedback();
  const [justReset, setJustReset] = useState(false);

  const handleToggleVibration = () => {
    const enabling = !vibrationEnabled;
    toggleVibration();
    if (enabling) {
      // Give immediate physical confirmation that it's actually on now.
      setTimeout(() => trigger("tap"), 0);
    }
  };

  const handleReset = () => {
    if (!window.confirm(t("settings.resetConfirm"))) return;
    resetSettings();
    setLanguage("ar");
    setJustReset(true);
    setTimeout(() => setJustReset(false), 2500);
  };

  return (
    <PageContainer>
      <header className="flex flex-col gap-2 pt-2">
        <h1 className="font-display text-2xl font-bold text-text">{t("settings.title")}</h1>
        <p className="text-sm text-text-secondary">{t("settings.subtitle")}</p>
      </header>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("settings.languageSection")} />
        <GlassCard className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <SettingsIconBadge icon={Languages} />
            <span className="text-sm font-medium text-text">{t("settings.languageSection")}</span>
          </div>
          <LanguageSwitcher variant="compact" />
        </GlassCard>
      </div>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("settings.feedbackSection")} />
        <GlassCard className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <SettingsIconBadge icon={Volume2} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-text">{t("settings.soundSection")}</span>
              <span className="text-xs text-text-secondary">{t("settings.soundHint")}</span>
            </div>
          </div>
          <ToggleSwitch checked={soundEnabled} onChange={toggleSound} aria-label={t("settings.soundSection")} />
        </GlassCard>

        <GlassCard className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <SettingsIconBadge icon={Music} />
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-medium text-text">{t("settings.musicSection")}</span>
              <span className="text-xs text-text-secondary">{t("settings.musicHint")}</span>
            </div>
            <span className="file-label">{Math.round(musicVolume * 100)}%</span>
          </div>
          <VolumeSlider value={musicVolume} onChange={setMusicVolume} aria-label={t("settings.musicSection")} />
        </GlassCard>

        <GlassCard className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <SettingsIconBadge icon={Vibrate} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-text">{t("settings.vibrationSection")}</span>
              <span className="text-xs text-text-secondary">{t("settings.vibrationHint")}</span>
            </div>
          </div>
          <ToggleSwitch
            checked={vibrationEnabled}
            onChange={handleToggleVibration}
            aria-label={t("settings.vibrationSection")}
          />
        </GlassCard>

        <GlassCard className="flex items-center justify-between gap-3 opacity-70">
          <div className="flex items-center gap-3">
            <SettingsIconBadge icon={Moon} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-text">{t("settings.themeSection")}</span>
              <span className="text-xs text-text-secondary">{t("settings.themeHint")}</span>
            </div>
          </div>
          <span className="file-label">{t("settings.themeValue")}</span>
        </GlassCard>
      </div>

      <div className="flex flex-col gap-2">
        <SecondaryButton icon={RotateCcw} onClick={handleReset} fullWidth>
          {t("settings.resetButton")}
        </SecondaryButton>
        {justReset && <p className="text-center text-xs text-primary-light">{t("settings.resetDone")}</p>}
      </div>

      <div className="flex flex-col items-center gap-0.5 pb-2 pt-4 text-center">
        <span className="font-display text-sm font-semibold tracking-[0.1em] text-text-secondary">DOSSIER</span>
        <span className="text-xs text-text-secondary/70">{t("about.version")}</span>
      </div>
    </PageContainer>
  );
}

function SettingsIconBadge({ icon: Icon }: { icon: typeof Languages }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card/60">
      <Icon className="h-4 w-4 text-text-secondary" strokeWidth={1.75} />
    </div>
  );
}
