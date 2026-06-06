import { courses, experiences } from "@/lib/siteData";
import { products } from "@/lib/shopData";
import { SITE_URL as BASE } from "@/lib/siteConfig";

export default function sitemap() {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/organisationer`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/naturdannelse`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/kurser`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/oplevelser`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/kursuskalender`, priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE}/kontakt`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/om-os`,   priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/booking`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/shop`,    priority: 0.8, changeFrequency: "weekly" },
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

  const productPages = products.map((p) => ({
    url: `${BASE}/shop/${p.slug}`,
    priority: 0.6,
    changeFrequency: "weekly",
  }));

  return [...staticPages, ...coursePages, ...experiencePages, ...productPages];
}
