// Genererer scripts/shop_products.sql ud fra lib/shopData.js, så SQL-seeden
// altid matcher fallback-kataloget. Kør: node scripts/gen-shop-sql.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const { products } = await import(new URL("../lib/shopData.js", import.meta.url));

const q = (s) => (s == null ? "null" : `'${String(s).replace(/'/g, "''")}'`);

// Varer der er taget ud af shoppen igen — slettes fra Supabase ved seed.
const RETIRED_SLUGS = [
  "softshell-jakke-logo", // internt arbejdstøj — se /admin/arbejdstoej
  "skaljakke-logo",       // internt arbejdstøj — se /admin/arbejdstoej
];

const rows = products
  .map((p, i) => {
    const bullets = q(JSON.stringify(p.bullets ?? []));
    const sizes = q(JSON.stringify(p.sizes ?? []));
    return `  (${q(p.slug)}, ${q(p.name)},\n   ${q(p.short)},\n   ${q(p.description)},\n   ${p.price}, ${q(p.category)}, ${p.stock ?? "null"}, ${q(p.image)},\n   ${bullets}::jsonb, ${sizes}::jsonb, ${i + 1})`;
  })
  .join(",\n");

const sql = `-- Webshop: produkttabel til klatre- og friluftsudstyr.
-- AUTOGENERERET fra lib/shopData.js — kør: node scripts/gen-shop-sql.mjs
-- Kør derefter denne fil i Supabase SQL Editor. Priser i hele kroner (DKK).
--
-- OBS: Priserne er estimerede vejledende priser og skal gennemgås,
-- før shoppen går live.

create table if not exists public.shop_products (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  short         text,
  description   text,
  price         numeric not null default 0,   -- hele kroner
  category      text,
  stock         integer,
  image         text,
  bullets       jsonb default '[]'::jsonb,
  sizes         jsonb default '[]'::jsonb,
  is_published  boolean default true,
  sort_order    integer default 0,
  created_at    timestamptz default now()
);

-- Sikr at sizes-kolonnen findes på eksisterende tabeller.
alter table public.shop_products add column if not exists sizes jsonb default '[]'::jsonb;

-- Tabellen tilgås kun server-side via service-role-nøglen, så RLS kan stå til.
alter table public.shop_products enable row level security;

-- Fjern de gamle eksempelvarer fra det første seed samt udgåede varer.
delete from public.shop_products where slug in (
  'klatresele-standard', 'dynamisk-reb-40m', 'hjelm-ventileret',
  'karabin-skruelaas-3pak', 'friluftsrygsaek-30l', 'klatrehandsker',
${RETIRED_SLUGS.map((s) => `  '${s}'`).join(",\n")}
);

-- Upsert hele kataloget. Kan køres igen — eksisterende varer opdateres.
insert into public.shop_products (slug, name, short, description, price, category, stock, image, bullets, sizes, sort_order)
values
${rows}
on conflict (slug) do update set
  name = excluded.name,
  short = excluded.short,
  description = excluded.description,
  price = excluded.price,
  category = excluded.category,
  stock = excluded.stock,
  image = excluded.image,
  bullets = excluded.bullets,
  sizes = excluded.sizes,
  sort_order = excluded.sort_order;
`;

writeFileSync(join(root, "scripts", "shop_products.sql"), sql, "utf8");
console.log(`Skrev scripts/shop_products.sql med ${products.length} varer.`);
