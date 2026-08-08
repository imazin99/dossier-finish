import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageContainer, SectionTitle, PrimaryButton, BackButton } from "@components/ui";
import { listContainerVariants, listItemVariants } from "@lib/motion";
import { buildRoleHandoffPath } from "@/router/paths";
import { PlayerCountSelector } from "./components/PlayerCountSelector";
import { PlayerCard } from "./components/PlayerCard";

const DEFAULT_PLAYER_COUNT = 4;

/**
 * Choose Players screen — reached from the Case Details "Start Investigation"
 * button. Pure setup UI: picks a player count (3-8) and collects names.
 * No gameplay logic and no role assignment happen here; Continue hands the
 * collected names to the role-distribution flow via navigation state.
 */
export function ChoosePlayersScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { t } = useTranslation();

  const [count, setCount] = useState(DEFAULT_PLAYER_COUNT);
  const [names, setNames] = useState<string[]>(() =>
    Array.from({ length: DEFAULT_PLAYER_COUNT }, (_, i) => t("choosePlayers.defaultName", { n: i + 1 }))
  );

  const handleCountChange = (newCount: number) => {
    setCount(newCount);
    setNames((prev) => {
      if (newCount <= prev.length) return prev.slice(0, newCount);
      const additions = Array.from({ length: newCount - prev.length }, (_, i) =>
        t("choosePlayers.defaultName", { n: prev.length + i + 1 })
      );
      return [...prev, ...additions];
    });
  };

  const handleNameChange = (index: number, value: string) => {
    setNames((prev) => prev.map((name, i) => (i === index ? value : name)));
  };

  const allNamesFilled = names.every((name) => name.trim().length > 0);

  const handleContinue = () => {
    navigate(buildRoleHandoffPath(caseId ?? ""), { state: { playerNames: names } });
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <BackButton onClick={() => navigate(-1)} className="w-fit" />
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl font-bold text-text">{t("choosePlayers.title")}</h1>
          <p className="text-sm text-text-secondary">{t("choosePlayers.subtitle")}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("choosePlayers.playerCountLabel")} />
        <PlayerCountSelector value={count} onChange={handleCountChange} />
      </div>

      <motion.div
        variants={listContainerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {names.map((name, index) => (
          <PlayerCard
            key={index}
            index={index}
            name={name}
            onNameChange={(value) => handleNameChange(index, value)}
            variants={listItemVariants}
          />
        ))}
      </motion.div>

      <div className="flex flex-col gap-3">
        {!allNamesFilled && (
          <div className="flex items-center justify-center gap-1.5 text-center">
            <Info className="h-3.5 w-3.5 shrink-0 text-text-secondary" strokeWidth={1.75} />
            <p className="text-xs text-text-secondary">{t("choosePlayers.validationMessage")}</p>
          </div>
        )}

        <PrimaryButton fullWidth disabled={!allNamesFilled} className="mb-2" onClick={handleContinue}>
          {t("choosePlayers.continueButton")}
        </PrimaryButton>
      </div>
    </PageContainer>
  );
}
