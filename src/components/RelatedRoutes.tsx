import Link from "next/link";
import Image from "next/image";
import type { LocaleCode, RouteId, RoutePage } from "@/data/routes";

type RelatedRoutesProps = {
  currentRoute: RouteId;
  heading: string;
  locale: LocaleCode;
  routePages: RoutePage[];
};

const relatedRouteImages: Record<RouteId, string> = {
  "bangkok-to-pattaya": "/images/hero/mobile-home-bus-guide.png",
  "pattaya-to-bangkok": "/images/stations/pattaya-north/pattaya-station.jpg",
  "suvarnabhumi-airport-to-pattaya":
    "/images/stations/suvarnabhumi/suvarnabhumi-bus-terminal.jpg",
  "pattaya-to-suvarnabhumi-airport":
    "/images/stations/pattaya-north/pattaya-bus-area.jpg",
  "don-mueang-airport-to-pattaya":
    "/images/stations/don-mueang/don-mueang-terminal-2.jpg",
  "pattaya-to-don-mueang-airport":
    "/images/stations/pattaya-sukhumvit/pattaya-sukhumvit-road.jpg",
};


export function RelatedRoutes({
  currentRoute,
  heading,
  locale,
  routePages,
}: RelatedRoutesProps) {
  const relatedRoutes = routePages.filter((page) => page.slug !== currentRoute);

  return (
    <section className="rounded-2xl border border-[#eadcc7] bg-white p-3.5 shadow-sm sm:p-5 md:p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
        {heading}
      </p>
      <ul className="mt-3 grid gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3 md:mt-3 md:grid-cols-3 md:gap-2.5">
        {relatedRoutes.map((routePage) => (
          <li key={routePage.slug} className="min-w-0">
            <Link
              href={`/${locale}/${routePage.slug}`}
              className="relative block min-h-[6.4rem] overflow-hidden rounded-xl border border-[#eadcc7] bg-[#13233a] p-3.5 shadow-sm transition hover:bg-white sm:p-4 md:min-h-0 md:bg-[#fffaf2] md:p-3"
            >
              <Image
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover md:hidden"
                fill
                sizes="(max-width: 767px) 360px, 1px"
                src={relatedRouteImages[routePage.slug]}
              />
              <span className="absolute inset-0 bg-gradient-to-b from-[#0e1e2e]/15 via-[#0e1e2e]/35 to-[#0e1e2e]/88 md:hidden" />
              <h3 className="relative block text-sm font-black leading-tight text-white drop-shadow sm:text-base md:text-sm md:text-[#13233a] md:drop-shadow-none">
                {routePage.title}
              </h3>
              <p className="relative mt-2 max-w-[17rem] text-xs font-semibold leading-5 text-white/85 md:mt-1 md:max-w-none md:text-[#4f5d6c]">
                {routePage.relatedDescription}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
