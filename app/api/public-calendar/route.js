export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("calendar_items")
    .select("*")
    .eq("is_published", true)
    .order("date", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(
    { ok: true, data: data || [] },
    { headers: { "Cache-Control": "no-store, must-revalidate" } }
  );
}
