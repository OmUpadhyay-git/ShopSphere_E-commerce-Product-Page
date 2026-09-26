interface LoadingSkeletonProps {
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-square animate-pulse bg-slate-200 rounded-t-xl" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-4 animate-pulse rounded bg-slate-200" />
          ))}
        </div>
        <div className="h-5 w-1/3 animate-pulse rounded bg-slate-200" />
        <div className="h-9 w-full animate-pulse rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}

export function LoadingSkeleton({ count = 8 }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
