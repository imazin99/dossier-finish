import { Gavel } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageContainer, PrimaryButton } from "@components/ui";
import { buildVotingCastPath } from "@/router/paths";
import { useVoting } from "../VotingContext";

/**
 * Shown before each player casts their vote — same "waiting room" language
 * as the role handoff, with a gavel icon to signal the voting context.
 */
export function VotingHandoffScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();
  const { currentPlayerName } = useVoting();

  return (
    <PageContainer>
      <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-7 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-card/60">
          <Gavel className="h-5 w-5 text-text-secondary" strokeWidth={1.75} />
        </div>

        <div className="spotlight-glow flex flex-col items-center gap-3">
          <span className="file-label">{t("voting.handoffTitle")}</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-text">
            {currentPlayerName}
          </h1>
        </div>

        <p className="max-w-[26rem] text-sm leading-relaxed text-text-secondary">
          {t("voting.handoffSubtitle")}
        </p>

        <PrimaryButton className="mt-2" onClick={() => navigate(buildVotingCastPath(caseId ?? ""))}>
          {t("voting.readyButton")}
        </PrimaryButton>
      </div>
    </PageContainer>
  );
}
