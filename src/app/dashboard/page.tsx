import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch documents
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch recent quizzes
  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("*, documents(title)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch stats
  const { count: docCount } = await supabase
    .from("documents")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: quizCount } = await supabase
    .from("quizzes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: attemptCount } = await supabase
    .from("quiz_attempts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  return (
    <DashboardClient
      user={user}
      profile={profile}
      documents={documents ?? []}
      quizzes={quizzes ?? []}
      stats={{
        documents: docCount ?? 0,
        quizzes: quizCount ?? 0,
        attempts: attemptCount ?? 0,
      }}
    />
  );
}
