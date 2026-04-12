export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const supabase = getSupabaseAdmin();

  const [calRes, cmsRes] = await Promise.all([
    supabase
      .from("calendar_items")
      .select("*")
      .eq("is_published", true)
      .order("date", { ascending: true }),
    supabase
      .from("courses_cms")
      .select("title, price"),
  ]);

  if (calRes.error) return Response.json({ error: calRes.error.message }, { status: 500 });

  // Byg pris-opslag fra courses_cms: title → price
  const priceMap = {};
  for (const c of cmsRes.data || []) {
    if (c.price) priceMap[c.title] = c.price;
  }

  // Brug price fra calendar_items, ellers fald tilbage på courses_cms
  const data = (calRes.data || []).map(item => ({
    ...item,
    price: item.price || priceMap[item.title] || "",
  }));

  return Response.json(
    { ok: true, data },
    { headers: { "Cache-Control": "no-store, must-revalidate" } }
  );
}
