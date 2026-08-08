import { Schema } from "mongoose";

/**
 * Mirrors frontend/src/types/localized.ts's LocalizedText: { ar, en }.
 * Used as a subdocument schema everywhere the Case model needs bilingual
 * text — never a top-level model on its own.
 */
export const LocalizedTextSchema = new Schema(
  {
    ar: { type: String, required: true, default: "" },
    en: { type: String, required: true, default: "" },
  },
  { _id: false }
);

/** Same shape, but both languages optional — for fields like `secret`,
 * `warning`, `background` etc. that the frontend types as optional. */
export const OptionalLocalizedTextSchema = new Schema(
  {
    ar: { type: String, default: "" },
    en: { type: String, default: "" },
  },
  { _id: false }
);
