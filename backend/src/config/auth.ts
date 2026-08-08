import jwt from "jsonwebtoken";

/**
 * DOSSIER admin auth is deliberately simple: there is exactly one admin
 * identity, configured entirely via environment variables (ADMIN_USERNAME,
 * ADMIN_PASSWORD_HASH) rather than a MongoDB user collection — there's no
 * multi-admin/user-management requirement here, and this keeps "how do I
 * create the admin account" a one-line .env edit instead of a seed script
 * or registration flow. See ApiError-based errors in authController.ts.
 *
 * Session state is a signed JWT in an httpOnly cookie (never exposed to
 * frontend JS, so it can't be read or exfiltrated via XSS the way a
 * localStorage token could) rather than a server-side session store —
 * there's no session infrastructure (e.g. Redis) in this project, and a
 * stateless JWT needs none.
 */

export const ADMIN_COOKIE_NAME = "dossier_admin_token";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured. Set it in backend/.env before starting the server.");
  }
  return secret;
}

interface AdminTokenPayload {
  role: "admin";
}

export function signAdminToken(): string {
  const options: jwt.SignOptions = { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] };
  return jwt.sign({ role: "admin" } satisfies AdminTokenPayload, getJwtSecret(), options);
}

/** Returns true only for a well-formed, unexpired, correctly-signed admin token. */
export function verifyAdminToken(token: string): boolean {
  try {
    const payload = jwt.verify(token, getJwtSecret());
    return typeof payload === "object" && payload !== null && (payload as AdminTokenPayload).role === "admin";
  } catch {
    // Covers expired, malformed, and invalid-signature tokens alike —
    // all of them just mean "not currently authenticated".
    return false;
  }
}
