export default function StatCard({
  label,
  value,
  icon,
  sublabel,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  sublabel?: string;
}) {
  return (
    <div className="border border-[#E5E5E5] rounded-xl p-5 bg-white card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 border border-[#E5E5E5] rounded-xl flex items-center justify-center bg-[#FAFAFA]">
          {icon}
        </div>
        <svg className="w-4 h-4 text-[#D4D4D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      </div>
      <p className="text-2xl font-bold text-[#0A0A0A] tracking-tight">{value}</p>
      <p className="text-sm text-[#525252] mt-0.5 font-medium">{label}</p>
      {sublabel && <p className="text-xs text-[#A3A3A3] mt-1">{sublabel}</p>}
    </div>
  );
}
