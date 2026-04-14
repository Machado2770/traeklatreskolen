import { courses, experiences } from "@/lib/siteData";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://traeklatreskolen.vercel.app";

export default function sitemap() {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/kurser`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/oplevelser`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/kursuskalender`, priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE}/kontakt`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/om-os`,   priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/booking`, priority: 0.8, changeFrequency: "monthly" },
  ];

  const coursePages = courses.map((c) => ({
    url: `${BASE}/kurser/${c.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const experiencePages = experiences.map((e) => ({
    url: `${BASE}/oplevelser/${e.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticPages, ...coursePages, ...experiencePages];
}
