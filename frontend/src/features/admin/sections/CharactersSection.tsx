import { Plus, Trash2, ChevronDown } from "lucide-react";
import { SecondaryButton } from "@components/ui";
import { cn } from "@lib/utils";
import { LocalizedInput, SelectInput, FieldShell, emptyLocalizedText } from "../components/FormFields";
import type { CaseCharacterRecord, CaseRecord } from "@/types/caseRecord";
import { createBlankCharacterId } from "@/data/caseTemplate";

interface Props {
  record: CaseRecord;
  onChange: (characters: CaseCharacterRecord[]) => void;
}

export function CharactersSection({ record, onChange }: Props) {
  const { characters } = record;

  const updateCharacter = (index: number, patch: Partial<CaseCharacterRecord>) => {
    onChange(characters.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  };

  const addCharacter = () => {
    const blank: CaseCharacterRecord = {
      id: createBlankCharacterId(record.id, characters.length),
      characterName: { ...emptyLocalizedText },
      occupation: { ...emptyLocalizedText },
      relationshipToVictim: { ...emptyLocalizedText },
      whyAtScene: { ...emptyLocalizedText },
      whatYouKnow: [],
    };
    onChange([...characters, blank]);
  };

  const removeCharacter = (index: number) => {
    if (!window.confirm("Remove this character? Any killer-candidate or clue references to them will need fixing.")) {
      return;
    }
    onChange(characters.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-secondary">
        {characters.length} character{characters.length === 1 ? "" : "s"} — the game needs at least 3 (up to 8
        players, one role each).
      </p>

      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          allCharacters={characters}
          onChange={(patch) => updateCharacter(index, patch)}
          onRemove={() => removeCharacter(index)}
        />
      ))}

      <SecondaryButton icon={Plus} onClick={addCharacter} className="self-start">
        Add Character
      </SecondaryButton>
    </div>
  );
}

function CharacterCard({
  character,
  allCharacters,
  onChange,
  onRemove,
}: {
  character: CaseCharacterRecord;
  allCharacters: CaseCharacterRecord[];
  onChange: (patch: Partial<CaseCharacterRecord>) => void;
  onRemove: () => void;
}) {
  const addClue = () => onChange({ whatYouKnow: [...character.whatYouKnow, { text: { ...emptyLocalizedText } }] });
  const updateClue = (i: number, patch: Partial<CaseCharacterRecord["whatYouKnow"][number]>) =>
    onChange({ whatYouKnow: character.whatYouKnow.map((c, idx) => (idx === i ? { ...c, ...patch } : c)) });
  const removeClue = (i: number) => onChange({ whatYouKnow: character.whatYouKnow.filter((_, idx) => idx !== i) });

  return (
    <details className={cn("glass-panel group rounded-3xl p-5 transition-shadow duration-300")}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="file-label">{character.id}</span>
          <span className="font-display text-base font-semibold text-text">
            {character.characterName.en || character.characterName.ar || "Unnamed character"}
          </span>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary transition-transform group-open:rotate-180" />
      </summary>

      <div className="mt-4 flex flex-col gap-4 border-t border-border/60 pt-4">
        <LocalizedInput
          label="Character Name"
          value={character.characterName}
          onChange={(v) => onChange({ characterName: v })}
          required
        />
        <LocalizedInput
          label="Occupation / Role"
          value={character.occupation}
          onChange={(v) => onChange({ occupation: v })}
          required
        />
        <LocalizedInput
          label="Relationship to Victim"
          value={character.relationshipToVictim}
          onChange={(v) => onChange({ relationshipToVictim: v })}
          multiline
          required
        />
        <LocalizedInput
          label="Why At Scene"
          value={character.whyAtScene}
          onChange={(v) => onChange({ whyAtScene: v })}
          multiline
          required
        />
        <LocalizedInput
          label="Background (extra context, not shown in-game yet)"
          value={character.background ?? { ...emptyLocalizedText }}
          onChange={(v) => onChange({ background: v.ar || v.en ? v : undefined })}
          multiline
        />
        <LocalizedInput
          label="Objective (extra context, not shown in-game yet)"
          value={character.objective ?? { ...emptyLocalizedText }}
          onChange={(v) => onChange({ objective: v.ar || v.en ? v : undefined })}
          multiline
        />
        <LocalizedInput
          label="Information They Hide (extra context, not shown in-game yet)"
          value={character.hiddenInfo ?? { ...emptyLocalizedText }}
          onChange={(v) => onChange({ hiddenInfo: v.ar || v.en ? v : undefined })}
          multiline
        />
        <LocalizedInput
          label="Secret (shown in-game — only give a few characters per case one)"
          value={character.secret ?? { ...emptyLocalizedText }}
          onChange={(v) => onChange({ secret: v.ar || v.en ? v : undefined })}
          multiline
        />

        <FieldShell label="What They Know (2-4 discussion-worthy clues)">
          <div className="flex flex-col gap-3">
            {character.whatYouKnow.map((clue, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-xl border border-border/50 p-3">
                <LocalizedInput
                  label={`Known clue ${i + 1}`}
                  value={clue.text}
                  onChange={(v) => updateClue(i, { text: v })}
                  multiline
                  rows={2}
                />
                <div className="flex items-end gap-2">
                  <SelectInput
                    label="Refers to another character? (optional)"
                    value={clue.refersToRoleId ?? ""}
                    onChange={(v) => updateClue(i, { refersToRoleId: v || undefined })}
                    options={[
                      { value: "", label: "— none —" },
                      ...allCharacters
                        .filter((c) => c.id !== character.id)
                        .map((c) => ({
                          value: c.id,
                          label: c.characterName.en || c.characterName.ar || c.id,
                        })),
                    ]}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeClue(i)}
                    className="mb-0.5 rounded-lg p-2 text-text-secondary transition-colors hover:bg-primary/10 hover:text-primary-light"
                    aria-label="Remove clue"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </FieldShell>
        <SecondaryButton icon={Plus} onClick={addClue} className="self-start !px-4 !py-2 text-xs">
          Add Known Clue
        </SecondaryButton>

        <SecondaryButton
          icon={Trash2}
          onClick={onRemove}
          className="self-start !px-4 !py-2 text-xs hover:!border-primary-light/50"
        >
          Remove Character
        </SecondaryButton>
      </div>
    </details>
  );
}
