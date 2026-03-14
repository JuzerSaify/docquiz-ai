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
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[#737373] mb-3">Pricing</p>
          <h1 className="text-3xl font-semibold text-[#0A0A0A]">Simple, transparent pricing</h1>
          <p className="text-[#737373] mt-3 text-base">
            Start free, upgrade when you need more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[#E5E5E5] border border-[#E5E5E5] rounded-xl overflow-hidden max-w-2xl mx-auto mb-24">
          {/* Free Tier */}
          <div className="bg-white p-8">
            <h2 className="text-sm font-medium text-[#737373] uppercase tracking-wider">Free</h2>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-semibold text-[#0A0A0A]">$0</span>
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
          <div className="bg-white p-8 relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-medium text-[#737373] uppercase tracking-wider">Pro</h2>
              <span className="text-[10px] font-medium text-[#2563EB] border border-[#2563EB] px-1.5 py-0.5 rounded uppercase tracking-wider">
                Popular
              </span>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-semibold text-[#0A0A0A]">$9</span>
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
          <h2 className="text-xl font-semibold text-[#0A0A0A] text-center mb-8">Frequently asked questions</h2>
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
