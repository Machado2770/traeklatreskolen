import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { products as fallbackProducts } from "@/lib/shopData";

function normalize(row) {
  return {
    slug: row.slug,
    name: row.name,
    short: row.short ?? "",
    price: Number(row.price) || 0,        // hele kroner
    category: row.category ?? "",
    stock: row.stock ?? null,
    image: row.image ?? "",
    description: row.description ?? "",
    bullets: Array.isArray(row.bullets) ? row.bullets : [],
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    badge: row.badge ?? null,
  };
}

// Supabase er kilden til sandhed når tabellen har data.
// Ved tom tabel eller fejl bruges shopData som nødbackup.
export async function getProducts() {
  noStore();
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("shop_products")
      .select("*")
      .neq("is_published", false)
      .order("sort_order", { ascending: true });
    if (error) { console.error("[getProducts]", error.message); return fallbackProducts; }
    if (!data?.length) return fallbackProducts;
    return data.map(normalize);
  } catch (e) {
    console.error("[getProducts] exception:", e?.message ?? e);
    return fallbackProducts;
  }
}

export async function getProductBySlug(slug) {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("shop_products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error || !data) return fallbackProducts.find((p) => p.slug === slug) ?? null;
    return normalize(data);
  } catch {
    return fallbackProducts.find((p) => p.slug === slug) ?? null;
  }
}

// Bruges af checkout: hent autoritative priser server-side ud fra slugs.
// Falder tilbage til shopData hvis Supabase ikke svarer, så priser aldrig
// tages fra klienten.
export async function getProductsBySlugs(slugs) {
  const unique = [...new Set(slugs)];
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("shop_products")
      .select("*")
      .in("slug", unique);
    if (error || !data?.length) {
      return fallbackProducts.filter((p) => unique.includes(p.slug));
    }
    return data.map(normalize);
  } catch {
    return fallbackProducts.filter((p) => unique.includes(p.slug));
  }
}
