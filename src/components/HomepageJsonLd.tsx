import type { LocaleCode } from "@/data/routes";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

type HomepageJsonLdProps = {
  locale: LocaleCode;
};

export function HomepageJsonLd({ locale: _locale }: HomepageJsonLdProps) {
  const websiteId = `${SITE_URL}/#website`;
  const organizationId = `${SITE_URL}/#organization`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/icons/icon-brand.png"),
        },
      },
    ],
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
