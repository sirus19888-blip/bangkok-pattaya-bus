import Link from "next/link";
import type { ReactNode } from "react";
import { TwelveGoAffiliateButton } from "@/components/TwelveGoAffiliateButton";
import type { LocaleCode, RouteId, RoutePage } from "@/data/routes";

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

export function RouteCommercialBlocks({
  currentRoute,
  locale,
  routePages,
}: RouteCommercialBlocksProps) {
  const returnRouteId = returnRoutes[currentRoute];
  const returnRoute = routePages.find((route) => route.slug === returnRouteId);

  return (
    <section
      aria-label="Extra travel options"
      className="grid gap-3 rounded-2xl border border-[#eadcc7] bg-white p-3.5 shadow-sm sm:p-5 lg:grid-cols-2 lg:p-4"
    >
      <CommercialInfoCard
        body="Popular departures can sell out around weekends, holidays, and late afternoon travel. If the next bus is full, ask at the counter for the following departure and compare bookable alternatives before you move to another station."
        title="What if the bus is full?"
      >
        <TwelveGoAffiliateButton
          ctaPosition="route_after_schedule"
          disclosureMode="short"
          label="Compare tickets and alternatives"
          locale={locale}
          routeId={currentRoute}
          variant="afterSchedule"
        />
      </CommercialInfoCard>

      <CommercialInfoCard
        body="After the last scheduled bus, your realistic choices are usually a taxi, private transfer, or waiting until the next morning. For airport routes, avoid relying on the final bus before a flight and compare alternatives early."
        title="After the last bus"
      >
        <TwelveGoAffiliateButton
          ctaPosition="route_after_schedule"
          disclosureMode="short"
          label="Check alternatives"
          locale={locale}
          routeId={currentRoute}
          variant="afterSchedule"
        />
      </CommercialInfoCard>

      <CommercialInfoCard
        body="The bus is usually the cheapest choice. Taxi and private transfer cost more, but they can be easier with luggage, late arrivals, or hotel-to-hotel travel. Always confirm the final price, tolls, pickup point, and luggage space before you go."
        title="Bus vs taxi vs private transfer"
      >
        <a
          className="mt-4 flex min-h-11 items-center justify-center rounded-xl border border-[#7fb7d8] bg-[#f4fbff] px-4 text-center text-sm font-black text-[#13233a] transition hover:bg-white"
          href="#mobile-related-routes"
        >
          Compare route options
        </a>
      </CommercialInfoCard>

      <CommercialInfoCard
        body="Planning the way back now can save time later. Check the return route, station notes, first and last departures, and whether your destination in Bangkok is Ekkamai, Mo Chit, Suvarnabhumi, or Don Mueang."
        title="Return route"
      >
        {returnRoute ? (
          <Link
            className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#13233a] px-4 text-center text-sm font-black text-white transition hover:bg-[#1d3455]"
            href={`/${locale}/${returnRoute.slug}`}
          >
            View {returnRoute.title}
          </Link>
        ) : (
          <Link
            className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#13233a] px-4 text-center text-sm font-black text-white transition hover:bg-[#1d3455]"
            href={`/${locale}`}
          >
            View all routes
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
