"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#0A0A0A] mb-2">Something went wrong</h2>
        <p className="text-[#737373] mb-4">An unexpected error occurred. Please try again.</p>
        <button
          onClick={reset}
          className="bg-[#0A0A0A] text-white px-6 py-2 rounded-lg hover:bg-[#171717] transition-colors text-sm font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
