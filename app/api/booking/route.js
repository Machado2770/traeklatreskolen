export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = getSupabaseAdmin();

    const payload = {
      name: body.name,
      email: body.email,
      phone: body.phone ?? "",
      course: body.course,
      notes: body.notes ?? "",
      payment_status: "pending",
    };

    const { error } = await supabase.from("participants").insert([payload]);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const course = searchParams.get("course");
    const paymentStatus = searchParams.get("payment_status");
    const q = searchParams.get("q");

    const supabase = getSupabaseAdmin();

    let query = supabase
      .from("participants")
      .select("*")
      .order("created_at", { ascending: false });

    if (course) {
      query = query.eq("course", course);
    }

    if (paymentStatus) {
      query = query.eq("payment_status", paymentStatus);
    }

    if (q) {
      query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%`);
    }

    const { data, error } = await query;

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}