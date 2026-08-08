import { HelpCircle } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageContainer, GlassCard, PrimaryButton, SecondaryButton } from "@components/ui";
import { useCases } from "@context/CasesContext";
import { ROUTES, buildInvestigationPath, buildEndingPath } from "@/router/paths";
import { useGameSession } from "@/features/game-session/GameSessionContext";

/**
 * Shown after a round's vote, when the eliminated suspect was NOT the
 * actual killer. Asks players whether they believe the killer is already
 * out. If they think so, or if there are no more clues left to reveal,
 * the game ends here. Otherwise, the next (clearer) clue is revealed and
 * investigation continues.
 */
export function EliminationCheckScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();
  const { currentRound, advanceRound } = useGameSession();

  const { caseSummaries } = useCases();
  const data = caseSummaries.find((c) => c.id === caseId);
  if (!data) {
    return <Navigate to={ROUTES.cases} replace />;
  }

  const hasMoreClues = currentRound < data.progressiveClues.length;

  const handleYes = () => navigate(buildEndingPath(caseId ?? ""));

  const handleContinue = () => {
    if (hasMoreClues) {
      advanceRound();
      navigate(buildInvestigationPath(caseId ?? ""));
    } else {
      // No more clues to reveal — the case ends regardless of the answer.
      navigate(buildEndingPath(caseId ?? ""));
    }
  };

  return (
    <PageContainer>
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-card/60">
          <HelpCircle className="h-5 w-5 text-text-secondary" strokeWidth={1.75} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="file-label">{t("investigation.evidenceEyebrow")}</span>
          <h1 className="font-display text-xl font-bold tracking-tight text-text">
            {t("eliminationCheck.question")}
          </h1>
        </div>

        <GlassCard className="w-full">
          <p className="text-sm leading-relaxed text-text-secondary">
            {hasMoreClues ? t("eliminationCheck.moreCluesHint") : t("eliminationCheck.noMoreCluesHint")}
          </p>
        </GlassCard>

        <div className="flex w-full flex-col gap-3">
          <PrimaryButton fullWidth haptic onClick={handleYes}>
            {t("eliminationCheck.yesOption")}
          </PrimaryButton>
          <SecondaryButton fullWidth onClick={handleContinue}>
            {hasMoreClues ? t("eliminationCheck.noOption") : t("eliminationCheck.endOption")}
          </SecondaryButton>
        </div>
      </div>
    </PageContainer>
  );
}
