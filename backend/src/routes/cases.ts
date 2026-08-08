import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  listCases,
  getCaseById,
  createCase,
  updateCase,
  updateCaseStatus,
  deleteCase,
} from "../controllers/casesController.js";

export const casesRouter = Router();

// Public — the Player App reads published cases without logging in.
casesRouter.get("/", asyncHandler(listCases));
casesRouter.get("/:id", asyncHandler(getCaseById));

// Admin-only — every mutation requires a valid admin session.
casesRouter.post("/", requireAdmin, asyncHandler(createCase));
casesRouter.put("/:id", requireAdmin, asyncHandler(updateCase));
casesRouter.patch("/:id/status", requireAdmin, asyncHandler(updateCaseStatus));
casesRouter.delete("/:id", requireAdmin, asyncHandler(deleteCase));
