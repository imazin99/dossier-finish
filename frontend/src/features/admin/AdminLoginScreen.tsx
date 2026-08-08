import { useState, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Fingerprint } from "lucide-react";
import { GlassCard, PrimaryButton } from "@components/ui";
import { TextInput } from "./components/FormFields";
import { useAuth } from "@context/AuthContext";
import { ADMIN_DASHBOARD_PATTERN } from "@/router/paths";
import { ApiRequestError } from "@/data/apiClient";

/**
 * Admin-only login gate for the Case Management Dashboard. Not part of
 * the player-facing app (no bottom nav / RootLayout) — same standalone
 * treatment as the rest of /admin.
 */
export function AdminLoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = (location.state as { from?: string } | null)?.from ?? ADMIN_DASHBOARD_PATTERN;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Enter both a username and password.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await login(username, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Couldn't log in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4" dir="ltr">
      <GlassCard className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary-light/30 bg-primary/10">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-md" />
            <Fingerprint className="relative h-6 w-6 text-primary-light" strokeWidth={1.75} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="file-label">Internal Tool</span>
            <h1 className="font-display text-xl font-bold text-text">DOSSIER Admin</h1>
            <p className="text-sm text-text-secondary">Log in to manage cases.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput label="Username" value={username} onChange={setUsername} required />
          <TextInput label="Password" type="password" value={password} onChange={setPassword} required />

          {error && (
            <p className="rounded-xl border border-primary-light/30 bg-primary/10 px-3.5 py-2.5 text-sm text-primary-light">
              {error}
            </p>
          )}

          <PrimaryButton type="submit" icon={Lock} disabled={isSubmitting} fullWidth>
            {isSubmitting ? "Logging in…" : "Log In"}
          </PrimaryButton>
        </form>
      </GlassCard>
    </div>
  );
}
