import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const VALID_STATUSES = ["paid", "pending", "cancelled"];

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!VALID_STATUSES.includes(body.payment_status))
    return Response.json({ error: "Ugyldig status" }, { status: 400 });

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("participants")
    .update({ payment_status: body.payment_status })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return Response.json({ error: "Opdatering fejlede" }, { status: 500 });
  }

  return Response.json(data);
}
