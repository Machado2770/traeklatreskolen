-- Samtykke-dokumentation på tilmeldinger.
--
-- Tilføjer kolonnen "consent_at" til participants, så vi kan dokumentere
-- HVORNÅR en deltager accepterede privatlivspolitikken ved tilmelding. Tom for
-- tilmeldinger fra før samtykket blev registreret.
--
-- Køres én gang i Supabase → SQL Editor. Sikker at køre igen: "if not exists".

alter table public.participants
  add column if not exists consent_at timestamptz;

comment on column public.participants.consent_at is
  'Tidspunkt hvor deltageren accepterede privatlivspolitikken paa tilmeldingsformularen. Tom for tilmeldinger fra foer samtykke blev registreret.';
