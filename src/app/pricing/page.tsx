import { createClient } from "@/lib/supabase/server";
import PricingClient from "./PricingClient";

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let subscriptionStatus = "free";
  let hasStripeCustomer = false;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_status, stripe_customer_id")
      .eq("id", user.id)
      .single();

    subscriptionStatus = profile?.subscription_status ?? "free";
    hasStripeCustomer = !!profile?.stripe_customer_id;
  }

  return (
    <PricingClient
      isLoggedIn={!!user}
      subscriptionStatus={subscriptionStatus}
      hasStripeCustomer={hasStripeCustomer}
    />
  );
}
