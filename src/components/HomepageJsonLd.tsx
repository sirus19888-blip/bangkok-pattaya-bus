import type { LocaleCode } from "@/data/routes";
import {
  absoluteUrl,
  SITE_AUTHOR,
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

type HomepageJsonLdProps = {
  locale: LocaleCode;
};

export function HomepageJsonLd({ locale: _locale }: HomepageJsonLdProps) {
  const websiteId = `${SITE_URL}/#website`;
  const organizationId = `${SITE_URL}/#organization`;
  const personId = `${SITE_URL}/#person`;

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
        founder: {
          "@id": personId,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "editorial",
          email: SITE_EMAIL,
          url: absoluteUrl("/contact"),
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_AUTHOR,
        url: absoluteUrl("/about"),
        email: SITE_EMAIL,
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
