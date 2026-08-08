import { GlassCard } from "@components/ui";
import { cn } from "@lib/utils";
import type { CaseRecord } from "@/types/caseRecord";

interface Props {
  record: CaseRecord;
  onChange: (killerCandidateIds: string[]) => void;
}

export function KillerCandidatesSection({ record, onChange }: Props) {
  const { characters, killerCandidateIds } = record;

  const toggle = (id: string) => {
    onChange(
      killerCandidateIds.includes(id) ? killerCandidateIds.filter((c) => c !== id) : [...killerCandidateIds, id]
    );
  };

  if (characters.length === 0) {
    return (
      <GlassCard className="text-sm text-text-secondary">
        Add characters first — killer candidates are chosen from the character list.
      </GlassCard>
    );
  }

  return (
    <GlassCard className="flex flex-col gap-3">
      <p className="text-sm text-text-secondary">
        The actual killer is selected randomly from this list at the start of each game. Pick at least 2 so it's
        genuinely uncertain — the reference cases use 3-4.
      </p>
      <div className="flex flex-col gap-2">
        {characters.map((character) => {
          const checked = killerCandidateIds.includes(character.id);
          return (
            <label
              key={character.id}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors",
                checked ? "border-primary-light/50 bg-primary/10" : "border-border/50 bg-background/40"
              )}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text">
                  {character.characterName.en || character.characterName.ar || character.id}
                </span>
                <span className="file-label">{character.id}</span>
              </div>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(character.id)}
                className="h-5 w-5 accent-primary"
              />
            </label>
          );
        })}
      </div>
      <p className="text-xs text-text-secondary">
        {killerCandidateIds.length} candidate{killerCandidateIds.length === 1 ? "" : "s"} selected.
      </p>
    </GlassCard>
  );
}
