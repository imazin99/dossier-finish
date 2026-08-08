/**
 * DOSSIER UI sound system — architecture only, no bundled audio.
 *
 * HOW TO ADD REAL SOUNDS:
 * Drop audio files into `frontend/public/sounds/` using the exact
 * filenames listed in SOUND_FILES below (see the README in that folder).
 * That's the entire integration step — nothing in this file, or in any
 * component that calls useSoundEffect/playSound, needs to change.
 *
 * WHY public/ AND NOT src/assets/:
 * Files here are referenced by a root-absolute path string (e.g.
 * "/sounds/click.mp3"), resolved at runtime, not imported as ES modules.
 * Vite only bundles/hashes an asset it can statically see at build time
 * (a literal `import x from "./file.mp3"`, or a literal path passed
 * directly to `new URL(...)`) — a path built from a variable, like the
 * SOUND_FILES lookup below, is invisible to that analysis. Anything in
 * `public/` sidesteps the problem entirely: Vite copies it to the build
 * output byte-for-byte and serves it at the same absolute path in both
 * dev and prod, whether or not any file exists there yet. This mirrors
 * how `noise.png` is already referenced from `tailwind.config.ts`.
 *
 * WHY LOOKUP-BY-KEY:
 * Every failure mode — file not present yet (true today), 404, decode
 * error, autoplay-policy block — is caught and swallowed, so the whole
 * sound system is a pure enhancement: with zero audio files in
 * `public/sounds/`, every call below is a silent, costless no-op.
 */

export type SoundKey =
  | "click" // generic button press
  | "paperOpen" // opening a case / navigating into detail-like content
  | "clueReveal" // a new investigation clue appearing
  | "transition" // moving between major phases (briefing -> investigation, etc.)
  | "killerReveal"; // the ending's killer reveal moment

/**
 * One root-absolute path per sound, served straight from
 * `frontend/public/sounds/`. Keep this the single source of truth for
 * filenames — the README in that folder mirrors it for humans.
 */
const SOUND_FILES: Record<SoundKey, string> = {
  click: "/sounds/click.mp3",
  paperOpen: "/sounds/paper-open.mp3",
  clueReveal: "/sounds/clue-reveal.mp3",
  transition: "/sounds/transition.mp3",
  killerReveal: "/sounds/killer-reveal.mp3",
};

/** Default playback volume per sound — quiet, UI-accent level, never jarring. */
const DEFAULT_VOLUME: Record<SoundKey, number> = {
  click: 0.35,
  paperOpen: 0.4,
  clueReveal: 0.5,
  transition: 0.4,
  killerReveal: 0.55,
};

class AudioManager {
  private cache = new Map<SoundKey, HTMLAudioElement | null>();
  private mutedByUser = false;

  /** Global mute toggle — wire up to a future Settings screen switch. */
  setMuted(muted: boolean) {
    this.mutedByUser = muted;
  }

  isMuted() {
    return this.mutedByUser;
  }

  /**
   * Plays a UI sound by key. Resolves the file lazily on first use; a
   * failed load (404 today, since no files ship yet) marks the key as
   * permanently unplayable for the session so it never retries/errors
   * repeatedly — this is caught and swallowed silently.
   */
  play(key: SoundKey, volumeOverride?: number) {
    if (this.mutedByUser) return;
    if (typeof window === "undefined") return;

    try {
      let audio = this.cache.get(key);

      if (audio === undefined) {
        audio = new Audio(SOUND_FILES[key]);
        audio.preload = "auto";
        audio.addEventListener(
          "error",
          () => {
            this.cache.set(key, null);
          },
          { once: true }
        );
        this.cache.set(key, audio);
      }

      if (!audio) return; // previously failed to load — no-op

      audio.volume = volumeOverride ?? DEFAULT_VOLUME[key];
      // Restart from the beginning if it's already mid-playback (rapid
      // repeat presses shouldn't queue up overlapping tails).
      audio.currentTime = 0;
      void audio.play().catch(() => {
        // Autoplay-policy or decode failures — never throw into caller code.
      });
    } catch {
      // Defensive: never let sound playback break the interaction it's
      // attached to.
    }
  }
}

/** Single shared instance — sounds are cached per key across the whole app. */
export const audioManager = new AudioManager();
