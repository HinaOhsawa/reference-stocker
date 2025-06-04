export default function LinkCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="rounded-md flex gap-0 sm:gap-1 p-0 flex-row overflow-hidden border border-gray-200 shadow-sm">
        <div className="w-1/3 bg-gray-200 h-24 sm:h-32" />
        <div className="p-2 sm:p-4 flex flex-col gap-2 w-2/3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mt-auto" />
        </div>
      </div>
    </div>
  );
}
