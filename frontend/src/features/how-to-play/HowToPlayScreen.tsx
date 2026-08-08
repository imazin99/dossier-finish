import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FolderSearch,
  Users,
  Contact,
  ScrollText,
  Search,
  GitCompareArrows,
  Vote,
  Eye,
  Shuffle,
  type LucideIcon,
} from "lucide-react";
import { PageContainer, GlassCard, PrimaryButton, SecondaryButton } from "@components/ui";
import { ROUTES } from "@/router/paths";

const STEP_ICONS: LucideIcon[] = [FolderSearch, Users, Contact, ScrollText, Search, GitCompareArrows, Vote, Eye];
const TOTAL_STEPS = STEP_ICONS.length;

const stepVariants = {
  enter: (direction: 1 | -1) => ({ opacity: 0, x: direction * 24 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const } },
  exit: (direction: 1 | -1) => ({ opacity: 0, x: direction * -24, transition: { duration: 0.16 } }),
};

/**
 * The "إزاي تلعب" tab — a short, swipe-through tutorial. Deliberately
 * lightweight: 8 numbered cards, a progress dial, and one persistent
 * reminder card about random killer selection. No quiz, no gating.
 */
export function HowToPlayScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0-indexed
  const [direction, setDirection] = useState<1 | -1>(1);

  const isLastStep = step === TOTAL_STEPS - 1;
  const StepIcon = STEP_ICONS[step];

  const goNext = () => {
    if (isLastStep) {
      navigate(ROUTES.cases);
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goPrevious = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <PageContainer>
      <header className="flex flex-col items-center gap-2 pt-2 text-center">
        <h1 className="font-display text-2xl font-bold text-text">{t("howToPlay.title")}</h1>
        <p className="max-w-[22rem] text-sm text-text-secondary">{t("howToPlay.subtitle")}</p>
      </header>

      <div className="flex flex-col gap-4">
        <div className="relative min-h-[15rem] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <GlassCard className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary-light/30 bg-primary/10">
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-md" />
                  <StepIcon className="relative h-7 w-7 text-primary-light" strokeWidth={1.75} />
                </div>
                <span className="file-label">{t("howToPlay.stepIndicator", { current: step + 1, total: TOTAL_STEPS })}</span>
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-lg font-semibold text-text">
                    {t(`howToPlay.steps.${step + 1}.title`)}
                  </h2>
                  <p className="max-w-[20rem] text-sm leading-relaxed text-text-secondary">
                    {t(`howToPlay.steps.${step + 1}.description`)}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5" dir="ltr">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={
                "h-1.5 rounded-full transition-all duration-300 " +
                (i === step ? "w-5 bg-primary-light shadow-accent-glow" : "w-1.5 bg-border-light/50")
              }
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SecondaryButton onClick={goPrevious} disabled={step === 0}>
            {t("howToPlay.previousButton")}
          </SecondaryButton>
          <PrimaryButton onClick={goNext} glow={isLastStep}>
            {isLastStep ? t("howToPlay.finishButton") : t("howToPlay.nextButton")}
          </PrimaryButton>
        </div>
      </div>

      <GlassCard className="border-primary/30 shadow-accent-glow">
        <div className="flex items-start gap-2.5">
          <Shuffle className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" strokeWidth={1.75} />
          <div className="flex flex-col gap-1">
            <span className="file-label">{t("howToPlay.randomNotice.label")}</span>
            <p className="text-sm text-text-secondary">{t("howToPlay.randomNotice.body")}</p>
          </div>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
