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
      // Update document status to failed
      await serviceClient.from("documents").update({ status: "failed" }).eq("id", document_id);
      return NextResponse.json({ error: `Failed to download file: ${downloadError?.message}` }, { status: 500 });
    }

    // Convert Blob to ArrayBuffer for pdf-parse
    const arrayBuffer = await fileData.arrayBuffer();

    // Extract text using pdf-parse v2 API
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: new Uint8Array(arrayBuffer) });
    const textResult = await parser.getText();
    await parser.destroy();

    // Update document with extracted text
    const { error: updateError } = await serviceClient
      .from("documents")
      .update({
        extracted_text: textResult.text,
        page_count: textResult.total,
        status: "ready",
      })
      .eq("id", document_id);

    if (updateError) {
      return NextResponse.json({ error: `Failed to update document: ${updateError.message}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      page_count: textResult.total,
      text_length: textResult.text.length,
    });
  } catch (err) {
    console.error("Text extraction error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
