export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getProductsBySlugs } from "@/lib/getProducts";
import { SHIPPING } from "@/lib/shopData";
import {
  invoiceOrderNotificationHtml,
  invoiceOrderConfirmationHtml,
} from "@/lib/emailTemplates";

// Fakturaordre fra shoppen: validér kunde + kurv, beregn autoritative priser
// server-side (stol aldrig på klientens priser) og send ordren pr. mail —
// notifikation til Træklatreskolen og bekræftelse til kunden.
// Selve fakturaen (evt. elektronisk via EAN) sendes manuelt bagefter.
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørgsel." }, { status: 400 });
  }

  // ── Honeypot: bots udfylder dette felt, mennesker ikke ─
  if (body.website?.trim()) return NextResponse.json({ ok: true });

  // ── Valider påkrævede felter ────────────────────────
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  if (!name) return NextResponse.json({ error: "Navn er påkrævet." }, { status: 400 });
  if (!email) return NextResponse.json({ error: "Email er påkrævet." }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Telefon er påkrævet." }, { status: 400 });

  // ── CRLF-injection beskyttelse (email header injection) ─
  // Enkeltlinje-felter må ikke indeholde linjeskift (adresse/bemærkning må gerne).
  const singleLine = [body.name, body.email, body.phone, body.organization, body.cvr, body.ean];
  if (singleLine.some((s) => /[\r\n]/.test(s ?? "")))
    return NextResponse.json({ error: "Ugyldigt tegn i input." }, { status: 400 });

  // ── Email format validering ──────────────────────────
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return NextResponse.json({ error: "Indtast venligst en gyldig e-mailadresse." }, { status: 400 });

  // ── Inputlængde-begrænsning ──────────────────────────
  if (
    name.length > 120 || email.length > 200 || phone.length > 40 ||
    (body.organization ?? "").length > 160 || (body.address ?? "").length > 300 ||
    (body.note ?? "").length > 1000
  )
    return NextResponse.json({ error: "Et eller flere felter er for lange." }, { status: 400 });

  // ── Telefon, CVR og EAN format ───────────────────────
  if (!/\d{4}/.test(phone))
    return NextResponse.json({ error: "Indtast venligst et gyldigt telefonnummer." }, { status: 400 });
  const cvr = (body.cvr ?? "").trim();
  const ean = (body.ean ?? "").trim();
  if (cvr && !/^\d{8}$/.test(cvr))
    return NextResponse.json({ error: "CVR-nummer skal være 8 cifre." }, { status: 400 });
  if (ean && !/^\d{13}$/.test(ean))
    return NextResponse.json({ error: "EAN-nummer skal være 13 cifre." }, { status: 400 });

  // ── Kurv: hent autoritative priser server-side ───────
  const requested = Array.isArray(body?.items) ? body.items : [];
  if (requested.length === 0)
    return NextResponse.json({ error: "Kurven er tom." }, { status: 400 });

  const slugs = requested.map((i) => String(i.slug));
  const products = await getProductsBySlugs(slugs);
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  const items = [];
  let subtotal = 0;
  for (const item of requested) {
    const product = bySlug.get(String(item.slug));
    const qty = Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1));
    if (!product) continue;
    const total = product.price * qty;
    subtotal += total;
    items.push({ name: product.name, qty, price: product.price, total });
  }
  if (items.length === 0)
    return NextResponse.json({ error: "Ingen gyldige varer i kurven." }, { status: 400 });

  const shipping = subtotal >= SHIPPING.freeOver ? 0 : SHIPPING.flatRate;
  const total = subtotal + shipping;

  // ── Send mails ──────────────────────────────────────
  if (!process.env.RESEND_API_KEY) {
    console.error("[invoice-order] RESEND_API_KEY mangler — ordren kan ikke sendes.");
    return NextResponse.json(
      { error: "Fakturabestilling er ikke konfigureret endnu. Skriv til info@traeklatreskolen.dk." },
      { status: 500 }
    );
  }

  const order = {
    name,
    email,
    phone,
    organization: (body.organization ?? "").trim(),
    cvr,
    ean,
    address: (body.address ?? "").trim(),
    note: (body.note ?? "").trim(),
    items,
    subtotal,
    shipping,
    total,
  };

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const [notif, confirm] = await Promise.all([
      // Notifikation til Træklatreskolen
      resend.emails.send({
        from: "Træklatreskolen <info@traeklatreskolen.dk>",
        to: "info@traeklatreskolen.dk",
        replyTo: email,
        subject: `Ny fakturaordre: ${order.organization || name} — ${items.length} vare${items.length === 1 ? "" : "r"}`,
        html: invoiceOrderNotificationHtml(order),
      }),
      // Bekræftelse til kunden
      resend.emails.send({
        from: "Træklatreskolen <info@traeklatreskolen.dk>",
        to: email,
        subject: "Ordre modtaget — vi sender en faktura",
        html: invoiceOrderConfirmationHtml(order),
      }),
    ]);
    if (notif?.error) throw new Error(notif.error.message ?? "Notifikationsmail fejlede");
    if (confirm?.error) console.error("[invoice-order] bekræftelsesmail:", confirm.error.message);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[invoice-order]", e?.message ?? e);
    return NextResponse.json(
      { error: "Ordren kunne ikke sendes. Prøv igen eller skriv til info@traeklatreskolen.dk." },
      { status: 500 }
    );
  }
}
