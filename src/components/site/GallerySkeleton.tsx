import { Skeleton } from "@/components/ui/skeleton";

export function GallerySkeleton() {
  return (
    <div className="container-x py-14 pb-24">
      <Skeleton className="h-3 w-20 skeleton-shimmer" />
      <Skeleton className="mt-4 h-12 w-56 max-w-full skeleton-shimmer" />
      <Skeleton className="mt-3 h-5 w-80 max-w-full skeleton-shimmer" />
      <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="mb-5 w-full break-inside-avoid rounded-2xl skeleton-shimmer"
            style={{ height: i % 3 === 0 ? 280 : i % 3 === 1 ? 220 : 320 }}
          />
        ))}
      </div>
    </div>
  );
}
