import { Target } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageContainer, SectionTitle, GlassCard, PrimaryButton } from "@components/ui";
import { BadgeBase } from "@components/ui/badges/BadgeBase";
import { cn } from "@lib/utils";
import { useGameSession } from "@/features/game-session/GameSessionContext";
import { buildEliminationCheckPath, buildEndingPath } from "@/router/paths";
import { useVoting } from "../VotingContext";

/**
 * Shown once every player has voted this round. Tallies accusations,
 * eliminates whoever got the most votes as a suspect, and continues:
 * straight to the Ending if the eliminated player happened to be the
 * actual killer (case solved), otherwise to the elimination-check prompt
 * ("do you think the killer is out?"). No killer reveal here — that only
 * happens on the Ending screen.
 */
export function VotingResultsScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();
  const { playerNames, assignedRoles, selectedKillerId, eliminatedIndices, eliminatePlayer } =
    useGameSession();
  const { votes } = useVoting();

  const tally = playerNames
    .map((name, index) => ({
      name,
      index,
      count: votes.filter((v) => v === index).length,
    }))
    .filter((entry) => !eliminatedIndices.includes(entry.index))
    .sort((a, b) => b.count - a.count);

  const maxVotes = tally[0]?.count ?? 0;
  // On a tie, eliminate whoever appears first in the tally — arbitrary but deterministic.
  const eliminatedEntry = tally[0];

  const handleContinue = () => {
    if (!eliminatedEntry) return;
    eliminatePlayer(eliminatedEntry.index);

    const eliminatedRoleId = assignedRoles[eliminatedEntry.index]?.id;
    if (eliminatedRoleId === selectedKillerId) {
      // The real killer was just voted out — case solved, go straight to the ending.
      navigate(buildEndingPath(caseId ?? ""));
    } else {
      navigate(buildEliminationCheckPath(caseId ?? ""));
    }
  };

  return (
    <PageContainer>
      <SectionTitle title={t("voting.resultsTitle")} />

      <GlassCard className="flex flex-col divide-y divide-border/60">
        {tally.map(({ name, index, count }, rank) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-3 py-2.5 first:pt-0 last:pb-0",
              rank === 0 && count > 0 && "rounded-xl bg-primary/5 px-2 -mx-2 first:mt-0"
            )}
          >
            <span className="font-mono text-xs text-text-secondary">{rank + 1}</span>
            <span className="flex-1 text-sm font-medium text-text">{name}</span>
            <BadgeBase tone={rank === 0 && count > 0 ? "accent" : "default"}>
              {count} {t("voting.votesCountLabel")}
            </BadgeBase>
          </div>
        ))}
      </GlassCard>

      {eliminatedEntry && (
        <GlassCard className="border-primary/30 shadow-accent-glow">
          <div className="flex items-start gap-2.5">
            <Target className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" strokeWidth={1.75} />
            <div className="flex flex-col gap-1">
              <span className="font-display text-base font-bold text-text">
                {t("voting.mostVotedTitle")}
              </span>
              <p className="text-sm text-text-secondary">
                {eliminatedEntry.name} — {maxVotes} {t("voting.votesCountLabel")}
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      <PrimaryButton fullWidth className="mb-2" onClick={handleContinue}>
        {t("voting.continueButton")}
      </PrimaryButton>
    </PageContainer>
  );
}
