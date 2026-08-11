# Supabase-sikkerhed — trin-for-trin guide

Denne guide lukker det kritiske sikkerhedshul (databasen er åben for den
offentlige nøgle) og kører de manglende migrationer. Følg trinnene i rækkefølge.
Regn med ca. 20-30 minutter. Alt gøres i Supabase-dashboardet + Vercel — intet
skal ændres i koden.

> ⚠️ **Vigtigst:** Trin 1-3 lukker hullet hvor hvem som helst kan læse admin-
> adgangskoder og deltagerdata. Prioritér dem.

---

## Før du går i gang

- Log ind på **Supabase**: https://supabase.com/dashboard → vælg projektet
  `traeklatreskolen` (ref: `ighjiiafidndwvaowmdc`).
- Log ind på **Vercel**: https://vercel.com → projektet `traeklatreskolen`.
- Tag evt. en backup: Supabase → **Database → Backups** (betalte planer) eller
  eksportér deltagerlisten fra `/admin` først.

---

## Trin 1 — Slå Row Level Security (RLS) til

Dette er den vigtigste handling. Uden RLS giver den offentlige "anon"-nøgle
(som ligger i browseren) fuld læse/skrive/slette-adgang til alle tabeller.

1. Åbn Supabase → **SQL Editor** → **New query**.
2. Åbn filen `scripts/enable_rls.sql` fra projektet, kopiér **hele** indholdet
   ind i editoren.
3. Klik **Run** (eller Ctrl/Cmd+Enter).
4. Nederst kører en verifikation. Tjek at `rowsecurity` er `true` for alle fem
   tabeller:

   | tablename | rowsecurity |
   |-----------|-------------|
   | admins | **true** |
   | calendar_items | **true** |
   | courses_cms | **true** |
   | participants | **true** |
   | shop_products | **true** |

**Hvorfor virker siden stadig?** App'ens server-API'er bruger `service_role`-
nøglen, som pr. design går uden om RLS. Kun direkte kald med den offentlige
nøgle bliver blokeret — præcis det vi vil.

---

## Trin 2 — Bekræft at hullet er lukket

Test at den offentlige nøgle ikke længere kan læse admin-data.

1. Supabase → **Project Settings → API** → kopiér **anon public**-nøglen.
2. Åbn en terminal og kør (indsæt nøglen i stedet for `DIN_ANON_NOEGLE`):

   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" \
     "https://ighjiiafidndwvaowmdc.supabase.co/rest/v1/admins?select=id" \
     -H "apikey: DIN_ANON_NOEGLE" \
     -H "Authorization: Bearer DIN_ANON_NOEGLE"
   ```

3. **Forventet resultat: `401` eller `403`** (adgang nægtet). Får du stadig
   `200`, gik trin 1 galt — kør SQL'en igen og tjek verifikationstabellen.

*(Sig til, så kan jeg køre denne test for dig efter du har kørt SQL'en.)*

---

## Trin 3 — Rotér nøglerne

Den gamle anon-nøgle har været eksponeret uden beskyttelse, så den bør skiftes.

1. Supabase → **Project Settings → API**.
2. Under **Project API keys** → klik **Roll** / **Reveal & regenerate** på:
   - `anon` `public`
   - `service_role` `secret`
3. Kopiér de **nye** værdier.
4. Gå til **Vercel → projektet → Settings → Environment Variables** og opdatér:
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → ny anon-nøgle
   - `SUPABASE_SERVICE_ROLE_KEY` → ny service_role-nøgle
5. **Redeploy** i Vercel (Deployments → seneste → ⋯ → Redeploy), så de nye
   nøgler træder i kraft.
6. Opdatér også din lokale `.env.local`, hvis du kører projektet lokalt.

---

## Trin 4 — Kør de manglende migrationer

Tre SQL-filer skal køres én gang hver. Alle er "if not exists" — sikre at køre igen.
Supabase → **SQL Editor** → indsæt indholdet → **Run**:

1. `scripts/add_participant_source.sql` — kilde-sporing (facebook/google/…).
2. `scripts/add_participant_consent.sql` — samtykke-tidsstempel pr. tilmelding.
3. Tjek også at disse kolonner findes på dine tabeller (nævnt i koden):
   - `calendar_items.is_published` (boolean)
   - `courses_cms.is_published` (boolean)
   - `shop_products.is_published` (boolean)

   Findes de ikke, så kør:
   ```sql
   alter table public.calendar_items add column if not exists is_published boolean default false;
   alter table public.courses_cms    add column if not exists is_published boolean default false;
   alter table public.shop_products  add column if not exists is_published boolean default false;
   ```

---

## Trin 5 — Sikkerhed på lageret (Storage)

Billed-bucket'en `site-images` bruges til offentlige billeder, men uploads skal
være beskyttet.

1. Supabase → **Storage → site-images → Configuration**.
2. Sæt bucket til **Public** for *læsning* (billeder skal kunne vises på siden).
3. Sørg for at der **ikke** findes politikker der tillader `INSERT`/`UPDATE`/
   `DELETE` for rollen `anon`. App'ens upload-ruter bruger `service_role` og
   kræver admin-login, så offentlig skrive-adgang skal være slået fra.

---

## Trin 6 — Ryd op i hemmeligheder og adgange

- **Slet filen** `app/api/participants/export/.env.local` fra projektmappen
  (den indeholder en gammel service-nøgle; den er git-ignoreret, men bør væk).
- Bekræft at `ADMIN_USERNAME` og `ADMIN_PASSWORD` **ikke** er sat i Vercel-
  produktion (standardværdien `admin`/`adminclimb` ville være en bagdør). Er de
  sat, så fjern dem eller giv dem en stærk værdi.
- Sørg for at indbakken **info@traeklatreskolen.dk** har 2-faktor-login og en
  stærk adgangskode — den modtager mails med deltagernes fulde oplysninger.
- Underskriv databehandleraftaler (DPA) hos **Supabase** og **Resend** (findes i
  deres dashboards under Legal/Security).

---

## Tjekliste

- [ ] Trin 1: RLS slået til — verifikationstabel viser `true` × 5
- [ ] Trin 2: `curl`-test giver 401/403 på `admins`
- [ ] Trin 3: anon + service_role roteret og opdateret i Vercel + redeploy
- [ ] Trin 4: `source`- og `consent_at`-migrationer kørt + `is_published`-kolonner findes
- [ ] Trin 5: Storage tillader ikke anonym skrivning
- [ ] Trin 6: gammel `.env.local` slettet, admin-defaults ude af prod, DPA'er på plads

Når trin 1-3 er grønne, er den kritiske risiko lukket.
