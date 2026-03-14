export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-[#F5F5F5] rounded-lg w-48 mb-2" />
        <div className="h-4 bg-[#F5F5F5] rounded-lg w-64 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-[#E5E5E5] rounded-xl p-6">
              <div className="h-4 bg-[#F5F5F5] rounded-lg w-24 mb-2" />
              <div className="h-8 bg-[#F5F5F5] rounded-lg w-16" />
            </div>
          ))}
        </div>

        <div className="h-6 bg-[#F5F5F5] rounded-lg w-40 mb-4" />
        <div className="border border-[#E5E5E5] rounded-xl p-6 h-32" />
      </div>
    </div>
  );
}
