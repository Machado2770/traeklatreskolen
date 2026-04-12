export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("courses_cms")
    .select("*")
    .order("is_experience", { ascending: true })
    .order("sort_order",    { ascending: true });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, data });
}

export async function POST(request) {
  const body = await request.json();
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("courses_cms")
    .insert([{
      slug:          body.slug,
      title:         body.title,
      short:         body.short || "",
      price:         body.price || "",
      level:         body.level || "",
      booking_value: body.booking_value || body.title,
      booking_href:  body.booking_href || `/booking?course=${encodeURIComponent(body.title)}`,
      image:         body.image || "",
      description:   body.description || "",
      bullets:       body.bullets || [],
      is_experience: body.is_experience || false,
      sort_order:    body.sort_order || 0,
    }])
    .select();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, data });
}
