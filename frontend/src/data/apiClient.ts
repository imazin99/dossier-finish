/**
 * DOSSIER API client — the ONLY file that calls `fetch()` against the
 * backend. data/caseStore.ts and context/CasesContext.tsx both go through
 * this rather than building request URLs themselves.
 */

const DEFAULT_BASE_URL = "/api";

function resolveBaseUrl(): string {
  const configured = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (configured && configured.trim().length > 0) {
    return configured.replace(/\/+$/, "");
  }
  // Relative path: works through the Vite dev-server proxy (see
  // vite.config.ts) without needing to know the backend's host at all —
  // this is what makes LAN testing (phone -> laptop) work without any
  // per-network configuration. Also works if the built frontend is ever
  // served directly by the Express backend.
  return DEFAULT_BASE_URL;
}

export const API_BASE_URL = resolveBaseUrl();

/** Thrown for any non-2xx response. `status` lets callers branch on 404
 * vs 409 vs other cases (e.g. caseStore.ts's create-or-update fallback). */
export class ApiRequestError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      // Always send the admin session cookie when present — harmless for
      // public GET calls (there's simply nothing to send), required for
      // every admin-only mutation to be recognized as authenticated.
      credentials: "include",
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
  } catch {
    // Network-level failure (server down, offline, LAN unreachable) — not
    // an HTTP error response, so it needs its own message.
    throw new ApiRequestError(0, "Couldn't reach the DOSSIER server. Check your connection and try again.");
  }

  if (!response.ok) {
    let message = `Request failed (${response.status}).`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      // Non-JSON error body — keep the generic message above.
    }

    if (response.status === 401) {
      // Broadcast rather than importing AuthContext directly — apiClient
      // is used by plain data/ modules that don't (and shouldn't) know
      // about React context. AuthContext listens for this to immediately
      // flip to "logged out" the moment a session expires or is
      // invalidated, wherever in the app that happens to surface.
      window.dispatchEvent(new CustomEvent("dossier:unauthorized"));
    }

    throw new ApiRequestError(response.status, message);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

export const apiClient = {
  get: <T,>(path: string) => request<T>(path),
  post: <T,>(path: string, body: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T,>(path: string, body: unknown) => request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T,>(path: string, body: unknown) => request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path: string) => request<void>(path, { method: "DELETE" }),
};
