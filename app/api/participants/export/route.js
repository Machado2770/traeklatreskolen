export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { csvEscape } from "@/lib/formatters";

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("participants")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const header = ["id","created_at","name","email","phone","course","payment_status","notes"];
  const rows = data.map((row) =>
    header.map((key) => csvEscape(row[key] ?? "")).join(",")
  );

  const csv = [header.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="participants.csv"',
    },
  });
}
