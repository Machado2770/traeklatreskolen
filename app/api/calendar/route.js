export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("calendar_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, data });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const supabase = getSupabaseAdmin();

  // Byg booking_href automatisk
  const bookingHref = `/booking?course=${encodeURIComponent(body.title)}&date=${encodeURIComponent(body.date)}&place=${encodeURIComponent(body.place)}`;

  const { data, error } = await supabase
    .from("calendar_items")
    .insert([{
      title:            body.title,
      date:             body.date,
      place:            body.place,
      type:             body.type || "Kursus",
      href:             body.href || "",
      booking_href:     body.booking_href || bookingHref,
      max_participants: body.max_participants || 8,
      price:            body.price || "",
      sort_order:       body.sort_order || 0,
    }])
    .select();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, data });
}
