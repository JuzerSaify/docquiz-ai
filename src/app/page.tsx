"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-[#E5E5E5] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg border border-[#0A0A0A] bg-[#0A0A0A] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-[#0A0A0A]">
              DocQuiz AI
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-1">
            <Link href="/pricing" className="text-[#525252] hover:text-[#0A0A0A] text-sm px-3.5 py-2 rounded-lg hover:bg-[#F5F5F5] transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/login" className="text-[#525252] hover:text-[#0A0A0A] text-sm px-3.5 py-2 rounded-lg hover:bg-[#F5F5F5] transition-colors font-medium">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="bg-[#0A0A0A] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#171717] transition-colors ml-2 flex items-center gap-1.5 btn-glow"
            >
              Get Started
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              {mobileNavOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileNavOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="border-t border-[#E5E5E5] px-4 py-3 space-y-1">
            <Link href="/pricing" className="block text-sm text-[#525252] hover:text-[#0A0A0A] px-3 py-2.5 rounded-lg hover:bg-[#F5F5F5] transition-colors font-medium" onClick={() => setMobileNavOpen(false)}>
              Pricing
            </Link>
            <Link href="/login" className="block text-sm text-[#525252] hover:text-[#0A0A0A] px-3 py-2.5 rounded-lg hover:bg-[#F5F5F5] transition-colors font-medium" onClick={() => setMobileNavOpen(false)}>
              Sign in
            </Link>
            <Link href="/signup" className="block text-sm text-center bg-[#0A0A0A] text-white px-3 py-2.5 rounded-lg font-semibold hover:bg-[#171717] transition-colors mt-2" onClick={() => setMobileNavOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-16 sm:pb-24 text-center">
          <div className="inline-flex items-center gap-2.5 border border-[#D4D4D4] text-[#525252] px-4 py-1.5 rounded-full text-xs tracking-wide mb-8 sm:mb-10 bg-white font-medium animate-slide-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] pulse-dot" />
            AI-Powered Study Platform
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0A0A0A] leading-[1.08] tracking-tight animate-slide-up delay-100">
            Turn documents into
            <br /><span className="relative inline-block">knowledge
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                <path d="M1 5.5C30 2 70 2 100 4C130 6 170 3 199 5.5" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>, instantly
          </h1>
          <p className="mt-5 sm:mt-7 text-base sm:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed px-2 animate-slide-up delay-200">
            Upload your PDFs and instantly generate quizzes, flashcards, and study guides.
            <span className="text-[#0A0A0A] font-medium"> Learn faster, retain more, ace your exams.</span>
          </p>
          <div className="mt-9 sm:mt-11 flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0 animate-slide-up delay-300">
            <Link
              href="/signup"
              className="bg-[#0A0A0A] text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#171717] transition-all flex items-center justify-center gap-2 btn-glow"
            >
              Start for Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="border border-[#D4D4D4] text-[#0A0A0A] px-8 py-3.5 rounded-xl font-semibold text-sm hover:border-[#0A0A0A] transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              View Pricing
            </Link>
          </div>
          {/* Trust indicators */}
          <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-slide-up delay-400">
            <span className="inline-flex items-center gap-1.5 border border-[#E5E5E5] rounded-full px-3.5 py-1.5 text-xs text-[#525252] bg-white font-medium">
              <svg className="w-3.5 h-3.5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              No credit card required
            </span>
            <span className="inline-flex items-center gap-1.5 border border-[#E5E5E5] rounded-full px-3.5 py-1.5 text-xs text-[#525252] bg-white font-medium">
              <svg className="w-3.5 h-3.5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              3 free generations
            </span>
            <span className="inline-flex items-center gap-1.5 border border-[#E5E5E5] rounded-full px-3.5 py-1.5 text-xs text-[#525252] bg-white font-medium">
              <svg className="w-3.5 h-3.5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />, value: "10K+", label: "Documents processed" },
            { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />, value: "50K+", label: "Quizzes generated" },
            { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />, value: "98%", label: "Student satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 border border-[#E5E5E5] rounded-xl bg-white px-5 py-4">
              <div className="w-10 h-10 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#FAFAFA] shrink-0">
                <svg className="w-5 h-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>{stat.icon}</svg>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#0A0A0A] tracking-tight">{stat.value}</p>
                <p className="text-xs text-[#737373] font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-16 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#737373] font-semibold border border-[#E5E5E5] rounded-full px-3.5 py-1.5 mb-4">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              How it works
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0A0A0A] tracking-tight">Three steps to better studying</h2>
            <p className="text-sm sm:text-base text-[#525252] mt-3 max-w-xl mx-auto leading-relaxed">Upload any document and let AI do the heavy lifting. Get study-ready materials in seconds.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden sm:block absolute top-14 left-[20%] right-[20%] border-t-2 border-dashed border-[#E5E5E5] z-0" />

            {[
              { step: "01", title: "Upload PDF", desc: "Drag and drop any document — textbooks, lecture notes, research papers, articles.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /> },
              { step: "02", title: "AI Analyzes", desc: "Our AI reads your document, extracts key concepts, and creates study materials.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /> },
              { step: "03", title: "Study Smarter", desc: "Take quizzes, flip flashcards, and review study guides. Track your progress over time.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /> },
            ].map((item) => (
              <div key={item.step} className="text-center relative z-10">
                <div className="w-14 h-14 border-2 border-[#0A0A0A] rounded-2xl flex items-center justify-center mx-auto mb-5 bg-white">
                  <svg className="h-6 w-6 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>{item.icon}</svg>
                </div>
                <div className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#0A0A0A] border border-[#0A0A0A] rounded-full mb-3">{item.step}</div>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#525252] leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-28 bg-[#FAFAFA] border-y border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#737373] font-semibold border border-[#E5E5E5] rounded-full px-3.5 py-1.5 mb-4 bg-white">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Features
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0A0A0A] tracking-tight">Everything you need to study</h2>
            <p className="text-sm sm:text-base text-[#525252] mt-3 max-w-xl mx-auto leading-relaxed">Powerful AI-driven tools designed to help you understand and retain information effectively.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                tag: "Assessment",
                title: "Multiple Choice Quizzes",
                desc: "10 targeted questions with detailed explanations. Choose easy, medium, or hard difficulty levels for personalized practice.",
                icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></>,
              },
              {
                tag: "Memory",
                title: "Interactive Flashcards",
                desc: "15 flip cards with hints, keyboard navigation, and mastery tracking. Navigate with arrow keys or swipe on mobile.",
                icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" /></>,
              },
              {
                tag: "Comprehension",
                title: "Study Guides",
                desc: "Comprehensive summaries with key concepts, important points, concept connections, and review questions in one place.",
                icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></>,
              },
              {
                tag: "Speed",
                title: "Instant Generation",
                desc: "Generate high-quality study content in 5-15 seconds. No waiting, no manual work required.",
                icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></>,
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white border border-[#E5E5E5] rounded-xl p-6 sm:p-8 card-hover accent-left">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 border border-[#E5E5E5] rounded-xl flex items-center justify-center bg-[#FAFAFA] shrink-0">
                    <svg className="w-5 h-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>{feature.icon}</svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#737373] border border-[#E5E5E5] rounded px-2 py-0.5">{feature.tag}</span>
                    <h3 className="font-bold text-[#0A0A0A] mt-2 mb-1.5 text-base">{feature.title}</h3>
                    <p className="text-sm text-[#525252] leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#737373] font-semibold border border-[#E5E5E5] rounded-full px-3.5 py-1.5 mb-4">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              Built for everyone
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0A0A0A] tracking-tight">Who uses DocQuiz AI?</h2>
            <p className="text-sm sm:text-base text-[#525252] mt-3 max-w-xl mx-auto leading-relaxed">From students to professionals — anyone who needs to learn from documents.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                letter: "S",
                title: "Students",
                desc: "Turn textbooks and lecture notes into quizzes and flashcards for exam prep.",
                features: ["Exam preparation", "Lecture review", "Textbook summaries"],
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />,
              },
              {
                letter: "P",
                title: "Professionals",
                desc: "Master training materials, certifications, and industry documentation quickly.",
                features: ["Certification prep", "Training materials", "Industry standards"],
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />,
              },
              {
                letter: "T",
                title: "Teachers",
                desc: "Generate quizzes from course materials to assess students and save prep time.",
                features: ["Quiz creation", "Assessment tools", "Time saving"],
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
              },
            ].map((persona) => (
              <div key={persona.title} className="border border-[#E5E5E5] rounded-xl p-6 sm:p-8 card-hover">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 border-2 border-[#0A0A0A] rounded-full flex items-center justify-center bg-[#0A0A0A]">
                    <span className="text-sm font-bold text-white">{persona.letter}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0A0A0A]">{persona.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-[#525252] leading-relaxed mb-4">{persona.desc}</p>
                <ul className="space-y-2">
                  {persona.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#525252] font-medium">
                      <svg className="w-3.5 h-3.5 text-[#0A0A0A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-28 bg-[#FAFAFA] border-y border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#737373] font-semibold border border-[#E5E5E5] rounded-full px-3.5 py-1.5 mb-4 bg-white">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              Testimonials
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0A0A0A] tracking-tight">Loved by students everywhere</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Sarah Chen", role: "Medical Student", initial: "SC", quote: "Turned my 200-page textbook into a study guide I actually want to use. Passed my exam on the first try." },
              { name: "James Rodriguez", role: "Computer Science Major", initial: "JR", quote: "Uploaded my entire semester\u2019s notes and had study materials ready in minutes. This is a game changer." },
              { name: "Emily Park", role: "Law Student", initial: "EP", quote: "The flashcard feature alone saved me hours of manual creation. The AI really understands the content." },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-[#E5E5E5] rounded-xl p-6 sm:p-7 card-hover">
                <div className="text-4xl text-[#E5E5E5] font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-sm text-[#0A0A0A] leading-relaxed mb-6">{t.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#F5F5F5]">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-[#0A0A0A] flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white tracking-wide">{t.initial}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0A0A0A]">{t.name}</p>
                    <p className="text-xs text-[#737373]">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-[#0A0A0A]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison section */}
      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#737373] font-semibold border border-[#E5E5E5] rounded-full px-3.5 py-1.5 mb-4">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              Comparison
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0A0A0A] tracking-tight">Stop studying the hard way</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Without */}
            <div className="border border-[#E5E5E5] rounded-xl p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-full border-2 border-[#D4D4D4] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-[#525252]">Without DocQuiz AI</p>
              </div>
              <ul className="space-y-3.5">
                {["Hours making flashcards manually", "Re-reading dense chapters repeatedly", "No way to test your knowledge", "Studying without structure or plan"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#737373]">
                    <svg className="w-4 h-4 text-[#D4D4D4] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* With */}
            <div className="border-2 border-[#0A0A0A] rounded-xl p-6 sm:p-7 bg-[#FAFAFA]">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-full border-2 border-[#0A0A0A] bg-[#0A0A0A] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-[#0A0A0A]">With DocQuiz AI</p>
              </div>
              <ul className="space-y-3.5">
                {["AI-generated flashcards in seconds", "Concise study guides from any PDF", "Test yourself with smart quizzes", "Structured learning with tracking"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#0A0A0A] font-medium">
                    <svg className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 border border-[#333] rounded-full px-4 py-1.5 text-xs text-[#A3A3A3] mb-8 font-medium">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Join thousands of students
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">Ready to study smarter?</h2>
          <p className="text-[#A3A3A3] mb-10 sm:mb-12 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Start with 3 free quiz generations. No credit card required. Upgrade to Pro for $9/month when you&apos;re ready.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
            <Link
              href="/signup"
              className="bg-white text-[#0A0A0A] px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#F5F5F5] transition-all flex items-center justify-center gap-2 btn-glow"
            >
              Start for Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="border border-[#404040] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:border-[#737373] transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              View Pricing
            </Link>
          </div>
          {/* Bottom trust */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#525252]">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Secure & encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              AI-powered generation
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Results in seconds
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
