import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PageContainer, SectionTitle } from "@components/ui";
import { listContainerVariants, listItemVariants } from "@lib/motion";
import { useCases } from "@context/CasesContext";
import { HomeHeader } from "./components/HomeHeader";
import { CaseCard } from "./components/CaseCard";
import { RandomCaseCard } from "./components/RandomCaseCard";

/**
 * The Home screen — the "القضايا" tab. Displays the case archive as a
 * scrollable list, ending with the random-case entry. Case data comes
 * from the Case Manager API (published cases only) via CasesContext,
 * already loaded by the time this screen renders — see
 * components/layout/RootLayout.tsx for the loading/error gate.
 */
export function HomeScreen() {
  const { t } = useTranslation();
  const { caseSummaries } = useCases();

  return (
    <PageContainer>
      <HomeHeader />

      <SectionTitle eyebrow={t("home.sectionEyebrow")} title={t("home.sectionTitle")} />

      <motion.div
        variants={listContainerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {caseSummaries.map((c) => (
          <CaseCard key={c.id} data={c} variants={listItemVariants} />
        ))}
        <RandomCaseCard variants={listItemVariants} />
      </motion.div>
    </PageContainer>
  );
}
