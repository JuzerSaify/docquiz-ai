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
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 border border-[#E5E5E5] rounded-xl flex items-center justify-center mb-5 bg-[#F5F5F5]">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-[#0A0A0A] mb-1.5">{title}</h3>
      <p className="text-sm text-[#737373] max-w-xs mb-6">{description}</p>
      {action}
    </div>
  );
}
