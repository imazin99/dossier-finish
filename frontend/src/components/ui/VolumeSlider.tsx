import { cn } from "@lib/utils";

interface VolumeSliderProps {
  /** 0–1 */
  value: number;
  onChange: (value: number) => void;
  "aria-label": string;
  disabled?: boolean;
  className?: string;
}

/**
 * A themed 0–1 range slider — the volume-control equivalent of
 * ToggleSwitch. A native <input type="range"> under the hood (free
 * keyboard support, screen-reader semantics, and touch dragging on
 * mobile), styled via the `.dossier-slider` class in styles/globals.css.
 */
export function VolumeSlider({ value, onChange, disabled, className, ...props }: VolumeSliderProps) {
  return (
    <input
      type="range"
      min={0}
      max={100}
      step={1}
      value={Math.round(value * 100)}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value) / 100)}
      className={cn("dossier-slider", disabled && "opacity-40", className)}
      {...props}
    />
  );
}
