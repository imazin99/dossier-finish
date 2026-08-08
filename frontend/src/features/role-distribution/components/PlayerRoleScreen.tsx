import { Eye, Lock, Skull } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/LanguageContext";
import { PageContainer, SectionTitle, GlassCard, BulletList, PrimaryButton, RevealStage } from "@components/ui";
import { buildRoleHandoffPath, buildRoleConfirmationPath } from "@/router/paths";
import { filterKnownClues } from "@lib/session";
import { useRoleDistribution } from "../RoleDistributionContext";

/**
 * Private role-view screen — the simplified character card. Shows the
 * role assigned to the current player: name, job, relationship to the
 * victim, why they were at the scene, and 2-4 things they personally
 * know (any clue naming another character is filtered out if that
 * character isn't actually in this session — see filterKnownClues).
 * A secret only appears if this character was one of the few chosen to
 * keep theirs this session. If this player is the killer, an extra
 * private section reveals that. Pressing "I'm Done" navigates away
 * immediately, which is what makes the reveal private in practice.
 */
export function PlayerRoleScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const {
    currentPlayerRole: role,
    assignedRoles,
    isCurrentPlayerKiller,
    isLastPlayer,
    advance,
  } = useRoleDistribution();

  const assignedRoleIds = new Set(assignedRoles.map((r) => r.id));
  const visibleClues = filterKnownClues(role.whatYouKnow, assignedRoleIds).map((clue) => clue.text);

  const handleFinished = () => {
    if (isLastPlayer) {
      navigate(buildRoleConfirmationPath(caseId ?? ""));
    } else {
      advance();
      navigate(buildRoleHandoffPath(caseId ?? ""));
    }
  };

  return (
    <PageContainer>
      <RevealStage
        haptic
        sound="paperOpen"
        revealKey={role.id}
        className="flex flex-col items-center gap-3 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 shadow-accent-glow">
          <span className="font-display text-2xl font-bold text-primary-light">
            {role.characterName[language].charAt(0)}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="file-label">{t("roleDistribution.characterRoleLabel")}</span>
          <h1 className="font-display text-2xl font-bold tracking-tight text-text">
            {role.characterName[language]}
          </h1>
          <p className="text-sm text-text-secondary">{role.occupation[language]}</p>
        </div>
      </RevealStage>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("roleDistribution.relationshipToVictim")} />
        <GlassCard>
          <p className="text-sm leading-relaxed text-text-secondary">
            {role.relationshipToVictim[language]}
          </p>
        </GlassCard>
      </div>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("roleDistribution.whyAtScene")} />
        <GlassCard>
          <p className="text-sm leading-relaxed text-text-secondary">{role.whyAtScene[language]}</p>
        </GlassCard>
      </div>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("roleDistribution.knownInfo")} />
        <GlassCard>
          <BulletList items={visibleClues} icon={Eye} />
        </GlassCard>
      </div>

      {role.secret && (
        <div className="flex flex-col gap-3">
          <SectionTitle title={t("roleDistribution.secret")} />
          <GlassCard className="border-primary/30 shadow-accent-glow">
            <BulletList items={[role.secret]} icon={Lock} />
          </GlassCard>
        </div>
      )}

      {isCurrentPlayerKiller && (
        <GlassCard className="border-primary/50 bg-primary/10 shadow-accent-glow">
          <div className="flex items-start gap-2.5">
            <Skull className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" strokeWidth={1.75} />
            <div className="flex flex-col gap-1">
              <span className="font-display text-base font-bold text-text">
                {t("roleDistribution.killerTitle")}
              </span>
              <p className="text-sm text-text-secondary">{t("roleDistribution.killerWarning")}</p>
            </div>
          </div>
        </GlassCard>
      )}

      <PrimaryButton fullWidth haptic className="mb-2" onClick={handleFinished}>
        {t("roleDistribution.finishedButton")}
      </PrimaryButton>
    </PageContainer>
  );
}
