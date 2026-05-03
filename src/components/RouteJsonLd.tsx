import type { FAQItem } from "@/data/faqs";
import type { LocaleCode, RoutePage } from "@/data/routes";
import type { Schedule } from "@/data/schedules";

type RouteJsonLdProps = {
  faqs: FAQItem[];
  locale: LocaleCode;
  routePage: RoutePage;
  schedule: Schedule;
};

const siteUrl = "https://bangkok-pattaya-bus.vercel.app";
const siteName = "Bangkok Pattaya Bus Guide";

function routeUrl(locale: LocaleCode, slug: string) {
  return new URL(`/${locale}/${slug}`, siteUrl).toString();
}

export function RouteJsonLd({
  faqs,
  locale,
  routePage,
  schedule,
}: RouteJsonLdProps) {
  const canonicalUrl = routeUrl(locale, routePage.slug);
  const websiteId = `${siteUrl}/#website`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const webpageId = `${canonicalUrl}#webpage`;
  const tripId = `${canonicalUrl}#trip`;
  const faqId = `${canonicalUrl}#faq`;

  const graph = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteName,
      url: siteUrl,
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      name: routePage.metadata.title,
      description: routePage.metadata.description,
      url: canonicalUrl,
      inLanguage: locale,
      isPartOf: {
        "@id": websiteId,
      },
      breadcrumb: {
        "@id": breadcrumbId,
      },
      mainEntity: {
        "@id": tripId,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: routePage.title,
          item: canonicalUrl,
        },
      ],
    },
    {
      "@type": "TouristTrip",
      "@id": tripId,
      name: routePage.title,
      description: routePage.intro,
      touristType: "Tourists",
      itinerary: {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: `${routePage.from} to ${routePage.to}`,
          },
        ],
      },
      isBasedOn: {
        "@type": "CreativeWork",
        name: schedule.sourceName,
        url: schedule.sourceUrl,
      },
    },
    faqs.length > 0
      ? {
          "@type": "FAQPage",
          "@id": faqId,
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null,
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
