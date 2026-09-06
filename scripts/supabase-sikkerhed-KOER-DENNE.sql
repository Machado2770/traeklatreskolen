-- ============================================================================
--  Træklatreskolen — samlet sikkerheds- og migrationskørsel
--  Lavet 6. september 2026. Kør ÉN gang i Supabase → SQL Editor → RUN.
--  Sikker at køre igen: alt er "if not exists" / idempotent.
--
--  Den samler tre ting, der har ligget og ventet:
--    DEL 1 — Slå Row Level Security til på de 5 tabeller (lukker anon-nøglen ude)
--    DEL 2 — Luk for anonym upload/sletning i billed-bucketen
--    DEL 3 — Tilføj kolonnerne participants.source og participants.consent_at
--
--  Hvorfor det haster: målt 6. sep. 2026 kunne den offentlige anon-nøgle
--  (som ligger i browser-bundtet og kan læses af enhver) læse ALLE tabeller
--  — inkl. admin-emails og adgangskode-hashes — samt uploade OG slette filer
--  i site-images.
--
--  Appen bliver ved med at virke: al databaseadgang sker server-side med
--  SUPABASE_SERVICE_ROLE_KEY, som pr. design går uden om RLS. Verificeret
--  6. sep. 2026: den eneste Supabase-klient i koden er lib/supabaseAdmin.js,
--  og ingen browser-komponent rører databasen direkte.
-- ============================================================================


-- ── DEL 1 — Row Level Security på tabellerne ────────────────────────────────
-- Ingen politikker oprettes med vilje. RLS slået til + nul politikker =
-- alt afvises for anon/authenticated. service_role har BYPASSRLS.

ALTER TABLE public.admins          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_items  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses_cms     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_products   ENABLE ROW LEVEL SECURITY;

-- FORCE gør at RLS også gælder tabel-ejeren, så den ikke kan omgås ved et uheld.
ALTER TABLE public.admins          FORCE ROW LEVEL SECURITY;
ALTER TABLE public.participants    FORCE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_items  FORCE ROW LEVEL SECURITY;
ALTER TABLE public.courses_cms     FORCE ROW LEVEL SECURITY;
ALTER TABLE public.shop_products   FORCE ROW LEVEL SECURITY;


-- ── DEL 2 — Billed-bucketen site-images ─────────────────────────────────────
-- Fjerner de eksisterende politikker på storage.objects (der findes kun én
-- bucket, site-images, så intet andet rammes) og lægger KUN en læse-politik
-- tilbage. Uden INSERT/UPDATE/DELETE-politik kan anon hverken uploade,
-- overskrive eller slette.
--
-- Admin-upload virker stadig: /api/upload/signed laver en signeret upload-URL
-- med service_role, og den er token-autoriseret uden om politikkerne.
-- Billederne på sitet vises stadig: bucketen er public, og filerne serveres
-- fra /storage/v1/object/public/... — læse-politikken nedenfor er et bælte
-- ud over selerne, så listning fra admin-galleriet også bliver ved at virke.

DO $$
DECLARE pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
  LOOP
    EXECUTE format('DROP POLICY %I ON storage.objects', pol.policyname);
  END LOOP;
END $$;

CREATE POLICY "offentlig laesning af site-images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'site-images');


-- ── DEL 3 — Manglende kolonner på participants ──────────────────────────────
-- source: hvor tilmeldingen kom fra (utm_source, fbclid/igshid, referrer).
--         Uden den er kortet "Tilmeldinger pr. kilde" på /admin/statistik tomt.
-- consent_at: hvornår deltageren accepterede privatlivspolitikken (GDPR-dok.).
-- Begge er tomme for tilmeldinger fra før sporingen blev sat op.

ALTER TABLE public.participants ADD COLUMN IF NOT EXISTS source     text;
ALTER TABLE public.participants ADD COLUMN IF NOT EXISTS consent_at timestamptz;

COMMENT ON COLUMN public.participants.source IS
  'Hvor tilmeldingen kom fra: utm_source, fbclid/igshid eller referrer-domaene. Tom for tilmeldinger fra foer sporingen blev sat op.';
COMMENT ON COLUMN public.participants.consent_at IS
  'Tidspunkt hvor deltageren accepterede privatlivspolitikken paa tilmeldingsformularen. Tom for tilmeldinger fra foer samtykke blev registreret.';

CREATE INDEX IF NOT EXISTS participants_source_idx ON public.participants (source);


-- ── Verifikation ────────────────────────────────────────────────────────────
-- rowsecurity skal være true for alle fem tabeller.
SELECT tablename, rowsecurity AS rls_slaaet_til
FROM   pg_tables
WHERE  schemaname = 'public'
  AND  tablename IN ('admins','participants','calendar_items','courses_cms','shop_products')
ORDER  BY tablename;

-- Der må kun stå ÉN politik tilbage, og den skal være SELECT.
SELECT policyname, cmd, roles
FROM   pg_policies
WHERE  schemaname = 'storage' AND tablename = 'objects';

-- Begge kolonner skal dukke op her.
SELECT column_name, data_type
FROM   information_schema.columns
WHERE  table_schema = 'public' AND table_name = 'participants'
  AND  column_name IN ('source','consent_at');
