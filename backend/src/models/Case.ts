import { Schema, model, type InferSchemaType } from "mongoose";
import { LocalizedTextSchema, OptionalLocalizedTextSchema } from "./localizedText.js";

/**
 * Mirrors frontend/src/types/caseRecord.ts's CaseCharacterRecord.whatYouKnow[].
 */
const CharacterClueSchema = new Schema(
  {
    // Deliberately OptionalLocalizedTextSchema, not the required variant:
    // the frontend's own validateForPublish() only warns (never blocks)
    // on a whatYouKnow entry missing one language, and at least one real
    // published case already has entries authored in Arabic only. A
    // stricter schema here would refuse to store existing, already-live
    // case data — see Phase 1 report for details.
    text: { type: OptionalLocalizedTextSchema, required: true },
    refersToRoleId: { type: String },
  },
  { _id: false }
);

/**
 * Mirrors CaseCharacterRecord. The first six fields are what the existing
 * gameplay role system (CharacterRole, frontend/src/types/role.ts) reads;
 * background/objective/hiddenInfo are dashboard-only context fields the
 * game doesn't render yet, but are preserved here exactly as authored.
 */
const CaseCharacterSchema = new Schema(
  {
    id: { type: String, required: true },
    characterName: { type: LocalizedTextSchema, required: true },
    occupation: { type: LocalizedTextSchema, required: true },
    relationshipToVictim: { type: LocalizedTextSchema, required: true },
    whyAtScene: { type: LocalizedTextSchema, required: true },
    whatYouKnow: { type: [CharacterClueSchema], default: [] },
    secret: { type: OptionalLocalizedTextSchema },
    background: { type: OptionalLocalizedTextSchema },
    objective: { type: OptionalLocalizedTextSchema },
    hiddenInfo: { type: OptionalLocalizedTextSchema },
  },
  { _id: false }
);

/** Mirrors CaseVictimRecord. */
const CaseVictimSchema = new Schema(
  {
    name: { type: LocalizedTextSchema, required: true },
    description: { type: LocalizedTextSchema, required: true },
    background: { type: OptionalLocalizedTextSchema },
    relevantInfo: { type: OptionalLocalizedTextSchema },
  },
  { _id: false }
);

/** Mirrors CaseBasicInfoRecord. */
const CaseBasicInfoSchema = new Schema(
  {
    title: { type: LocalizedTextSchema, required: true },
    shortDescription: { type: LocalizedTextSchema, required: true },
    fullStory: { type: LocalizedTextSchema, required: true },
    location: { type: LocalizedTextSchema, required: true },
    time: { type: LocalizedTextSchema, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
    playerCountRange: { type: String, required: true, default: "3-8" },
    durationMinutes: { type: Number, required: true },
    discussionMinutes: { type: Number, required: true },
    coverImage: { type: String },
    category: { type: LocalizedTextSchema, required: true },
    objectives: { type: [LocalizedTextSchema], default: [] },
    briefingObjective: { type: LocalizedTextSchema, required: true },
    warning: { type: OptionalLocalizedTextSchema },
  },
  { _id: false }
);

/**
 * Mirrors ProgressiveClue. `textByKiller` is a Map keyed by killer
 * candidate id — the non-deterministic clue-redesign philosophy (each
 * round is authored once per possible killer) is preserved exactly.
 */
const ProgressiveClueSchema = new Schema(
  {
    id: { type: String, required: true },
    order: { type: Number, required: true },
    type: {
      type: String,
      enum: ["neutral", "suspicious", "eliminating", "finalDeduction"],
      required: true,
    },
    textByKiller: { type: Map, of: LocalizedTextSchema, default: {} },
  },
  { _id: false }
);

/** Mirrors CaseSolution. Same per-candidate Map shape as clues. */
const CaseSolutionSchema = new Schema(
  {
    killerExplanationByCandidate: { type: Map, of: LocalizedTextSchema, default: {} },
    innocenceExplanationByCandidate: { type: Map, of: LocalizedTextSchema, default: {} },
  },
  { _id: false }
);

const CaseSchema = new Schema(
  {
    // The app-level stable identifier used everywhere on the frontend
    // (URLs, killer candidate ids, clue map keys). Deliberately NOT
    // Mongo's own _id — every existing case (legacy + dashboard-created)
    // already has one of these, and nothing about the frontend contract
    // changes if this stays the primary identifier.
    id: { type: String, required: true, unique: true, index: true },
    number: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], required: true, default: "draft" },
    basicInfo: { type: CaseBasicInfoSchema, required: true },
    victim: { type: CaseVictimSchema, required: true },
    characters: { type: [CaseCharacterSchema], default: [] },
    killerCandidateIds: { type: [String], default: [] },
    clues: { type: [ProgressiveClueSchema], default: [] },
    solution: { type: CaseSolutionSchema, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      flattenMaps: true, // without this, Map fields (textByKiller, solution.*ByCandidate) serialize as {}
      transform(_doc, ret) {
        // API consumers only ever see the shape CaseRecord already
        // defines on the frontend — no Mongo internals.
        Reflect.deleteProperty(ret, "_id");
        Reflect.deleteProperty(ret, "__v");
        return ret;
      },
    },
  }
);

export type CaseDocument = InferSchemaType<typeof CaseSchema>;

export const Case = model("Case", CaseSchema);
