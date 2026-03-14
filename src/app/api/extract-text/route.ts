import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const extractTextSchema = z.object({
  document_id: z.string().uuid(),
});

export async function POST(request: Request) {
  try {
    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = extractTextSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }
    const { document_id } = parsed.data;

    // Fetch document record - verify user owns it
    const { data: doc, error: docError } = await supabase
      .from("documents")
      .select("*")
      .eq("id", document_id)
      .eq("user_id", user.id)
      .single();

    if (docError || !doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Download PDF from Storage using service role client (bypasses RLS)
    const serviceClient = createServiceClient();
    const { data: fileData, error: downloadError } = await serviceClient.storage
      .from("documents")
      .download(doc.file_url);

    if (downloadError || !fileData) {
      await serviceClient.from("documents").update({ status: "failed" }).eq("id", document_id);
      console.error("Failed to download file:", downloadError?.message);
      return NextResponse.json({ error: "Failed to download file from storage" }, { status: 500 });
    }

    // Convert Blob to ArrayBuffer
    const arrayBuffer = await fileData.arrayBuffer();

    // Extract text using unpdf (serverless-compatible)
    const { extractText } = await import("unpdf");
    const { text, totalPages } = await extractText(new Uint8Array(arrayBuffer));

    // Update document with extracted text
    const { error: updateError } = await serviceClient
      .from("documents")
      .update({
        extracted_text: text,
        page_count: totalPages,
        status: "ready",
      })
      .eq("id", document_id);

    if (updateError) {
      console.error("Failed to update document:", updateError.message);
      return NextResponse.json({ error: "Failed to update document record" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      page_count: totalPages,
      text_length: text.length,
    });
  } catch (err) {
    console.error("Text extraction error:", err);
    return NextResponse.json(
      { error: "An error occurred during text extraction" },
      { status: 500 }
    );
  }
}
