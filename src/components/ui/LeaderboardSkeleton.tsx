interface LeaderboardSkeletonProps {
  count: number;
}

export function LeaderboardSkeleton({ count }: LeaderboardSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-4">
            {/* Rank skeleton */}
            <div className="w-8 h-8 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:1000px_100%] animate-shimmer rounded-full" />

            {/* Avatar skeleton */}
            <div className="w-12 h-12 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:1000px_100%] animate-shimmer rounded-full" />

            {/* Content skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:1000px_100%] animate-shimmer rounded w-3/4" />
              <div className="flex gap-4">
                <div className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:1000px_100%] animate-shimmer rounded w-20" />
                <div className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:1000px_100%] animate-shimmer rounded w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
