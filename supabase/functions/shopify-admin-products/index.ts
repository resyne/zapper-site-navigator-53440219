import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SHOPIFY_STORE = 'vw0uvu-vf.myshopify.com';
const SHOPIFY_API_VERSION = '2025-01';
const ADMIN_API_URL = `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_API_VERSION}`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const SHOPIFY_ACCESS_TOKEN = Deno.env.get('SHOPIFY_ACCESS_TOKEN');
  if (!SHOPIFY_ACCESS_TOKEN) {
    return new Response(JSON.stringify({ error: 'SHOPIFY_ACCESS_TOKEN not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const headers = {
    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  };

  try {
    const url = new URL(req.url);
    const productId = url.searchParams.get('product_id');

    // GET - list all products
    if (req.method === 'GET') {
      const res = await fetch(`${ADMIN_API_URL}/products.json?limit=250`, { headers });
      if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
      const data = await res.json();
      return new Response(JSON.stringify(data.products || []), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // PUT - update product
    if (req.method === 'PUT' && productId) {
      const body = await req.json();
      const res = await fetch(`${ADMIN_API_URL}/products/${productId}.json`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ product: body }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Shopify update error: ${res.status} - ${errText}`);
      }
      const data = await res.json();
      return new Response(JSON.stringify(data.product), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // DELETE - delete product
    if (req.method === 'DELETE' && productId) {
      const res = await fetch(`${ADMIN_API_URL}/products/${productId}.json`, {
        method: 'DELETE',
        headers,
      });
      if (!res.ok) throw new Error(`Shopify delete error: ${res.status}`);
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
