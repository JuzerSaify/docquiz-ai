import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import MultipleChoiceQuiz from "./MultipleChoiceQuiz";
import FlashcardsView from "./FlashcardsView";
import StudyGuideView from "./StudyGuideView";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: quiz, error } = await supabase
    .from("quizzes")
    .select("*, documents(title)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !quiz) {
    notFound();
  }

  // Fetch best attempt for this quiz
  const { data: bestAttempt } = await supabase
    .from("quiz_attempts")
    .select("score")
    .eq("quiz_id", id)
    .eq("user_id", user.id)
    .order("score", { ascending: false })
    .limit(1)
    .single();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Link
        href={`/dashboard/documents/${quiz.document_id}`}
        className="text-[#737373] hover:text-[#0A0A0A] text-sm mb-5 inline-flex items-center gap-1.5 transition-colors font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Document
      </Link>

      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center shrink-0 mt-0.5">
            {quiz.quiz_type === "multiple_choice" ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            ) : quiz.quiz_type === "flashcards" ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0A0A0A] tracking-tight">{quiz.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-[#737373] text-sm">
                {quiz.documents?.title || "Unknown document"}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#D4D4D4]"></span>
              <span className="text-[#737373] text-sm">
                {new Date(quiz.created_at).toLocaleDateString()}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#E5E5E5] text-[#737373]">
                {quiz.quiz_type === "multiple_choice" ? "Quiz" : quiz.quiz_type === "flashcards" ? "Flashcards" : "Study Guide"}
              </span>
              {bestAttempt && quiz.quiz_type === "multiple_choice" && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#0A0A0A] text-[#0A0A0A]">
                  Best: {bestAttempt.score}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {quiz.quiz_type === "multiple_choice" && (
        <MultipleChoiceQuiz quiz={quiz} userId={user.id} />
      )}
      {quiz.quiz_type === "flashcards" && (
        <FlashcardsView quiz={quiz} />
      )}
      {quiz.quiz_type === "study_guide" && (
        <StudyGuideView quiz={quiz} />
      )}
    </div>
  );
}
