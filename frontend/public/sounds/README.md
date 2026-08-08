# DOSSIER UI sounds

Drop finished audio files directly into this folder using **exactly** these
filenames. Nothing else needs to change — no imports, no code edits. The
app already calls `audioManager.play("<key>")` (see
`src/lib/audioManager.ts`) at the right moments; it just no-ops silently
today because these files don't exist yet.

| Filename            | Used for                                                  |
|----------------------|------------------------------------------------------------|
| `click.mp3`          | Generic button press (PrimaryButton, SecondaryButton)     |
| `paper-open.mp3`     | Opening a case from the archive                            |
| `clue-reveal.mp3`    | A new investigation clue appearing                          |
| `transition.mp3`     | Moving between major phases (briefing → investigation, etc.)|
| `killer-reveal.mp3`  | The ending screen's killer reveal                           |

Guidelines for the actual assets (when you have them):
- Short — under ~1.5s for UI accents (click/paper-open/transition), up to
  ~2.5s is fine for the two "big moment" reveals (clue-reveal,
  killer-reveal).
- `.mp3` is assumed by the filenames above; if you'd rather ship `.ogg`/
  `.wav`, update the extensions in `SOUND_FILES` in
  `src/lib/audioManager.ts` to match — that's the one place they're listed.
- Keep them quiet/subtle by design — the app already sets a conservative
  default volume per sound in `audioManager.ts` (`DEFAULT_VOLUME`); adjust
  those numbers to taste once real audio is in place, rather than mastering
  the files unusually loud.
