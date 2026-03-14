import { createClient } from "@supabase/supabase-js";

export function createServiceClient() {
  if (typeof window !== "undefined") {
    throw new Error("createServiceClient must not be called in the browser");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
