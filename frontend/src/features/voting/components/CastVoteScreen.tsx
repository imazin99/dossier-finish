import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRound, CircleCheck } from "lucide-react";
import { PageContainer, GlassCard, PrimaryButton } from "@components/ui";
import { cn } from "@lib/utils";
import { useGameSession } from "@/features/game-session/GameSessionContext";
import { buildVotingHandoffPath, buildVotingResultsPath } from "@/router/paths";
import { useVoting } from "../VotingContext";

/**
 * The current player privately picks who they suspect (any player other
 * than themselves) and submits. Advances to the next voter's handoff, or
 * to the results screen if this was the last vote.
 */
export function CastVoteScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();
  const { playerNames, eliminatedIndices } = useGameSession();
  const { currentIndex, isLastPlayer, castVote, advance } = useVoting();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const suspects = playerNames
    .map((name, index) => ({ name, index }))
    .filter(({ index }) => index !== currentIndex && !eliminatedIndices.includes(index));

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    castVote(selectedIndex);

    if (isLastPlayer) {
      navigate(buildVotingResultsPath(caseId ?? ""));
    } else {
      advance();
      navigate(buildVotingHandoffPath(caseId ?? ""));
    }
  };

  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-2 pt-2 text-center">
        <h1 className="font-display text-2xl font-bold text-text">{t("voting.castTitle")}</h1>
        <p className="text-sm text-text-secondary">{t("voting.castSubtitle")}</p>
      </div>

      <div className="flex flex-col gap-3">
        {suspects.map(({ name, index }) => {
          const isSelected = selectedIndex === index;
          return (
            <GlassCard
              key={index}
              interactive
              padding="sm"
              onClick={() => setSelectedIndex(index)}
              className={cn("flex items-center gap-3", isSelected && "border-primary/50 shadow-accent-glow")}
            >
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-background/60",
                  isSelected ? "border-primary/50" : "border-border/60"
                )}
              >
                <UserRound
                  className={cn("h-5 w-5", isSelected ? "text-primary-light" : "text-text-secondary/70")}
                  strokeWidth={isSelected ? 2 : 1.75}
                />
              </div>
              <span className="flex-1 font-body text-sm font-medium text-text">{name}</span>
              {isSelected && (
                <CircleCheck className="h-5 w-5 shrink-0 text-primary-light" strokeWidth={2} />
              )}
            </GlassCard>
          );
        })}
      </div>

      <PrimaryButton fullWidth haptic disabled={selectedIndex === null} className="mb-2" onClick={handleSubmit}>
        {t("voting.submitButton")}
      </PrimaryButton>
    </PageContainer>
  );
}
