import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { ADMIN_COOKIE_NAME, signAdminToken, verifyAdminToken } from "../config/auth.js";
import { ApiError } from "../utils/ApiError.js";

const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days, matches the default JWT_EXPIRES_IN

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "none" as const,
    secure: true,
    maxAge: COOKIE_MAX_AGE_MS,
    path: "/",
  };
}

/** POST /api/auth/login */
export async function login(req: Request, res: Response) {
  const { username, password } = req.body ?? {};

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.trim() === "" ||
    password.trim() === ""
  ) {
    throw ApiError.badRequest("Username and password are required.");
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminUsername || !adminPasswordHash) {
    throw new ApiError(500, "Admin credentials are not configured on the server.");
  }

  // Always run the (comparatively slow) hash comparison, even when the
  // username is already wrong, so a bad username doesn't return
  // measurably faster than a bad password.
  const passwordMatches = await bcrypt.compare(password, adminPasswordHash);
  const usernameMatches = username === adminUsername;

  if (!usernameMatches || !passwordMatches) {
    throw ApiError.unauthorized("Invalid username or password.");
  }

  const token = signAdminToken();
  res.cookie(ADMIN_COOKIE_NAME, token, cookieOptions());
  res.json({ authenticated: true });
}

/** POST /api/auth/logout */
export async function logout(_req: Request, res: Response) {
  res.clearCookie(ADMIN_COOKIE_NAME, { path: "/" });
  res.json({ authenticated: false });
}

/** GET /api/auth/me — used by the frontend on load to detect an existing, still-valid session after a page refresh. Never errors; an absent/invalid token is just "not authenticated", not a failure. */
export async function me(req: Request, res: Response) {
  const token = req.cookies?.[ADMIN_COOKIE_NAME];
  const authenticated = typeof token === "string" && token.trim() !== "" && verifyAdminToken(token);
  res.json({ authenticated });
}
