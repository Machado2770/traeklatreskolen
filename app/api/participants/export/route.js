export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import * as XLSX from "xlsx";

const STATUS_LABEL = {
  paid: "Betalt",
  pending: "Afventer betaling",
  cancelled: "Annulleret",
};

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("participants")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // ── Byg rækker ───────────────────────────────────────
  const headers = [
    "Nr.",
    "Oprettet",
    "Navn",
    "Email",
    "Telefon",
    "Kursus / oplevelse",
    "Dato / sted",
    "Betalingsstatus",
    "Bemærkninger",
  ];

  const rows = data.map((row, i) => {
    // Kursusfeltet kan indeholde "Kursus – dato – sted"
    const parts = (row.course ?? "").split(" – ");
    const courseName = parts[0] ?? "";
    const courseMeta = parts.slice(1).join(" · ") || "—";

    const createdAt = row.created_at
      ? new Date(row.created_at).toLocaleString("da-DK", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

    return [
      i + 1,
      createdAt,
      row.name ?? "",
      row.email ?? "",
      row.phone ?? "—",
      courseName,
      courseMeta,
      STATUS_LABEL[row.payment_status] ?? row.payment_status ?? "—",
      row.notes ?? "",
    ];
  });

  // ── Opret workbook ────────────────────────────────────
  const wb = XLSX.utils.book_new();
  const wsData = [headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Kolonnebredder
  ws["!cols"] = [
    { wch: 5 },   // Nr.
    { wch: 18 },  // Oprettet
    { wch: 24 },  // Navn
    { wch: 28 },  // Email
    { wch: 16 },  // Telefon
    { wch: 32 },  // Kursus
    { wch: 28 },  // Dato/sted
    { wch: 20 },  // Status
    { wch: 36 },  // Bemærkninger
  ];

  // Frys øverste række (header)
  ws["!freeze"] = { xSplit: 0, ySplit: 1 };

  XLSX.utils.book_append_sheet(wb, ws, "Deltagere");

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  const today = new Date().toISOString().slice(0, 10);

  return new Response(buf, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="deltagere-${today}.xlsx"`,
    },
  });
}
