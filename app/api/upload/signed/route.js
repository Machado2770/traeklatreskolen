import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  const { filename, contentType } = await request.json();
  if (!filename) return Response.json({ error: "Mangler filnavn" }, { status: 400 });

  const safeName = `${Date.now()}-${filename
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")}`;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage
    .from("site-images")
    .createSignedUploadUrl(safeName);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage
    .from("site-images")
    .getPublicUrl(safeName);

  return Response.json({ ok: true, signedUrl: data.signedUrl, path: safeName, publicUrl });
}
