export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function PUT(request, { params }) {
  const body = await request.json();
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("courses_cms")
    .update({
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
      sort_order:    body.sort_order ?? 0,
    })
    .eq("id", params.id)
    .select();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, data });
}

export async function DELETE(request, { params }) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("courses_cms").delete().eq("id", params.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
