import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { courses, experiences } from "@/lib/siteData";

function normalize(item) {
  return {
    ...item,
    bookingHref:  item.booking_href  ?? item.bookingHref  ?? "",
    bookingValue: item.booking_value ?? item.bookingValue ?? item.title,
  };
}

// Merge siteData (base) med Supabase (override + tilføj nye).
// siteData-kurser er ALTID til stede — Supabase overstyrer pr. slug.
function merge(base, cmsData) {
  const cmsMap  = new Map((cmsData || []).map(c => [c.slug, normalize(c)]));
  const merged  = base.map(c => cmsMap.has(c.slug) ? cmsMap.get(c.slug) : c);
  const baseSlugs = new Set(base.map(c => c.slug));
  const extra   = (cmsData || []).filter(c => !baseSlugs.has(c.slug)).map(normalize);
  return [...merged, ...extra];
}

export async function getCourses() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("courses_cms")
      .select("*")
      .eq("is_experience", false)
      .order("sort_order", { ascending: true });
    if (error) { console.error("[getCourses]", error.message); return courses; }
    return merge(courses, data);
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
    return merge(experiences, data);
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
