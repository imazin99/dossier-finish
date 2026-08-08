import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { audioManager } from "@lib/audioManager";
import { hapticManager } from "@lib/hapticManager";
import { musicManager } from "@lib/musicManager";

interface SettingsState {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  /** 0–1. Independent of soundEnabled — that toggle only covers the
   * short UI sound effects (lib/audioManager.ts), not the background
   * music track. 0 means muted; the slider goes all the way down to it. */
  musicVolume: number;
}

interface SettingsContextValue extends SettingsState {
  toggleSound: () => void;
  toggleVibration: () => void;
  setMusicVolume: (volume: number) => void;
  /** Resets ONLY local preferences (sound, vibration, music volume).
   * Never touches game data, cases, or anything else stored by the app.
   * Language is reset separately by the caller via useLanguage(), since
   * it lives in its own context/localStorage key. */
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

const STORAGE_KEY = "dossier_settings";

const DEFAULT_SETTINGS: SettingsState = {
  soundEnabled: true,
  vibrationEnabled: true,
  musicVolume: 0.5,
};

function readStoredSettings(): SettingsState {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      soundEnabled: typeof parsed.soundEnabled === "boolean" ? parsed.soundEnabled : DEFAULT_SETTINGS.soundEnabled,
      vibrationEnabled:
        typeof parsed.vibrationEnabled === "boolean" ? parsed.vibrationEnabled : DEFAULT_SETTINGS.vibrationEnabled,
      musicVolume:
        typeof parsed.musicVolume === "number" && parsed.musicVolume >= 0 && parsed.musicVolume <= 1
          ? parsed.musicVolume
          : DEFAULT_SETTINGS.musicVolume,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/**
 * Wraps the app and owns sound/vibration/music preferences — the same
 * role LanguageProvider plays for language/direction. Any component
 * reads or changes these via useSettings() rather than touching
 * localStorage, audioManager, hapticManager, or musicManager directly.
 */
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SettingsState>(readStoredSettings);

  // Keep the actual playback systems (audioManager / hapticManager /
  // musicManager) in sync with the stored preference — this is the ONLY
  // place any of them gets toggled, so every call site elsewhere in the
  // app stays a simple, unconditional call.
  useEffect(() => {
    audioManager.setMuted(!settings.soundEnabled);
    hapticManager.setEnabled(settings.vibrationEnabled);
    musicManager.setVolume(settings.musicVolume);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Background music autoplay: try immediately (works on some browsers,
  // e.g. after a same-site navigation), and — since most browsers block
  // audio before any user gesture — also retry once on the very first
  // pointer/keyboard interaction anywhere in the app. This runs once for
  // the whole session, not per-screen, so navigating around the app
  // never re-triggers or restarts the track.
  useEffect(() => {
    musicManager.play();

    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      musicManager.play();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSound = () => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }));
  const toggleVibration = () => setSettings((s) => ({ ...s, vibrationEnabled: !s.vibrationEnabled }));
  const setMusicVolume = (musicVolume: number) =>
    setSettings((s) => ({ ...s, musicVolume: Math.min(1, Math.max(0, musicVolume)) }));
  const resetSettings = () => setSettings(DEFAULT_SETTINGS);

  const value = useMemo(
    () => ({ ...settings, toggleSound, toggleVibration, setMusicVolume, resetSettings }),
    [settings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within a SettingsProvider");
  return ctx;
}
