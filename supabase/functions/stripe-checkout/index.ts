import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    if (!STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY non configurata. Configura la chiave Stripe per abilitare i pagamenti.");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { items, customer, shipping } = await req.json();

    if (!items || items.length === 0) {
      throw new Error("Carrello vuoto");
    }

    // Build Stripe line items
    const lineItems = items.map((item: { name: string; price_cents: number; quantity: number }) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: item.price_cents,
      },
      quantity: item.quantity,
    }));

    const totalCents = items.reduce(
      (sum: number, i: { price_cents: number; quantity: number }) => sum + i.price_cents * i.quantity,
      0
    );

    // Determine origin for success/cancel URLs
    const origin = req.headers.get("origin") || "https://npyygvuhmxrvccaczifw.supabase.co";

    // Create Stripe Checkout Session
    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        mode: "payment",
        "success_url": `${origin}/shop?payment=success`,
        "cancel_url": `${origin}/shop/checkout?payment=cancelled`,
        "customer_email": customer.email,
        ...lineItems.reduce((params: Record<string, string>, item: any, idx: number) => {
          params[`line_items[${idx}][price_data][currency]`] = item.price_data.currency;
          params[`line_items[${idx}][price_data][product_data][name]`] = item.price_data.product_data.name;
          params[`line_items[${idx}][price_data][unit_amount]`] = String(item.price_data.unit_amount);
          params[`line_items[${idx}][quantity]`] = String(item.quantity);
          return params;
        }, {}),
      }),
    });

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error("Stripe error:", session);
      throw new Error(`Stripe error: ${session.error?.message || "Unknown"}`);
    }

    // Save order to DB
    await supabase.from("shop_orders").insert({
      stripe_session_id: session.id,
      status: "pending",
      customer_email: customer.email,
      customer_name: customer.name,
      customer_phone: customer.phone || null,
      shipping_address: shipping,
      items,
      total_cents: totalCents,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Checkout error:", error);
    const message = error instanceof Error ? error.message : "Errore sconosciuto";
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
