"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import UploadDocument from "@/components/UploadDocument";
import StatCard from "@/components/StatCard";
import EmptyState from "@/components/EmptyState";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  subscription_status: string;
  uploads_used: number;
}

interface Document {
  id: string;
  title: string;
  file_name: string;
  status: string;
  page_count: number | null;
  created_at: string;
}

interface Quiz {
  id: string;
  title: string;
  quiz_type: string;
  created_at: string;
  documents: { title: string } | null;
}

interface DashboardClientProps {
  user: User;
  profile: Profile | null;
  documents: Document[];
  quizzes: Quiz[];
  stats: {
    documents: number;
    quizzes: number;
    attempts: number;
  };
}

export default function DashboardClient({
  user,
  profile,
  documents,
  quizzes,
  stats,
}: DashboardClientProps) {
  const router = useRouter();

  function statusBadge(status: string) {
    const styles: Record<string, string> = {
      processing: "border-[#E5E5E5] text-[#737373]",
      ready: "border-[#0A0A0A] text-[#0A0A0A]",
      failed: "border-red-300 text-red-600",
    };
    return (
      <span className={`px-2.5 py-0.5 rounded text-xs font-medium border ${styles[status] || "border-[#E5E5E5] text-[#737373]"}`}>
        {status}
      </span>
    );
  }

  function quizTypeBadge(type: string) {
    const labels: Record<string, string> = {
      multiple_choice: "Quiz",
      flashcards: "Flashcards",
      study_guide: "Guide",
    };
    return (
      <span className="px-2.5 py-0.5 rounded text-xs font-medium border border-[#E5E5E5] text-[#737373]">
        {labels[type] || type}
      </span>
    );
  }

  const firstName = profile?.full_name?.split(" ")[0] || user.email?.split("@")[0] || "there";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#0A0A0A] tracking-tight">Welcome back, {firstName}</h1>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#525252] border border-[#E5E5E5] rounded-full px-2.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] pulse-dot" />
              Active
            </span>
          </div>
          <p className="text-sm text-[#525252] mt-1">Here&apos;s an overview of your study progress</p>
        </div>
        {profile?.subscription_status !== "active" && (
          <Link
            href="/pricing"
            className="bg-[#0A0A0A] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#171717] transition-colors flex items-center gap-1.5"
          >
            Upgrade to Pro
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Documents"
          value={stats.documents}
          icon={
            <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
          sublabel="PDFs uploaded"
        />
        <StatCard
          label="Quizzes"
          value={stats.quizzes}
          icon={
            <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          }
          sublabel="AI-generated"
        />
        <StatCard
          label="Attempts"
          value={stats.attempts}
          icon={
            <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
          sublabel="Quiz completions"
        />
      </div>

      {/* Upload */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-7 h-7 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#FAFAFA]">
            <svg className="w-3.5 h-3.5 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-[#0A0A0A]">Upload Document</h2>
        </div>
        <UploadDocument userId={user.id} onUploadComplete={() => router.refresh()} />
      </div>

      {/* Recent Documents & Quizzes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border border-[#E5E5E5] rounded-md flex items-center justify-center bg-[#FAFAFA]">
                <svg className="w-3 h-3 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-[#0A0A0A]">Recent Documents</h2>
            </div>
            <Link href="/dashboard/documents" className="text-xs text-[#737373] hover:text-[#0A0A0A] transition-colors font-medium flex items-center gap-1">
              View all
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <div className="border border-[#E5E5E5] rounded-xl overflow-hidden">
            {documents.length === 0 ? (
              <EmptyState
                icon={
                  <svg className="w-5 h-5 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                }
                title="No documents yet"
                description="Upload your first PDF above to get started"
              />
            ) : (
              <div className="divide-y divide-[#F5F5F5]">
                {documents.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/dashboard/documents/${doc.id}`}
                    className="flex items-center justify-between p-4 hover:bg-[#FAFAFA] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F5F5F5] shrink-0">
                        <svg className="w-3.5 h-3.5 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#0A0A0A] truncate">{doc.title}</p>
                        <p className="text-xs text-[#A3A3A3]">
                          {doc.page_count ? `${doc.page_count} pages · ` : ""}
                          {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {statusBadge(doc.status)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border border-[#E5E5E5] rounded-md flex items-center justify-center bg-[#FAFAFA]">
                <svg className="w-3 h-3 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-[#0A0A0A]">Recent Quizzes</h2>
            </div>
            <Link href="/dashboard/quizzes" className="text-xs text-[#737373] hover:text-[#0A0A0A] transition-colors font-medium flex items-center gap-1">
              View all
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <div className="border border-[#E5E5E5] rounded-xl overflow-hidden">
            {quizzes.length === 0 ? (
              <EmptyState
                icon={
                  <svg className="w-5 h-5 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                }
                title="No quizzes yet"
                description="Generate your first quiz from a document"
              />
            ) : (
              <div className="divide-y divide-[#F5F5F5]">
                {quizzes.map((quiz) => (
                  <Link
                    key={quiz.id}
                    href={`/dashboard/quizzes/${quiz.id}`}
                    className="flex items-center justify-between p-4 hover:bg-[#FAFAFA] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F5F5F5] shrink-0">
                        <svg className="w-3.5 h-3.5 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#0A0A0A] truncate">{quiz.title}</p>
                        <p className="text-xs text-[#A3A3A3]">
                          {quiz.documents?.title || "Unknown"} · {new Date(quiz.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {quizTypeBadge(quiz.quiz_type)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
