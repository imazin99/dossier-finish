import { Lock, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GlassCard } from "./surfaces/GlassCard";
import { BadgeBase } from "./badges/BadgeBase";

interface ComingSoonCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

/**
 * Card for a feature or piece of content that exists conceptually but
 * isn't unlocked/built yet — distinct from the router's temporary
 * placeholder screens. Muted styling (no hover-lift) signals it isn't tappable.
 */
export function ComingSoonCard({ title, description, icon: Icon = Lock, className }: ComingSoonCardProps) {
  const { t } = useTranslation();

  return (
    <GlassCard className={className}>
      <div className="flex min-h-[50dvh] flex-col items-center justify-center gap-4 py-6 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border/60 bg-card/60">
          <div className="absolute inset-0 rounded-full bg-primary/5 blur-md" />
          <Icon className="relative h-6 w-6 text-text-secondary" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-lg font-semibold text-text">{title}</h3>
          {description && (
            <p className="max-w-[20rem] text-sm leading-relaxed text-text-secondary">{description}</p>
          )}
        </div>
        <BadgeBase tone="accent">{t("common.comingSoon")}</BadgeBase>
      </div>
    </GlassCard>
  );
}
