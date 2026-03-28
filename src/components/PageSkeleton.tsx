import { memo } from "react";
import { Skeleton } from "./ui/skeleton";

export const PageSkeleton = memo(function PageSkeleton() {
  return (
    <div
      className="min-h-screen w-full pt-32 px-6 flex flex-col max-w-7xl mx-auto"
      aria-busy="true"
      aria-label="Loading page content"
      role="status"
    >
      <span className="sr-only">Loading content...</span>

      {/* Hero Skeleton */}
      <div className="flex flex-col items-center justify-center space-y-8 mt-10 mb-20">
        <Skeleton className="w-40 h-10 rounded-full" />
        <Skeleton className="w-3/4 max-w-4xl h-16 md:h-24 rounded-3xl" />
        <Skeleton className="w-2/3 max-w-2xl h-8 rounded-xl mt-4" />
        <div className="flex gap-4 mt-8">
          <Skeleton className="w-40 h-14 rounded-full" />
          <Skeleton className="w-40 h-14 rounded-full opacity-70" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12 mb-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-4">
            <Skeleton className="w-full aspect-[4/3] rounded-3xl" />
            <Skeleton className="w-3/4 h-6 rounded-lg" />
            <Skeleton className="w-1/2 h-4 rounded-md opacity-70" />
          </div>
        ))}
      </div>
    </div>
  );
});
