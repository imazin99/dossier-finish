import { Skull, CircleCheck, ShieldCheck } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/LanguageContext";
import {
  PageContainer,
  SectionTitle,
  GlassCard,
  BulletList,
  PrimaryButton,
  SecondaryButton,
  RevealStage,
  Typewriter,
} from "@components/ui";
import { useCases } from "@context/CasesContext";
import { ROUTES, buildChoosePlayersPath } from "@/router/paths";
import { useGameSession } from "@/features/game-session/GameSessionContext";

/**
 * The final screen — the real killer, why they did it, which clues proved
 * it (only the ones actually revealed this game), and why any other
 * eliminated suspects were actually innocent. No scoring/achievements
 * yet, just the explanation. Play Again restarts this case's player
 * setup; Choose Another Case goes back to the archive.
 */
export function EndingScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { playerNames, assignedRoles, selectedKillerId, eliminatedIndices, currentRound } =
    useGameSession();

  const { caseSummaries } = useCases();
  const data = caseSummaries.find((c) => c.id === caseId);
  if (!data) {
    return <Navigate to={ROUTES.cases} replace />;
  }

  const killerPlayerIndex = assignedRoles.findIndex((role) => role.id === selectedKillerId);
  const killerPlayerName = playerNames[killerPlayerIndex];
  const killerRole = assignedRoles[killerPlayerIndex];

  const killerExplanation = data.solution.killerExplanationByCandidate[selectedKillerId];

  // Only clues that were actually revealed this game (rounds up to currentRound).
  const revealedClues = data.progressiveClues
    .filter((clue) => clue.order <= currentRound)
    .map((clue) => clue.textByKiller[selectedKillerId])
    .filter((text): text is NonNullable<typeof text> => Boolean(text));

  // Other eliminated suspects who were killer candidates (so an authored
  // innocence explanation exists) but weren't the actual killer.
  const clearedSuspects = eliminatedIndices
    .filter((index) => index !== killerPlayerIndex)
    .map((index) => {
      const role = assignedRoles[index];
      const explanation = data.solution.innocenceExplanationByCandidate[role?.id ?? ""];
      return explanation ? { name: playerNames[index], role, explanation } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <PageContainer>
      <RevealStage
        haptic
        sound="killerReveal"
        revealKey={selectedKillerId}
        className="spotlight-glow flex flex-col items-center gap-4 pb-2 pt-4 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10 shadow-accent-glow">
          <Skull className="h-7 w-7 text-primary-light" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span className="file-label">{t("ending.killerRevealTitle")}</span>
          <p className="text-sm text-text-secondary">{t("ending.killerRevealText")}</p>
          <h1 className="font-display text-2xl font-bold text-text">
            {killerPlayerName} <span className="text-text-secondary">({killerRole?.characterName[language]})</span>
          </h1>
        </div>
      </RevealStage>

      {killerExplanation && (
        <div className="flex flex-col gap-3">
          <SectionTitle title={t("ending.whyLabel")} />
          <GlassCard>
            <Typewriter
              key={selectedKillerId}
              text={killerExplanation[language]}
              className="text-sm leading-relaxed text-text-secondary"
            />
          </GlassCard>
        </div>
      )}

      {revealedClues.length > 0 && (
        <div className="flex flex-col gap-3">
          <SectionTitle title={t("ending.cluesLabel")} />
          <GlassCard>
            <BulletList items={revealedClues} icon={CircleCheck} />
          </GlassCard>
        </div>
      )}

      {clearedSuspects.length > 0 && (
        <div className="flex flex-col gap-3">
          <SectionTitle title={t("ending.clearedLabel")} />
          <GlassCard className="flex flex-col divide-y divide-border/60">
            {clearedSuspects.map(({ name, role, explanation }) => (
              <div key={name} className="flex flex-col gap-1.5 py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-text-secondary" strokeWidth={1.75} />
                  <span className="text-sm font-semibold text-text">
                    {name} ({role.characterName[language]})
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{explanation[language]}</p>
              </div>
            ))}
          </GlassCard>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <PrimaryButton fullWidth onClick={() => navigate(buildChoosePlayersPath(caseId ?? ""))}>
          {t("ending.playAgainButton")}
        </PrimaryButton>
        <SecondaryButton fullWidth className="mb-2" onClick={() => navigate(ROUTES.cases)}>
          {t("ending.chooseAnotherCaseButton")}
        </SecondaryButton>
      </div>
    </PageContainer>
  );
}
