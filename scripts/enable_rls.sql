-- ============================================================================
--  Træklatreskolen — luk databasen for offentligheden (Row Level Security)
-- ----------------------------------------------------------------------------
--  KØR DENNE I SUPABASE:  Dashboard → SQL Editor → indsæt → RUN.
--
--  Baggrund: den offentlige "anon key" ligger i browser-bundtet og kan læses
--  af enhver. Uden RLS gav den fuld læse/skrive/slette-adgang til ALLE tabeller
--  — inkl. admin-emails og adgangskode-hashes. Denne fil slår RLS til og opretter
--  INGEN politikker for anon/authenticated, hvilket effektivt lukker alt for
--  offentligheden.
--
--  Appen bliver ved med at virke: alle server-API'er tilgår databasen med
--  SUPABASE_SERVICE_ROLE_KEY, som pr. design GÅR UDEN OM RLS. Kun direkte kald
--  med den offentlige nøgle bliver blokeret — og det er præcis meningen.
--
--  Efter kørsel: verificér nederst, og ROTÉR derefter både anon- og
--  service_role-nøglen i Supabase (Settings → API → Roll keys), da den gamle
--  anon-nøgle har været eksponeret. Husk at opdatere nøglerne i Vercel bagefter.
-- ============================================================================

ALTER TABLE public.admins          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_items  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses_cms     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_products   ENABLE ROW LEVEL SECURITY;

-- (Valgfrit, men anbefalet) FORCE gør at RLS også gælder tabel-ejeren, så
-- ingen kan omgå den ved et uheld. service_role har BYPASSRLS og rammes ikke.
ALTER TABLE public.admins          FORCE ROW LEVEL SECURITY;
ALTER TABLE public.participants    FORCE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_items  FORCE ROW LEVEL SECURITY;
ALTER TABLE public.courses_cms     FORCE ROW LEVEL SECURITY;
ALTER TABLE public.shop_products   FORCE ROW LEVEL SECURITY;

-- Der oprettes MED VILJE ingen politikker. Med RLS slået til og nul politikker
-- afvises alle anon/authenticated-forespørgsler. Appen bruger service_role og
-- er upåvirket.
--
-- Skulle I senere få brug for at læse fx kalenderen direkte fra browseren
-- (det gør I ikke i dag — alt går via /api/public-calendar), kan I tilføje en
-- SNÆVER kun-læse-politik. Eksempel (LAD VÆRE med at køre medmindre nødvendigt):
--
--   CREATE POLICY "offentlig kan læse publicerede kurser"
--     ON public.courses_cms FOR SELECT TO anon
--     USING (is_published IS TRUE);

-- ── Verifikation ────────────────────────────────────────────────────────────
-- Kør denne bagefter: rowsecurity skal være 't' (true) for alle fem tabeller.
SELECT tablename, rowsecurity
FROM   pg_tables
WHERE  schemaname = 'public'
  AND  tablename IN ('admins','participants','calendar_items','courses_cms','shop_products')
ORDER  BY tablename;
