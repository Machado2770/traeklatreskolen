// JSON-LD-byggere (schema.org). Holdes ét sted, så al struktureret data
// bruger samme domæne og kontaktinfo fra siteConfig.

import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CVR,
  AREA_SERVED,
  sameAs,
  absUrl,
} from "@/lib/siteConfig";

const ORG_ID = `${SITE_URL}/#org`;

// "1.900 kr." / "650 kr. pr. person" -> 1900 / 650
export function parsePrice(price) {
  if (typeof price === "number") return price;
  const digits = String(price ?? "").replace(/[^\d]/g, "");
  return digits ? Number(digits) : undefined;
}

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absUrl("/logo/logo-main.png"),
    image: absUrl("/images/hero-forest.jpg"),
    email: CONTACT_EMAIL,
    ...(CONTACT_PHONE ? { telephone: CONTACT_PHONE } : {}),
    ...(CVR ? { vatID: `DK${CVR}`, taxID: CVR } : {}),
    description: SITE_DESCRIPTION,
    areaServed: "DK",
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "da-DK",
    publisher: { "@id": ORG_ID },
  };
}

export function localBusinessLd() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    image: absUrl("/images/hero-forest.jpg"),
    description:
      "Kurser og oplevelser i træklatring — begyndere, instruktører og oplevelsesture i trækronerne.",
    email: CONTACT_EMAIL,
    ...(CONTACT_PHONE ? { telephone: CONTACT_PHONE } : {}),
    areaServed: AREA_SERVED.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    priceRange: "$$",
    ...(sameAs.length ? { sameAs } : {}),
  };
}

// Brødkrummesti. items: [{ name, path }]
export function breadcrumbLd(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

// Kursus -> schema.org/Course
export function courseLd(item, path) {
  const price = parsePrice(item.price);
  return {
    "@type": "Course",
    name: item.title,
    description: item.short || item.description,
    url: absUrl(path),
    ...(item.image ? { image: item.image } : {}),
    provider: { "@id": ORG_ID },
    inLanguage: "da-DK",
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "DKK",
            category: "Kursus",
            availability: "https://schema.org/InStock",
            url: absUrl(path),
          },
        }
      : {}),
  };
}

// Oplevelse -> schema.org/Product (med tilbud)
export function experienceLd(item, path) {
  const price = parsePrice(item.price);
  return {
    "@type": "Product",
    name: item.title,
    description: item.short || item.description,
    url: absUrl(path),
    ...(item.image ? { image: item.image } : {}),
    brand: { "@id": ORG_ID },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "DKK",
            availability: "https://schema.org/InStock",
            url: absUrl(path),
          },
        }
      : {}),
  };
}

// Shop-vare -> schema.org/Product (med tilbud + lagerstatus)
export function productLd(p, path) {
  const inStock = p.stock == null || p.stock > 0;
  return {
    "@type": "Product",
    name: p.name,
    description: p.short || p.description,
    url: absUrl(path),
    ...(p.image ? { image: absUrl(p.image) } : {}),
    ...(p.slug ? { sku: p.slug } : {}),
    ...(p.category ? { category: p.category } : {}),
    ...(p.brand ? { brand: { "@type": "Brand", name: p.brand } } : {}),
    offers: {
      "@type": "Offer",
      price: parsePrice(p.price),
      priceCurrency: "DKK",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url: absUrl(path),
      seller: { "@id": ORG_ID },
    },
  };
}

// Kalenderpost -> schema.org/Event
export function eventLd(item) {
  return {
    "@type": "Event",
    name: item.title,
    ...(item.startDate ? { startDate: item.startDate } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: item.place,
      address: { "@type": "PostalAddress", addressRegion: item.place, addressCountry: "DK" },
    },
    organizer: { "@id": ORG_ID },
    ...(item.href ? { url: absUrl(item.href) } : {}),
  };
}

// FAQ -> schema.org/FAQPage. items: [{ q, a }]
export function faqLd(items) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

// Pak en eller flere noder i en @graph med fælles @context.
export function graph(...nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.flat().filter(Boolean),
  };
}

// Render-hjælper: returnerer props til <script type="application/ld+json">
export function jsonLdScript(data) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
