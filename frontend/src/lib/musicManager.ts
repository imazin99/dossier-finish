/**
 * DOSSIER background music system — architecture only; no bundled audio
 * file ships with this change (see below for exactly where to add one).
 *
 * HOW TO ADD THE REAL TRACK:
 * Drop a single audio file at `frontend/public/music/theme.mp3` (see the
 * README in that folder). That's the entire integration step — nothing
 * in this file, or anywhere else in the app, needs to change.
 *
 * WHY A SEPARATE SYSTEM FROM lib/audioManager.ts:
 * audioManager plays short, one-shot UI accents (click, paper-open,
 * etc.) — fire-and-forget, always at a fixed default volume, muted as a
 * group by the existing Sound Effects toggle. Music is a single
 * continuous, LOOPING track, independently volume-controlled (0–1, via
 * Settings' Music Volume slider), and needs its own play/pause
 * lifecycle. Reusing audioManager's per-key cache-and-play model doesn't
 * fit either shape, so this is a small, parallel manager instead — the
 * two never touch the same <audio> element, so one can never interrupt
 * or be muted by the other.
 *
 * WHY public/music/ AND NOT src/assets/:
 * Same reasoning as public/sounds/ — referenced by a root-absolute path
 * string at runtime, not an ES module import, so Vite copies it byte-
 * for-byte to the build output whether or not the file exists yet. A
 * missing file is just a 404 the manager catches and treats as
 * "unplayable for this session" — the app never throws or shows an
 * error for it.
 *
 * WHY THIS SHAPE WORKS FOR ANDROID/CAPACITOR LATER:
 * Plain HTMLAudioElement + a file living under public/ — no browser-only
 * Web Audio API graph, no assumptions beyond what a Capacitor WebView
 * already supports. `npx cap sync` copies public/ into the native app
 * bundle as-is, so the exact same file/path keeps working offline with
 * no code change when that phase starts.
 *
 * AUTOPLAY: play() is safe to call before any user gesture — if the
 * browser blocks it, the rejected promise is swallowed and playback
 * simply doesn't start yet. Call play() again from inside a real user
 * interaction handler to actually unlock it (see context/SettingsContext.tsx,
 * which does exactly this once, on the first pointer/key interaction).
 */

const MUSIC_SRC = "/music/theme.mp3";

class MusicManager {
  private audio: HTMLAudioElement | null = null;
  private unplayable = false;
  private volume = 0.5;
  /** Whether the app currently *wants* music playing — distinct from
   * whether it's actually audible right now (volume may be 0, or
   * autoplay may still be blocked pending a user gesture). */
  private wantsToPlay = false;

  private ensureAudio(): HTMLAudioElement | null {
    if (this.unplayable) return null;
    if (this.audio) return this.audio;
    if (typeof window === "undefined") return null;

    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = this.volume;
    audio.addEventListener(
      "error",
      () => {
        // No file at public/music/theme.mp3 yet (or it failed to decode) —
        // stop trying for the rest of the session, silently.
        this.unplayable = true;
        this.audio = null;
      },
      { once: true }
    );
    this.audio = audio;
    return audio;
  }

  /** 0–1. Setting it to 0 pauses playback outright rather than playing silently. */
  setVolume(volume: number) {
    this.volume = Math.min(1, Math.max(0, volume));
    if (this.audio) this.audio.volume = this.volume;

    if (this.volume <= 0) {
      this.audio?.pause();
    } else if (this.wantsToPlay) {
      this.play();
    }
  }

  getVolume() {
    return this.volume;
  }

  /**
   * Starts (or resumes) the loop. Always safe to call — a no-op if
   * already playing, muted (volume 0), or the file is missing/unplayable;
   * silently does nothing if the browser's autoplay policy blocks it
   * (call again from within a real user-interaction handler to unlock).
   */
  play() {
    this.wantsToPlay = true;
    if (this.volume <= 0) return;

    const audio = this.ensureAudio();
    if (!audio) return;

    audio.volume = this.volume;
    void audio.play().catch(() => {
      // Autoplay-policy block or decode failure — never throw into caller
      // code; the next unlock attempt (e.g. first user interaction) retries.
    });
  }

  pause() {
    this.wantsToPlay = false;
    this.audio?.pause();
  }

  isPlaying(): boolean {
    return !!this.audio && !this.audio.paused;
  }
}

/** Single shared instance — one looping track for the whole app session. */
export const musicManager = new MusicManager();
