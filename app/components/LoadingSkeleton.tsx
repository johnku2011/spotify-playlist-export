export default function LoadingSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-6 space-y-4">
        {/* Search skeleton */}
        <div className="w-full h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />

        {/* Controls skeleton */}
        <div className="flex gap-4">
          <div className="w-24 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          <div className="w-24 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          <div className="ml-auto w-32 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
          >
            <div className="w-full aspect-square bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 animate-pulse" />
              <div className="flex justify-between">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20 animate-pulse" />
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-16 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

