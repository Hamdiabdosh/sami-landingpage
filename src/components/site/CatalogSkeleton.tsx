import { Skeleton } from "@/components/ui/skeleton";

export function CatalogSkeleton() {
  return (
    <div className="container-x py-14 pb-24">
      <Skeleton className="h-3 w-20 skeleton-shimmer" />
      <Skeleton className="mt-4 h-12 w-72 max-w-full skeleton-shimmer" />
      <Skeleton className="mt-3 h-5 w-96 max-w-full skeleton-shimmer" />
      <div className="mt-8 flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full skeleton-shimmer" />
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border overflow-hidden">
            <Skeleton className="aspect-[4/3] w-full rounded-none skeleton-shimmer" />
            <div className="p-5 space-y-2">
              <Skeleton className="h-3 w-16 skeleton-shimmer" />
              <Skeleton className="h-5 w-3/4 skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
