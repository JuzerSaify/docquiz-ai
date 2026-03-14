import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DocumentsListClient from "./DocumentsListClient";

interface SearchParams {
  page?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function DocumentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const page = parseInt(params.page || "1", 10);
  const perPage = 10;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data: documents, count } = await supabase
    .from("documents")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count ?? 0) / perPage);

  return (
    <DocumentsListClient
      userId={user.id}
      documents={documents ?? []}
      currentPage={page}
      totalPages={totalPages}
      totalCount={count ?? 0}
    />
  );
}
