import { useEffect, useRef, useState } from "react";

interface UseTypewriterOptions {
  /** Milliseconds between characters. Defaults to a brisk, readable pace. */
  speedMs?: number;
  /** Skip the animation entirely and show full text immediately. */
  disabled?: boolean;
}

interface UseTypewriterResult {
  /** The text to render right now (a growing prefix of the full string). */
  displayText: string;
  /** True once the full string has been revealed. */
  isComplete: boolean;
}

/**
 * Reveals `text` one character at a time. Restarts automatically whenever
 * `text` itself changes (e.g. a new clue each investigation round), so
 * callers never need to key/remount the consuming component manually.
 *
 * Respects `prefers-reduced-motion`: when the user has that OS/browser
 * setting on, the full text is shown immediately with no animation,
 * matching the reduced-motion handling already used for page/CSS
 * animations elsewhere in the app (see globals.css).
 */
export function useTypewriter(text: string, options: UseTypewriterOptions = {}): UseTypewriterResult {
  const { speedMs = 18, disabled = false } = options;
  const [displayText, setDisplayText] = useState("");
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  useEffect(() => {
    if (disabled || prefersReducedMotion.current) {
      setDisplayText(text);
      return;
    }

    setDisplayText("");
    if (!text) return;

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speedMs);

    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speedMs, disabled]);

  return { displayText, isComplete: displayText.length >= text.length };
}
