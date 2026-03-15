export default function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center relative">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative">
        <div className="w-14 h-14 border-2 border-[#E5E5E5] rounded-2xl flex items-center justify-center mb-5 bg-white">
          {icon}
        </div>
        <h3 className="text-base font-bold text-[#0A0A0A] mb-1.5">{title}</h3>
        <p className="text-sm text-[#525252] max-w-xs mb-6">{description}</p>
        {action}
      </div>
    </div>
  );
}
