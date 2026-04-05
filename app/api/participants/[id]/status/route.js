import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function PATCH(request, { params }) {
  const body = await request.json();
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("participants")
    .update({ payment_status: body.payment_status })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
