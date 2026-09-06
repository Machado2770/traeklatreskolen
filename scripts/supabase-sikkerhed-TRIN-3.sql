-- ============================================================================
--  TRIN 3 — fjern de seks "tillad alt"-politikker
--
--  Målt i SQL-editoren 6. sep. 2026: RLS ER slået til på alle fem tabeller
--  (trin 1 virkede), men der ligger seks politikker med USING = true og
--  WITH CHECK = true for rollen {public}. En politik der siger "true" for
--  public tillader alt for alle — også for den offentlige anon-nøgle.
--  Derfor havde RLS ingen effekt.
--
--  Værst: "service_only" på admins hedder noget betryggende, men er
--  cmd = ALL, roller = {public}, using = true, with_check = true.
--  Altså fuld læse- OG skriveadgang til admin-emails og password-hashes
--  for enhver med nøglen fra browser-bundtet.
--
--  Appen er upåvirket: al adgang sker server-side med service_role, som har
--  BYPASSRLS. Verificeret: lib/supabaseAdmin.js er den eneste Supabase-klient.
--
--  Denne gang uden DO-blok og temp-tabel — trin 2 brugte begge dele og tog
--  aldrig fat. Her er det seks helt almindelige DROP-sætninger.
-- ============================================================================

drop policy if exists "service_only"                     on public.admins;
drop policy if exists "public_read"                      on public.calendar_items;
drop policy if exists "service_write"                    on public.calendar_items;
drop policy if exists "public_read_c"                    on public.courses_cms;
drop policy if exists "service_write_c"                  on public.courses_cms;
drop policy if exists "Enable read access for all users" on public.participants;

revoke all on public.admins         from anon, authenticated;
revoke all on public.participants   from anon, authenticated;
revoke all on public.calendar_items from anon, authenticated;
revoke all on public.courses_cms    from anon, authenticated;
revoke all on public.shop_products  from anon, authenticated;

-- Resultat: denne skal være TOM. Er der rækker, er der politikker tilbage.
select tablename, policyname, cmd, roles::text
from   pg_policies
where  schemaname = 'public';
