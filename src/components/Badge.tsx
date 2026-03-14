export default function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "pro";
}) {
  const styles = {
    default: "border-[#E5E5E5] text-[#737373] bg-white",
    success: "border-[#0A0A0A] text-[#0A0A0A] bg-white",
    warning: "border-[#E5E5E5] text-[#A3A3A3] bg-[#F5F5F5]",
    pro: "border-[#0A0A0A] text-white bg-[#0A0A0A]",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${styles[variant]}`}>
      {children}
    </span>
  );
}
