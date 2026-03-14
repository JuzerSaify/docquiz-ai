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
    const config: Record<string, { bg: string; label: string }> = {
      multiple_choice: { bg: "bg-blue-100 text-blue-800", label: "Quiz" },
      flashcards: { bg: "bg-purple-100 text-purple-800", label: "Flashcards" },
      study_guide: { bg: "bg-orange-100 text-orange-800", label: "Study Guide" },
    };
    const c = config[type] || { bg: "bg-gray-100 text-gray-800", label: type };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.bg}`}>{c.label}</span>
    );
  }

  // Group quizzes by document
  const grouped = quizzes.reduce<Record<string, { docTitle: string; quizzes: Quiz[] }>>((acc, quiz) => {
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quizzes</h1>

      {quizzes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No quizzes yet. Generate your first quiz from a{" "}
          <Link href="/dashboard/documents" className="text-blue-600 hover:underline">
            document
          </Link>
          .
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([docId, group]) => (
            <div key={docId}>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                <Link href={`/dashboard/documents/${docId}`} className="hover:text-blue-600">
                  {group.docTitle}
                </Link>
              </h2>
              <div className="bg-white rounded-lg shadow divide-y">
                {group.quizzes.map((quiz) => (
                  <div key={quiz.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <Link href={`/dashboard/quizzes/${quiz.id}`} className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{quiz.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(quiz.created_at).toLocaleDateString()}
                        {bestScores[quiz.id] !== undefined && (
                          <span className="ml-2 text-green-600">
                            Best: {bestScores[quiz.id]}%
                          </span>
                        )}
                      </p>
                    </Link>
                    <div className="flex items-center gap-3 ml-4">
                      {quizTypeBadge(quiz.quiz_type)}
                      <button
                        onClick={() => handleDelete(quiz.id, quiz.title)}
                        disabled={deleting === quiz.id}
                        className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                      >
                        {deleting === quiz.id ? "..." : "Delete"}
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
