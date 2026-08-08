import { GlassCard } from "@components/ui";
import { LocalizedInput, emptyLocalizedText } from "../components/FormFields";
import type { CaseRecord, ProgressiveClue } from "@/types/caseRecord";

interface Props {
  record: CaseRecord;
  onChange: (clues: ProgressiveClue[]) => void;
}

const ROUND_META: Record<ProgressiveClue["type"], { title: string; guidance: string }> = {
  neutral: {
    title: "Round 1 — Context",
    guidance: "Sets the scene: timing, environment, circumstances. Applies to everyone, accuses no one.",
  },
  suspicious: {
    title: "Round 2 — Contradiction",
    guidance:
      "Introduces an inconsistency without pointing at just one suspect. Should stay compatible with at least 3 people/explanations — never \"these two, everyone else is clear.\"",
  },
  eliminating: {
    title: "Round 3 — Connection",
    guidance:
      "Connects earlier details and may confirm PART of a candidate's story, but leaves a genuine gap. Should NOT fully clear anyone — leave 2-3 other candidates with their own unresolved details.",
  },
  finalDeduction: {
    title: "Round 4 — Final Deduction",
    guidance:
      "The strongest clue: combines several independent details (access, timing, behavior) into a fact that fits only the killer — but reads as something the group reasons through, not a flat name-drop.",
  },
};

export function CluesSection({ record, onChange }: Props) {
  const { clues, killerCandidateIds, characters } = record;

  const updateClueText = (clueIndex: number, candidateId: string, value: { ar: string; en: string }) => {
    const next = clues.map((clue, i) =>
      i === clueIndex ? { ...clue, textByKiller: { ...clue.textByKiller, [candidateId]: value } } : clue
    );
    onChange(next);
  };

  if (killerCandidateIds.length === 0) {
    return (
      <GlassCard className="text-sm text-text-secondary">
        Choose killer candidates first — each clue is authored once per candidate, so it always points at whoever
        is actually the killer that session.
      </GlassCard>
    );
  }

  const nameFor = (id: string) => characters.find((c) => c.id === id)?.characterName.en || id;

  return (
    <div className="flex flex-col gap-4">
      {clues.map((clue, clueIndex) => (
        <GlassCard key={clue.id} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-base font-semibold text-text">{ROUND_META[clue.type].title}</h3>
            <p className="text-xs text-text-secondary">{ROUND_META[clue.type].guidance}</p>
          </div>
          <div className="flex flex-col gap-4 border-t border-border/60 pt-4">
            {killerCandidateIds.map((candidateId) => (
              <LocalizedInput
                key={candidateId}
                label={`If the killer is: ${nameFor(candidateId)}`}
                value={clue.textByKiller[candidateId] ?? { ...emptyLocalizedText }}
                onChange={(v) => updateClueText(clueIndex, candidateId, v)}
                multiline
                required
              />
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
