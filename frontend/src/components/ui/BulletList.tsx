import { CircleCheck, type LucideIcon } from "lucide-react";
import { useLanguage } from "@context/LanguageContext";
import type { LocalizedText } from "@/types/localized";
import { cn } from "@lib/utils";

interface BulletListProps {
  items: LocalizedText[];
  icon?: LucideIcon;
  className?: string;
}

/**
 * Generic bulleted list of localized lines, each with a small leading icon.
 * Used for mission objectives, known information, relationships — any
 * short list of display-only text. Not tied to any completion state.
 */
export function BulletList({ items, icon: Icon = CircleCheck, className }: BulletListProps) {
  const { language } = useLanguage();

  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" strokeWidth={1.75} />
          <span className="text-sm text-text">{item[language]}</span>
        </li>
      ))}
    </ul>
  );
}
