import { TriangleAlert } from "lucide-react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/LanguageContext";
import {
  PageContainer,
  SectionTitle,
  GlassCard,
  CaseBadge,
  DifficultyBadge,
  PlayersBadge,
  TimeBadge,
  PrimaryButton,
  BulletList,
} from "@components/ui";
import { BadgeBase } from "@components/ui/badges/BadgeBase";
import { useCases } from "@context/CasesContext";
import { CASE_PLAYER_RANGE } from "@/types/case";
import { ROUTES, buildChoosePlayersPath } from "@/router/paths";
import { PosterHero } from "./components/PosterHero";
import { BriefingInfoRow } from "@/features/briefing/components/BriefingInfoRow";

/**
 * Case Details screen — reached by tapping a case card on Home.
 * Pure display: no gameplay logic. Case data comes from the Case Manager
 * API (published cases only), already loaded via CasesContext by the
 * time this screen renders, matched here by the :caseId route param.
 */
export function CaseDetailsScreen() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { caseSummaries } = useCases();

  const data = caseSummaries.find((c) => c.id === caseId);

  // Unknown/removed case id — fall back to the archive rather than a dead page.
  if (!data) {
    return <Navigate to={ROUTES.cases} replace />;
  }

  return (
    <PageContainer>
      <PosterHero icon={data.posterIcon} image={data.coverImage} onBack={() => navigate(-1)} />

      <div className="flex flex-col gap-3">
        <CaseBadge number={data.number} className="w-fit" />
        <h1 className="font-display text-2xl font-bold text-text">{data.title[language]}</h1>

        <div className="flex flex-wrap items-center gap-1.5">
          <DifficultyBadge level={data.difficulty} />
          <PlayersBadge count={CASE_PLAYER_RANGE} />
          <TimeBadge minutes={data.minutes} />
          <BadgeBase>{data.category[language]}</BadgeBase>
        </div>

        <p className="text-sm text-text-secondary">{data.description[language]}</p>
      </div>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("caseDetails.story")} />
        <GlassCard>
          <p className="text-sm leading-relaxed text-text-secondary">{data.story[language]}</p>
        </GlassCard>
      </div>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("caseDetails.caseFileLabel")} />
        <GlassCard>
          <p className="mb-1 text-sm leading-relaxed text-text-secondary">
            {data.briefing.crimeDescription[language]}
          </p>
          <div className="flex flex-col divide-y divide-border/60 border-t border-border/60 pt-1">
            <BriefingInfoRow label={t("briefing.victimLabel")} value={data.briefing.victim[language]} />
            <BriefingInfoRow label={t("briefing.locationLabel")} value={data.briefing.location[language]} />
            <BriefingInfoRow label={t("briefing.timeLabel")} value={data.briefing.timeOfCrime[language]} />
          </div>
        </GlassCard>
      </div>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("caseDetails.mission")} />
        <GlassCard>
          <BulletList items={data.objectives} />
        </GlassCard>
      </div>

      {data.warning && (
        <GlassCard className="border-primary/30 shadow-accent-glow">
          <div className="flex items-start gap-2.5">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" strokeWidth={1.75} />
            <div className="flex flex-col gap-1">
              <span className="file-label">{t("caseDetails.warning")}</span>
              <p className="text-sm text-text-secondary">{data.warning[language]}</p>
            </div>
          </div>
        </GlassCard>
      )}

      <PrimaryButton
        fullWidth
        className="mb-2"
        onClick={() => navigate(buildChoosePlayersPath(data.id))}
      >
        {t("common.startInvestigation")}
      </PrimaryButton>
    </PageContainer>
  );
}
