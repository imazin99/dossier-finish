import { FileSearch } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/LanguageContext";
import { PageContainer, SectionTitle, GlassCard, CaseBadge, PrimaryButton, RevealStage, Typewriter } from "@components/ui";
import { useCases } from "@context/CasesContext";
import { ROUTES, buildDiscussionPath } from "@/router/paths";
import { BriefingInfoRow } from "@/features/briefing/components/BriefingInfoRow";
import { useGameSession } from "@/features/game-session/GameSessionContext";

/**
 * Investigation phase — case recap plus this round's single clue. Evidence
 * is no longer shown all at once: one progressively clearer clue is
 * revealed per round (see case.progressiveClues), keyed to whichever
 * killer candidate was actually selected this session. No voting/scoring
 * logic here — just the recap and the current clue.
 */
export function InvestigationScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { currentRound, selectedKillerId } = useGameSession();

  const { caseSummaries } = useCases();
  const data = caseSummaries.find((c) => c.id === caseId);

  if (!data) {
    return <Navigate to={ROUTES.cases} replace />;
  }

  const { briefing } = data;
  const clue = data.progressiveClues.find((c) => c.order === currentRound);
  const clueText = clue?.textByKiller[selectedKillerId];

  return (
    <PageContainer>
      <div className="flex flex-col gap-3">
        <SectionTitle eyebrow={t("investigation.recapEyebrow")} title={data.title[language]} />
        <GlassCard padding="sm" className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <CaseBadge number={data.number} />
          </div>
          <p className="text-sm leading-relaxed text-text-secondary">
            {briefing.crimeDescription[language]}
          </p>
          <div className="flex flex-col divide-y divide-border/60 border-t border-border/60 pt-1">
            <BriefingInfoRow label={t("briefing.victimLabel")} value={briefing.victim[language]} />
            <BriefingInfoRow label={t("briefing.locationLabel")} value={briefing.location[language]} />
            <BriefingInfoRow label={t("briefing.timeLabel")} value={briefing.timeOfCrime[language]} />
          </div>
        </GlassCard>
      </div>

      <div className="flex flex-col gap-3">
        <SectionTitle
          eyebrow={t("investigation.evidenceEyebrow")}
          title={t("investigation.roundTitle", { round: currentRound })}
          action={
            <div className="flex items-center gap-1.5">
              {data.progressiveClues.map((c) => (
                <span
                  key={c.id}
                  className={
                    c.order <= currentRound
                      ? "h-1.5 w-1.5 rounded-full bg-primary shadow-accent-glow"
                      : "h-1.5 w-1.5 rounded-full bg-border/70"
                  }
                />
              ))}
            </div>
          }
        />
        <GlassCard className="border-primary/30 shadow-accent-glow">
          <RevealStage haptic sound="clueReveal" revealKey={currentRound} className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <FileSearch className="h-4 w-4 text-primary-light" strokeWidth={1.75} />
            </div>
            {clueText?.[language] ? (
              <Typewriter key={currentRound} text={clueText[language]} className="pt-1.5 text-sm leading-relaxed text-text" />
            ) : (
              <p className="pt-1.5 text-sm leading-relaxed text-text">{t("investigation.noClue")}</p>
            )}
          </RevealStage>
        </GlassCard>
      </div>

      <PrimaryButton
        fullWidth
        sound="transition"
        className="mb-2"
        onClick={() => navigate(buildDiscussionPath(caseId ?? ""))}
      >
        {t("investigation.continueButton")}
      </PrimaryButton>
    </PageContainer>
  );
}
