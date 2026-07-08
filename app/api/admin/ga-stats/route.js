export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { gaConfigured, getGaStats } from "@/lib/gaData";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  // Nøglerne er ikke sat endnu → sig det pænt, så siden viser link-visningen.
  if (!gaConfigured()) {
    return Response.json({ configured: false });
  }

  try {
    const stats = await getGaStats();
    return Response.json(stats);
  } catch (e) {
    console.error("[ga-stats] Fejl ved kald til Google Analytics:", e?.message ?? e);
    return Response.json(
      { configured: true, error: "Kunne ikke hente data fra Google Analytics." },
      { status: 200 }
    );
  }
}
