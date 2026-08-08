import { GlassCard } from "@components/ui";
import { LocalizedInput, emptyLocalizedText } from "../components/FormFields";
import type { CaseRecord } from "@/types/caseRecord";

interface Props {
  record: CaseRecord;
  onChange: (patch: Partial<CaseRecord["victim"]>) => void;
}

export function VictimSection({ record, onChange }: Props) {
  const { victim } = record;

  return (
    <GlassCard className="flex flex-col gap-4">
      <p className="text-sm text-text-secondary">
        The victim is an NPC — never a playable role. This information shapes the story, briefing, and how
        characters talk about them.
      </p>
      <LocalizedInput label="Name" value={victim.name} onChange={(v) => onChange({ name: v })} required />
      <LocalizedInput
        label="Description"
        value={victim.description}
        onChange={(v) => onChange({ description: v })}
        multiline
        required
        hint="Also used as the 'victim' line on the pre-game briefing screen"
      />
      <LocalizedInput
        label="Background"
        value={victim.background ?? { ...emptyLocalizedText }}
        onChange={(v) => onChange({ background: v.ar || v.en ? v : undefined })}
        multiline
      />
      <LocalizedInput
        label="Relevant Information"
        value={victim.relevantInfo ?? { ...emptyLocalizedText }}
        onChange={(v) => onChange({ relevantInfo: v.ar || v.en ? v : undefined })}
        multiline
        hint="Facts about the victim worth knowing while writing clues — not necessarily shown to players directly"
      />
    </GlassCard>
  );
}
