import { GlassCard } from "@components/ui";
import { LocalizedInput, emptyLocalizedText } from "../components/FormFields";
import type { CaseRecord, CaseSolution } from "@/types/caseRecord";

interface Props {
  record: CaseRecord;
  onChange: (solution: CaseSolution) => void;
}

export function RevealSection({ record, onChange }: Props) {
  const { solution, killerCandidateIds, characters } = record;

  const nameFor = (id: string) => characters.find((c) => c.id === id)?.characterName.en || id;

  const updateKillerExplanation = (candidateId: string, value: { ar: string; en: string }) => {
    onChange({
      ...solution,
      killerExplanationByCandidate: { ...solution.killerExplanationByCandidate, [candidateId]: value },
    });
  };

  const updateInnocenceExplanation = (candidateId: string, value: { ar: string; en: string }) => {
    onChange({
      ...solution,
      innocenceExplanationByCandidate: { ...solution.innocenceExplanationByCandidate, [candidateId]: value },
    });
  };

  if (killerCandidateIds.length === 0) {
    return (
      <GlassCard className="text-sm text-text-secondary">
        Choose killer candidates first — the reveal is authored once per candidate, since any of them could turn
        out to be the killer this session.
      </GlassCard>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <GlassCard className="text-sm text-text-secondary">
        For every killer candidate, write two things: the explanation shown when they <em>are</em> the killer that
        session (motive + how the clues fit), and the explanation shown when they turn out to be innocent instead.
      </GlassCard>
      {killerCandidateIds.map((candidateId) => (
        <GlassCard key={candidateId} className="flex flex-col gap-4">
          <h3 className="font-display text-base font-semibold text-text">{nameFor(candidateId)}</h3>
          <LocalizedInput
            label="When they ARE the killer — motive & explanation"
            value={solution.killerExplanationByCandidate[candidateId] ?? { ...emptyLocalizedText }}
            onChange={(v) => updateKillerExplanation(candidateId, v)}
            multiline
            rows={4}
            required
          />
          <LocalizedInput
            label="When they are NOT the killer — why they're innocent"
            value={solution.innocenceExplanationByCandidate[candidateId] ?? { ...emptyLocalizedText }}
            onChange={(v) => updateInnocenceExplanation(candidateId, v)}
            multiline
            rows={3}
            required
          />
        </GlassCard>
      ))}
    </div>
  );
}
