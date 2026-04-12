export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import bcrypt from "bcryptjs";

export async function PATCH(request, { params }) {
  const body = await request.json();
  const supabase = getSupabaseAdmin();
  const update = { name: body.name, email: body.email, role: body.role };
  if (body.password) update.password_hash = await bcrypt.hash(body.password, 12);
  const { error } = await supabase.from("admins").update(update).eq("id", params.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("admins").delete().eq("id", params.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
