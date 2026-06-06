# Billedstandard for shoppen

Standarden sikrer, at alle produktbilleder er flotte, klare og skarpe — også på
store skærme og mobil i høj opløsning.

## Kravene

| Krav | Standard |
|---|---|
| **Opløsning** | Mindst **1000 × 1000 px** (korteste side aldrig under 800 px) |
| **Format** | JPG til fotos, PNG til grafik/illustrationer |
| **Beskæring** | Kvadratisk eller tæt på (mellem 4:5 og 5:4) — produktet centreret |
| **Baggrund** | Ren hvid eller helt lys, ensartet baggrund (fritlagt er bedst) |
| **Udfyldning** | Produktet fylder 70–85 % af billedfladen |
| **Skarphed** | Knivskarpt i fuld størrelse — ingen opskalerede thumbnails |
| **Indhold** | Ingen vandmærker, logoer i hjørner, tekst eller prisskilte |
| **Filstørrelse** | Maks ca. 500 KB (Next.js optimerer selv videre) |
| **Filnavn** | Små bogstaver med bindestreger, identisk med varens slug: `petzl-grigri.jpg` |

Stemningsbilleder (udstyret i brug i trækronerne) er velkomne **som supplement**,
men hovedbilledet skal vise selve produktet.

## Sådan udskiftes et prøvebillede med et rigtigt foto

22 varer har i øjeblikket et autogenereret **prøvebillede** ("Nyt produktfoto er
på vej"). Når et rigtigt foto er klar:

1. Læg filen i `public/images/shop/<slug>.jpg` (følg kravene ovenfor)
2. Ret varens `image:`-felt i `lib/shopData.js` til den nye sti
3. Kør `node scripts/gen-shop-sql.mjs`
4. Kør den opdaterede `scripts/shop_products.sql` i Supabase SQL Editor

Prøvebillederne genereres med `node scripts/gen-proeve-billeder.mjs`
(listen over varer står øverst i scriptet — fjern slugs efterhånden som
rigtige fotos kommer på).

## Varer med prøvebillede (mangler nyt foto)

| Vare | Kategori |
|---|---|
| Millet Spelunca statisk reb — 60 m | Reb & liner |
| Black Diamond ATC-XP | Rebbremser & sikring |
| Faders HMS skruekarabin | Karabiner |
| Faders Petit Dru skruekarabin | Karabiner |
| Faders Oval 440 | Karabiner |
| Wild Country Synergy HMS | Karabiner |
| Faders Seven Step etrier | Slynger & stiger |
| Black Diamond Momentum DS | Seler |
| Wild Country Vision Kids | Seler |
| CAMP Classic Y — fuldkropssele | Seler |
| CAMP Rock Star | Hjelme |
| CAMP Armour | Hjelme |
| Klatresæk — lille | Tasker & opbevaring |
| Klatresæk — stor | Tasker & opbevaring |
| Kyllingeovn | Bål & lejrliv |
| Rundbrænder til lavvu | Bål & lejrliv |
| Frisport kaffekrog | Bål & lejrliv |
| Frisport tørrestativ | Bål & lejrliv |
| Bålpande | Bål & lejrliv |
| Bålgryde — støbejern | Bål & lejrliv |
| Lejrøkse | Bål & lejrliv |
| Vanddunk med hane | Bål & lejrliv |

## Næste prioritet (under standarden, men beholdt indtil videre)

Disse billeder er genkendelige og bruges fortsat, men ligger under standarden
og bør også udskiftes, når der tages nye fotos:

- Faders HMS twistlock (243 × 323 px)
- Faders Walker D-skruekarabin (240 × 324 px)
- Wild Country Titan II (200 × 347 px)
- Petzl Fixe rulle (290 × 421 px)
- Kernmantel prusiksnor (570 × 241 px)
- Tentipi teltbund (diagram, 510 × 157 px)
- Petzl Grigri / Ortlieb X-Tremer (350 × 350 px)
