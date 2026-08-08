import { CircleCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageContainer, PrimaryButton } from "@components/ui";
import { buildBriefingPath } from "@/router/paths";
import { useRoleDistribution } from "../RoleDistributionContext";

/**
 * Final screen of the role-distribution flow — confirms every player has
 * seen their role, then hands off to the case briefing screen, forwarding
 * the fixed session data (players, assigned roles, killer) so it survives
 * into the rest of the game (see GameSessionLayout).
 */
export function ConfirmationScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();
  const { playerNames, assignedRoles, selectedKillerId } = useRoleDistribution();

  const handleStart = () => {
    navigate(buildBriefingPath(caseId ?? ""), {
      state: { playerNames, assignedRoles, selectedKillerId },
    });
  };

  return (
    <PageContainer>
      <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
          <CircleCheck className="h-7 w-7 text-primary-light" strokeWidth={1.75} />
        </div>

        <h1 className="font-display text-xl font-bold text-text">
          {t("roleDistribution.confirmationMessage")}
        </h1>

        <PrimaryButton className="mt-4" haptic glow sound="transition" onClick={handleStart}>
          {t("common.startInvestigation")}
        </PrimaryButton>
      </div>
    </PageContainer>
  );
}
