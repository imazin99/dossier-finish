import { cn } from "@lib/utils";

interface DividerProps {
  label?: string;
  className?: string;
}

/** Simple themed divider. Pass `label` for a centered "or"-style break. */
export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <div className={cn("h-px w-full bg-border/60", className)} />;
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-px flex-1 bg-border/60" />
      <span className="file-label">{label}</span>
      <div className="h-px flex-1 bg-border/60" />
    </div>
  );
}
