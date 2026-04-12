export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { calendarItems } from "@/lib/siteData";

export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = getSupabaseAdmin();
    const courseString = body.course ?? "";

    // ── Kapacitetstjek ────────────────────────────────
    // Find det kalenderitem der matcher kursusstrengen
    const matchedItem = calendarItems.find((item) => {
      const key = `${item.title} – ${item.date} – ${item.place}`;
      return courseString.startsWith(key) || courseString === item.title;
    });

    if (matchedItem?.maxParticipants) {
      const courseKey = `${matchedItem.title} – ${matchedItem.date} – ${matchedItem.place}`;
      const { count, error: countError } = await supabase
        .from("participants")
        .select("*", { count: "exact", head: true })
        .eq("course", courseKey)
        .neq("payment_status", "cancelled");

      if (!countError && count >= matchedItem.maxParticipants) {
        return Response.json(
          { error: "Kurset er fuldt booket." },
          { status: 409 }
        );
      }
    }

    // ── Indsæt deltager ──────────────────────────────
    const payload = {
      name: body.name,
      email: body.email,
      phone: body.phone ?? "",
      course: courseString,
      notes: body.notes ?? "",
      payment_status: "pending",
    };

    const { data, error } = await supabase
      .from("participants")
      .insert([payload])
      .select();

    if (error) {
      return Response.json(
        {
          source: "supabase",
          error: error.message,
          details: error.details ?? null,
          hint: error.hint ?? null,
          code: error.code ?? null,
        },
        { status: 500 }
      );
    }

    return Response.json({ ok: true, data });
  } catch (err) {
    return Response.json(
      {
        source: "catch",
        error: err instanceof Error ? err.message : String(err),
      },
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

    const q = searchParams.get("q");
    const course = searchParams.get("course");
    const payment_status = searchParams.get("payment_status");

    if (q) {
      query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);
    }
    if (course) {
      query = query.ilike("course", `%${course}%`);
    }
    if (payment_status) {
      query = query.eq("payment_status", payment_status);
    }

    const { data, error } = await query.limit(200);

    if (error) {
      return Response.json(
        { source: "supabase", error: error.message },
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
