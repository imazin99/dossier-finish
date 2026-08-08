import type { Request, Response, NextFunction } from "express";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "../config/auth.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Protects admin-only routes. This is the enforcement point — the
 * frontend hiding /admin behind a login screen is a UX convenience only;
 * this middleware is what actually stops an unauthenticated request from
 * reaching a mutating cases controller, regardless of what the client is
 * or what it claims about itself.
 */
export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.[ADMIN_COOKIE_NAME];

  if (!token || typeof token !== "string" || token.trim() === "") {
    throw ApiError.unauthorized("Admin authentication required.");
  }

  if (!verifyAdminToken(token)) {
    throw ApiError.unauthorized("Your session has expired or is invalid. Please log in again.");
  }

  next();
}
