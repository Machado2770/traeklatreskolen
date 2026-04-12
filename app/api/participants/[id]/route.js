import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function DELETE(request, { params }) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("participants")
    .delete()
    .eq("id", params.id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
