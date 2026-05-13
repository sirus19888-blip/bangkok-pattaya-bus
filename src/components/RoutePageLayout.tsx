import type { ReactNode } from "react";
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
import { routePages } from "@/data/routes";
import type { LocaleCode, Route, RoutePage } from "@/data/routes";
import type { Schedule } from "@/data/schedules";
import type { Station } from "@/data/stations";
import { getStationPhotoGroupsForRoute } from "@/data/stationPhotos";
import {
  getLocalizedFaqs,
  type Translations,
} from "@/lib/i18n";

type RoutePageLayoutProps = {
  routePage: RoutePage;
  route: Route;
  schedule: Schedule;
  stations: Station[];
  nextDeparture: string;
  t: Translations;
  locale: LocaleCode;
};

export function RoutePageLayout({
  routePage,
  route,
  schedule,
  stations,
  nextDeparture,
  t,
  locale,
}: RoutePageLayoutProps) {
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
    showAllDepartures:
      locale === "pl" ? "PokaĹĽ wszystkie trasy" : t.common.showAllDepartures,
  };
  const localizedRoutePages = routePages.map((page) => {
    const routeText = t.routePages[page.slug];
    const endpoints = routeText as { from?: string; to?: string };

    return {
      ...page,
      title: routeText.title,
      from: endpoints.from ?? page.from,
      to: endpoints.to ?? page.to,
    };
  });
  const reportHref = buildDesktopOutdatedTimesMailto(locale, routePage.title);
  const reportLabel = getDesktopReportOutdatedLabel(locale);

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

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-8">
          <div className="min-w-0 space-y-5 lg:space-y-6">
        <MobileRouteDecisionCard
          affiliateLabel={getTwelveGoVariantLabel("stickyMobile")}
          distance={route.distance}
          locale={locale}
          routeId={routePage.slug}
          routeTitle={routePage.title}
          schedule={schedule}
          nextDeparture={nextDeparture}
          sourceStatusLabel={sourceStatusLabel}
          labels={{
            ...t.nextBus,
            nextBus: t.schedule.nextBus,
            showAllDepartures:
              locale === "pl" ? "Pokaż wszystkie trasy" : t.common.showAllDepartures,
          }}
          scheduleLabels={t.schedule}
        />

        <RouteCommercialBlocks
          currentRoute={routePage.slug}
          locale={locale}
          routePages={localizedRoutePages}
        />

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

        <MobileDetailsSection title={t.faq.title}>
              <FAQ faqs={localizedFaqs} labels={t.faq} showTitle={false} />
        </MobileDetailsSection>

        <div
          id="mobile-related-routes"
          className="scroll-mt-6"
        >
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

          <div className="hidden lg:sticky lg:top-24 lg:block">
            <DesktopRouteBookingPanel
              affiliateLabel="Check availability"
              distance={route.distance}
              locale={locale}
              reportHref={reportHref}
              reportLabel={reportLabel}
              routeId={routePage.slug}
              routeTitle={routePage.title}
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

function getDesktopReportOutdatedLabel(locale: LocaleCode) {
  if (locale === "pl") {
    return "Zglos nieaktualne godziny";
  }

  return "Report outdated times";
}

function buildDesktopOutdatedTimesMailto(
  locale: LocaleCode,
  routeTitle: string,
) {
  const subject =
    locale === "pl"
      ? "Zgloszenie nieaktualnych godzin autobusow"
      : "Outdated bus time report";
  const body =
    locale === "pl"
      ? `Czesc, znalazlem nieaktualne informacje na tej stronie trasy.\n\nTrasa: ${routeTitle}\n\nCo trzeba poprawic?`
      : `Hi, I found outdated information on this route page.\n\nRoute: ${routeTitle}\n\nWhat needs to be corrected?`;

  return `mailto:bangkokpattayabus@gmail.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

// TODO: Remove after the older report helper copy is safely migrated from prior local edits.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReportOutdatedLabel(locale: LocaleCode) {
  if (locale === "pl") {
    return "ZgĹ‚oĹ› nieaktualne godziny";
  }

  if (locale === "de") {
    return "Veraltete Zeiten melden";
  }

  if (locale === "fr") {
    return "Signaler des horaires obsolĂ¨tes";
  }

  if (locale === "ru") {
    return "ĐˇĐľĐľĐ±Ń‰Đ¸Ń‚ŃŚ Đľ Đ˝ĐµĐ°ĐşŃ‚ŃĐ°Đ»ŃŚĐ˝ĐľĐĽ Ń€Đ°ŃĐżĐ¸ŃĐ°Đ˝Đ¸Đ¸";
  }

  if (locale === "th") {
    return "ŕąŕ¸ŕą‰ŕ¸‡ŕą€ŕ¸§ŕ¸Ąŕ¸˛ŕ¸Łŕ¸–ŕ¸—ŕ¸µŕąŕą„ŕ¸ˇŕąŕ¸­ŕ¸±ŕ¸›ŕą€ŕ¸”ŕ¸•";
  }

  if (locale === "zh") {
    return "ćŠĄĺ‘Ščż‡ćśźć—¶é—´";
  }

  return "Report outdated times";
}

// TODO: Remove after the older report helper copy is safely migrated from prior local edits.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildOutdatedTimesMailto(locale: LocaleCode, routeTitle: string) {
  const subject =
    locale === "pl"
      ? "ZgĹ‚oszenie nieaktualnych godzin autobusĂłw"
      : "Outdated bus time report";
  const body =
    locale === "pl"
      ? `CzeĹ›Ä‡, znalazĹ‚em nieaktualne informacje na tej stronie trasy.\n\nTrasa: ${routeTitle}\n\nCo trzeba poprawiÄ‡?`
      : `Hi, I found outdated information on this route page.\n\nRoute: ${routeTitle}\n\nWhat needs to be corrected?`;

  return `mailto:bangkokpattayabus@gmail.com?subject=${encodeURIComponent(
    subject,
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
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-base font-black text-[#13233a] md:min-h-0 md:cursor-default md:text-xl [&::-webkit-details-marker]:hidden">
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
