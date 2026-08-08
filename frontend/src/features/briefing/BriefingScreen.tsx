import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/LanguageContext";
import { PageContainer, SectionTitle, GlassCard, CaseBadge, PrimaryButton } from "@components/ui";
import { useCases } from "@context/CasesContext";
import { ROUTES, buildInvestigationPath } from "@/router/paths";
import { BriefingInfoRow } from "./components/BriefingInfoRow";
import { SceneHero } from "./components/SceneHero";

/**
 * Case briefing screen — shown once, after every player has seen their
 * role, right before investigation gameplay begins. Case data comes from
 * the Case Manager API (published cases only), via CasesContext.
 */
export function BriefingScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();
  const { language } = useLanguage();

  const { caseSummaries } = useCases();
  const data = caseSummaries.find((c) => c.id === caseId);

  // Unknown/removed case id — fall back to the archive rather than a dead page.
  if (!data) {
    return <Navigate to={ROUTES.cases} replace />;
  }

  const { briefing } = data;

  return (
    <PageContainer>
      <SceneHero image={data.locationImage} />

      <div className="flex flex-col items-center gap-3 pt-2 text-center">
        <CaseBadge number={data.number} />
        <h1 className="font-display text-2xl font-bold text-text">{data.title[language]}</h1>
      </div>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("briefing.crimeLabel")} />
        <GlassCard>
          <p className="text-sm leading-relaxed text-text-secondary">
            {briefing.crimeDescription[language]}
          </p>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="flex flex-col divide-y divide-border/60">
          <BriefingInfoRow label={t("briefing.victimLabel")} value={briefing.victim[language]} />
          <BriefingInfoRow label={t("briefing.locationLabel")} value={briefing.location[language]} />
          <BriefingInfoRow label={t("briefing.timeLabel")} value={briefing.timeOfCrime[language]} />
        </div>
      </GlassCard>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("briefing.objectiveLabel")} />
        <GlassCard>
          <p className="text-sm leading-relaxed text-text-secondary">{briefing.objective[language]}</p>
        </GlassCard>
      </div>

      <PrimaryButton
        fullWidth
        className="mb-2"
        onClick={() => navigate(buildInvestigationPath(caseId ?? ""))}
      >
        {t("common.startInvestigation")}
      </PrimaryButton>
    </PageContainer>
  );
}
