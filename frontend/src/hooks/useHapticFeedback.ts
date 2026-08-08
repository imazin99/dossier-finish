import { useCallback } from "react";
import { hapticManager } from "@lib/hapticManager";

/**
 * Named haptic intensities used across the app. Kept to a very small,
 * consistent vocabulary — DOSSIER should never buzz aggressively.
 *
 *  - "tap"     — a barely-there tick for routine confirmations (vote
 *                submitted, "I'm done", elimination-check answer).
 *  - "reveal"  — a slightly longer, still-light pulse for the three big
 *                cinematic beats: role reveal, clue reveal, killer reveal.
 */
const HAPTIC_PATTERNS: Record<"tap" | "reveal", number | number[]> = {
  tap: 10,
  reveal: [12, 40, 16],
};

/**
 * Wraps the browser Vibration API. Every call is a safe no-op where the
 * API is unsupported (desktop browsers, iOS Safari as of this writing) —
 * there is no fallback and nothing to configure; it either lightly buzzes
 * on supported Android/mobile browsers, or silently does nothing. Also a
 * no-op whenever the player has turned vibration off in Settings (see
 * lib/hapticManager.ts).
 *
 * Deliberately NOT gated on prefers-reduced-motion: that preference is
 * about animation/motion, not haptics, and the patterns here are already
 * about as light as the API allows.
 */
export function useHapticFeedback() {
  const trigger = useCallback((pattern: "tap" | "reveal" = "tap") => {
    if (!hapticManager.isEnabled()) return;
    if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
    try {
      navigator.vibrate(HAPTIC_PATTERNS[pattern]);
    } catch {
      // Some browsers throw if called outside a user gesture — never let
      // a haptic failure break the actual interaction.
    }
  }, []);

  return { trigger };
}
