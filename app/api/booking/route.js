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
      course: body.course ?? "",
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
        cause:
          err && typeof err === "object" && "cause" in err
            ? String(err.cause)
            : null,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("participants")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

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
        cause:
          err && typeof err === "object" && "cause" in err
            ? String(err.cause)
            : null,
      },
      { status: 500 }
    );
  }
}