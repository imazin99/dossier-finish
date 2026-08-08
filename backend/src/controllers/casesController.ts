import type { Request, Response } from "express";
import { Case } from "../models/Case.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * GET /api/cases
 * GET /api/cases?status=published
 * GET /api/cases?status=draft
 *
 * No filter = every case (what the Admin Dashboard needs). ?status=
 * narrows it — this is what the Player App will eventually call with
 * status=published once Phase 2 wires the frontend up to this API.
 */
export async function listCases(req: Request, res: Response) {
  const { status } = req.query;

  if (status !== undefined && status !== "draft" && status !== "published") {
    throw ApiError.badRequest('Query param "status" must be either "draft" or "published".');
  }

  const filter = status ? { status } : {};
  const cases = await Case.find(filter).sort({ createdAt: 1 });
  res.json(cases);
}

/** GET /api/cases/:id — looked up by the app-level string `id`, not Mongo's _id. */
export async function getCaseById(req: Request, res: Response) {
  const found = await Case.findOne({ id: req.params.id });
  if (!found) throw ApiError.notFound(`No case found with id "${req.params.id}".`);
  res.json(found);
}

/**
 * POST /api/cases
 * Body = a full CaseRecord (id and number must already be assigned by the
 * caller — Phase 1 doesn't change how the dashboard generates them).
 */
export async function createCase(req: Request, res: Response) {
  const { id } = req.body ?? {};
  if (!id || typeof id !== "string") {
    throw ApiError.badRequest('A case "id" (string) is required to create a case.');
  }

  const existing = await Case.findOne({ id });
  if (existing) {
    throw ApiError.conflict(`A case with id "${id}" already exists.`);
  }

  const created = await Case.create(req.body);
  res.status(201).json(created);
}

/**
 * PUT /api/cases/:id — full replace of everything except the identifying
 * `id` itself, which always comes from the URL, never the body, so a
 * stray/edited id in the payload can never silently rename a case.
 */
export async function updateCase(req: Request, res: Response) {
  const { id: _ignoredBodyId, ...rest } = req.body ?? {};

  const updated = await Case.findOneAndUpdate(
    { id: req.params.id },
    { ...rest, id: req.params.id },
    { new: true, runValidators: true, overwrite: true }
  );

  if (!updated) throw ApiError.notFound(`No case found with id "${req.params.id}".`);
  res.json(updated);
}

/** PATCH /api/cases/:id/status — body: { status: "draft" | "published" } */
export async function updateCaseStatus(req: Request, res: Response) {
  const { status } = req.body ?? {};
  if (status !== "draft" && status !== "published") {
    throw ApiError.badRequest('Body must include "status" as either "draft" or "published".');
  }

  const updated = await Case.findOneAndUpdate({ id: req.params.id }, { status }, { new: true, runValidators: true });
  if (!updated) throw ApiError.notFound(`No case found with id "${req.params.id}".`);
  res.json(updated);
}

/** DELETE /api/cases/:id */
export async function deleteCase(req: Request, res: Response) {
  const deleted = await Case.findOneAndDelete({ id: req.params.id });
  if (!deleted) throw ApiError.notFound(`No case found with id "${req.params.id}".`);
  res.status(204).send();
}
