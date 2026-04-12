export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!file) return Response.json({ error: "Ingen fil" }, { status: 400 });

  const bytes  = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext    = file.name.split(".").pop().toLowerCase();
  const name   = `${Date.now()}-${file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "")}`;

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage
    .from("site-images")
    .upload(name, buffer, { contentType: file.type, upsert: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage.from("site-images").getPublicUrl(name);
  return Response.json({ ok: true, url: publicUrl, name });
}

export async function DELETE(request) {
  const { name } = await request.json();
  const supabase  = getSupabaseAdmin();
  const { error } = await supabase.storage.from("site-images").remove([name]);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage.from("site-images").list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  const { data: { publicUrl: base } } = supabase.storage.from("site-images").getPublicUrl("");
  const files = (data || []).map(f => ({ name: f.name, url: `${base}${f.name}`, size: f.metadata?.size }));
  return Response.json({ ok: true, data: files });
}
