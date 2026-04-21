export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "super")
    return Response.json({ error: "Forbidden" }, { status: 403 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("admins")
    .select("id, name, email, role, created_at")
    .order("created_at", { ascending: true });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, data });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "super") {
    return Response.json({ error: "Kun super-admin kan oprette brugere." }, { status: 403 });
  }

  const body = await request.json();
  if (!body.email || !body.password || !body.name) {
    return Response.json({ error: "Navn, email og adgangskode er påkrævet" }, { status: 400 });
  }
  const supabase = getSupabaseAdmin();
  const hash = await bcrypt.hash(body.password, 12);
  const { data, error } = await supabase
    .from("admins")
    .insert([{ name: body.name, email: body.email, password_hash: hash, role: body.role || "editor" }])
    .select("id, name, email, role, created_at");
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, data });
}
