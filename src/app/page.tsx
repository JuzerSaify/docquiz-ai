import Link from "next/link";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-[#E5E5E5] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-lg font-semibold tracking-tight text-[#0A0A0A]">
            DocQuiz AI
          </span>
          <div className="flex items-center gap-6">
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
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="inline-flex items-center gap-2 border border-[#E5E5E5] text-[#737373] px-3 py-1 rounded-full text-xs tracking-wide mb-8">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Powered by Gemini AI
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold text-[#0A0A0A] leading-[1.1] tracking-tight">
          Turn documents into
          <br />knowledge, instantly
        </h1>
        <p className="mt-6 text-lg text-[#737373] max-w-xl mx-auto leading-relaxed">
          Upload your PDFs and generate quizzes, flashcards, and study guides
          with AI. Learn faster, retain more.
        </p>
        <div className="mt-10 flex justify-center gap-3">
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
        <div className="mt-12 flex items-center justify-center gap-8 text-xs text-[#A3A3A3]">
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
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-semibold text-[#0A0A0A] tracking-tight">10K+</p>
            <p className="text-sm text-[#737373] mt-1">Documents processed</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[#0A0A0A] tracking-tight">50K+</p>
            <p className="text-sm text-[#737373] mt-1">Quizzes generated</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[#0A0A0A] tracking-tight">98%</p>
            <p className="text-sm text-[#737373] mt-1">Student satisfaction</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[#737373] text-center mb-3">How it works</p>
          <h2 className="text-3xl font-semibold text-[#0A0A0A] text-center mb-4">Three steps to better studying</h2>
          <p className="text-sm text-[#737373] text-center mb-16 max-w-lg mx-auto">Upload any document and let AI do the heavy lifting. Get study-ready materials in seconds.</p>
          <div className="grid md:grid-cols-3 gap-12">
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
      <section className="py-24 bg-[#F5F5F5] border-y border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[#737373] text-center mb-3">Features</p>
          <h2 className="text-3xl font-semibold text-[#0A0A0A] text-center mb-4">Everything you need to study</h2>
          <p className="text-sm text-[#737373] text-center mb-16 max-w-lg mx-auto">Powerful AI-driven tools designed to help you understand and retain information.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-7 hover:border-[#D4D4D4] transition-colors">
              <div className="w-9 h-9 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F5F5F5] mb-4">
                <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0A0A0A] mb-2">Multiple Choice Quizzes</h3>
              <p className="text-sm text-[#737373] leading-relaxed">10 targeted questions with detailed explanations. Choose easy, medium, or hard difficulty.</p>
            </div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-7 hover:border-[#D4D4D4] transition-colors">
              <div className="w-9 h-9 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F5F5F5] mb-4">
                <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0A0A0A] mb-2">Interactive Flashcards</h3>
              <p className="text-sm text-[#737373] leading-relaxed">Flip cards with hints, keyboard navigation, and mastery tracking built in.</p>
            </div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-7 hover:border-[#D4D4D4] transition-colors">
              <div className="w-9 h-9 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F5F5F5] mb-4">
                <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0A0A0A] mb-2">Study Guides</h3>
              <p className="text-sm text-[#737373] leading-relaxed">Comprehensive summaries with key concepts, important points, and concept connections.</p>
            </div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-7 hover:border-[#D4D4D4] transition-colors">
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

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[#737373] text-center mb-3">Testimonials</p>
          <h2 className="text-3xl font-semibold text-[#0A0A0A] text-center mb-16">Loved by students everywhere</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-[#E5E5E5] rounded-xl p-6">
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
            <div className="border border-[#E5E5E5] rounded-xl p-6">
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
            <div className="border border-[#E5E5E5] rounded-xl p-6">
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

      {/* CTA */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">Ready to study smarter?</h2>
          <p className="text-[#A3A3A3] mb-10 text-base">
            Start with 3 free quiz generations. Upgrade to Pro for $9/month.
          </p>
          <div className="flex justify-center gap-3">
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
