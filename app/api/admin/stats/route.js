export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();

  const { data: participants, error } = await supabase
    .from("participants")
    .select("id, course, payment_status, created_at")
    .order("created_at", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const now   = new Date();
  const total = participants.length;

  // Denne måned
  const thisMonth = participants.filter(p => {
    const d = new Date(p.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  // Status fordeling
  const paid      = participants.filter(p => p.payment_status === "paid").length;
  const pending   = participants.filter(p => p.payment_status === "pending").length;
  const cancelled = participants.filter(p => p.payment_status === "cancelled").length;

  // Tilmeldinger pr. måned — seneste 12 måneder
  const monthlyMap = {};
  for (let i = 11; i >= 0; i--) {
    const d   = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap[key] = { label: d.toLocaleString("da-DK", { month: "short", year: "2-digit" }), count: 0 };
  }
  participants.forEach(p => {
    const d   = new Date(p.created_at);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (monthlyMap[key]) monthlyMap[key].count++;
  });
  const monthly = Object.values(monthlyMap);

  // Mest populære kurser (top 8, kun kursusnavn uden dato/sted)
  const courseCount = {};
  participants.forEach(p => {
    if (p.payment_status === "cancelled") return;
    const name = (p.course || "Ukendt").split(" – ")[0];
    courseCount[name] = (courseCount[name] || 0) + 1;
  });
  const topCourses = Object.entries(courseCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  // Seneste 6 måneder — betalt vs. afventer
  const last6 = {};
  for (let i = 5; i >= 0; i--) {
    const d   = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    last6[key] = {
      label:   d.toLocaleString("da-DK", { month: "short" }),
      paid:    0,
      pending: 0,
    };
  }
  participants.forEach(p => {
    const d   = new Date(p.created_at);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!last6[key]) return;
    if (p.payment_status === "paid")    last6[key].paid++;
    if (p.payment_status === "pending") last6[key].pending++;
  });
  const paymentTrend = Object.values(last6);

  return Response.json({ total, thisMonth, paid, pending, cancelled, monthly, topCourses, paymentTrend });
}
