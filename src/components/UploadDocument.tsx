"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface UploadDocumentProps {
  userId: string;
  onUploadComplete: () => void;
}

export default function UploadDocument({ userId, onUploadComplete }: UploadDocumentProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  async function processFile(file: File) {
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);
    setProgressLabel("Uploading to storage...");

    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${userId}/${timestamp}-${sanitizedName}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    setProgress(40);
    setProgressLabel("Creating document record...");

    const { data: doc, error: insertError } = await supabase
      .from("documents")
      .insert({
        user_id: userId,
        title: file.name.replace(".pdf", ""),
        file_name: file.name,
        file_url: filePath,
        file_size: file.size,
        status: "processing",
      })
      .select()
      .single();

    if (insertError) {
      setError(`Failed to save document: ${insertError.message}`);
      setUploading(false);
      return;
    }

    setProgress(65);
    setProgressLabel("Extracting text from PDF...");

    const response = await fetch("/api/extract-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document_id: doc.id }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(`Text extraction failed: ${data.error || "Unknown error"}`);
      setUploading(false);
      return;
    }

    setProgress(100);
    setProgressLabel("Done!");
    setSuccess(true);

    setTimeout(() => {
      setUploading(false);
      setSuccess(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onUploadComplete();
    }, 1200);
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
        dragOver
          ? "border-[#0A0A0A] bg-[#F5F5F5] scale-[1.02]"
          : success
          ? "border-[#0A0A0A] bg-[#F5F5F5]"
          : uploading
          ? "border-[#E5E5E5] bg-[#F5F5F5]"
          : "border-[#E5E5E5] bg-white hover:border-[#0A0A0A] hover:bg-[#F5F5F5]"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
        id="pdf-upload"
      />

      {error && (
        <div className="border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <label
        htmlFor="pdf-upload"
        className={`cursor-pointer ${uploading ? "pointer-events-none" : ""}`}
      >
        {success ? (
          <div>
            <div className="mx-auto w-16 h-16 rounded-full border border-[#E5E5E5] flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-[#0A0A0A] font-medium">Upload complete!</p>
          </div>
        ) : (
          <>
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all border ${
              dragOver ? "border-[#0A0A0A] scale-110 bg-white" : "border-[#E5E5E5] bg-[#F5F5F5]"
            }`}>
              <svg
                className={`h-8 w-8 transition-colors ${dragOver ? "text-[#0A0A0A]" : "text-[#A3A3A3]"}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-[#0A0A0A] font-medium">
              {uploading ? "Uploading..." : dragOver ? "Drop your PDF here" : "Click or drag & drop a PDF"}
            </p>
            <p className="text-xs text-[#A3A3A3] mt-1">PDF up to 10MB</p>
          </>
        )}
      </label>

      {uploading && !success && (
        <div className="mt-5">
          <div className="w-full bg-[#F5F5F5] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#0A0A0A] h-1.5 rounded-full progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#A3A3A3] mt-2">{progressLabel}</p>
        </div>
      )}
    </div>
  );
}
