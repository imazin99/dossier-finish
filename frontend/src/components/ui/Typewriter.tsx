import { useEffect } from "react";
import { useTypewriter } from "@hooks/useTypewriter";
import { cn } from "@lib/utils";

interface TypewriterProps {
  text: string;
  speedMs?: number;
  className?: string;
  /** Called once, the moment the text finishes revealing. */
  onComplete?: () => void;
}

/**
 * Reserved for the app's important narrative beats — new clue text,
 * killer-reveal explanations, key investigation messages. NOT meant for
 * every paragraph (per the design brief): most body copy in the app
 * should keep rendering as plain text via the normal page-fade.
 */
export function Typewriter({ text, speedMs, className, onComplete }: TypewriterProps) {
  const { displayText, isComplete } = useTypewriter(text, { speedMs });

  useEffect(() => {
    if (isComplete) onComplete?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  return (
    <p className={cn("whitespace-pre-line", className)}>
      {displayText}
      {!isComplete && (
        <span
          aria-hidden="true"
          className="ms-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-primary-light align-middle"
        />
      )}
    </p>
  );
}
