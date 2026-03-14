import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-base font-semibold tracking-tight text-[#0A0A0A]">DocQuiz AI</span>
            <p className="mt-3 text-sm text-[#737373] leading-relaxed">
              Turn documents into interactive study materials with AI.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#A3A3A3] mb-4">Product</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/pricing" className="text-sm text-[#737373] hover:text-[#0A0A0A] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-sm text-[#737373] hover:text-[#0A0A0A] transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Study Tools */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#A3A3A3] mb-4">Study Tools</p>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-[#737373]">Quiz Generator</span>
              </li>
              <li>
                <span className="text-sm text-[#737373]">Flashcards</span>
              </li>
              <li>
                <span className="text-sm text-[#737373]">Study Guides</span>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#A3A3A3] mb-4">Account</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/login" className="text-sm text-[#737373] hover:text-[#0A0A0A] transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-sm text-[#737373] hover:text-[#0A0A0A] transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#E5E5E5] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#A3A3A3]">
            &copy; {new Date().getFullYear()} DocQuiz AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="text-xs text-[#A3A3A3]">Secured with Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
