/**
 * DOSSIER haptic mute flag — mirrors lib/audioManager.ts's `setMuted`/
 * `isMuted` shape on purpose, so the two "feedback channels" (sound,
 * vibration) are toggled the exact same way from Settings. See
 * hooks/useHapticFeedback.ts for where this is actually consulted.
 */
class HapticManager {
  private enabled = true;

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export const hapticManager = new HapticManager();
