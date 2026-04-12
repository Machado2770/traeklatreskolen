export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { courses, experiences } from "@/lib/siteData";

const ALL = [
  ...courses.map((c, i) => ({
    slug:          c.slug,
    title:         c.title,
    short:         c.short         || "",
    price:         c.price         || "",
    level:         c.level         || "",
    booking_href:  c.bookingHref   || `/booking?course=${encodeURIComponent(c.title)}`,
    booking_value: c.bookingValue  || c.title,
    image:         c.image         || "",
    description:   c.description   || "",
    bullets:       c.bullets       || [],
    is_experience: false,
    sort_order:    i,
  })),
  ...experiences.map((e, i) => ({
    slug:          e.slug,
    title:         e.title,
    short:         e.short         || "",
    price:         e.price         || "",
    level:         "",
    booking_href:  e.bookingHref   || `/booking?course=${encodeURIComponent(e.title)}`,
    booking_value: e.bookingValue  || e.title,
    image:         e.image         || "",
    description:   e.description   || "",
    bullets:       e.bullets       || [],
    is_experience: true,
    sort_order:    i,
  })),
];

export async function POST() {
  const supabase = getSupabaseAdmin();

  // Hent eksisterende slugs
  const { data: existing } = await supabase
    .from("courses_cms")
    .select("slug");

  const existingSlugs = new Set((existing || []).map(r => r.slug));
  const toInsert = ALL.filter(c => !existingSlugs.has(c.slug));

  if (!toInsert.length) {
    return Response.json({ ok: true, inserted: 0, message: "Alle standardkurser findes allerede." });
  }

  const { error } = await supabase.from("courses_cms").insert(toInsert);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ ok: true, inserted: toInsert.length, slugs: toInsert.map(c => c.slug) });
}
