import { Smartphone } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageContainer, PrimaryButton } from "@components/ui";
import { buildRoleViewPath } from "@/router/paths";
import { useRoleDistribution } from "../RoleDistributionContext";

/**
 * The "waiting room" moment before each player views their role — centers
 * on the current player's real name (with a soft spotlight behind it) so
 * the phone can be handed to the right person with real ceremony.
 */
export function HandoffScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();
  const { currentPlayerName } = useRoleDistribution();

  return (
    <PageContainer>
      <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-7 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-card/60">
          <Smartphone className="h-5 w-5 text-text-secondary" strokeWidth={1.75} />
        </div>

        <div className="spotlight-glow flex flex-col items-center gap-3">
          <span className="file-label">{t("roleDistribution.handoffTitle")}</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-text">
            {currentPlayerName}
          </h1>
        </div>

        <p className="max-w-[26rem] text-sm leading-relaxed text-text-secondary">
          {t("roleDistribution.handoffSubtitle")}
        </p>

        <PrimaryButton className="mt-2" onClick={() => navigate(buildRoleViewPath(caseId ?? ""))}>
          {t("roleDistribution.readyButton")}
        </PrimaryButton>
      </div>
    </PageContainer>
  );
}
