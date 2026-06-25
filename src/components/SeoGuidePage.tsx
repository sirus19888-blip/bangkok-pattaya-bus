import Link from "next/link";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { getRoutePage } from "@/data/routes";
import type { LocaleCode } from "@/data/routes";
import type { SeoGuide } from "@/data/seoGuides";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import { build12GoRouteUrl, getAffiliateRoute } from "@/lib/twelveGo";

function guideUrl(slug: string, locale: LocaleCode) {
  return absoluteUrl(`/${locale}/${slug}`);
}

function localizeInternalHref(href: string, locale: LocaleCode) {
  return href.startsWith("/en/") ? `/${locale}/${href.slice(4)}` : href;
}

export function SeoGuidePage({ guide, locale = "en" }: { guide: SeoGuide; locale?: LocaleCode }) {
  const routePage = getRoutePage(guide.routeId);
  const ctaPosition = guide.ctaPosition ?? "route_commercial_help";
  const affiliateRoute = getAffiliateRoute(guide.routeId, locale);
  const affiliateHref = build12GoRouteUrl(
    guide.routeId,
    locale,
    ctaPosition,
    guide.ctaSubId,
  );
  const affiliateSubId =
    guide.ctaSubId ??
    (affiliateRoute ? `${affiliateRoute.subId}-${ctaPosition}` : undefined);

  if (!routePage) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f7f0e3] px-4 py-8 text-[#13233a]">
      <GuideJsonLd guide={guide} locale={locale} />

      <article className="mx-auto max-w-4xl">
        <nav className="flex flex-wrap items-center gap-1 text-sm font-black text-[#0e7b6b]">
          <Link className="inline-flex min-h-11 items-center rounded-lg px-2" href="/">
            Home
          </Link>
          <span className="px-2 text-[#8a94a3]">/</span>
          <Link className="inline-flex min-h-11 items-center rounded-lg px-2" href={`/${locale}`}>
            Routes
          </Link>
          <span className="px-2 text-[#8a94a3]">/</span>
          <Link
            className="inline-flex min-h-11 items-center rounded-lg px-2"
            href={`/${locale}/${routePage.slug}`}
          >
            {routePage.title}
          </Link>
        </nav>

        <header className="mt-5 rounded-[1.75rem] border border-[#eadcc7] bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8a5b12]">
            Practical travel guide
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
            {guide.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-[#4f5d6c]">
            {guide.intro}
          </p>
          <p className="mt-4 text-sm font-black text-[#0e7b6b]">
            Last updated: {guide.lastUpdated}
          </p>
        </header>

        {guide.shortAnswer ? (
          <section className="mt-6 rounded-[1.5rem] border border-[#e8b05a] bg-[#fff8ec] p-5 shadow-sm">
            <h2 className="text-xl font-black leading-tight">Short answer</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#4f5d6c]">
              {guide.shortAnswer}
            </p>
          </section>
        ) : null}

        <section className="mt-6 rounded-[1.5rem] border border-[#c8dbe9] bg-[#eaf5fb] p-5">
          <h2 className="text-2xl font-black">Quick facts</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {guide.keyPoints.map((point) => (
              <li
                className="rounded-2xl border border-[#c8dbe9] bg-white p-4 text-sm font-semibold leading-6 text-[#4f5d6c]"
                key={point}
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            {guide.sections.map((section) => (
              <section
                className="rounded-[1.5rem] border border-[#eadcc7] bg-white p-5 shadow-sm md:p-6"
                key={section.title}
              >
                <h2 className="text-2xl font-black leading-tight">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm font-semibold leading-7 text-[#4f5d6c]">
                  {section.body}
                </p>
              </section>
            ))}

            <section className="rounded-[1.5rem] border border-[#eadcc7] bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-2xl font-black leading-tight">
                Related route: {routePage.title}
              </h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
                Use the route page for current departure times, station details,
                fare notes and source status before you travel.
              </p>
              <Link
                className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#13233a] px-5 text-sm font-black text-white"
                href={`/${locale}/${routePage.slug}`}
              >
                {guide.routeLinkLabel}
              </Link>
            </section>

            {guide.internalLinks ? (
              <section className="rounded-[1.5rem] border border-[#eadcc7] bg-white p-5 shadow-sm md:p-6">
                <h2 className="text-2xl font-black leading-tight">
                  Useful links
                </h2>
                <ul className="mt-4 grid gap-3 md:grid-cols-3">
                  {guide.internalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="block h-full rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-4 transition hover:border-[#e8b05a]"
                        href={localizeInternalHref(link.href, locale)}
                      >
                        <span className="block text-sm font-black text-[#13233a]">
                          {link.label}
                        </span>
                        <span className="mt-2 block text-xs font-semibold leading-5 text-[#5f6874]">
                          {link.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="rounded-[1.5rem] border border-[#eadcc7] bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-2xl font-black leading-tight">FAQ</h2>
              <div className="mt-4 space-y-3">
                {guide.faq.map((faq) => (
                  <details
                    className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-4"
                    key={faq.question}
                  >
                    <summary className="flex min-h-11 cursor-pointer list-none items-center text-base font-black [&::-webkit-details-marker]:hidden">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-[#eadcc7] bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-2xl font-black leading-tight">
                Sources and last checked
              </h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
                Last checked: {guide.lastUpdated}. Always confirm at the station
                or with the operator before travel.
              </p>
              <ul className="mt-4 space-y-3">
                {guide.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      className="inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-black text-[#0e7b6b] underline-offset-4 hover:underline"
                      href={localizeInternalHref(source.url, locale)}
                      rel={
                        source.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      target={
                        source.url.startsWith("http") ? "_blank" : undefined
                      }
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="h-fit rounded-[1.5rem] border border-[#eadcc7] bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8a5b12]">
              Booking options
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight">
              Compare tickets and alternatives
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
              Timetable information stays independent. Booking links help you
              compare live seats and available alternatives before going to the
              station.
            </p>
            <AffiliateCTA
              ctaPosition={ctaPosition}
              disclosureText="Some booking links may be affiliate links. Timetable information stays independent."
              href={affiliateHref}
              label={guide.ctaLabel}
              lang="en"
              provider="12go"
              routeId={guide.routeId}
              from={affiliateRoute?.from ?? ""}
              shortDisclosureText="Affiliate link"
              subId={affiliateSubId}
              to={affiliateRoute?.to ?? ""}
              variant="afterSchedule"
            />
          </div>
        </div>
      </article>
    </main>
  );
}

function GuideJsonLd({ guide, locale }: { guide: SeoGuide; locale: LocaleCode }) {
  const canonicalUrl = guideUrl(guide.slug, locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.h1,
        description: guide.description,
        url: canonicalUrl,
        inLanguage: "en",
        dateModified: guide.lastUpdated,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: guide.h1,
            item: canonicalUrl,
          },
        ],
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
