import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  if (!profile) {
    await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
      },
      { onConflict: "id" }
    );
    profile = { subscription_status: "free" };
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        email={user.email ?? ""}
        subscriptionStatus={profile?.subscription_status ?? "free"}
      />
      <main>{children}</main>
    </div>
  );
}
