import { useState } from "react";
import { Shuffle, TriangleAlert } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "@components/ui";
import { useCases } from "@context/CasesContext";
import { useSoundEffect } from "@hooks/useSoundEffect";
import { shuffle } from "@lib/shuffle";
import { buildCaseDetailsPath } from "@/router/paths";

interface RandomCaseCardProps {
  variants?: Variants;
}

/**
 * The final entry in the case list — hands the player a random file
 * instead of letting them pick. Deliberately distinct from CaseCard:
 * centered layout, accent border, a slow pulsing glow around the icon.
 *
 * Picks from the already-loaded published cases in CasesContext (the
 * same source of truth CaseCard/HomeScreen use — no separate fetch, no
 * localStorage) and opens the pick through the exact same Case Details
 * flow a manually-tapped case uses. The random pick is made fresh inside
 * the click handler itself, not memoized/precomputed on render, so every
 * press can land on a different case.
 */
export function RandomCaseCard({ variants }: RandomCaseCardProps) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const { play } = useSoundEffect();
  const { caseSummaries, error } = useCases();
  const [message, setMessage] = useState<string | null>(null);

  const handlePick = () => {
    if (error) {
      setMessage(t("home.randomCase.error"));
      return;
    }
    if (caseSummaries.length === 0) {
      setMessage(t("home.randomCase.empty"));
      return;
    }

    setMessage(null);
    const [picked] = shuffle(caseSummaries);
    play("paperOpen");
    navigate(buildCaseDetailsPath(picked.id));
  };

  return (
    <GlassCard
      interactive
      variants={variants}
      className="flex flex-col items-center gap-4 border-primary/30 py-9 text-center shadow-accent-glow"
      onClick={handlePick}
    >
      <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-primary/40 bg-primary/10">
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={shouldReduceMotion ? undefined : { opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <Shuffle className="relative h-8 w-8 text-primary-light" strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-lg font-bold text-text">{t("home.randomCase.title")}</h3>
        <p className="text-sm text-text-secondary">{t("home.randomCase.description")}</p>
      </div>
      {message && (
        <div className="flex items-center gap-1.5 text-xs text-primary-light">
          <TriangleAlert className="h-3.5 w-3.5 shrink-0" />
          <span>{message}</span>
        </div>
      )}
    </GlassCard>
  );
}
