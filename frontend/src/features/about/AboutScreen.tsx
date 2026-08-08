import { useTranslation } from "react-i18next";
import { Fingerprint } from "lucide-react";
import { PageContainer, SectionTitle, GlassCard } from "@components/ui";

/**
 * The "عن اللعبة" tab. Static content only — no fake credits/contact
 * info, per spec; DOSSIER's own name/tagline is the only "identity" shown.
 */
export function AboutScreen() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <header className="flex flex-col items-center gap-3 pt-2 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary-light/30 bg-primary/10">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-md" />
          <Fingerprint className="relative h-7 w-7 text-primary-light" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="font-display text-2xl font-bold text-text">{t("about.title")}</h1>
          <p className="text-sm text-text-secondary">{t("about.subtitle")}</p>
        </div>
      </header>

      <GlassCard className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-text-secondary">{t("about.description1")}</p>
        <p className="text-sm leading-relaxed text-text-secondary">{t("about.description2")}</p>
        <p className="text-sm leading-relaxed text-text-secondary">{t("about.description3")}</p>
      </GlassCard>

      <div className="flex flex-col gap-3">
        <SectionTitle title={t("about.goalLabel")} />
        <GlassCard>
          <p className="text-sm leading-relaxed text-text-secondary">{t("about.goalBody")}</p>
        </GlassCard>
      </div>

      <div className="flex flex-col items-center gap-1 pb-2 pt-4 text-center">
        <span className="metallic-logo font-display text-2xl font-extrabold tracking-[0.08em]">DOSSIER</span>
        <span className="text-sm text-text-secondary">{t("about.tagline")}</span>
        <span className="mt-1 text-xs text-text-secondary/70">{t("about.version")}</span>
      </div>
    </PageContainer>
  );
}
