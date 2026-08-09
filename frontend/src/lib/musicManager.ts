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
 *
 * LIFECYCLE (single source of truth — nowhere else in the app calls
 * .pause()/.play() on an <audio> element directly):
 * - Route-driven play/fadeOut: RootLayout calls play() while on a menu
 *   screen (Home, Case Details, How To Play, Settings, About) and
 *   fadeOut() the moment the route moves into the actual game flow
 *   (Choose Players onward). See RootLayout.tsx.
 * - App backgrounded/exited: this class listens for `visibilitychange`
 *   and `pagehide` ITSELF, once, for the whole session — not from a
 *   React effect — so it can never be missed by a component unmounting
 *   at the wrong time or a StrictMode double-invoke. Backgrounding
 *   pauses immediately (no fade: the WebView can be suspended by the OS
 *   moments after hiding, so a multi-frame fade isn't reliable there);
 *   returning to the foreground resumes ONLY if music was actually
 *   playing (not just faded out) right before it was hidden.
 */

const MUSIC_SRC = "/music/theme.mp3";
const DEFAULT_FADE_MS = 1500;
const FADE_STEP_MS = 50;

class MusicManager {
  private audio: HTMLAudioElement | null = null;
  private unplayable = false;
  private volume = 0.5;
  /** Whether the app currently *wants* music playing — distinct from
   * whether it's actually audible right now (volume may be 0, or
   * autoplay may still be blocked pending a user gesture). */
  private wantsToPlay = false;
  /** Active fade-out timer, if one is in progress — cancelled by any
   * subsequent play()/pause()/fadeOut() so calls never race each other. */
  private fadeInterval: ReturnType<typeof setInterval> | null = null;
  /** Set right before an OS-level backgrounding pause, so returning to
   * the foreground can resume ONLY if music was genuinely playing (not
   * mid-game, already faded out) beforehand. */
  private resumeOnForeground = false;

  constructor() {
    if (typeof document === "undefined") return;
    // Backgrounded (Android: app switched away/minimized; browser: tab
    // hidden) or the page is being torn down — stop immediately. Using
    // the Page Visibility API rather than anything Capacitor-specific:
    // it's the standard mechanism a WebView's document already exposes,
    // so this needed no native/Capacitor config changes.
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.resumeOnForeground = this.wantsToPlay && this.volume > 0;
        this.clearFade();
        this.audio?.pause();
      } else if (this.resumeOnForeground) {
        this.resumeOnForeground = false;
        this.play();
      }
    });
    window.addEventListener("pagehide", () => {
      this.clearFade();
      this.audio?.pause();
    });
  }

  private clearFade() {
    if (this.fadeInterval !== null) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
  }

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
    this.clearFade();
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
    this.clearFade();
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
    this.clearFade();
    this.wantsToPlay = false;
    this.audio?.pause();
  }

  /**
   * Smoothly ramps volume down to 0 over `durationMs`, then pauses —
   * for the deliberate, cinematic "entering a case" transition. Distinct
   * from setVolume(): this only animates the underlying <audio> element's
   * playback volume, it never touches the user's configured Settings
   * volume, so the next play() correctly resumes at their real preference.
   * Safe to call repeatedly (e.g. rapid navigation) — replaces any fade
   * already in progress rather than stacking intervals.
   */
  fadeOut(durationMs: number = DEFAULT_FADE_MS) {
    this.clearFade();
    this.wantsToPlay = false;

    const audio = this.audio;
    if (!audio || audio.paused) return;

    const startVolume = audio.volume;
    if (startVolume <= 0) {
      audio.pause();
      return;
    }

    const steps = Math.max(1, Math.round(durationMs / FADE_STEP_MS));
    let step = 0;
    this.fadeInterval = setInterval(() => {
      step += 1;
      const progress = step / steps;
      if (progress >= 1) {
        this.clearFade();
        audio.pause();
        audio.volume = this.volume; // restore for the next play()
        return;
      }
      audio.volume = startVolume * (1 - progress);
    }, FADE_STEP_MS);
  }

  isPlaying(): boolean {
    return !!this.audio && !this.audio.paused;
  }
}

/** Single shared instance — one looping track for the whole app session. */
export const musicManager = new MusicManager();
