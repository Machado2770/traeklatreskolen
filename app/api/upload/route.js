export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

async function requireSession() {
  const session = await getServerSession(authOptions);
  return session ?? null;
}

export async function POST(request) {
  if (!await requireSession()) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!file) return Response.json({ error: "Ingen fil" }, { status: 400 });

  if (!ALLOWED_TYPES.includes(file.type))
    return Response.json({ error: "Filtype ikke tilladt. Brug JPEG, PNG, WebP, GIF eller SVG." }, { status: 400 });

  const bytes  = await file.arrayBuffer();
  if (bytes.byteLength > MAX_BYTES)
    return Response.json({ error: "Filen er for stor (max 10 MB)." }, { status: 400 });

  const buffer = Buffer.from(bytes);
  const name   = `${Date.now()}-${file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "")}`;

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage
    .from("site-images")
    .upload(name, buffer, { contentType: file.type, upsert: false });

  if (error) return Response.json({ error: "Upload fejlede" }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage.from("site-images").getPublicUrl(name);
  return Response.json({ ok: true, url: publicUrl, name });
}

export async function DELETE(request) {
  if (!await requireSession()) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await request.json();
  if (!name || typeof name !== "string")
    return Response.json({ error: "Filnavn mangler" }, { status: 400 });

  const supabase  = getSupabaseAdmin();
  const { error } = await supabase.storage.from("site-images").remove([name]);
  if (error) return Response.json({ error: "Sletning fejlede" }, { status: 500 });
  return Response.json({ ok: true });
}

export async function GET() {
  if (!await requireSession()) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage.from("site-images").list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
  if (error) return Response.json({ error: "Kunne ikke hente billeder" }, { status: 500 });
  const { data: { publicUrl: base } } = supabase.storage.from("site-images").getPublicUrl("");
  const files = (data || []).map(f => ({ name: f.name, url: `${base}${f.name}`, size: f.metadata?.size }));
  return Response.json({ ok: true, data: files });
}
