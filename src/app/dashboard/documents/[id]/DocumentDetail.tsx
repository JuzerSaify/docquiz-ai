"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Document {
  id: string;
  title: string;
  file_name: string;
  file_size: number;
  page_count: number | null;
  status: string;
  created_at: string;
  extracted_text: string | null;
}

interface Quiz {
  id: string;
  title: string;
  quiz_type: string;
  created_at: string;
}

interface DocumentDetailProps {
  document: Document;
  quizzes: Quiz[];
}

type QuizType = "multiple_choice" | "flashcards" | "study_guide";
type Difficulty = "easy" | "medium" | "hard";

const generationSteps = [
  "Analyzing document",
  "Extracting key concepts",
  "Generating questions",
  "Finalizing content",
];

export default function DocumentDetail({ document: doc, quizzes }: DocumentDetailProps) {
  const [generating, setGenerating] = useState<QuizType | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [error, setError] = useState<string | null>(null);
  const [genStep, setGenStep] = useState(0);
  const router = useRouter();

  async function handleGenerate(quizType: QuizType) {
    setGenerating(quizType);
    setError(null);
    setGenStep(0);

    const stepInterval = setInterval(() => {
      setGenStep((prev) => Math.min(prev + 1, generationSteps.length - 1));
    }, 2500);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_id: doc.id, quiz_type: quizType, difficulty }),
      });

      clearInterval(stepInterval);
      const data = await response.json();

      if (!response.ok) {
        if (data.upgrade) {
          setError("Free plan limit reached (3 quizzes). Upgrade to Pro for unlimited quizzes!");
        } else {
          setError(data.error || "Failed to generate quiz");
        }
        return;
      }

      router.push(`/dashboard/quizzes/${data.quiz_id}`);
    } catch {
      clearInterval(stepInterval);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setGenerating(null);
      setGenStep(0);
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Link
        href="/dashboard/documents"
        className="text-[#737373] hover:text-[#0A0A0A] text-sm mb-5 inline-flex items-center gap-1.5 transition-colors font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Documents
      </Link>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] tracking-tight">{doc.title}</h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-[#737373]">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {doc.file_name}
              </span>
              <span>{formatFileSize(doc.file_size)}</span>
              {doc.page_count && <span>{doc.page_count} pages</span>}
              <span>{new Date(doc.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          </div>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
              doc.status === "ready"
                ? "border-[#0A0A0A] text-[#0A0A0A]"
                : doc.status === "processing"
                ? "border-[#E5E5E5] text-[#737373]"
                : "border-red-300 text-red-600"
            }`}
          >
            {doc.status === "ready" ? "Ready" : doc.status === "processing" ? "Processing" : "Failed"}
          </span>
        </div>
      </div>

      {/* Generation buttons */}
      {doc.status === "ready" && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#0A0A0A]">Generate Study Materials</h2>
            </div>

            {/* Difficulty selector */}
            <div className="flex items-center border border-[#E5E5E5] rounded-lg overflow-hidden">
              {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  disabled={generating !== null}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors border-r border-[#E5E5E5] last:border-r-0 ${
                    difficulty === d
                      ? "bg-[#0A0A0A] text-white"
                      : "text-[#737373] hover:bg-[#F5F5F5]"
                  }`}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{error}</span>
              {error.includes("Upgrade") && (
                <Link href="/pricing" className="ml-auto text-[#0A0A0A] hover:underline font-medium text-sm whitespace-nowrap">
                  View pricing &rarr;
                </Link>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleGenerate("multiple_choice")}
              disabled={generating !== null}
              className="group flex flex-col items-center p-6 border border-[#E5E5E5] rounded-xl hover:border-[#0A0A0A] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <div className="w-12 h-12 border-2 border-[#E5E5E5] group-hover:border-[#0A0A0A] rounded-xl flex items-center justify-center mb-3 transition-colors">
                <svg className="h-6 w-6 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <span className="font-bold text-[#0A0A0A] text-sm">
                {generating === "multiple_choice" ? "Generating..." : "Multiple Choice Quiz"}
              </span>
              <span className="text-xs text-[#A3A3A3] mt-1">10 questions with explanations</span>
              <span className="text-[10px] text-[#A3A3A3] mt-2 px-2 py-0.5 border border-[#E5E5E5] rounded-full">Most popular</span>
            </button>

            <button
              onClick={() => handleGenerate("flashcards")}
              disabled={generating !== null}
              className="group flex flex-col items-center p-6 border border-[#E5E5E5] rounded-xl hover:border-[#0A0A0A] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <div className="w-12 h-12 border-2 border-[#E5E5E5] group-hover:border-[#0A0A0A] rounded-xl flex items-center justify-center mb-3 transition-colors">
                <svg className="h-6 w-6 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="font-bold text-[#0A0A0A] text-sm">
                {generating === "flashcards" ? "Generating..." : "Flashcards"}
              </span>
              <span className="text-xs text-[#A3A3A3] mt-1">15 cards with hints</span>
              <span className="text-[10px] text-[#A3A3A3] mt-2 px-2 py-0.5 border border-[#E5E5E5] rounded-full">Quick review</span>
            </button>

            <button
              onClick={() => handleGenerate("study_guide")}
              disabled={generating !== null}
              className="group flex flex-col items-center p-6 border border-[#E5E5E5] rounded-xl hover:border-[#0A0A0A] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <div className="w-12 h-12 border-2 border-[#E5E5E5] group-hover:border-[#0A0A0A] rounded-xl flex items-center justify-center mb-3 transition-colors">
                <svg className="h-6 w-6 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-bold text-[#0A0A0A] text-sm">
                {generating === "study_guide" ? "Generating..." : "Study Guide"}
              </span>
              <span className="text-xs text-[#A3A3A3] mt-1">Summary, concepts & questions</span>
              <span className="text-[10px] text-[#A3A3A3] mt-2 px-2 py-0.5 border border-[#E5E5E5] rounded-full">Deep dive</span>
            </button>
          </div>

          {/* Generation progress */}
          {generating && (
            <div className="mt-6 bg-[#F5F5F5] rounded-xl p-4 sm:p-6 border border-[#E5E5E5]">
              <div className="flex items-center gap-2 sm:gap-4">
                {generationSteps.map((step, i) => (
                  <div key={i} className="flex-1">
                    <div className={`flex flex-col items-center transition-all duration-500 ${
                      i <= genStep ? "opacity-100" : "opacity-30"
                    }`}>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center mb-2 text-xs font-medium ${
                        i <= genStep ? "border-[#0A0A0A] text-[#0A0A0A] bg-white" : "border-[#E5E5E5] text-[#A3A3A3]"
                      }`}>{i + 1}</div>
                      <span className="text-xs text-[#737373] text-center">{step}</span>
                    </div>
                    {i < generationSteps.length - 1 && (
                      <div className="w-full h-px bg-[#E5E5E5] mt-2">
                        <div
                          className={`h-px bg-[#0A0A0A] transition-all duration-700 ${
                            i < genStep ? "w-full" : "w-0"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-[#A3A3A3] mt-4">
                Generating with <span className="font-medium text-[#0A0A0A]">Gemini AI</span> — this takes 5-15 seconds
              </p>
            </div>
          )}
        </div>
      )}

      {doc.status === "processing" && (
        <div className="bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl p-6 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-[#737373]">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Document is being processed. Text extraction will complete shortly.
          </div>
        </div>
      )}

      {doc.status === "failed" && (
        <div className="border border-red-200 rounded-xl p-6 mb-6 text-center">
          <p className="text-red-600 text-sm">Text extraction failed for this document. Please try uploading again.</p>
        </div>
      )}

      {/* Existing quizzes for this document */}
      {quizzes.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg border border-[#E5E5E5] flex items-center justify-center bg-[#FAFAFA]">
              <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[#0A0A0A]">Generated Materials</h2>
            <span className="ml-auto text-xs text-[#A3A3A3] border border-[#E5E5E5] px-2 py-0.5 rounded-full">{quizzes.length} item{quizzes.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="divide-y divide-[#F5F5F5]">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/dashboard/quizzes/${quiz.id}`}
                className="block py-3.5 px-4 hover:bg-[#FAFAFA] rounded-lg transition-all border-l-3 border-l-transparent hover:border-l-[#0A0A0A]"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-[#0A0A0A] text-sm">{quiz.title}</p>
                    <p className="text-xs text-[#A3A3A3] mt-0.5">
                      {new Date(quiz.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium border border-[#E5E5E5] text-[#737373]">
                    {quiz.quiz_type === "multiple_choice"
                      ? "Quiz"
                      : quiz.quiz_type === "flashcards"
                      ? "Flashcards"
                      : "Study Guide"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
