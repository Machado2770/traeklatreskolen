# Opgradering til Next.js 15 — klargjort 6. september 2026

Alt er undersøgt og målt på forhånd. Denne fil er drejebogen: næste session
kan gå direkte i gang uden at skulle regne omfanget ud igen.

## Hvorfor

`next@14.2.35` er den **sidste** udgivelse i 14.x. Omkring 20 sikkerheds-
rådgivninger står åbne mod den — DoS, cache poisoning, SSRF og XSS i App
Router — og ingen af dem kan lukkes inden for major-versionen. `npm audit`
melder 2 high (next, postcss) og 2 moderate (uuid via exceljs).

Risikoen er reel, men afdæmpet: en stor del af DoS- og cache-punkterne
rammer primært selvhostede installationer, og sitet kører på Vercel, hvor
flere af dem afbødes i infrastrukturen. Ikke alle.

## Mål: `next@15.5.25`

Ikke 16. Begge lukker sårbarhederne, og begge understøttes af projektets
`next-auth` — men 15 er ét spring i stedet for to og har haft længere tid i
felten. 16 kan tages senere som en lille opdatering.

## Det store spørgsmål er allerede afklaret

Bekymringen var, at `next-auth` ville tvinge en migrering til Auth.js v5,
som stadig kun findes i beta (`5.0.0-beta.32`) efter flere år. **Det gør den
ikke.** `next-auth@4.24.15` angiver:

```
next:      ^12.2.5 || ^13 || ^14 || ^15 || ^16
react:     ^17.0.2 || ^18 || ^19
```

Projektet sidder på 4.24.7. Det er altså en almindelig patch-opdatering,
ikke en omskrivning af login-systemet.

React kan blive på 18.3.1 — Next 15 accepterer `^18.2.0 || ^19.0.0`. Lad
React ligge i denne omgang; ét skift ad gangen.

## Fremgangsmåde

**1. Gren først — aldrig direkte på `main`.**

```
git checkout -b next-15-opgradering
```

Vercel bygger automatisk en preview-URL for grenen. Hele testen foregår
dér, før noget rammer traeklatreskolen.dk.

**2. Opdatér pakkerne.**

```
npm i next@15.5.25 eslint-config-next@15.5.25 next-auth@4.24.15
```

**3. Kør codemod'en for asynkrone request-API'er.**

```
npx @next/codemod@latest next-async-request-api .
```

Den klarer størstedelen af de 17 steder nedenfor. Gennemgå diff'en bagefter
— codemod'en er god, men ikke ufejlbarlig.

**4. Ret resten manuelt.** `params` er nu et `Promise`. Mønsteret er:

```js
// før
export async function PATCH(request, { params }) {
  ... .eq("id", params.id)

// efter
export async function PATCH(request, { params }) {
  const { id } = await params;
  ... .eq("id", id)
```

## De 17 steder — 9 filer

| Fil | Steder |
|---|---|
| `app/api/admins/[id]/route.js` | PATCH, DELETE |
| `app/api/calendar/[id]/route.js` | PUT, PATCH, DELETE |
| `app/api/courses-cms/[id]/route.js` | PUT, PATCH, DELETE |
| `app/api/participants/[id]/route.js` | DELETE |
| `app/api/participants/[id]/anonymize/route.js` | POST |
| `app/api/participants/[id]/status/route.js` | PATCH |
| `app/kurser/[slug]/page.jsx` | generateMetadata, page |
| `app/oplevelser/[slug]/page.jsx` | generateMetadata, page |
| `app/shop/[slug]/page.jsx` | generateMetadata, page |

**Rammes ikke:** `new URL(request.url).searchParams` i `app/api/booking/route.js`
og `app/api/participants/export/route.js`. Den ændring gælder kun
`searchParams`-*prop'en* på sider, ikke URL-parsing. Lad dem være.

**Findes ikke i projektet** (de typiske smertepunkter): `cookies()`,
`headers()`, `draftMode()`, `next/font`, `@next/font`,
`runtime: "experimental-edge"`, `geo`/`ip` på `NextRequest`.

## Vær særligt opmærksom her

**Caching-defaults ændrede sig.** I Next 15 cacher `fetch` ikke længere som
standard, og GET-route-handlers cacher ikke automatisk. Det rører præcis
det område, hvor vi 6. sep. 2026 fandt, at `getCourseBySlug`,
`getExperienceBySlug`, `getProductBySlug` og `getProductsBySlugs` manglede
`noStore()` — se commit `7097a80`.

Efter opgraderingen bliver de `noStore()`-kald sandsynligvis overflødige.
**Fjern dem ikke.** De er harmløse, og de dokumenterer en fejl, der kostede
tid at finde. Verificér i stedet i praksis, at CMS-rettelser slår igennem
på detaljesiderne — antag det ikke.

**`next.config.js`** bruger `headers()` og `images.remotePatterns`. Begge
er uændrede i 15, men tjek at sikkerhedsheaderne stadig sættes efter build.

## Testplan

Kør efter build, mod preview-URL'en:

```
node scripts/verificer-sikkerhed.mjs
```

Det jeg kan måle udefra:

- Alle sider svarer 200 og viser priser hentet fra Supabase
- `/api/public-calendar` svarer med data
- Admin-endpoints svarer 401/403 uden login
- `/admin` omdirigerer til login
- Sikkerhedsheadere er intakte (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy)
- En rettelse i `courses_cms` slår igennem på `/kurser/[slug]` — cachefælden fra `7097a80`

**Det kun du kan teste** (kræver login på preview-URL'en):

- [ ] Log ind på `/admin` med `info@traeklatreskolen.dk`
- [ ] Ret et kursus i CMS'et og se ændringen på både oversigt og detaljeside
- [ ] Opret og slet en kalenderdato
- [ ] Upload et billede under Billeder
- [ ] Gennemfør en testtilmelding via `/booking`
- [ ] Læg en vare i kurven og gå til checkout

Først når alle punkter er grønne: merge til `main`.

## Hvis det går galt

```
git checkout main
```

Produktionen er urørt undervejs — alt sker på grenen, og Vercel bygger
`main` uafhængigt. Der er ingen databaseændringer i denne opgave, så der er
intet at rulle tilbage i Supabase.

## Tidsforbrug

| | |
|---|---|
| Opdatering + codemod + manuelle rettelser | ~30 min |
| Build- og runtime-fejl | ~30 min |
| Test | ~30 min |
| **I alt hvis intet overrasker** | **1½–2 timer** |

Går caching-adfærden imod forventning, kan det koste en time mere.

## Bagefter

- `npm audit` igen — `exceljs`/`uuid` (moderat) er stadig åben. `npm audit
  fix --force` nedgraderer exceljs til en breaking version, så lad den
  ligge, medmindre der findes en ikke-breaking sti. Den bruges kun af
  deltager-eksporten, som kræver admin-login.
- Overvej `next@16` som en lille opfølgning.
- Overvej en Content-Security-Policy. Sitet har de øvrige sikkerhedsheadere,
  men ingen CSP. Kræver omtanke pga. Google Analytics og inline styles.
