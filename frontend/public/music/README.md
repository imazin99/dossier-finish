# DOSSIER background music

Drop the finished background-music track directly into this folder using
**exactly** this filename. Nothing else needs to change — no imports, no
code edits.

| Filename      | Used for                                   |
|---------------|---------------------------------------------|
| `theme.mp3`   | The single looping background music track   |

The app already calls `musicManager.play()` at the right moments (see
`src/lib/musicManager.ts` and `src/context/SettingsContext.tsx`); it just
no-ops silently today because this file doesn't exist yet. Nothing is
broken by its absence — Settings still renders normally, and no error is
shown to the player.

Guidelines for the actual asset (when you have it):
- A track meant to **loop seamlessly** — the app sets `loop = true` on
  playback, so a clean loop point (no audible seam, no long fade-to-
  silence at the very end) matters more than length.
- Keep it mixed at a level that sits comfortably *under* dialogue/reading
  — this is ambient/atmosphere, not a focal element. The player's own
  Music Volume slider (Settings) is a multiplier on top of however loud
  the file itself is mastered, not a replacement for a sensible mix.
- `.mp3` is assumed by the filename above; if you'd rather ship `.ogg` or
  `.m4a`, update `MUSIC_SRC` in `src/lib/musicManager.ts` to match — that
  is the one place the filename/extension is referenced.
- Keep the file reasonably small (this ships to every player's device,
  web and eventually the Android/Capacitor build) — a well-encoded loop
  under a couple of MB is typically plenty for background music.
