import { useCallback } from "react";
import { audioManager, type SoundKey } from "@lib/audioManager";

/**
 * Component-facing wrapper around the shared audioManager (see
 * @lib/audioManager for the full "how to add real sounds" explanation).
 * Safe to call anywhere, anytime — every sound is a silent no-op until
 * real files are dropped into `public/sounds/`.
 */
export function useSoundEffect() {
  const play = useCallback((key: SoundKey, volumeOverride?: number) => {
    audioManager.play(key, volumeOverride);
  }, []);

  return { play };
}
