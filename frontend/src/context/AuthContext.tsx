import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiClient, ApiRequestError } from "@/data/apiClient";

interface AuthContextValue {
  isAuthenticated: boolean;
  /** True only while the initial /auth/me check (on load) is in flight. */
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Admin session state. The actual session lives entirely server-side, as
 * a signed token in an httpOnly cookie the frontend never reads directly
 * — this context is just a UI-facing reflection of "does that cookie
 * currently check out", refreshed on load and whenever apiClient sees a
 * 401 from any request.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await apiClient.get<{ authenticated: boolean }>("/auth/me");
        if (!cancelled) setIsAuthenticated(result.authenticated);
      } catch {
        if (!cancelled) setIsAuthenticated(false);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Fired by apiClient.ts the moment ANY request comes back 401 — e.g.
    // the session cookie expired mid-session. Immediately reflect that
    // here so AdminProtectedRoute redirects to the login screen on the
    // next render, without needing every admin screen to catch this
    // itself.
    const handleUnauthorized = () => setIsAuthenticated(false);
    window.addEventListener("dossier:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("dossier:unauthorized", handleUnauthorized);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await apiClient.post<{ authenticated: boolean }>("/auth/login", { username, password });
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      if (err instanceof ApiRequestError) throw err;
      throw new ApiRequestError(0, "Couldn't reach the DOSSIER server. Check your connection and try again.");
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout", {});
    } finally {
      // Log the UI out even if the network call fails — there's nothing
      // useful the admin can do about a failed logout request, and
      // leaving the dashboard visually "logged in" while the request
      // hangs is worse than optimistically clearing local state.
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
