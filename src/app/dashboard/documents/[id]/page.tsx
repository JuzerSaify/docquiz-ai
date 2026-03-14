import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import DocumentDetail from "./DocumentDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DocumentPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: document, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !document) {
    notFound();
  }

  // Fetch existing quizzes for this document
  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("id, title, quiz_type, created_at")
    .eq("document_id", id)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return <DocumentDetail document={document} quizzes={quizzes ?? []} />;
}
