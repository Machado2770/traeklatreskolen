-- Adresse på tilmeldinger.
--
-- Tilføjer kolonnen "address" til participants, så deltagerens adresse gemmes
-- sammen med navn, email og telefon. Tom for tilmeldinger fra før adressen
-- blev et påkrævet felt.
--
-- Køres én gang i Supabase → SQL Editor. Sikker at køre igen: "if not exists".

alter table public.participants
  add column if not exists address text;

comment on column public.participants.address is
  'Deltagerens adresse (vej, nr., postnr. og by) fra tilmeldingsformularen. Tom for tilmeldinger fra foer adressen blev paakraevet.';
