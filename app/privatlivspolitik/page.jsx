import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CVR } from "@/lib/siteConfig";

export const metadata = {
  title: "Privatlivspolitik – Træklatreskolen",
  description:
    "Sådan behandler og beskytter Træklatreskolen dine personoplysninger, når du tilmelder dig et kursus eller handler i shoppen.",
  alternates: { canonical: "/privatlivspolitik" },
};

// Sidst opdateret — ret datoen når politikken ændres væsentligt.
const OPDATERET = "11. august 2026";

export default function PrivatlivspolitikPage() {
  return (
    <main style={page}>
      <div style={inner}>
        <h1 style={h1}>Privatlivspolitik</h1>
        <p style={updated}>Sidst opdateret: {OPDATERET}</p>

        <p style={lead}>
          Træklatreskolen passer på de oplysninger, du giver os. Her kan du læse,
          hvilke personoplysninger vi indsamler, hvorfor, hvor længe vi gemmer
          dem, og hvilke rettigheder du har.
        </p>

        <Section title="1. Dataansvarlig">
          <p style={p}>
            Træklatreskolen er dataansvarlig for behandlingen af dine
            personoplysninger. Du er altid velkommen til at kontakte os:
          </p>
          <ul style={ul}>
            <li>Træklatreskolen</li>
            <li>Ingstrup Allé 17, 2770 Kastrup</li>
            <li>CVR: {CVR}</li>
            <li>E-mail: <a style={a} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li>Telefon: {CONTACT_PHONE_DISPLAY}</li>
          </ul>
        </Section>

        <Section title="2. Hvilke oplysninger vi indsamler">
          <p style={p}>Når du <strong>tilmelder dig et kursus</strong>, indsamler vi:</p>
          <ul style={ul}>
            <li>Navn</li>
            <li>E-mailadresse</li>
            <li>Telefonnummer</li>
            <li>Hvilket kursus/oplevelse du tilmelder dig (samt dato og sted)</li>
            <li>Eventuelle bemærkninger, du selv skriver i formularen</li>
            <li>En marketing-kilde (fx “facebook” eller “google”) — uden cookies eller ID’er, der kan følge dig på tværs af hjemmesider</li>
          </ul>
          <p style={p}>Når du <strong>bestiller varer med faktura</strong> i shoppen, indsamler vi desuden:</p>
          <ul style={ul}>
            <li>Organisation, CVR- og EAN-nummer samt adresse (til fakturering)</li>
          </ul>
          <p style={noteP}>
            Skriv venligst <strong>ikke</strong> følsomme helbredsoplysninger i
            bemærkningsfeltet. Har du særlige behov, må du gerne kontakte os
            direkte, så håndterer vi det fortroligt.
          </p>
        </Section>

        <Section title="3. Formål og retsgrundlag">
          <ul style={ul}>
            <li>
              <strong>Gennemføre din tilmelding og levere kurset</strong> — behandlingen er
              nødvendig for at opfylde aftalen med dig (databeskyttelsesforordningens
              artikel 6, stk. 1, litra b).
            </li>
            <li>
              <strong>Sende dig bekræftelse og faktura</strong> — samme grundlag som ovenfor.
            </li>
            <li>
              <strong>Bogføring og regnskab</strong> — vi er forpligtet til at gemme
              bilag efter bogføringsloven (artikel 6, stk. 1, litra c).
            </li>
            <li>
              <strong>Overordnet statistik</strong> over tilmeldinger og kilder — vores
              legitime interesse i at forbedre og målrette vores tilbud (artikel 6,
              stk. 1, litra f). Statistikken bygger på anonymiserede/aggregerede tal.
            </li>
          </ul>
        </Section>

        <Section title="4. Hvor længe vi gemmer dine oplysninger">
          <ul style={ul}>
            <li>
              <strong>Tilmeldinger med betaling</strong> gemmes som led i regnskabet i
              op til 5 år efter udløbet af det regnskabsår, aftalen vedrører,
              jf. bogføringsloven.
            </li>
            <li>
              <strong>Tilmeldinger uden betaling</strong> (afmeldte eller ikke-gennemførte)
              slettes eller anonymiseres, når de ikke længere er relevante.
            </li>
          </ul>
        </Section>

        <Section title="5. Hvem vi deler oplysninger med">
          <p style={p}>
            Vi sælger aldrig dine oplysninger. Vi bruger enkelte betroede
            databehandlere til at drive hjemmesiden, og de behandler kun data på
            vores instruks og i henhold til en databehandleraftale:
          </p>
          <ul style={ul}>
            <li><strong>Supabase</strong> — sikker database, hvor tilmeldinger gemmes.</li>
            <li><strong>Resend</strong> — udsendelse af bekræftelses- og faktura-e-mails.</li>
            <li><strong>Stripe</strong> — betalingsafvikling i webshoppen (vi ser aldrig dine fulde kortoplysninger).</li>
            <li><strong>Vercel</strong> — hosting af hjemmesiden.</li>
          </ul>
          <p style={p}>
            Nogle af disse leverandører kan behandle data uden for EU/EØS. Sker
            det, er overførslen beskyttet af EU-Kommissionens standardkontrakt­bestemmelser
            (SCC) eller et tilsvarende gyldigt overførselsgrundlag.
          </p>
        </Section>

        <Section title="6. Sikkerhed">
          <p style={p}>
            Dine oplysninger sendes altid krypteret (HTTPS) og opbevares krypteret.
            Adgang til deltagerlister kræver login, og kun betroede medarbejdere har
            adgang. Vi begrænser løbende, hvem der kan se og udtrække oplysninger.
          </p>
        </Section>

        <Section title="7. Dine rettigheder">
          <p style={p}>Efter databeskyttelsesreglerne har du ret til at:</p>
          <ul style={ul}>
            <li>få indsigt i, hvilke oplysninger vi har om dig</li>
            <li>få rettet forkerte oplysninger</li>
            <li>få slettet dine oplysninger (“retten til at blive glemt”), medmindre vi er forpligtet til at gemme dem</li>
            <li>gøre indsigelse mod eller begrænse behandlingen</li>
            <li>få udleveret dine oplysninger (dataportabilitet)</li>
          </ul>
          <p style={p}>
            Vil du gøre brug af dine rettigheder, så skriv til{" "}
            <a style={a} href="mailto:info@traeklatreskolen.dk">info@traeklatreskolen.dk</a>.
            Vi svarer hurtigst muligt og senest inden for en måned.
          </p>
        </Section>

        <Section title="8. Klage">
          <p style={p}>
            Er du utilfreds med, hvordan vi behandler dine oplysninger, kan du klage
            til Datatilsynet, Carl Jacobsens Vej 35, 2500 Valby —{" "}
            <a style={a} href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer">datatilsynet.dk</a>.
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginTop: 34 }}>
      <h2 style={h2}>{title}</h2>
      {children}
    </section>
  );
}

/* STYLES — matcher øvrige indholdssider */
const page = { background: "#f5f7f6", minHeight: "100vh", padding: "48px 24px 80px" };
const inner = { maxWidth: 760, margin: "0 auto" };
const h1 = { color: "#1f3a2b", fontSize: 36, fontWeight: 800, margin: "0 0 8px" };
const h2 = { color: "#1f3a2b", fontSize: 21, fontWeight: 700, margin: "0 0 10px" };
const updated = { color: "#7a8a80", fontSize: 14, margin: "0 0 24px" };
const lead = { color: "#33463a", fontSize: 17, lineHeight: 1.7, margin: 0 };
const p = { color: "#33463a", fontSize: 15.5, lineHeight: 1.75, margin: "0 0 10px" };
const noteP = { color: "#7a4d08", fontSize: 15, lineHeight: 1.7, margin: "10px 0 0", background: "#f7eddc", borderRadius: 10, padding: "12px 16px" };
const ul = { color: "#33463a", fontSize: 15.5, lineHeight: 1.8, margin: "0 0 10px", paddingLeft: 22 };
const a = { color: "#d8782f", fontWeight: 600, textDecoration: "none" };
