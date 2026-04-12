export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function PUT(request, { params }) {
  const body = await request.json();
  const supabase = getSupabaseAdmin();

  const bookingHref = `/booking?course=${encodeURIComponent(body.title)}&date=${encodeURIComponent(body.date)}&place=${encodeURIComponent(body.place)}`;

  const { data, error } = await supabase
    .from("calendar_items")
    .update({
      title:            body.title,
      date:             body.date,
      place:            body.place,
      type:             body.type || "Kursus",
      href:             body.href || "",
      booking_href:     bookingHref,
      max_participants: body.max_participants || 8,
      price:            body.price || "",
      sort_order:       body.sort_order ?? 0,
    })
    .eq("id", params.id)
    .select();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, data });
}

export async function PATCH(request, { params }) {
  const body     = await request.json();
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("calendar_items")
    .update({ is_published: body.is_published })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    const msg = (error.message ?? "").includes("column")
      ? "Kolonnen 'is_published' mangler — kør SQL: ALTER TABLE calendar_items ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;"
      : error.message;
    return Response.json({ error: msg }, { status: 500 });
  }
  return Response.json({ ok: true, data });
}

export async function DELETE(request, { params }) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("calendar_items")
    .delete()
    .eq("id", params.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
