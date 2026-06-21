import Link from "next/link";
import type { ReactNode } from "react";
import { TwelveGoAffiliateButton } from "@/components/TwelveGoAffiliateButton";
import type { LocaleCode, RouteId, RoutePage } from "@/data/routes";
import { getUiTranslations } from "@/lib/uiTranslations";

type RouteCommercialBlocksProps = {
  currentRoute: RouteId;
  locale: LocaleCode;
  routePages: RoutePage[];
};

const returnRoutes: Partial<Record<RouteId, RouteId>> = {
  "bangkok-to-pattaya": "pattaya-to-bangkok",
  "pattaya-to-bangkok": "bangkok-to-pattaya",
  "suvarnabhumi-airport-to-pattaya": "pattaya-to-suvarnabhumi-airport",
  "pattaya-to-suvarnabhumi-airport": "suvarnabhumi-airport-to-pattaya",
  "don-mueang-airport-to-pattaya": "pattaya-to-don-mueang-airport",
  "pattaya-to-don-mueang-airport": "don-mueang-airport-to-pattaya",
};

const airportRoutes: RouteId[] = [
  "suvarnabhumi-airport-to-pattaya",
  "pattaya-to-suvarnabhumi-airport",
  "don-mueang-airport-to-pattaya",
  "pattaya-to-don-mueang-airport",
];

export function RouteCommercialBlocks({
  currentRoute,
  locale,
  routePages,
}: RouteCommercialBlocksProps) {
  const text = getUiTranslations(locale).commercial;
  const returnRouteId = returnRoutes[currentRoute];
  const returnRoute = routePages.find((route) => route.slug === returnRouteId);
  const isAirport = airportRoutes.includes(currentRoute);

  return (
    <section
      aria-label={text.ariaLabel}
      className="grid gap-3 rounded-2xl border border-[#eadcc7] bg-white p-3.5 shadow-sm sm:p-5 lg:grid-cols-2 lg:p-4"
    >
      {isAirport && text.airportTransferTitle ? (
        <CommercialInfoCard
          body={text.airportTransferBody ?? ""}
          title={text.airportTransferTitle}
        >
          <TwelveGoAffiliateButton
            ctaPosition="route_airport_transfer"
            disclosureMode="short"
            label={text.airportTransferCta ?? ""}
            locale={locale}
            routeId={currentRoute}
            variant="afterSchedule"
          />
        </CommercialInfoCard>
      ) : null}

      {currentRoute === "bangkok-to-pattaya" ? (
        <article className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-4">
          <h2 className="text-base font-black leading-tight text-[#13233a]">
            {text.bookOnlineTitle}
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#4f5d6c]">
            {text.bookOnlineLead}
          </p>
          <h3 className="mt-4 text-sm font-black leading-6 text-[#13233a]">
            {text.bookOnlineStationTitle}
          </h3>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#4f5d6c]">
            {text.bookOnlineStationBody}
          </p>
          <h3 className="mt-4 text-sm font-black leading-6 text-[#13233a]">
            {text.bookOnlineOnlineTitle}
          </h3>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#4f5d6c]">
            {text.bookOnlineOnlineBody}
          </p>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
            {text.bookOnlineClosing}
          </p>
          <TwelveGoAffiliateButton
            ctaPosition="route_help_online_vs_station"
            disclosureMode="short"
            label={text.bookOnlineCta}
            locale={locale}
            routeId={currentRoute}
            variant="afterSchedule"
          />
        </article>
      ) : null}

      <CommercialInfoCard
        body={text.busFullBody}
        title={text.busFullTitle}
      >
        <TwelveGoAffiliateButton
          ctaPosition="route_help_bus_full"
          disclosureMode="short"
          label={text.busFullCta}
          locale={locale}
          routeId={currentRoute}
          variant="afterSchedule"
        />
      </CommercialInfoCard>

      <CommercialInfoCard
        body={text.afterLastBody}
        title={text.afterLastTitle}
      >
        <TwelveGoAffiliateButton
          ctaPosition="route_help_after_last"
          disclosureMode="short"
          label={text.afterLastCta}
          locale={locale}
          routeId={currentRoute}
          variant="afterSchedule"
        />
      </CommercialInfoCard>

      <CommercialInfoCard
        body={text.compareBody}
        title={text.compareTitle}
      >
        <TwelveGoAffiliateButton
          ctaPosition="route_help_vs_taxi"
          disclosureMode="short"
          label={text.compareCta}
          locale={locale}
          routeId={currentRoute}
          variant="afterSchedule"
        />
      </CommercialInfoCard>

      <CommercialInfoCard
        body={text.returnBody}
        title={text.returnTitle}
      >
        {returnRoute ? (
          <Link
            className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#13233a] px-4 text-center text-sm font-black text-white transition hover:bg-[#1d3455]"
            href={`/${locale}/${returnRoute.slug}`}
          >
            {text.returnRoutePrefix} {returnRoute.title}
          </Link>
        ) : (
          <Link
            className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#13233a] px-4 text-center text-sm font-black text-white transition hover:bg-[#1d3455]"
            href={`/${locale}`}
          >
            {text.viewAllRoutes}
          </Link>
        )}
      </CommercialInfoCard>
    </section>
  );
}

function CommercialInfoCard({
  body,
  children,
  title,
}: {
  body: string;
  children: ReactNode;
  title: string;
}) {
  return (
    <article className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-4">
      <h2 className="text-base font-black leading-tight text-[#13233a]">
        {title}
      </h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-[#4f5d6c]">
        {body}
      </p>
      {children}
    </article>
  );
}
