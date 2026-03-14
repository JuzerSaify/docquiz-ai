import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="text-6xl font-semibold text-[#0A0A0A] mb-4">404</p>
        <h1 className="text-xl font-semibold text-[#0A0A0A] mb-2">Page not found</h1>
        <p className="text-sm text-[#737373] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="bg-[#0A0A0A] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#171717] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="border border-[#E5E5E5] text-[#0A0A0A] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
