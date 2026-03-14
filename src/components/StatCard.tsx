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
    <div className="border border-[#E5E5E5] rounded-xl p-5 bg-white hover:border-[#D4D4D4] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F5F5F5]">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold text-[#0A0A0A] tracking-tight">{value}</p>
      <p className="text-sm text-[#737373] mt-0.5">{label}</p>
      {sublabel && <p className="text-xs text-[#A3A3A3] mt-1">{sublabel}</p>}
    </div>
  );
}
