export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { calendarItems as siteDataItems } from "@/lib/siteData";

// Find kalenderitem der matcher kursusstrengen — tjekker Supabase først, derefter siteData
async function findCalendarItem(supabase, courseString) {
  // Prøv Supabase
  try {
    const { data } = await supabase
      .from("calendar_items")
      .select("title, date, place, max_participants")
      .limit(100);

    if (data && data.length > 0) {
      return data.find(item => {
        const key = `${item.title} – ${item.date} – ${item.place}`;
        return courseString.startsWith(key) || courseString === item.title;
      }) ?? null;
    }
  } catch { /* Supabase ikke tilgængeligt */ }

  // Fallback til siteData
  return siteDataItems.find(item => {
    const key = `${item.title} – ${item.date} – ${item.place}`;
    return courseString.startsWith(key) || courseString === item.title;
  }) ?? null;
}

export async function POST(request) {
  try {
    const body      = await request.json();
    const supabase  = getSupabaseAdmin();
    const courseString = body.course ?? "";

    // ── Kapacitetstjek ──────────────────────────────────
    const matchedItem = await findCalendarItem(supabase, courseString);
    const maxParticipants = matchedItem?.max_participants ?? matchedItem?.maxParticipants ?? null;

    if (maxParticipants) {
      const courseKey = courseString.includes(" – ")
        ? courseString
        : matchedItem
          ? `${matchedItem.title} – ${matchedItem.date} – ${matchedItem.place}`
          : courseString;

      const { count, error: countError } = await supabase
        .from("participants")
        .select("*", { count: "exact", head: true })
        .eq("course", courseKey)
        .neq("payment_status", "cancelled");

      if (!countError && count >= maxParticipants) {
        return Response.json({ error: "Kurset er fuldt booket." }, { status: 409 });
      }
    }

    // ── Indsæt deltager ─────────────────────────────────
    const { data, error } = await supabase
      .from("participants")
      .insert([{
        name:           body.name,
        email:          body.email,
        phone:          body.phone ?? "",
        course:         courseString,
        notes:          body.notes ?? "",
        payment_status: "pending",
      }])
      .select();

    if (error) {
      return Response.json(
        { source: "supabase", error: error.message, details: error.details ?? null, hint: error.hint ?? null, code: error.code ?? null },
        { status: 500 }
      );
    }

    return Response.json({ ok: true, data });
  } catch (err) {
    return Response.json(
      { source: "catch", error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);

    let query = supabase
      .from("participants")
      .select("*")
      .order("created_at", { ascending: false });

    const q              = searchParams.get("q");
    const course         = searchParams.get("course");
    const payment_status = searchParams.get("payment_status");
    const limit          = searchParams.get("limit");

    if (q)              query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);
    if (course)         query = query.ilike("course", `%${course}%`);
    if (payment_status) query = query.eq("payment_status", payment_status);

    const { data, error } = await query.limit(limit ? parseInt(limit) : 200);

    if (error) return Response.json({ source: "supabase", error: error.message }, { status: 500 });
    return Response.json({ ok: true, data });
  } catch (err) {
    return Response.json(
      { source: "catch", error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
