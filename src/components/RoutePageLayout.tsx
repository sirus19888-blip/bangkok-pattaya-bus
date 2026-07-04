import type { ReactNode } from "react";
import { AdSlot } from "@/components/AdSlot";
import { FAQ } from "@/components/FAQ";
import { Header } from "@/components/Header";
import { HotelAffiliateInline } from "@/components/HotelAffiliateInline";
import {
  DesktopRouteBookingPanel,
  MobileRouteDecisionCard,
} from "@/components/MobileRouteDecisionCard";
import { RelatedRoutes } from "@/components/RelatedRoutes";
import { RouteCommercialBlocks } from "@/components/RouteCommercialBlocks";
import { RouteJsonLd } from "@/components/RouteJsonLd";
import { StationCard } from "@/components/StationCard";
import { TravelerFeedback } from "@/components/TravelerFeedback";
import { TravelDateAwareTwelveGoAffiliateButton } from "@/components/TravelDateAwareTwelveGoAffiliateButton";
import {
  TravelDateField,
  TravelDateProvider,
} from "@/components/TravelDateContext";
import { TravelGuideLinks } from "@/components/TravelGuideLinks";
import { routeHotelCity } from "@/data/hotelAffiliate";
import { routePages } from "@/data/routes";
import type { LocaleCode, RouteId, RoutePage } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import type { Station } from "@/data/stations";
import { getStationPhotoGroupsForRoute } from "@/data/stationPhotos";
import { AD_SLOT_IDS } from "@/lib/ads";
import { getLocalizedFaqs, type Translations } from "@/lib/i18n";
import { hasTwelveGoTickets } from "@/lib/twelveGo";
import { getUiTranslations } from "@/lib/uiTranslations";

type RoutePageLayoutProps = {
  routePage: RoutePage;
  schedule: Schedule;
  stations: Station[];
  nextDeparture: string;
  t: Translations;
  locale: LocaleCode;
};

export function RoutePageLayout({
  routePage,
  schedule,
  stations,
  nextDeparture,
  t,
  locale,
}: RoutePageLayoutProps) {
  const uiText = getUiTranslations(locale);
  const localizedFaqs = getLocalizedFaqs(t, routePage.slug);
  const hotelCity = routeHotelCity[routePage.slug];
  const stationPhotoGroups = getStationPhotoGroupsForRoute(
    routePage.slug,
    locale,
  );
  const sourceStatusLabel =
    schedule.verificationStatus === "needs official confirmation"
      ? t.schedule.needsOfficialConfirmationShort
      : t.schedule.partiallyVerifiedShort;
  const decisionLabels = {
    ...t.nextBus,
    nextBus: t.schedule.nextBus,
    showAllDepartures: t.common.showAllDepartures,
  };
  const localizedRoutePages = routePages.map((page) => {
    const routeText = t.routePages[page.slug];
    const endpoints = routeText as { from?: string; to?: string };

    return {
      ...page,
      title: routeText.title,
      relatedDescription: routeText.relatedDescription ?? page.relatedDescription,
      from: endpoints.from ?? page.from,
      to: endpoints.to ?? page.to,
    };
  });
  const reportHref = buildDesktopOutdatedTimesMailto(
    uiText.report,
    routePage.title,
  );
  const bookFromLabel = uiText.affiliate.variantLabels.bookFromPrice.replace(
    "{price}",
    schedule.fromPrice,
  );
  const stickyAffiliateAriaLabel = `${uiText.affiliate.variantLabels.stickyMobile}: ${bookFromLabel}`;

  return (
    <main className="min-h-screen bg-[#f7f0e3] pb-40 text-[#13233a] lg:pb-0">
      <TravelDateProvider>
        <RouteJsonLd
          faqs={localizedFaqs}
          locale={locale}
          routePage={routePage}
          schedule={schedule}
        />
        <section className="mx-auto flex w-full max-w-[92rem] flex-col gap-5 px-4 pb-10 pt-3 sm:gap-8 sm:px-6 sm:pb-12 sm:pt-5 md:gap-4 md:pb-8 md:pt-4 lg:px-6 xl:px-8">
          <Header
            labels={{
              ...t.app,
              chooseLanguage: t.navigation.chooseLanguage,
            }}
            currentLocale={locale}
            routeSlug={routePage.slug}
            showDesktopRouteIcons
          />

          <div
            className="lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-8"
            data-visual-qa="route-layout"
          >
            <div
              className="min-w-0 space-y-5 lg:space-y-6"
              data-visual-qa="route-main-content"
            >
              <MobileRouteDecisionCard
                affiliateLabel={bookFromLabel}
                distance={schedule.distance}
                locale={locale}
                routeId={routePage.slug}
                routeTitle={routePage.title}
                schedule={schedule}
                nextDeparture={nextDeparture}
                sourceStatusLabel={sourceStatusLabel}
                labels={decisionLabels}
                scheduleLabels={t.schedule}
              />

              {hotelCity ? (
                <HotelAffiliateInline
                  city={hotelCity}
                  locale={locale}
                  routeId={routePage.slug}
                  ctaPosition="route_hotel_strip"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#e8b05a] bg-[#fff8ec] px-4 text-center text-sm font-black text-[#13233a] shadow-sm transition hover:bg-[#f8e7c6] lg:hidden"
                />
              ) : null}

              <AdSlot id={AD_SLOT_IDS.afterSchedule} />

              <RouteCommercialBlocks
                currentRoute={routePage.slug}
                locale={locale}
                routePages={localizedRoutePages}
              />

              <TravelGuideLinks locale={locale} routeId={routePage.slug} />

              <MobileDetailsSection title={t.station.title}>
                <StationCard
                  stations={stations}
                  locale={locale}
                  routeId={routePage.slug}
                  photoGroups={stationPhotoGroups}
                  showTitle={false}
                  labels={{
                    ...t.station,
                    openInGoogleMaps: t.common.openInGoogleMaps,
                  }}
                />
              </MobileDetailsSection>

              <AdSlot id={AD_SLOT_IDS.afterStationInformation} />

              <MobileDetailsSection title={t.faq.title}>
                <FAQ faqs={localizedFaqs} labels={t.faq} showTitle={false} />
              </MobileDetailsSection>

              <AdSlot id={AD_SLOT_IDS.afterFaq} />

              <div id="mobile-related-routes" className="scroll-mt-6">
                <RelatedRoutes
                  currentRoute={routePage.slug}
                  heading={t.common.relatedRoutes}
                  locale={locale}
                  routePages={localizedRoutePages}
                />
              </div>

              <div className="lg:hidden">
                <TravelerFeedback locale={locale} routeTitle={routePage.title} />
              </div>
            </div>

            <div
              className="hidden lg:sticky lg:top-24 lg:block"
              data-visual-qa="affiliate-sidebar-shell"
            >
              <DesktopRouteBookingPanel
                affiliateLabel={bookFromLabel}
                compareAlternativesLabel={
                  uiText.affiliate.variantLabels.compareAlternatives
                }
                distance={schedule.distance}
                hotelCity={hotelCity}
                locale={locale}
                reportHref={reportHref}
                reportLabel={uiText.report.label}
                routeId={routePage.slug}
                routeTitle={routePage.title}
                sidebarTitle={uiText.affiliate.variantLabels.sidebarTitle}
                schedule={schedule}
                nextDeparture={nextDeparture}
                sourceStatusLabel={sourceStatusLabel}
                labels={decisionLabels}
                scheduleLabels={t.schedule}
              />
            </div>
          </div>
        </section>
        <MobileRouteBookingBar
          affiliateAriaLabel={stickyAffiliateAriaLabel}
          affiliateLabel={bookFromLabel}
          locale={locale}
          routeId={routePage.slug}
        />
      </TravelDateProvider>
    </main>
  );
}

function buildDesktopOutdatedTimesMailto(
  report: ReturnType<typeof getUiTranslations>["report"],
  routeTitle: string,
) {
  const body = `${report.intro}\n\n${report.routeLabel}: ${routeTitle}\n\n${report.prompt}`;

  return `mailto:bangkokpattayabus@gmail.com?subject=${encodeURIComponent(
    report.subject,
  )}&body=${encodeURIComponent(body)}`;
}

function MobileDetailsSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <details
      className="group rounded-2xl border border-[#eadcc7] bg-white p-4 shadow-sm md:border-0 md:bg-transparent md:p-0 md:shadow-none"
      open
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-base font-black text-[#13233a] md:cursor-default md:text-xl [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d8c8b4] bg-[#fffaf2] text-lg leading-none md:hidden"
        >
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">-</span>
        </span>
      </summary>
      <div className="mt-4 md:mt-0">{children}</div>
    </details>
  );
}

function MobileRouteBookingBar({
  affiliateAriaLabel,
  affiliateLabel,
  locale,
  routeId,
}: {
  affiliateAriaLabel: string;
  affiliateLabel: string;
  locale: LocaleCode;
  routeId: RouteId;
}) {
  if (!hasTwelveGoTickets(routeId)) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[28rem] border-t border-[#eadcc7] bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-12px_28px_rgba(19,35,58,0.14)] backdrop-blur lg:hidden"
      data-mobile-booking-bar="true"
    >
      <TravelDateField
        className="mb-2"
        inputClassName="min-h-10 w-full rounded-xl border border-[#d8c8b4] bg-white px-3 text-sm font-black text-[#13233a] shadow-sm outline-none"
        labelClassName="sr-only"
        locale={locale}
      />
      <TravelDateAwareTwelveGoAffiliateButton
        ariaLabel={affiliateAriaLabel}
        ctaPosition="mobile_sticky"
        disclosureMode="none"
        label={affiliateLabel}
        locale={locale}
        routeId={routeId}
        variant="stickyMobile"
        wrapperClassName="w-full"
      />
    </div>
  );
}
