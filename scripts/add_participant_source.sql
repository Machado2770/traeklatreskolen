-- Kilde-sporing på tilmeldinger.
--
-- Tilføjer kolonnen "source" til participants, så hver tilmelding husker hvor
-- den besøgende kom fra (facebook, instagram, google, direkte …). Vises på
-- /admin/statistik under "Tilmeldinger pr. kilde".
--
-- Køres én gang i Supabase → SQL Editor. Sikker at køre igen: alle trin er
-- "if not exists", og eksisterende tilmeldinger røres ikke.

alter table public.participants
  add column if not exists source text;

comment on column public.participants.source is
  'Hvor tilmeldingen kom fra: utm_source, fbclid/igshid eller referrer-domaene. Tom for tilmeldinger fra foer sporingen blev sat op.';

create index if not exists participants_source_idx
  on public.participants (source);
