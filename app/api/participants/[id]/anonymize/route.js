import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// Anonymiserer en tilmelding: fjerner personoplysninger (navn, email, telefon,
// bemærkninger) men bevarer rækken, så kursus, betalingsstatus og oprettelses-
// dato stadig tæller med i statistik og regnskab. Bruges når en deltager beder
// om at blive slettet, eller ved oprydning af gamle tilmeldinger — uden at
// ødelægge tallene. Alle indloggede admins kan anonymisere.
export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("participants")
    .update({
      name:  "Anonymiseret",
      email: "",
      phone: "",
      notes: "",
    })
    .eq("id", params.id)
    .select()
    .single();

  if (error) return Response.json({ error: "Anonymisering fejlede" }, { status: 500 });
  return Response.json({ ok: true, data });
}
