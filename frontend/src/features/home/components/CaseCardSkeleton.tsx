/**
 * Skeleton placeholder matching CaseCard's shape (poster + title +
 * description + badge row), so the loading state doesn't jump when real
 * content replaces it. Purely presentational — no data involved.
 */
export function CaseCardSkeleton() {
  return (
    <div className="glass-panel flex flex-col gap-3 rounded-3xl border-primary/10 p-4">
      <div className="skeleton-block aspect-[16/9] w-full" />
      <div className="flex flex-col gap-2 px-0.5 pb-0.5">
        <div className="skeleton-block h-4 w-3/5 rounded-full" />
        <div className="skeleton-block h-3 w-full rounded-full" />
        <div className="skeleton-block h-3 w-4/5 rounded-full" />
        <div className="mt-1 flex gap-1.5">
          <div className="skeleton-block h-6 w-16 rounded-full" />
          <div className="skeleton-block h-6 w-16 rounded-full" />
          <div className="skeleton-block h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
