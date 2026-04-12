export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import path from "path";
import fs from "fs";
import ExcelJS from "exceljs";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// ── Farvepalette fra hjemmesiden ─────────────────────
const C = {
  darkGreen:  "1f3a2b",
  midGreen:   "4b6355",
  lightGreen: "eef3ef",
  orange:     "d8782f",
  lightOrange:"f5e5d8",
  white:      "ffffff",
  paid:       "dff3e5",
  paidText:   "165c2c",
  pending:    "f7eddc",
  pendingText:"7a4d08",
  cancelled:  "fbe4e2",
  cancelledText:"9a2f27",
  border:     "d6e3d9",
};

const STATUS_LABEL = {
  paid:      "Betalt",
  pending:   "Afventer",
  cancelled: "Annulleret",
};

function hex(color) {
  return { argb: "FF" + color };
}

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("participants")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // ── Workbook ─────────────────────────────────────────
  const wb = new ExcelJS.Workbook();
  wb.creator = "Træklatreskolen";
  wb.created = new Date();

  const ws = wb.addWorksheet("Deltagere", {
    pageSetup: { fitToPage: true, fitToWidth: 1, orientation: "landscape" },
  });

  // ── Kolonnebredder ───────────────────────────────────
  ws.columns = [
    { key: "nr",      width: 5  },
    { key: "created", width: 18 },
    { key: "name",    width: 26 },
    { key: "email",   width: 30 },
    { key: "phone",   width: 16 },
    { key: "course",  width: 34 },
    { key: "meta",    width: 28 },
    { key: "status",  width: 16 },
    { key: "notes",   width: 36 },
  ];

  // ── Logo (række 1–3) ─────────────────────────────────
  const logoPath = path.join(process.cwd(), "public", "logo", "logo-main.png");
  if (fs.existsSync(logoPath)) {
    const logoId = wb.addImage({ filename: logoPath, extension: "png" });
    ws.addImage(logoId, {
      tl: { col: 0, row: 0 },
      ext: { width: 220, height: 50 },
    });
  }

  // Titel i kolonne C, række 1
  ws.mergeCells("C1:I1");
  const titleCell = ws.getCell("C1");
  titleCell.value = "Træklatreskolen – Deltagerliste";
  titleCell.font = { bold: true, size: 16, color: hex(C.darkGreen) };
  titleCell.alignment = { vertical: "middle" };

  // Dato i kolonne C, række 2
  ws.mergeCells("C2:I2");
  const dateCell = ws.getCell("C2");
  dateCell.value = `Eksporteret: ${new Date().toLocaleDateString("da-DK", { day: "2-digit", month: "long", year: "numeric" })}`;
  dateCell.font = { size: 11, color: hex(C.midGreen) };

  // Sæt højde på logo-rækker
  ws.getRow(1).height = 32;
  ws.getRow(2).height = 20;
  ws.getRow(3).height = 10; // luft

  // ── Kolonneoverskrifter (række 4) ────────────────────
  const HEADERS = ["Nr.", "Oprettet", "Navn", "Email", "Telefon",
                   "Kursus / oplevelse", "Dato · Sted", "Status", "Bemærkninger"];

  const headerRow = ws.getRow(4);
  headerRow.height = 28;
  HEADERS.forEach((label, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = label;
    cell.font = { bold: true, color: hex(C.white), size: 11 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: hex(C.darkGreen) };
    cell.alignment = { vertical: "middle", horizontal: "left", wrapText: false };
    cell.border = {
      bottom: { style: "medium", color: hex(C.orange) },
    };
  });

  // Frys logo + header
  ws.views = [{ state: "frozen", xSplit: 0, ySplit: 4 }];

  // ── Datarækkerne ─────────────────────────────────────
  data.forEach((row, i) => {
    const parts = (row.course ?? "").split(" – ");
    const courseName = parts[0] ?? "";
    const courseMeta = parts.slice(1).join(" · ") || "";

    const createdAt = row.created_at
      ? new Date(row.created_at).toLocaleString("da-DK", {
          day: "2-digit", month: "2-digit", year: "numeric",
          hour: "2-digit", minute: "2-digit",
        })
      : "—";

    const isEven = i % 2 === 0;
    const rowBg = isEven ? C.white : C.lightGreen;

    const exRow = ws.getRow(5 + i);
    exRow.height = 22;

    const values = [
      i + 1,
      createdAt,
      row.name ?? "",
      row.email ?? "",
      row.phone || "—",
      courseName,
      courseMeta || "—",
      STATUS_LABEL[row.payment_status] ?? row.payment_status ?? "—",
      row.notes ?? "",
    ];

    values.forEach((val, colIdx) => {
      const cell = exRow.getCell(colIdx + 1);
      cell.value = val;
      cell.font = { size: 10, color: hex(C.darkGreen) };
      cell.alignment = { vertical: "middle", wrapText: colIdx === 8 };
      cell.border = {
        bottom: { style: "thin", color: hex(C.border) },
      };

      // Statuskolonne farves individuelt
      if (colIdx === 7) {
        const st = row.payment_status;
        const bg   = st === "paid" ? C.paid      : st === "cancelled" ? C.cancelled  : C.pending;
        const fg   = st === "paid" ? C.paidText  : st === "cancelled" ? C.cancelledText : C.pendingText;
        cell.fill = { type: "pattern", pattern: "solid", fgColor: hex(bg) };
        cell.font = { bold: true, size: 10, color: hex(fg) };
        cell.alignment = { vertical: "middle", horizontal: "center" };
      } else {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: hex(rowBg) };
      }
    });
  });

  // ── Bundlinje ────────────────────────────────────────
  const summaryRow = ws.getRow(5 + data.length + 1);
  summaryRow.height = 22;
  const totalPaid = data.filter((r) => r.payment_status === "paid").length;
  const totalPending = data.filter((r) => r.payment_status === "pending").length;

  const summaryCell = summaryRow.getCell(1);
  ws.mergeCells(5 + data.length + 1, 1, 5 + data.length + 1, 9);
  summaryCell.value =
    `Total: ${data.length} deltagere  ·  Betalt: ${totalPaid}  ·  Afventer: ${totalPending}`;
  summaryCell.font = { bold: true, size: 10, color: hex(C.white) };
  summaryCell.fill = { type: "pattern", pattern: "solid", fgColor: hex(C.darkGreen) };
  summaryCell.alignment = { vertical: "middle", horizontal: "left" };
  summaryCell.border = {
    top: { style: "medium", color: hex(C.orange) },
  };

  // ── Generer fil ──────────────────────────────────────
  const buf = await wb.xlsx.writeBuffer();
  const today = new Date().toISOString().slice(0, 10);

  return new Response(buf, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="deltagere-${today}.xlsx"`,
    },
  });
}
