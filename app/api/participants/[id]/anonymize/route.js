import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { manglerKolonne } from "@/lib/participantSource";

// Anonymiserer en tilmelding: fjerner personoplysninger (navn, email, telefon,
// adresse, bemærkninger) men bevarer rækken, så kursus, betalingsstatus og oprettelses-
// dato stadig tæller med i statistik og regnskab. Bruges når en deltager beder
// om at blive slettet, eller ved oprydning af gamle tilmeldinger — uden at
// ødelægge tallene. Alle indloggede admins kan anonymisere.
export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const felter = {
    name:    "Anonymiseret",
    email:   "",
    phone:   "",
    address: "",
    notes:   "",
  };
  const anonymiser = (update) =>
    supabase.from("participants").update(update).eq("id", params.id).select().single();

  let { data, error } = await anonymiser(felter);

  // Er address-kolonnen ikke oprettet endnu (scripts/add_participant_address.sql),
  // anonymiseres resten alligevel.
  if (error && manglerKolonne(error)) {
    const { address, ...uden } = felter;
    ({ data, error } = await anonymiser(uden));
  }

  if (error) return Response.json({ error: "Anonymisering fejlede" }, { status: 500 });
  return Response.json({ ok: true, data });
}
