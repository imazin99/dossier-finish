import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { ADMIN_LOGIN_PATTERN } from "@/router/paths";
import { LoadingSpinner } from "@components/ui";

/**
 * Wraps /admin, /admin/cases/new, /admin/cases/:id/edit. This only
 * controls what renders in the browser — it does NOT itself make the API
 * safe. Every admin-mutating endpoint enforces its own auth server-side
 * via requireAdmin (backend/src/middleware/requireAdmin.ts) regardless of
 * what this component decides to render.
 */
export function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ADMIN_LOGIN_PATTERN} replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
