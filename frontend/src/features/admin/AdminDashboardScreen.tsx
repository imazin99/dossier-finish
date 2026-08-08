import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Copy, Trash2, Eye, EyeOff, FileWarning, TriangleAlert, UploadCloud, LogOut } from "lucide-react";
import { PrimaryButton, SecondaryButton, GlassCard, DifficultyBadge, PlayersBadge, LoadingSpinner } from "@components/ui";
import { CASE_PLAYER_RANGE } from "@/types/case";
import { ADMIN_NEW_CASE_PATTERN, ADMIN_LOGIN_PATTERN, buildAdminEditCasePath } from "@/router/paths";
import { getAllCases, deleteCase, duplicateCase, setCaseStatus } from "@/data/caseStore";
import { importLocalCasesToServer } from "@/data/caseMigration";
import { useAuth } from "@context/AuthContext";
import type { CaseRecord } from "@/types/caseRecord";

/**
 * DOSSIER Case Management Dashboard.
 * Not part of the player-facing app shell (no RootLayout/BottomNavigation) —
 * this is an internal authoring tool, reached directly at /admin.
 *
 * Every case-management action here goes through data/caseStore.ts, which
 * as of Phase 2 talks to the Express/MongoDB API — this screen no longer
 * touches localStorage at all.
 */
export function AdminDashboardScreen() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const refresh = async () => {
    setError(null);
    try {
      setCases(await getAllCases());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cases.");
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await refresh();
      setIsLoading(false);
    })();
  }, []);

  const handleDelete = async (record: CaseRecord) => {
    const label = record.basicInfo.title.en || record.basicInfo.title.ar || record.id;
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try {
      await deleteCase(record.id);
      await refresh();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Failed to delete the case.");
    }
  };

  const handleDuplicate = async (record: CaseRecord) => {
    try {
      await duplicateCase(record.id);
      await refresh();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Failed to duplicate the case.");
    }
  };

  const handleToggleStatus = async (record: CaseRecord) => {
    try {
      await setCaseStatus(record.id, record.status === "published" ? "draft" : "published");
      await refresh();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Failed to update the case's status.");
    }
  };

  const handleImportLocalCases = async () => {
    if (
      !window.confirm(
        "Import every case currently in this browser's local storage to the server?\n\n" +
          "Cases that already exist on the server (matched by id) are skipped — nothing already on the server gets overwritten, and nothing is deleted from local storage."
      )
    ) {
      return;
    }
    setIsImporting(true);
    try {
      const summary = await importLocalCasesToServer();
      window.alert(
        `Import finished.\n\nCreated: ${summary.created.length ? summary.created.join(", ") : "none"}\n` +
          `Already on server (skipped): ${summary.skipped.length ? summary.skipped.join(", ") : "none"}\n` +
          `Failed: ${summary.failed.length ? summary.failed.map((f) => `${f.id} (${f.error})`).join(", ") : "none"}`
      );
      await refresh();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Import failed.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate(ADMIN_LOGIN_PATTERN, { replace: true });
  };

  return (
    <div className="min-h-dvh bg-background px-4 py-8 sm:px-8" dir="ltr">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="file-label">Internal Tool</span>
            <h1 className="font-display text-2xl font-bold text-text">DOSSIER Case Management</h1>
            <p className="text-sm text-text-secondary">
              Create, edit, duplicate, delete, and publish cases. Only <span className="text-text">Published</span>{" "}
              cases appear in the game.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <SecondaryButton icon={UploadCloud} onClick={handleImportLocalCases} disabled={isImporting}>
              {isImporting ? "Importing…" : "Import Local Cases"}
            </SecondaryButton>
            <PrimaryButton icon={Plus} onClick={() => navigate(ADMIN_NEW_CASE_PATTERN)}>
              New Case
            </PrimaryButton>
            <SecondaryButton icon={LogOut} onClick={handleLogout}>
              Log Out
            </SecondaryButton>
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" label="Loading cases from the server…" />
          </div>
        ) : error ? (
          <GlassCard className="flex flex-col items-center gap-3 py-12 text-center">
            <TriangleAlert className="h-8 w-8 text-primary-light" />
            <p className="text-text-secondary">{error}</p>
            <SecondaryButton onClick={refresh}>Retry</SecondaryButton>
          </GlassCard>
        ) : cases.length === 0 ? (
          <GlassCard className="flex flex-col items-center gap-3 py-12 text-center">
            <FileWarning className="h-8 w-8 text-text-secondary" />
            <p className="text-text-secondary">No cases yet. Create your first one, or import from local storage.</p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((record) => (
              <CaseAdminCard
                key={record.id}
                record={record}
                onEdit={() => navigate(buildAdminEditCasePath(record.id))}
                onDuplicate={() => handleDuplicate(record)}
                onDelete={() => handleDelete(record)}
                onToggleStatus={() => handleToggleStatus(record)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CaseAdminCard({
  record,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleStatus,
}: {
  record: CaseRecord;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}) {
  const { basicInfo } = record;
  const isPublished = record.status === "published";

  return (
    <GlassCard padding="md" className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="file-label">#{record.number}</span>
          <h3 className="font-display text-base font-semibold leading-tight text-text">
            {basicInfo.title.en || basicInfo.title.ar || "Untitled case"}
          </h3>
          <span className="text-xs text-text-secondary" dir="rtl">
            {basicInfo.title.ar}
          </span>
        </div>
        <span
          className={
            "shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide " +
            (isPublished
              ? "border-primary-light/40 bg-primary/10 text-primary-light"
              : "border-border-light/60 bg-white/5 text-text-secondary")
          }
        >
          {isPublished ? "Published" : "Draft"}
        </span>
      </div>

      {basicInfo.coverImage && (
        <img src={basicInfo.coverImage} alt="" className="h-32 w-full rounded-xl object-cover" />
      )}

      <div className="flex flex-wrap items-center gap-2">
        <DifficultyBadge level={basicInfo.difficulty} />
        <PlayersBadge count={CASE_PLAYER_RANGE} />
        <span className="file-label">{record.characters.length} characters</span>
        <span className="file-label">{record.killerCandidateIds.length} killer candidates</span>
      </div>

      <div className="mt-1 grid grid-cols-2 gap-2">
        <SecondaryButton icon={Pencil} onClick={onEdit} className="!px-3 !py-2 text-xs">
          Edit
        </SecondaryButton>
        <SecondaryButton icon={Copy} onClick={onDuplicate} className="!px-3 !py-2 text-xs">
          Duplicate
        </SecondaryButton>
        <SecondaryButton
          icon={isPublished ? EyeOff : Eye}
          onClick={onToggleStatus}
          className="!px-3 !py-2 text-xs"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </SecondaryButton>
        <SecondaryButton
          icon={Trash2}
          onClick={onDelete}
          className="!px-3 !py-2 text-xs hover:!border-primary-light/50"
        >
          Delete
        </SecondaryButton>
      </div>
    </GlassCard>
  );
}
