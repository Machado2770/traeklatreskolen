import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductsBySlugs } from "@/lib/getProducts";
import { SHIPPING } from "@/lib/shopData";

export const dynamic = "force-dynamic";

function baseUrl(req) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    req.headers.get("origin") ||
    "http://localhost:3000"
  );
}

export async function POST(req) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Betaling er ikke konfigureret endnu (mangler STRIPE_SECRET_KEY)." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørgsel." }, { status: 400 });
  }

  const requested = Array.isArray(body?.items) ? body.items : [];
  if (requested.length === 0) {
    return NextResponse.json({ error: "Kurven er tom." }, { status: 400 });
  }

  // Hent autoritative priser server-side — stol aldrig på klientens priser.
  const slugs = requested.map((i) => String(i.slug));
  const products = await getProductsBySlugs(slugs);
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  const line_items = [];
  let subtotal = 0;
  for (const item of requested) {
    const product = bySlug.get(String(item.slug));
    const qty = Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1));
    if (!product) continue;
    subtotal += product.price * qty;
    line_items.push({
      quantity: qty,
      price_data: {
        currency: "dkk",
        unit_amount: Math.round(product.price * 100), // øre
        product_data: {
          name: product.name,
          images: product.image?.startsWith("http") ? [product.image] : undefined,
        },
      },
    });
  }

  if (line_items.length === 0) {
    return NextResponse.json({ error: "Ingen gyldige varer i kurven." }, { status: 400 });
  }

  const shippingAmount =
    subtotal >= SHIPPING.freeOver ? 0 : Math.round(SHIPPING.flatRate * 100);

  const stripe = new Stripe(secret);
  const url = baseUrl(req);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      locale: "da",
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["DK"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: shippingAmount === 0 ? "Fri fragt" : "Fragt",
            fixed_amount: { amount: shippingAmount, currency: "dkk" },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      success_url: `${url}/shop/kvittering?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/kurv`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[checkout]", e?.message ?? e);
    return NextResponse.json({ error: "Kunne ikke oprette betaling. Prøv igen." }, { status: 500 });
  }
}
