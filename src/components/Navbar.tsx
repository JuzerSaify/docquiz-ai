"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface NavbarProps {
  email: string;
  subscriptionStatus: string;
}

export default function Navbar({ email, subscriptionStatus }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const initial = email ? email[0].toUpperCase() : "U";

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-[#E5E5E5] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-base font-semibold tracking-tight text-[#0A0A0A]">
              DocQuiz AI
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/dashboard"
                className="text-[#737373] hover:text-[#0A0A0A] text-sm px-3 py-1.5 rounded-md hover:bg-[#F5F5F5] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/documents"
                className="text-[#737373] hover:text-[#0A0A0A] text-sm px-3 py-1.5 rounded-md hover:bg-[#F5F5F5] transition-colors"
              >
                Documents
              </Link>
              <Link
                href="/dashboard/quizzes"
                className="text-[#737373] hover:text-[#0A0A0A] text-sm px-3 py-1.5 rounded-md hover:bg-[#F5F5F5] transition-colors"
              >
                Quizzes
              </Link>
              <Link
                href="/pricing"
                className="text-[#737373] hover:text-[#0A0A0A] text-sm px-3 py-1.5 rounded-md hover:bg-[#F5F5F5] transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-0.5 rounded text-xs font-medium border ${
              subscriptionStatus === "active"
                ? "border-[#0A0A0A] text-white bg-[#0A0A0A]"
                : "border-[#E5E5E5] text-[#737373]"
            }`}>
              {subscriptionStatus === "active" ? "Pro" : "Free"}
            </span>

            {/* User avatar & dropdown area */}
            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-[#E5E5E5]">
              <div className="w-7 h-7 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center">
                <span className="text-xs font-medium text-[#0A0A0A]">{initial}</span>
              </div>
              <span className="text-xs text-[#A3A3A3] max-w-[140px] truncate">{email}</span>
              <button
                onClick={handleSignOut}
                className="text-xs text-[#737373] hover:text-[#0A0A0A] transition-colors ml-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 rounded-md hover:bg-[#F5F5F5] transition-colors"
            >
              <svg className="w-5 h-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#E5E5E5] py-3 space-y-1">
            <Link href="/dashboard" className="block text-sm text-[#737373] hover:text-[#0A0A0A] px-3 py-2 rounded-md hover:bg-[#F5F5F5]" onClick={() => setMobileOpen(false)}>
              Dashboard
            </Link>
            <Link href="/dashboard/documents" className="block text-sm text-[#737373] hover:text-[#0A0A0A] px-3 py-2 rounded-md hover:bg-[#F5F5F5]" onClick={() => setMobileOpen(false)}>
              Documents
            </Link>
            <Link href="/dashboard/quizzes" className="block text-sm text-[#737373] hover:text-[#0A0A0A] px-3 py-2 rounded-md hover:bg-[#F5F5F5]" onClick={() => setMobileOpen(false)}>
              Quizzes
            </Link>
            <Link href="/pricing" className="block text-sm text-[#737373] hover:text-[#0A0A0A] px-3 py-2 rounded-md hover:bg-[#F5F5F5]" onClick={() => setMobileOpen(false)}>
              Pricing
            </Link>
            <div className="border-t border-[#E5E5E5] pt-2 mt-2 px-3">
              <p className="text-xs text-[#A3A3A3] mb-2">{email}</p>
              <button onClick={handleSignOut} className="text-sm text-[#737373] hover:text-[#0A0A0A]">
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
