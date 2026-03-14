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
  const [search, setSearch] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete(doc: Document) {
    if (!confirm(`Delete "${doc.title}"? This will also delete all associated quizzes.`)) {
      return;
    }

    setDeleting(doc.id);
    await supabase.storage.from("documents").remove([doc.file_url]);
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

  const filtered = search
    ? documents.filter((d) => d.title.toLowerCase().includes(search.toLowerCase()))
    : documents;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0A0A0A] tracking-tight">Documents</h1>
          <p className="text-sm text-[#737373] mt-1">{totalCount} document{totalCount !== 1 ? "s" : ""} uploaded</p>
        </div>
      </div>

      {/* Upload */}
      <div className="mb-8">
        <UploadDocument userId={userId} onUploadComplete={() => router.refresh()} />
      </div>

      {/* Search */}
      {documents.length > 0 && (
        <div className="mb-4">
          <div className="relative max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:border-[#0A0A0A] transition-colors bg-white"
            />
          </div>
        </div>
      )}

      {/* Documents list */}
      <div className="border border-[#E5E5E5] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border border-[#E5E5E5] rounded-lg flex items-center justify-center mx-auto mb-3 bg-[#F5F5F5]">
              <svg className="w-5 h-5 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#0A0A0A]">
              {search ? "No matching documents" : "No documents yet"}
            </p>
            <p className="text-xs text-[#A3A3A3] mt-1">
              {search ? "Try a different search term" : "Upload your first PDF above to get started"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F5F5F5]">
            {filtered.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-[#FAFAFA] transition-colors">
                <Link
                  href={`/dashboard/documents/${doc.id}`}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <div className="w-9 h-9 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-[#F5F5F5] shrink-0">
                    <svg className="w-4 h-4 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#0A0A0A] truncate">{doc.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[#A3A3A3]">
                      <span>{formatFileSize(doc.file_size)}</span>
                      {doc.page_count && <><span>·</span><span>{doc.page_count} pages</span></>}
                      <span>·</span>
                      <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center gap-3 ml-4">
                  {statusBadge(doc.status)}
                  <button
                    onClick={() => handleDelete(doc)}
                    disabled={deleting === doc.id}
                    className="text-[#A3A3A3] hover:text-red-600 transition-colors disabled:opacity-50"
                    title="Delete document"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
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
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              currentPage <= 1
                ? "pointer-events-none opacity-40 border-[#E5E5E5] text-[#A3A3A3]"
                : "border-[#E5E5E5] text-[#0A0A0A] hover:bg-[#F5F5F5]"
            }`}
          >
            Previous
          </Link>
          <span className="text-sm text-[#737373] px-3">
            {currentPage} / {totalPages}
          </span>
          <Link
            href={`/dashboard/documents?page=${currentPage + 1}`}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              currentPage >= totalPages
                ? "pointer-events-none opacity-40 border-[#E5E5E5] text-[#A3A3A3]"
                : "border-[#E5E5E5] text-[#0A0A0A] hover:bg-[#F5F5F5]"
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
