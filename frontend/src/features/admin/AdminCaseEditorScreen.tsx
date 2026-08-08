import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { PrimaryButton, SecondaryButton, LoadingSpinner, GlassCard } from "@components/ui";
import { cn } from "@lib/utils";
import { getCaseById, saveCase, deleteCase } from "@/data/caseStore";
import { createBlankCase } from "@/data/caseTemplate";
import { validateForPublish } from "@/data/caseValidation";
import { ADMIN_DASHBOARD_PATTERN, buildAdminEditCasePath } from "@/router/paths";
import type { CaseRecord } from "@/types/caseRecord";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { VictimSection } from "./sections/VictimSection";
import { CharactersSection } from "./sections/CharactersSection";
import { KillerCandidatesSection } from "./sections/KillerCandidatesSection";
import { CluesSection } from "./sections/CluesSection";
import { RevealSection } from "./sections/RevealSection";
import { PublishSection } from "./sections/PublishSection";

const SECTIONS = [
  { key: "basic", label: "Basic Info" },
  { key: "victim", label: "Victim" },
  { key: "characters", label: "Characters" },
  { key: "killer", label: "Killer Candidates" },
  { key: "clues", label: "Clues" },
  { key: "reveal", label: "Killer Reveal" },
  { key: "publish", label: "Publish" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

export function AdminCaseEditorScreen() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const isNew = !caseId;

  const [draft, setDraft] = useState<CaseRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>("basic");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        if (caseId) {
          const existing = await getCaseById(caseId);
          if (!cancelled) setDraft(existing ?? (await createBlankCase()));
        } else {
          const blank = await createBlankCase();
          if (!cancelled) setDraft(blank);
        }
      } catch (err) {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : "Failed to load this case.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [caseId]);

  const validation = useMemo(() => (draft ? validateForPublish(draft) : { errors: [], warnings: [] }), [draft]);

  const handleSave = async () => {
    if (!draft) return;
    setIsSaving(true);
    try {
      const saved = await saveCase(draft);
      setDraft(saved);
      setSavedAt(Date.now());
      if (isNew) {
        navigate(buildAdminEditCasePath(saved.id), { replace: true });
      }
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Failed to save the case.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!draft) return;
    try {
      const saved = await saveCase({ ...draft, status: "published" });
      setDraft(saved);
      setSavedAt(Date.now());
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Failed to publish the case.");
    }
  };

  const handleUnpublish = async () => {
    if (!draft) return;
    try {
      const saved = await saveCase({ ...draft, status: "draft" });
      setDraft(saved);
      setSavedAt(Date.now());
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Failed to unpublish the case.");
    }
  };

  const handleDelete = async () => {
    if (isNew || !draft) {
      navigate(ADMIN_DASHBOARD_PATTERN);
      return;
    }
    const label = draft.basicInfo.title.en || draft.basicInfo.title.ar || draft.id;
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try {
      await deleteCase(draft.id);
      navigate(ADMIN_DASHBOARD_PATTERN);
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Failed to delete the case.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <LoadingSpinner size="lg" label="Loading case…" />
      </div>
    );
  }

  if (loadError || !draft) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-4">
        <GlassCard className="flex max-w-sm flex-col items-center gap-3 text-center">
          <p className="text-sm text-text-secondary">{loadError ?? "This case couldn't be loaded."}</p>
          <SecondaryButton onClick={() => navigate(ADMIN_DASHBOARD_PATTERN)}>Back to Dashboard</SecondaryButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background px-4 py-8 sm:px-8" dir="ltr">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(ADMIN_DASHBOARD_PATTERN)}
              className="rounded-xl border border-border/60 p-2 text-text-secondary transition-colors hover:border-primary-light/50 hover:text-text"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex flex-col gap-0.5">
              <span className="file-label">{isNew ? "New Case" : `Editing #${draft.number}`}</span>
              <h1 className="font-display text-xl font-bold text-text">
                {draft.basicInfo.title.en || draft.basicInfo.title.ar || "Untitled case"}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {savedAt && <span className="text-xs text-text-secondary">Saved</span>}
            <SecondaryButton icon={Trash2} onClick={handleDelete}>
              Delete
            </SecondaryButton>
            <PrimaryButton icon={Save} onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving…" : "Save"}
            </PrimaryButton>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2">
          {SECTIONS.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={cn(
                "rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
                activeSection === section.key
                  ? "border-primary-light/50 bg-primary/10 text-primary-light"
                  : "border-border/50 bg-background/40 text-text-secondary hover:text-text"
              )}
            >
              {section.label}
              {section.key === "publish" && validation.errors.length > 0 && (
                <span className="ms-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-text">
                  {validation.errors.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div>
          {activeSection === "basic" && (
            <BasicInfoSection record={draft} onChange={(patch) => setDraft((d) => (d ? { ...d, basicInfo: { ...d.basicInfo, ...patch } } : d))} />
          )}
          {activeSection === "victim" && (
            <VictimSection record={draft} onChange={(patch) => setDraft((d) => (d ? { ...d, victim: { ...d.victim, ...patch } } : d))} />
          )}
          {activeSection === "characters" && (
            <CharactersSection record={draft} onChange={(characters) => setDraft((d) => (d ? { ...d, characters } : d))} />
          )}
          {activeSection === "killer" && (
            <KillerCandidatesSection
              record={draft}
              onChange={(killerCandidateIds) => setDraft((d) => (d ? { ...d, killerCandidateIds } : d))}
            />
          )}
          {activeSection === "clues" && (
            <CluesSection record={draft} onChange={(clues) => setDraft((d) => (d ? { ...d, clues } : d))} />
          )}
          {activeSection === "reveal" && (
            <RevealSection record={draft} onChange={(solution) => setDraft((d) => (d ? { ...d, solution } : d))} />
          )}
          {activeSection === "publish" && (
            <PublishSection
              record={draft}
              validation={validation}
              onPublish={handlePublish}
              onUnpublish={handleUnpublish}
            />
          )}
        </div>
      </div>
    </div>
  );
}
