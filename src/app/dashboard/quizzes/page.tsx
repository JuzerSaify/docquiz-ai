import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import QuizzesListClient from "./QuizzesListClient";

export default async function QuizzesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all quizzes with document info
  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("*, documents(title)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch best scores for each quiz
  const quizIds = (quizzes ?? []).map((q) => q.id);
  let bestScores: Record<string, number> = {};

  if (quizIds.length > 0) {
    const { data: attempts } = await supabase
      .from("quiz_attempts")
      .select("quiz_id, score")
      .eq("user_id", user.id)
      .in("quiz_id", quizIds);

    if (attempts) {
      bestScores = attempts.reduce<Record<string, number>>((acc, attempt) => {
        if (attempt.score !== null) {
          const current = acc[attempt.quiz_id];
          if (current === undefined || attempt.score > current) {
            acc[attempt.quiz_id] = attempt.score;
          }
        }
        return acc;
      }, {});
    }
  }

  return (
    <QuizzesListClient
      quizzes={quizzes ?? []}
      bestScores={bestScores}
    />
  );
}
