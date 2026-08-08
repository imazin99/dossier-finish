import type { LocalizedText } from "@/types/localized";
import { cn } from "@lib/utils";

const baseFieldClasses =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3.5 py-2.5 text-sm text-text " +
  "placeholder:text-text-secondary/60 outline-none transition-colors focus:border-primary-light/70";

interface FieldShellProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FieldShell({ label, required, hint, children, className }: FieldShellProps) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="file-label flex items-center gap-1.5">
        {label}
        {required && <span className="text-primary-light">*</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-text-secondary">{hint}</span>}
    </label>
  );
}

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  type?: "text" | "number" | "password";
}

export function TextInput({ label, value, onChange, required, hint, placeholder, type = "text" }: TextInputProps) {
  return (
    <FieldShell label={label} required={required} hint={hint}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={baseFieldClasses}
      />
    </FieldShell>
  );
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  className?: string;
}

export function SelectInput({ label, value, onChange, options, required, className }: SelectInputProps) {
  return (
    <FieldShell label={label} required={required} className={className}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={cn(baseFieldClasses, "appearance-none")}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-card text-text">
            {opt.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

interface LocalizedInputProps {
  label: string;
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  hint?: string;
}

/**
 * The core bilingual field — every piece of player-facing case content is
 * authored in Arabic and English side by side, since both are shipped.
 */
export function LocalizedInput({ label, value, onChange, required, multiline, rows = 3, hint }: LocalizedInputProps) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <FieldShell label={label} required={required} hint={hint}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-wide text-text-secondary/70">العربية (AR)</span>
          <Tag
            dir="rtl"
            rows={multiline ? rows : undefined}
            value={value.ar}
            onChange={(e) => onChange({ ...value, ar: e.target.value })}
            className={cn(baseFieldClasses, "text-right font-body")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-wide text-text-secondary/70">English (EN)</span>
          <Tag
            dir="ltr"
            rows={multiline ? rows : undefined}
            value={value.en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            className={cn(baseFieldClasses, "text-left")}
          />
        </div>
      </div>
    </FieldShell>
  );
}

export const emptyLocalizedText: LocalizedText = { ar: "", en: "" };
