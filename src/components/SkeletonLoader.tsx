export default function SkeletonLoader({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border border-[#E5E5E5] rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#F5F5F5] rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[#F5F5F5] rounded w-1/3"></div>
              <div className="h-3 bg-[#F5F5F5] rounded w-1/2"></div>
            </div>
            <div className="h-8 w-20 bg-[#F5F5F5] rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
