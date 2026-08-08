import type { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@context/LanguageContext";
import { GlassCard, CaseBadge, DifficultyBadge, PlayersBadge, TimeBadge } from "@components/ui";
import { CASE_PLAYER_RANGE, type CaseSummary } from "@/types/case";
import { buildCaseDetailsPath } from "@/router/paths";
import { useSoundEffect } from "@hooks/useSoundEffect";

interface CaseCardProps {
  data: CaseSummary;
  variants?: Variants;
}

/**
 * One entry in the case archive — a premium "movie poster" style tile:
 * a large hero area on top (placeholder icon + glow, cinematic scrim),
 * a thin glowing red border around the whole card, and the case's title,
 * description, and stat badges below. Tapping it opens Case Details.
 */
export function CaseCard({ data, variants }: CaseCardProps) {
  const { language, direction } = useLanguage();
  const navigate = useNavigate();
  const { play } = useSoundEffect();
  const Icon = data.posterIcon;
  const badgeCorner = direction === "rtl" ? "right-3" : "left-3";

  const handleOpen = () => {
    play("paperOpen");
    navigate(buildCaseDetailsPath(data.id));
  };

  return (
    <GlassCard
      interactive
      padding="sm"
      variants={variants}
      className="flex flex-col gap-3 border-primary/20"
      onClick={handleOpen}
    >
      {/* Cover art — falls back to the placeholder icon treatment if a case has none */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-primary/25 shadow-accent-glow">
        {data.coverImage ? (
          <img
            src={data.coverImage}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-background/70" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute h-28 w-28 rounded-full bg-primary/10 blur-2xl" />
              <Icon className="relative h-12 w-12 text-text-secondary/60" strokeWidth={1.25} />
            </div>
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/45 to-transparent" />
        <div className={`absolute bottom-2.5 ${badgeCorner}`}>
          <CaseBadge number={data.number} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 px-0.5 pb-0.5">
        <h3 className="truncate font-display text-base font-bold text-text">
          {data.title[language]}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {data.description[language]}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <DifficultyBadge level={data.difficulty} />
          <PlayersBadge count={CASE_PLAYER_RANGE} />
          <TimeBadge minutes={data.minutes} />
        </div>
      </div>
    </GlassCard>
  );
}
