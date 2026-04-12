import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { courses, experiences } from "@/lib/siteData";

function normalize(item) {
  return {
    ...item,
    bookingHref:  item.booking_href  ?? item.bookingHref  ?? "",
    bookingValue: item.booking_value ?? item.bookingValue ?? item.title,
  };
}

// Supabase er kilden til sandhed når den har data.
// Kun ved helt tom tabel bruges siteData som nødbackup.
export async function getCourses() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("courses_cms")
      .select("*")
      .eq("is_experience", false)
      .order("sort_order", { ascending: true });
    if (error) { console.error("[getCourses]", error.message); return courses; }
    if (!data?.length) return courses;
    return data.map(normalize);
  } catch (e) {
    console.error("[getCourses] exception:", e?.message ?? e);
    return courses;
  }
}

export async function getExperiences() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("courses_cms")
      .select("*")
      .eq("is_experience", true)
      .order("sort_order", { ascending: true });
    if (error) { console.error("[getExperiences]", error.message); return experiences; }
    if (!data?.length) return experiences;
    return data.map(normalize);
  } catch (e) {
    console.error("[getExperiences] exception:", e?.message ?? e);
    return experiences;
  }
}

export async function getCourseBySlug(slug) {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("courses_cms")
      .select("*")
      .eq("slug", slug)
      .eq("is_experience", false)
      .maybeSingle();
    if (error || !data) return courses.find(c => c.slug === slug) ?? null;
    return normalize(data);
  } catch {
    return courses.find(c => c.slug === slug) ?? null;
  }
}

export async function getExperienceBySlug(slug) {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("courses_cms")
      .select("*")
      .eq("slug", slug)
      .eq("is_experience", true)
      .maybeSingle();
    if (error || !data) return experiences.find(e => e.slug === slug) ?? null;
    return normalize(data);
  } catch {
    return experiences.find(e => e.slug === slug) ?? null;
  }
}
