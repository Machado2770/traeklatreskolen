-- Webshop: produkttabel til klatre- og friluftsudstyr.
-- Kør i Supabase SQL Editor. Priser i hele kroner (DKK).

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
  is_published  boolean default true,
  sort_order    integer default 0,
  created_at    timestamptz default now()
);

-- Tabellen tilgås kun server-side via service-role-nøglen, så RLS kan stå til.
alter table public.shop_products enable row level security;

-- Seed med eksempelvarer (svarer til lib/shopData.js). Kør evt. kun én gang.
insert into public.shop_products (slug, name, short, description, price, category, stock, image, bullets, sort_order)
values
  ('klatresele-standard', 'Klatresele — Standard',
   'Komfortabel allround-klatresele til træklatring og friluftsbrug.',
   'En robust og komfortabel klatresele, der passer til både begyndere og erfarne. Justerbare benløkker og hoftebælte giver god pasform, og det polstrede design sikrer komfort under lange seancer i trækronerne.',
   749, 'Seler', 12, '/images/rebklatring.jpg',
   '["Justerbare ben- og hofteløkker","Polstret for komfort","CE-godkendt","Egnet til træklatring og friluftsliv"]'::jsonb, 1),
  ('dynamisk-reb-40m', 'Dynamisk klatrereb — 40 m',
   'Slidstærkt dynamisk reb til sikker klatring og rebarbejde.',
   'Et alsidigt dynamisk klatrereb på 40 meter med god håndtering og høj slidstyrke. Velegnet til både undervisning og avanceret rebarbejde i trækronerne.',
   1295, 'Reb', 8, '/images/rebklatring.jpg',
   '["40 meter længde","Dynamisk — absorberer fald","Slidstærk kappe","Tydelig midtmarkering"]'::jsonb, 2),
  ('hjelm-ventileret', 'Klatrehjelm — ventileret',
   'Letvægtshjelm med god ventilation og justerbar pasform.',
   'En let og velventileret klatrehjelm, der beskytter mod fald og nedfaldende grene. Justerbar i størrelsen og med plads til pandelampe.',
   449, 'Hjelme', 20, '/images/gallery-side-2.jpg',
   '["Letvægt og god ventilation","Justerbar pasform","Holdere til pandelampe","CE-godkendt"]'::jsonb, 3),
  ('karabin-skruelaas-3pak', 'Skruekarabiner — 3-pak',
   'Sikre HMS-karabiner med skruelås til klatresystemer.',
   'Tre stærke HMS-karabiner med skruelås — et must i ethvert klatresystem. Stor åbning og glat funktion for nem håndtering med handsker.',
   299, 'Karabiner', 30, '/images/gallery-side-1.jpg',
   '["3 stk. HMS-karabiner","Skruelås for ekstra sikkerhed","Stor åbning","CE-godkendt"]'::jsonb, 4),
  ('friluftsrygsaek-30l', 'Friluftsrygsæk — 30 L',
   'Robust dagsrygsæk til ture i skov og natur.',
   'En slidstærk 30-liters rygsæk med god rygkomfort og masser af lommer til udstyr. Perfekt til friluftsture, kurser og en dag i trækronerne.',
   599, 'Friluft', 15, '/images/overnatning-koeje.jpg',
   '["30 liters volumen","Polstret ryg og remme","Vandafvisende materiale","Flere rum og lommer"]'::jsonb, 5),
  ('klatrehandsker', 'Klatrehandsker',
   'Slidstærke handsker med godt greb til rebarbejde.',
   'Beskyt hænderne under rebarbejde og klatring. Slidstærkt materiale i håndfladen og åndbart på oversiden for komfort hele dagen.',
   199, 'Tilbehør', 25, '/images/gallery-main.jpg',
   '["Forstærket håndflade","Godt greb om rebet","Åndbart materiale","Fås i flere størrelser"]'::jsonb, 6)
on conflict (slug) do nothing;
