import Link from "next/link";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { Header } from "@/components/Header";
import { HotelAffiliateInline } from "@/components/HotelAffiliateInline";
import { guideHotelCity, routeHotelCity } from "@/data/hotelAffiliate";
import { getRoutePage } from "@/data/routes";
import type { LocaleCode } from "@/data/routes";
import type { SeoGuide } from "@/data/seoGuides";
import { getGuideModifiedDate } from "@/data/translatedGuides";
import { getTranslations } from "@/lib/i18n";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import { build12GoRouteUrl, getAffiliateRoute } from "@/lib/twelveGo";
import { getUiTranslations } from "@/lib/uiTranslations";

function guideUrl(slug: string, locale: LocaleCode) {
  return absoluteUrl(`/${locale}/${slug}`);
}

function localizeInternalHref(href: string, locale: LocaleCode) {
  return href.startsWith("/en/") ? `/${locale}/${href.slice(4)}` : href;
}

export function SeoGuidePage({ guide, locale = "en" }: { guide: SeoGuide; locale?: LocaleCode }) {
  const t = getTranslations(locale);
  const chrome = getUiTranslations(locale).guidePage;
  const affiliateText = getUiTranslations(locale).affiliate;
  const routePage = getRoutePage(guide.routeId);
  const hotelCity = routeHotelCity[guide.routeId] ?? guideHotelCity[guide.slug];
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
  const shortAnswerCtaPosition = "guide_short_answer";
  const shortAnswerAffiliateHref = build12GoRouteUrl(
    guide.routeId,
    locale,
    shortAnswerCtaPosition,
  );
  const shortAnswerAffiliateSubId = affiliateRoute
    ? `${affiliateRoute.subId}-${shortAnswerCtaPosition}`
    : undefined;
  // Osobny sub_id, zeby rezerwacje z tego bloku dalo sie odroznic w raporcie 12Go.
  const transferCtaPosition = "guide_transfer";
  const transferAffiliateHref = build12GoRouteUrl(
    guide.routeId,
    locale,
    transferCtaPosition,
  );
  const transferAffiliateSubId = affiliateRoute
    ? `${affiliateRoute.subId}-${transferCtaPosition}`
    : undefined;
  const mobileStickyCtaPosition = "guide_mobile_sticky";
  const mobileStickyAffiliateHref = build12GoRouteUrl(
    guide.routeId,
    locale,
    mobileStickyCtaPosition,
  );
  const mobileStickyAffiliateSubId = affiliateRoute
    ? `${affiliateRoute.subId}-${mobileStickyCtaPosition}`
    : undefined;

  if (!routePage) {
    return null;
  }

  const localizedRouteTitle =
    t.routePages[guide.routeId]?.title ?? routePage.title;

  return (
    <main className="min-h-screen bg-[#f7f0e3] px-4 py-8 pb-40 text-[#13233a] lg:pb-0">
      <GuideJsonLd guide={guide} locale={locale} />

      <div className="mx-auto max-w-4xl pb-4">
        <Header
          labels={{ ...t.app, chooseLanguage: t.navigation.chooseLanguage }}
          currentLocale={locale}
          compact
        />
      </div>

      <article className="mx-auto max-w-4xl">
        <nav className="flex flex-wrap items-center gap-1 text-sm font-black text-[#0e7b6b]">
          <Link className="inline-flex min-h-11 items-center rounded-lg px-2" href="/">
            {chrome.breadcrumbHome}
          </Link>
          <span className="px-2 text-[#8a94a3]">/</span>
          <Link className="inline-flex min-h-11 items-center rounded-lg px-2" href={`/${locale}`}>
            {chrome.breadcrumbRoutes}
          </Link>
          <span className="px-2 text-[#8a94a3]">/</span>
          <Link
            className="inline-flex min-h-11 items-center rounded-lg px-2"
            href={`/${locale}/${routePage.slug}`}
          >
            {localizedRouteTitle}
          </Link>
        </nav>

        <header className="mt-5 rounded-[1.75rem] border border-[#eadcc7] bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8a5b12]">
            {chrome.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
            {guide.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-[#4f5d6c]">
            {guide.intro}
          </p>
          <p className="mt-4 text-sm font-black text-[#0e7b6b]">
            {chrome.lastUpdated}{" "}
            {getGuideModifiedDate(guide.slug, locale, guide.lastUpdated)}
          </p>
        </header>

        {guide.shortAnswer ? (
          <section className="mt-6 rounded-[1.5rem] border border-[#e8b05a] bg-[#fff8ec] p-5 shadow-sm">
            <h2 className="text-xl font-black leading-tight">{chrome.shortAnswer}</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#4f5d6c]">
              {guide.shortAnswer}
            </p>
            {guide.shortAnswerHotelCity ? (
              <>
                <HotelAffiliateInline
                  city={guide.shortAnswerHotelCity}
                  locale={locale}
                  routeId={guide.routeId}
                  ctaPosition="guide_hotel_short_answer"
                  className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#e8b05a] px-5 text-sm font-black text-[#13233a] shadow-sm transition hover:bg-[#dca23f]"
                />
                <p className="mt-2 text-xs font-semibold text-[#4f5d6c]">
                  {getUiTranslations(locale).hotel.disclosure}
                </p>
              </>
            ) : (
              <AffiliateCTA
                className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#e8b05a] px-5 text-sm font-black text-[#13233a] shadow-sm transition hover:bg-[#dca23f]"
                ctaPosition={shortAnswerCtaPosition}
                disclosureText={affiliateText.disclosure}
                href={shortAnswerAffiliateHref}
                label={guide.ctaLabel}
                lang={locale}
                provider="12go"
                routeId={guide.routeId}
                from={affiliateRoute?.from ?? ""}
                shortDisclosureText={affiliateText.shortDisclosure}
                subId={shortAnswerAffiliateSubId}
                to={affiliateRoute?.to ?? ""}
                variant="afterSchedule"
              />
            )}
          </section>
        ) : null}

        <section className="mt-6 rounded-[1.5rem] border border-[#c8dbe9] bg-[#eaf5fb] p-5">
          <h2 className="text-2xl font-black">{chrome.quickFacts}</h2>
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

        {/* Blok transferowy renderuje sie tylko wtedy, gdy istnieje w jezyku strony -
            localizeSeoGuide zwraca undefined zamiast angielskiego fallbacku. */}
        {guide.transferNote ? (
          <section className="mt-6 rounded-[1.5rem] border border-[#d8cbb4] bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black leading-tight">
              {guide.transferNote.title}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#4f5d6c]">
              {guide.transferNote.body}
            </p>
            <AffiliateCTA
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl border border-[#e8b05a] bg-[#fff8ec] px-5 text-sm font-black text-[#13233a] shadow-sm transition hover:bg-[#f8e7c6]"
              ctaPosition={transferCtaPosition}
              disclosureText={affiliateText.disclosure}
              href={transferAffiliateHref}
              label={guide.transferNote.ctaLabel}
              lang={locale}
              provider="12go"
              routeId={guide.routeId}
              from={affiliateRoute?.from ?? ""}
              shortDisclosureText={affiliateText.shortDisclosure}
              subId={transferAffiliateSubId}
              to={affiliateRoute?.to ?? ""}
              variant="afterFaq"
            />
          </section>
        ) : null}

        {hotelCity ? (
          <HotelAffiliateInline
            city={hotelCity}
            locale={locale}
            routeId={guide.routeId}
            ctaPosition="guide_hotel_inline"
            className="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#e8b05a] bg-[#fff8ec] px-4 text-center text-sm font-black text-[#13233a] shadow-sm transition hover:bg-[#f8e7c6] lg:hidden"
          />
        ) : null}

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
                {chrome.relatedRoute} {localizedRouteTitle}
              </h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
                {chrome.relatedRouteBody}
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
                  {chrome.usefulLinks}
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
              <h2 className="text-2xl font-black leading-tight">{chrome.faq}</h2>
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
                {chrome.sourcesTitle}
              </h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
                {chrome.sourcesBody.replace(
                  "{date}",
                  guide.lastVerified ?? guide.lastUpdated,
                )}
              </p>
              <ul className="mt-4 space-y-3">
                {guide.sources.map((source) => (
                  <li key={source.url ?? source.label}>
                    {source.url ? (
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
                    ) : (
                      <span className="inline-flex min-h-11 items-center px-2 text-sm font-black text-[#4f5d6c]">
                        {source.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="h-fit rounded-[1.5rem] border border-[#eadcc7] bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8a5b12]">
              {chrome.bookingOptions}
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight">
              {chrome.bookingHeading}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
              {chrome.bookingBody}
            </p>
            <AffiliateCTA
              ctaPosition={ctaPosition}
              disclosureText={affiliateText.disclosure}
              href={affiliateHref}
              label={guide.ctaLabel}
              lang={locale}
              provider="12go"
              routeId={guide.routeId}
              from={affiliateRoute?.from ?? ""}
              shortDisclosureText={affiliateText.shortDisclosure}
              subId={affiliateSubId}
              to={affiliateRoute?.to ?? ""}
              variant="afterSchedule"
            />
            {hotelCity ? (
              <div className="mt-4 border-t border-[#eadcc7] pt-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8a5b12]">
                  {getUiTranslations(locale).hotel.eyebrow}
                </p>
                <HotelAffiliateInline
                  city={hotelCity}
                  locale={locale}
                  routeId={guide.routeId}
                  ctaPosition="guide_hotel_sidebar"
                  className="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#e8b05a] px-4 text-center text-sm font-black text-[#13233a] shadow-sm transition hover:bg-[#dca23f]"
                />
              </div>
            ) : null}
          </div>
        </div>
      </article>
      {mobileStickyAffiliateHref ? (
        <div
          className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[28rem] border-t border-[#eadcc7] bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-12px_28px_rgba(19,35,58,0.14)] backdrop-blur lg:hidden"
          data-mobile-booking-bar="true"
        >
          <AffiliateCTA
            ctaPosition={mobileStickyCtaPosition}
            disclosureMode="none"
            disclosureText={affiliateText.disclosure}
            href={mobileStickyAffiliateHref}
            label={guide.ctaLabel}
            lang={locale}
            provider="12go"
            routeId={guide.routeId}
            from={affiliateRoute?.from ?? ""}
            shortDisclosureText={affiliateText.shortDisclosure}
            subId={mobileStickyAffiliateSubId}
            to={affiliateRoute?.to ?? ""}
            variant="stickyMobile"
            wrapperClassName="w-full"
          />
        </div>
      ) : null}
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
        inLanguage: locale,
        dateModified: getGuideModifiedDate(
          guide.slug,
          locale,
          guide.lastUpdated,
        ),
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
