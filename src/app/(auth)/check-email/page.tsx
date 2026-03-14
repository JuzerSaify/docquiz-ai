import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <div className="max-w-md w-full bg-white rounded-xl border border-[#E5E5E5] p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-[#0A0A0A]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-[#0A0A0A] mb-2">Check your email</h1>
        <p className="text-[#737373] mb-6">
          We&apos;ve sent you a confirmation link. Please check your email and click the link to
          verify your account.
        </p>
        <Link
          href="/login"
          className="text-[#0A0A0A] underline underline-offset-2 hover:text-[#737373] text-sm transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
