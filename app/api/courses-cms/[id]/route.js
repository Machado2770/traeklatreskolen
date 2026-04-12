export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

function isColumnError(error) {
  const msg = error?.message ?? "";
  return msg.includes("is_published") || msg.includes("column");
}

export async function PUT(request, { params }) {
  const body     = await request.json();
  const supabase = getSupabaseAdmin();

  const base = {
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
  };

  // Forsøg med is_published — fald tilbage uden hvis kolonnen ikke findes endnu
  let { data, error } = await supabase
    .from("courses_cms")
    .update({ ...base, is_published: body.is_published ?? false })
    .eq("id", params.id)
    .select();

  if (error && isColumnError(error)) {
    ({ data, error } = await supabase
      .from("courses_cms")
      .update(base)
      .eq("id", params.id)
      .select());
  }

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, data });
}

export async function PATCH(request, { params }) {
  const body     = await request.json();
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("courses_cms")
    .update({ is_published: body.is_published })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    const msg = isColumnError(error)
      ? "Kolonnen 'is_published' mangler — kør SQL: ALTER TABLE courses_cms ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;"
      : error.message;
    return Response.json({ error: msg }, { status: 500 });
  }
  return Response.json({ ok: true, data });
}

export async function DELETE(request, { params }) {
  const supabase = getSupabaseAdmin();

  const { data: course } = await supabase
    .from("courses_cms")
    .select("title")
    .eq("id", params.id)
    .maybeSingle();

  if (course?.title) {
    await supabase.from("calendar_items").delete().eq("title", course.title);
  }

  const { error } = await supabase.from("courses_cms").delete().eq("id", params.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
