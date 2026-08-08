import { CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";
import { GlassCard, PrimaryButton, SecondaryButton } from "@components/ui";
import { cn } from "@lib/utils";
import type { CaseRecord } from "@/types/caseRecord";
import type { ValidationResult } from "@/data/caseValidation";

interface Props {
  record: CaseRecord;
  validation: ValidationResult;
  onPublish: () => void;
  onUnpublish: () => void;
}

export function PublishSection({ record, validation, onPublish, onUnpublish }: Props) {
  const canPublish = validation.errors.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <GlassCard className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-text">Status</h3>
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-wide",
              record.status === "published"
                ? "border-primary-light/40 bg-primary/10 text-primary-light"
                : "border-border-light/60 bg-white/5 text-text-secondary"
            )}
          >
            {record.status}
          </span>
        </div>
        <p className="text-sm text-text-secondary">
          Only <span className="text-text">Published</span> cases appear in the game's case archive. Save your
          changes first, then publish once everything below is checked off.
        </p>
        {record.status === "published" ? (
          <SecondaryButton onClick={onUnpublish} className="self-start">
            Move back to Draft
          </SecondaryButton>
        ) : (
          <PrimaryButton onClick={onPublish} disabled={!canPublish} glow={canPublish}>
            Publish Case
          </PrimaryButton>
        )}
      </GlassCard>

      {validation.errors.length > 0 && (
        <GlassCard className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-4 w-4 text-primary-light" />
            <h3 className="font-display text-base font-semibold text-text">Required before publishing</h3>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-text-secondary">
            {validation.errors.map((error, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary-light">•</span>
                {error}
              </li>
            ))}
          </ul>
        </GlassCard>
      )}

      {validation.warnings.length > 0 && (
        <GlassCard className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-text-secondary" />
            <h3 className="font-display text-base font-semibold text-text">Optional — worth a look</h3>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-text-secondary">
            {validation.warnings.map((warning, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-text-secondary">•</span>
                {warning}
              </li>
            ))}
          </ul>
        </GlassCard>
      )}

      {validation.errors.length === 0 && validation.warnings.length === 0 && (
        <GlassCard className="flex items-center gap-2 text-sm text-text">
          <CheckCircle2 className="h-4 w-4 text-primary-light" />
          Everything looks complete.
        </GlassCard>
      )}
    </div>
  );
}
