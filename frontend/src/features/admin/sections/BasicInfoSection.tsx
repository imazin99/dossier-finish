import { X } from "lucide-react";
import { GlassCard, SecondaryButton } from "@components/ui";
import { LocalizedInput, TextInput, SelectInput, emptyLocalizedText, FieldShell } from "../components/FormFields";
import type { CaseRecord } from "@/types/caseRecord";

interface Props {
  record: CaseRecord;
  onChange: (patch: Partial<CaseRecord["basicInfo"]>) => void;
}

export function BasicInfoSection({ record, onChange }: Props) {
  const { basicInfo } = record;

  const updateObjective = (index: number, value: { ar: string; en: string }) => {
    const next = [...basicInfo.objectives];
    next[index] = value;
    onChange({ objectives: next });
  };

  const addObjective = () => onChange({ objectives: [...basicInfo.objectives, { ...emptyLocalizedText }] });
  const removeObjective = (index: number) =>
    onChange({ objectives: basicInfo.objectives.filter((_, i) => i !== index) });

  return (
    <div className="flex flex-col gap-4">
      <GlassCard className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInput label="Case Number" value={record.number} onChange={() => {}} hint="Assigned automatically" />
          <SelectInput
            label="Difficulty"
            value={basicInfo.difficulty}
            onChange={(v) => onChange({ difficulty: v as CaseRecord["basicInfo"]["difficulty"] })}
            options={[
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
            required
          />
        </div>

        <LocalizedInput label="Title" value={basicInfo.title} onChange={(v) => onChange({ title: v })} required />
        <LocalizedInput
          label="Short Description"
          value={basicInfo.shortDescription}
          onChange={(v) => onChange({ shortDescription: v })}
          multiline
          required
        />
        <LocalizedInput
          label="Full Story"
          value={basicInfo.fullStory}
          onChange={(v) => onChange({ fullStory: v })}
          multiline
          rows={5}
          required
        />
        <LocalizedInput
          label="Category"
          value={basicInfo.category}
          onChange={(v) => onChange({ category: v })}
          required
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LocalizedInput label="Location" value={basicInfo.location} onChange={(v) => onChange({ location: v })} required />
          <LocalizedInput label="Time of Crime" value={basicInfo.time} onChange={(v) => onChange({ time: v })} required />
        </div>

        <LocalizedInput
          label="Briefing Objective"
          value={basicInfo.briefingObjective}
          onChange={(v) => onChange({ briefingObjective: v })}
          multiline
          required
        />
        <LocalizedInput
          label="Content Warning (optional)"
          value={basicInfo.warning ?? { ...emptyLocalizedText }}
          onChange={(v) => onChange({ warning: v.ar || v.en ? v : undefined })}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextInput
            label="Duration (minutes)"
            type="number"
            value={String(basicInfo.durationMinutes)}
            onChange={(v) => onChange({ durationMinutes: Number(v) || 0 })}
            required
          />
          <TextInput
            label="Discussion Timer (minutes)"
            type="number"
            value={String(basicInfo.discussionMinutes)}
            onChange={(v) => onChange({ discussionMinutes: Number(v) || 0 })}
            required
          />
          <TextInput
            label="Player Count Range"
            value={basicInfo.playerCountRange}
            onChange={(v) => onChange({ playerCountRange: v })}
            hint="Game currently always supports 3-8"
          />
        </div>

        <TextInput
          label="Cover Image URL"
          value={basicInfo.coverImage ?? ""}
          onChange={(v) => onChange({ coverImage: v || undefined })}
          placeholder="https://... or /src/assets/..."
          hint="Used for both the case card and briefing scene art"
        />
        {basicInfo.coverImage && (
          <img src={basicInfo.coverImage} alt="Cover preview" className="h-40 w-full rounded-xl object-cover" />
        )}
      </GlassCard>

      <GlassCard className="flex flex-col gap-3">
        <FieldShell label="Your Mission — checklist shown on Case Details">
          <div className="flex flex-col gap-3">
            {basicInfo.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1">
                  <LocalizedInput label={`Objective ${i + 1}`} value={obj} onChange={(v) => updateObjective(i, v)} />
                </div>
                <button
                  type="button"
                  onClick={() => removeObjective(i)}
                  className="mt-6 rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-primary/10 hover:text-primary-light"
                  aria-label="Remove objective"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </FieldShell>
        <SecondaryButton onClick={addObjective} className="self-start !px-4 !py-2 text-xs">
          + Add Objective
        </SecondaryButton>
      </GlassCard>
    </div>
  );
}
