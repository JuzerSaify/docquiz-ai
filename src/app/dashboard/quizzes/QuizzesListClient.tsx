"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Quiz {
  id: string;
  document_id: string;
  title: string;
  quiz_type: string;
  created_at: string;
  documents: { title: string } | null;
}

interface QuizzesListClientProps {
  quizzes: Quiz[];
  bestScores: Record<string, number>;
}

export default function QuizzesListClient({ quizzes, bestScores }: QuizzesListClientProps) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete(quizId: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;

    setDeleting(quizId);
    await supabase.from("quizzes").delete().eq("id", quizId);
    setDeleting(null);
    router.refresh();
  }

  function quizTypeBadge(type: string) {
    const config: Record<string, string> = {
      multiple_choice: "Quiz",
      flashcards: "Flashcards",
      study_guide: "Study Guide",
    };
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium border border-[#E5E5E5] text-[#737373]">
        {config[type] || type}
      </span>
    );
  }

  // Group quizzes by document
  const filtered = search
    ? quizzes.filter(
        (q) =>
          q.title.toLowerCase().includes(search.toLowerCase()) ||
          q.documents?.title.toLowerCase().includes(search.toLowerCase())
      )
    : quizzes;

  const grouped = filtered.reduce<Record<string, { docTitle: string; quizzes: Quiz[] }>>((acc, quiz) => {
    const docId = quiz.document_id;
    if (!acc[docId]) {
      acc[docId] = {
        docTitle: quiz.documents?.title || "Unknown Document",
        quizzes: [],
      };
    }
    acc[docId].quizzes.push(quiz);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0A0A0A] tracking-tight">Quizzes</h1>
        </div>
      </div>

      {/* Search */}
      {quizzes.length > 0 && (
        <div className="mb-6">
          <div className="relative max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search quizzes or documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:border-[#0A0A0A] transition-colors bg-white"
            />
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="border border-[#E5E5E5] rounded-xl p-12 text-center relative">
          <div className="absolute inset-0 dot-grid opacity-20 rounded-xl"></div>
          <div className="relative">
          <div className="w-12 h-12 border-2 border-[#E5E5E5] rounded-xl flex items-center justify-center mx-auto mb-3 bg-white">
            <svg className="w-5 h-5 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>
          <p className="text-sm font-bold text-[#0A0A0A]">
            {search ? "No matching quizzes" : "No quizzes yet"}
          </p>
          <p className="text-xs text-[#A3A3A3] mt-1">
            {search ? (
              "Try a different search term"
            ) : (
              <>
                Generate your first quiz from a{" "}
                <Link href="/dashboard/documents" className="text-[#0A0A0A] underline underline-offset-2 hover:text-[#737373]">
                  document
                </Link>
              </>
            )}
          </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([docId, group]) => (
            <div key={docId}>
              <h2 className="text-sm font-medium text-[#737373] mb-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md border border-[#E5E5E5] flex items-center justify-center bg-[#FAFAFA]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <Link href={`/dashboard/documents/${docId}`} className="hover:text-[#0A0A0A] transition-colors">
                  {group.docTitle}
                </Link>
              </h2>
              <div className="border border-[#E5E5E5] rounded-xl overflow-hidden divide-y divide-[#F5F5F5]">
                {group.quizzes.map((quiz) => (
                  <div key={quiz.id} className="p-4 flex items-center justify-between hover:bg-[#FAFAFA] transition-all border-l-3 border-l-transparent hover:border-l-[#0A0A0A]">
                    <Link href={`/dashboard/quizzes/${quiz.id}`} className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0A0A0A] truncate">{quiz.title}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-[#A3A3A3]">
                        <span>{new Date(quiz.created_at).toLocaleDateString()}</span>
                        {bestScores[quiz.id] !== undefined && (
                          <>
                            <span>·</span>
                            <span className="text-[#0A0A0A] font-medium">
                              Best: {bestScores[quiz.id]}%
                            </span>
                          </>
                        )}
                      </div>
                    </Link>
                    <div className="flex items-center gap-3 ml-4">
                      {quizTypeBadge(quiz.quiz_type)}
                      <button
                        onClick={() => handleDelete(quiz.id, quiz.title)}
                        disabled={deleting === quiz.id}
                        className="text-[#A3A3A3] hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Delete quiz"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
