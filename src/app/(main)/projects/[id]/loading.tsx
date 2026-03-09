function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className ?? ""}`}
    />
  );
}

export default function ProjectDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <div className="h-5 w-px bg-border mx-1" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-5 w-full max-w-md" />
      </div>

      {/* Tasks + Notes grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card p-6 space-y-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="rounded-lg border bg-card p-6 space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Connections skeleton */}
      <div className="rounded-lg border bg-card p-6 space-y-3">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-full max-w-xs" />
      </div>
    </div>
  );
}
