"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import UploadDocument from "@/components/UploadDocument";

interface Document {
  id: string;
  title: string;
  file_name: string;
  file_url: string;
  file_size: number;
  page_count: number | null;
  status: string;
  created_at: string;
}

interface DocumentsListClientProps {
  userId: string;
  documents: Document[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export default function DocumentsListClient({
  userId,
  documents,
  currentPage,
  totalPages,
  totalCount,
}: DocumentsListClientProps) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete(doc: Document) {
    if (!confirm(`Delete "${doc.title}"? This will also delete all associated quizzes.`)) {
      return;
    }

    setDeleting(doc.id);

    // Delete from storage
    await supabase.storage.from("documents").remove([doc.file_url]);

    // Delete from database (cascades to quizzes and attempts)
    await supabase.from("documents").delete().eq("id", doc.id);

    setDeleting(null);
    router.refresh();
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function statusBadge(status: string) {
    const colors: Record<string, string> = {
      processing: "bg-yellow-100 text-yellow-800",
      ready: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 text-sm mt-1">{totalCount} document{totalCount !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Upload */}
      <div className="mb-8">
        <UploadDocument userId={userId} onUploadComplete={() => router.refresh()} />
      </div>

      {/* Documents list */}
      <div className="bg-white rounded-lg shadow">
        {documents.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No documents yet. Upload your first PDF above.
          </div>
        ) : (
          <div className="divide-y">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <Link
                  href={`/dashboard/documents/${doc.id}`}
                  className="flex-1 min-w-0"
                >
                  <p className="font-medium text-gray-900 truncate">{doc.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span>{formatFileSize(doc.file_size)}</span>
                    {doc.page_count && <span>{doc.page_count} pages</span>}
                    <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                  </div>
                </Link>
                <div className="flex items-center gap-3 ml-4">
                  {statusBadge(doc.status)}
                  <button
                    onClick={() => handleDelete(doc)}
                    disabled={deleting === doc.id}
                    className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                  >
                    {deleting === doc.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Link
            href={`/dashboard/documents?page=${currentPage - 1}`}
            className={`px-3 py-2 rounded-md border text-sm ${
              currentPage <= 1
                ? "pointer-events-none opacity-50 border-gray-200 text-gray-400"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </Link>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={`/dashboard/documents?page=${currentPage + 1}`}
            className={`px-3 py-2 rounded-md border text-sm ${
              currentPage >= totalPages
                ? "pointer-events-none opacity-50 border-gray-200 text-gray-400"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
