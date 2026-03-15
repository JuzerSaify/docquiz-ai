"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PricingClientProps {
  isLoggedIn: boolean;
  subscriptionStatus: string;
  hasStripeCustomer: boolean;
}

const faqs = [
  { q: "How does the free plan work?", a: "You get 3 total quiz generations for free. Upload any PDF and generate quizzes, flashcards, or study guides — each generation counts as one use." },
  { q: "Can I cancel my Pro subscription?", a: "Yes, cancel anytime from your billing portal. You'll keep Pro access until the end of your billing period." },
  { q: "What file types are supported?", a: "Currently we support PDF files up to 10MB. We're working on adding support for more formats." },
  { q: "How accurate is the AI generation?", a: "Powered by Gemini AI, our quiz generation produces high-quality questions with detailed explanations. Results improve with well-structured source documents." },
];

export default function PricingClient({
  isLoggedIn,
  subscriptionStatus,
  hasStripeCustomer,
}: PricingClientProps) {
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  async function handleUpgrade() {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleManage() {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to open billing portal");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#737373] font-semibold border border-[#E5E5E5] rounded-full px-3.5 py-1.5 mb-4">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
            Pricing
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0A0A0A] tracking-tight">Simple, transparent pricing</h1>
          <p className="text-[#525252] mt-3 text-sm sm:text-base">
            Start free, upgrade when you need more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16 sm:mb-24">
          {/* Free Tier */}
          <div className="border border-[#E5E5E5] rounded-xl bg-white p-6 sm:p-8 card-hover">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#FAFAFA]">
                <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h2 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wider">Free</h2>
            </div>
            <div className="mt-4 mb-6">
              <span className="text-3xl sm:text-4xl font-semibold text-[#0A0A0A]">$0</span>
              <span className="text-[#A3A3A3] text-sm ml-1">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["Upload PDF documents", "3 quiz generations total", "Quizzes, flashcards & guides"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#737373]">
                  <svg className="h-4 w-4 text-[#0A0A0A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="block w-full text-center py-2.5 rounded-lg border border-[#E5E5E5] text-[#737373] text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
              >
                {subscriptionStatus === "free" ? "Current Plan" : "Go to Dashboard"}
              </Link>
            ) : (
              <Link
                href="/signup"
                className="block w-full text-center py-2.5 rounded-lg border border-[#E5E5E5] text-[#0A0A0A] text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Pro Tier */}
          <div className="border-2 border-[#0A0A0A] rounded-xl bg-white p-6 sm:p-8 relative card-hover">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 border-2 border-[#0A0A0A] rounded-lg flex items-center justify-center bg-[#0A0A0A]">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h2 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wider">Pro</h2>
              <span className="text-[10px] font-medium text-[#2563EB] border border-[#2563EB] px-1.5 py-0.5 rounded uppercase tracking-wider">
                Popular
              </span>
            </div>
            <div className="mb-6">
              <span className="text-3xl sm:text-4xl font-semibold text-[#0A0A0A]">$9</span>
              <span className="text-[#A3A3A3] text-sm ml-1">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["Unlimited PDF uploads", "100 generations per month", "Quizzes, flashcards & guides", "Priority AI generation"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#737373]">
                  <svg className="h-4 w-4 text-[#0A0A0A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            {!isLoggedIn ? (
              <Link
                href="/signup"
                className="block w-full text-center py-2.5 rounded-lg bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#171717] transition-colors"
              >
                Get Started
              </Link>
            ) : subscriptionStatus === "active" ? (
              <button
                onClick={handleManage}
                disabled={loading}
                className="w-full py-2.5 rounded-lg border border-[#E5E5E5] text-[#0A0A0A] text-sm font-medium hover:bg-[#F5F5F5] transition-colors disabled:opacity-50"
              >
                {loading ? "Loading..." : "Manage Subscription"}
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#171717] transition-colors disabled:opacity-50"
              >
                {loading ? "Loading..." : "Upgrade to Pro"}
              </button>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#737373] font-semibold border border-[#E5E5E5] rounded-full px-3.5 py-1.5 mb-4">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              FAQ
            </span>
            <h2 className="text-xl font-bold text-[#0A0A0A] tracking-tight">Frequently asked questions</h2>
          </div>
          <div className="divide-y divide-[#E5E5E5] border-y border-[#E5E5E5]">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left py-4 flex justify-between items-start gap-4"
              >
                <div>
                  <p className="text-sm font-medium text-[#0A0A0A]">{faq.q}</p>
                  <div className={`overflow-hidden transition-all duration-200 ${openFaq === i ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-sm text-[#737373] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
                <svg className={`w-4 h-4 text-[#A3A3A3] shrink-0 mt-0.5 transition-transform ${openFaq === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
