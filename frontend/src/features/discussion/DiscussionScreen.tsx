import { useEffect, useState } from "react";
import { MessagesSquare } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/LanguageContext";
import { PageContainer, SectionTitle, GlassCard, PrimaryButton, SecondaryButton } from "@components/ui";
import { cn } from "@lib/utils";
import { useCases } from "@context/CasesContext";
import { ROUTES, buildVotingPath } from "@/router/paths";

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

/**
 * Discussion phase — a per-case countdown (case.discussionMinutes) during
 * which players freely discuss the evidence out loud. When the timer hits
 * zero, or "End Discussion Early" is pressed, it continues automatically
 * to the Voting phase (no voting logic implemented yet — placeholder screen).
 */
export function DiscussionScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();
  const { language } = useLanguage();

  const { caseSummaries } = useCases();
  const data = caseSummaries.find((c) => c.id === caseId);

  const [secondsLeft, setSecondsLeft] = useState(() => (data ? data.discussionMinutes * 60 : 0));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || !caseId) return;

    if (secondsLeft <= 0) {
      navigate(buildVotingPath(caseId), { replace: true });
      return;
    }

    const timeout = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timeout);
  }, [isRunning, secondsLeft, caseId, navigate]);

  if (!data) {
    return <Navigate to={ROUTES.cases} replace />;
  }

  const handleEndEarly = () => navigate(buildVotingPath(caseId ?? ""), { replace: true });

  return (
    <PageContainer>
      <SectionTitle eyebrow={t("discussion.eyebrow")} title={data.title[language]} />

      <GlassCard
        className={cn(
          "flex flex-col items-center gap-3 py-9 text-center transition-shadow duration-500",
          isRunning ? "border-primary/40 shadow-accent-glow" : "border-border/60"
        )}
      >
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border",
            isRunning ? "border-primary/40 bg-primary/10" : "border-border/60 bg-card/60"
          )}
        >
          <MessagesSquare
            className={cn("h-4 w-4", isRunning ? "text-primary-light" : "text-text-secondary")}
            strokeWidth={1.75}
          />
        </div>
        <span className="font-display text-5xl font-bold tabular-nums text-text">
          {formatTime(secondsLeft)}
        </span>
        {isRunning && <span className="file-label">{t("discussion.timerRunningLabel")}</span>}
      </GlassCard>

      <GlassCard>
        <p className="text-sm leading-relaxed text-text-secondary">{t("discussion.instruction")}</p>
      </GlassCard>

      <div className="flex flex-col gap-3">
        <PrimaryButton fullWidth disabled={isRunning} onClick={() => setIsRunning(true)}>
          {t("discussion.startButton")}
        </PrimaryButton>
        <SecondaryButton fullWidth onClick={handleEndEarly}>
          {t("discussion.endEarlyButton")}
        </SecondaryButton>
      </div>
    </PageContainer>
  );
}
