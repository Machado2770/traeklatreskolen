export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { calendarItems } from "@/lib/siteData";

export async function POST() {
  // Kun for indloggede admins — seed kan ellers nulstille kalenderen.
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();

  // Hent eksisterende begivenheder for at undgå dubletter (match på title+date+place)
  const { data: existing } = await supabase
    .from("calendar_items")
    .select("title, date, place");

  const existingKeys = new Set(
    (existing || []).map(i => `${i.title}|${i.date}|${i.place}`)
  );

  const toInsert = calendarItems
    .filter(item => !existingKeys.has(`${item.title}|${item.date}|${item.place}`))
    .map((item, i) => ({
      title:            item.title,
      date:             item.date,
      place:            item.place,
      type:             item.type || "Kursus",
      href:             item.href || "",
      booking_href:     item.bookingHref || `/booking?course=${encodeURIComponent(item.title)}&date=${encodeURIComponent(item.date)}&place=${encodeURIComponent(item.place)}`,
      max_participants: item.maxParticipants || 8,
      price:            item.price || "",
      sort_order:       i,
      is_published:     true,   // standardbegivenheder er offentlige med det samme
    }));

  if (!toInsert.length) {
    return Response.json({ ok: true, inserted: 0, message: "Alle standardbegivenheder findes allerede." });
  }

  const { error } = await supabase.from("calendar_items").insert(toInsert);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ ok: true, inserted: toInsert.length });
}
