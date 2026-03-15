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
          <span className="text-lg font-semibold tracking-tight text-[#0A0A0A]">
            DocQuiz AI
          </span>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/pricing" className="text-[#737373] hover:text-[#0A0A0A] text-sm transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-[#737373] hover:text-[#0A0A0A] text-sm transition-colors">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="bg-[#0A0A0A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#171717] transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="sm:hidden p-1.5 rounded-md hover:bg-[#F5F5F5] transition-colors"
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
            <Link href="/pricing" className="block text-sm text-[#737373] hover:text-[#0A0A0A] px-3 py-2.5 rounded-md hover:bg-[#F5F5F5] transition-colors" onClick={() => setMobileNavOpen(false)}>
              Pricing
            </Link>
            <Link href="/login" className="block text-sm text-[#737373] hover:text-[#0A0A0A] px-3 py-2.5 rounded-md hover:bg-[#F5F5F5] transition-colors" onClick={() => setMobileNavOpen(false)}>
              Sign in
            </Link>
            <Link href="/signup" className="block text-sm text-center bg-[#0A0A0A] text-white px-3 py-2.5 rounded-lg font-medium hover:bg-[#171717] transition-colors mt-2" onClick={() => setMobileNavOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-16 sm:pb-24 text-center">
        <div className="inline-flex items-center gap-2 border border-[#E5E5E5] text-[#737373] px-3 py-1 rounded-full text-xs tracking-wide mb-6 sm:mb-8">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Powered by Gemini AI
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0A0A0A] leading-[1.1] tracking-tight">
          Turn documents into
          <br />knowledge, instantly
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#737373] max-w-xl mx-auto leading-relaxed px-2">
          Upload your PDFs and generate quizzes, flashcards, and study guides
          with AI. Learn faster, retain more.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
          <Link
            href="/signup"
            className="bg-[#0A0A0A] text-white px-7 py-3 rounded-lg font-medium text-sm hover:bg-[#171717] transition-colors"
          >
            Start for Free
          </Link>
          <Link
            href="/pricing"
            className="border border-[#E5E5E5] text-[#0A0A0A] px-7 py-3 rounded-lg font-medium text-sm hover:bg-[#F5F5F5] transition-colors"
          >
            View Pricing
          </Link>
        </div>
        {/* Trust indicators */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[#A3A3A3]">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No credit card required
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            3 free generations
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cancel anytime
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] tracking-tight">10K+</p>
            <p className="text-sm text-[#737373] mt-1">Documents processed</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] tracking-tight">50K+</p>
            <p className="text-sm text-[#737373] mt-1">Quizzes generated</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] tracking-tight">98%</p>
            <p className="text-sm text-[#737373] mt-1">Student satisfaction</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-[#737373] text-center mb-3">How it works</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] text-center mb-4">Three steps to better studying</h2>
          <p className="text-sm text-[#737373] text-center mb-10 sm:mb-16 max-w-lg mx-auto">Upload any document and let AI do the heavy lifting. Get study-ready materials in seconds.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="w-12 h-12 border border-[#E5E5E5] rounded-lg flex items-center justify-center mx-auto mb-5 bg-[#F5F5F5]">
                <svg className="h-5 w-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <div className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#A3A3A3] border border-[#E5E5E5] rounded-full mb-3">Step 1</div>
              <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">Upload PDF</h3>
              <p className="text-sm text-[#737373] leading-relaxed">Drag and drop any document — textbooks, lecture notes, research papers.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 border border-[#E5E5E5] rounded-lg flex items-center justify-center mx-auto mb-5 bg-[#F5F5F5]">
                <svg className="h-5 w-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <div className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#A3A3A3] border border-[#E5E5E5] rounded-full mb-3">Step 2</div>
              <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">AI Analyzes</h3>
              <p className="text-sm text-[#737373] leading-relaxed">Gemini AI reads your document and creates study materials in seconds.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 border border-[#E5E5E5] rounded-lg flex items-center justify-center mx-auto mb-5 bg-[#F5F5F5]">
                <svg className="h-5 w-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
              </div>
              <div className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#A3A3A3] border border-[#E5E5E5] rounded-full mb-3">Step 3</div>
              <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">Study Smarter</h3>
              <p className="text-sm text-[#737373] leading-relaxed">Take quizzes, flip flashcards, and review guides. Track your progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 bg-[#F5F5F5] border-y border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-[#737373] text-center mb-3">Features</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] text-center mb-4">Everything you need to study</h2>
          <p className="text-sm text-[#737373] text-center mb-10 sm:mb-16 max-w-lg mx-auto">Powerful AI-driven tools designed to help you understand and retain information.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 sm:p-7 hover:border-[#D4D4D4] transition-colors">
              <div className="w-9 h-9 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F5F5F5] mb-4">
                <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0A0A0A] mb-2">Multiple Choice Quizzes</h3>
              <p className="text-sm text-[#737373] leading-relaxed">10 targeted questions with detailed explanations. Choose easy, medium, or hard difficulty.</p>
            </div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 sm:p-7 hover:border-[#D4D4D4] transition-colors">
              <div className="w-9 h-9 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F5F5F5] mb-4">
                <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0A0A0A] mb-2">Interactive Flashcards</h3>
              <p className="text-sm text-[#737373] leading-relaxed">Flip cards with hints, keyboard navigation, and mastery tracking built in.</p>
            </div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 sm:p-7 hover:border-[#D4D4D4] transition-colors">
              <div className="w-9 h-9 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F5F5F5] mb-4">
                <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0A0A0A] mb-2">Study Guides</h3>
              <p className="text-sm text-[#737373] leading-relaxed">Comprehensive summaries with key concepts, important points, and concept connections.</p>
            </div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 sm:p-7 hover:border-[#D4D4D4] transition-colors">
              <div className="w-9 h-9 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F5F5F5] mb-4">
                <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0A0A0A] mb-2">Instant Generation</h3>
              <p className="text-sm text-[#737373] leading-relaxed">Gemini AI generates high-quality study content in seconds, not minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-[#737373] text-center mb-3">Built for everyone</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] text-center mb-4">Who uses DocQuiz AI?</h2>
          <p className="text-sm text-[#737373] text-center mb-10 sm:mb-16 max-w-lg mx-auto">From students to professionals — anyone who needs to learn from documents.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-[#E5E5E5] rounded-xl p-6 sm:p-8 text-center hover:border-[#D4D4D4] transition-colors">
              <div className="w-12 h-12 border border-[#E5E5E5] rounded-full flex items-center justify-center mx-auto mb-5 bg-[#F5F5F5]">
                <svg className="h-5 w-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">Students</h3>
              <p className="text-sm text-[#737373] leading-relaxed">Turn textbooks and lecture notes into quizzes and flashcards for exam prep.</p>
            </div>
            <div className="border border-[#E5E5E5] rounded-xl p-6 sm:p-8 text-center hover:border-[#D4D4D4] transition-colors">
              <div className="w-12 h-12 border border-[#E5E5E5] rounded-full flex items-center justify-center mx-auto mb-5 bg-[#F5F5F5]">
                <svg className="h-5 w-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">Professionals</h3>
              <p className="text-sm text-[#737373] leading-relaxed">Master training materials, certifications, and industry documentation quickly.</p>
            </div>
            <div className="border border-[#E5E5E5] rounded-xl p-6 sm:p-8 text-center hover:border-[#D4D4D4] transition-colors">
              <div className="w-12 h-12 border border-[#E5E5E5] rounded-full flex items-center justify-center mx-auto mb-5 bg-[#F5F5F5]">
                <svg className="h-5 w-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">Teachers</h3>
              <p className="text-sm text-[#737373] leading-relaxed">Generate quizzes from course materials to assess students and save prep time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-[#F5F5F5] border-y border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-[#737373] text-center mb-3">Testimonials</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] text-center mb-10 sm:mb-16">Loved by students everywhere</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 sm:p-6">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#0A0A0A]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#0A0A0A] leading-relaxed mb-4">&ldquo;Turned my 200-page textbook into a study guide I actually want to use. Passed my exam on the first try.&rdquo;</p>
              <div>
                <p className="text-sm font-medium text-[#0A0A0A]">Sarah Chen</p>
                <p className="text-xs text-[#737373]">Medical Student</p>
              </div>
            </div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 sm:p-6">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#0A0A0A]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#0A0A0A] leading-relaxed mb-4">&ldquo;Uploaded my entire semester&apos;s notes and had study materials ready in minutes. This is a game changer.&rdquo;</p>
              <div>
                <p className="text-sm font-medium text-[#0A0A0A]">James Rodriguez</p>
                <p className="text-xs text-[#737373]">Computer Science Major</p>
              </div>
            </div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 sm:p-6 sm:col-span-2 md:col-span-1">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#0A0A0A]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#0A0A0A] leading-relaxed mb-4">&ldquo;The flashcard feature alone saved me hours of manual creation. The AI really understands the content.&rdquo;</p>
              <div>
                <p className="text-sm font-medium text-[#0A0A0A]">Emily Park</p>
                <p className="text-xs text-[#737373]">Law Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-[#737373] text-center mb-3">Why DocQuiz AI</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] text-center mb-10 sm:mb-16">Stop studying the hard way</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Without */}
            <div className="border border-[#E5E5E5] rounded-xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#0A0A0A]">Without DocQuiz AI</p>
              </div>
              <ul className="space-y-3">
                {["Hours making flashcards manually", "Re-reading dense chapters", "No way to test your knowledge", "Studying without structure"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#737373]">
                    <svg className="w-4 h-4 text-[#D4D4D4] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* With */}
            <div className="border border-[#0A0A0A] rounded-xl p-5 sm:p-6 bg-[#FAFAFA]">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full border border-[#0A0A0A] bg-[#0A0A0A] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#0A0A0A]">With DocQuiz AI</p>
              </div>
              <ul className="space-y-3">
                {["AI-generated flashcards in seconds", "Concise study guides from any PDF", "Test yourself with smart quizzes", "Structured learning with progress tracking"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#0A0A0A]">
                    <svg className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
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
      <section className="py-16 sm:py-24 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Ready to study smarter?</h2>
          <p className="text-[#A3A3A3] mb-8 sm:mb-10 text-sm sm:text-base px-4">
            Start with 3 free quiz generations. Upgrade to Pro for $9/month.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
            <Link
              href="/signup"
              className="bg-white text-[#0A0A0A] px-7 py-3 rounded-lg font-medium text-sm hover:bg-[#F5F5F5] transition-colors"
            >
              Start for Free
            </Link>
            <Link
              href="/pricing"
              className="border border-[#404040] text-white px-7 py-3 rounded-lg font-medium text-sm hover:bg-[#171717] transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
