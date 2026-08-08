import { UserRound } from "lucide-react";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GlassCard } from "@components/ui";

interface PlayerCardProps {
  index: number;
  name: string;
  onNameChange: (name: string) => void;
  variants?: Variants;
}

/**
 * One player's row: number, avatar placeholder (initial letter once a name
 * is entered, otherwise a generic icon — no real images), and an editable
 * name field pre-filled with a sensible default.
 */
export function PlayerCard({ index, name, onNameChange, variants }: PlayerCardProps) {
  const { t } = useTranslation();
  const trimmed = name.trim();
  const initial = trimmed.charAt(0).toUpperCase();

  return (
    <GlassCard padding="sm" variants={variants} className="flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background/60">
        {trimmed ? (
          <span className="font-display text-lg font-bold text-primary-light">{initial}</span>
        ) : (
          <UserRound className="h-5 w-5 text-text-secondary/70" strokeWidth={1.75} />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="file-label">{t("choosePlayers.playerLabel", { n: index + 1 })}</span>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder={t("choosePlayers.namePlaceholder")}
          aria-label={t("choosePlayers.nameFieldLabel")}
          className="w-full rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-sm text-text placeholder:text-text-secondary/50 transition-shadow duration-200 focus:border-primary/50 focus:shadow-accent-glow focus:outline-none"
        />
      </div>
    </GlassCard>
  );
}
