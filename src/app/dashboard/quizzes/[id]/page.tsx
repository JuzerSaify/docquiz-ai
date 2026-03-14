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
    <div className="max-w-5xl mx-auto px-6 py-8">
      <Link
        href={`/dashboard/documents/${quiz.document_id}`}
        className="text-[#737373] hover:text-[#0A0A0A] text-sm mb-4 inline-flex items-center gap-1 transition-colors"
      >
        ← Back to Document
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#0A0A0A] tracking-tight">{quiz.title}</h1>
        <p className="text-[#737373] mt-1 text-sm">
          From: {quiz.documents?.title || "Unknown document"} •{" "}
          {new Date(quiz.created_at).toLocaleDateString()}
        </p>
        {bestAttempt && quiz.quiz_type === "multiple_choice" && (
          <p className="text-sm text-green-600 mt-1">Best score: {bestAttempt.score}%</p>
        )}
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
