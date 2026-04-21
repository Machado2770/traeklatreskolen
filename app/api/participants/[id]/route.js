import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("participants")
    .delete()
    .eq("id", params.id);

  if (error) return Response.json({ error: "Sletning fejlede" }, { status: 500 });
  return Response.json({ ok: true });
}
