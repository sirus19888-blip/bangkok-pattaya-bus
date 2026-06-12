import type { ReactNode } from "react";
import { AdSlot } from "@/components/AdSlot";
import { FAQ } from "@/components/FAQ";
import { Header } from "@/components/Header";
import {
  DesktopRouteBookingPanel,
  MobileRouteDecisionCard,
} from "@/components/MobileRouteDecisionCard";
import { RelatedRoutes } from "@/components/RelatedRoutes";
import { RouteCommercialBlocks } from "@/components/RouteCommercialBlocks";
import { RouteJsonLd } from "@/components/RouteJsonLd";
import { StationCard } from "@/components/StationCard";
import { TravelerFeedback } from "@/components/TravelerFeedback";
import { getTwelveGoVariantLabel } from "@/components/TwelveGoAffiliateButton";
import { TravelGuideLinks } from "@/components/TravelGuideLinks";
import { routePages } from "@/data/routes";
import type { LocaleCode, RoutePage } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import type { Station } from "@/data/stations";
import { getStationPhotoGroupsForRoute } from "@/data/stationPhotos";
import { AD_SLOT_IDS } from "@/lib/ads";
import { getLocalizedFaqs, type Translations } from "@/lib/i18n";
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

  return (
    <main className="min-h-screen bg-[#f7f0e3] text-[#13233a]">
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
              affiliateLabel={getTwelveGoVariantLabel(
                "stickyMobile",
                locale,
              )}
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
              affiliateLabel={uiText.affiliate.variantLabels.checkAvailability}
              compareAlternativesLabel={
                uiText.affiliate.variantLabels.compareAlternatives
              }
              distance={schedule.distance}
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
