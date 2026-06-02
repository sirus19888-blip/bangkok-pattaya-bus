import Link from "next/link";
import type { LocaleCode, RouteId, RoutePage } from "@/data/routes";

type RelatedRoutesProps = {
  currentRoute: RouteId;
  heading: string;
  locale: LocaleCode;
  routePages: RoutePage[];
};

export function RelatedRoutes({
  currentRoute,
  heading,
  locale,
  routePages,
}: RelatedRoutesProps) {
  const relatedRoutes = routePages.filter((page) => page.slug !== currentRoute);
  const ctaLabel = getRelatedRouteCtaLabel(locale);

  return (
    <section
      className="rounded-2xl border border-[#eadcc7] bg-white p-3.5 shadow-sm sm:p-5 md:p-4"
      data-related-routes="true"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
        {heading}
      </p>
      <ul className="mt-3 grid gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3 md:mt-3 md:grid-cols-3 md:gap-2.5">
        {relatedRoutes.map((routePage) => (
          <li
            key={routePage.slug}
            className="min-w-0"
            data-related-route-card="true"
          >
            <article
              className="relative min-h-[6.4rem] overflow-hidden rounded-xl border border-[#eadcc7] bg-[#13233a] p-3.5 shadow-sm transition hover:bg-white sm:p-4 md:min-h-0 md:bg-[#fffaf2] md:p-3"
              data-related-route-href={`/${locale}/${routePage.slug}`}
            >
              <Link
                href={`/${locale}/${routePage.slug}`}
                aria-label={routePage.title}
                className="title relative flex min-h-11 items-center text-sm font-black leading-tight text-white transition hover:text-[#f3d77b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b05a] focus-visible:ring-offset-2 sm:text-base md:text-sm md:text-[#13233a] md:hover:text-[#0e7b6b]"
              >
                {routePage.title}
              </Link>
              <p className="description relative mt-2 max-w-[17rem] text-xs font-semibold leading-5 text-white md:mt-1 md:max-w-none md:text-[#4f5d6c]">
                {routePage.relatedDescription}
              </p>
              <Link
                href={`/${locale}/${routePage.slug}`}
                aria-label={`${ctaLabel}: ${routePage.title}`}
                className="cta relative mt-3 inline-flex min-h-11 items-center text-xs font-black text-[#f3d77b] transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b05a] focus-visible:ring-offset-2 md:text-[#2f6f93] md:hover:text-[#13233a]"
              >
                {ctaLabel}
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

function getRelatedRouteCtaLabel(locale: LocaleCode) {
  const labels: Record<LocaleCode, string> = {
    de: "Route ansehen",
    en: "View route",
    fr: "Voir l’itinéraire",
    pl: "Zobacz trasę",
    ru: "Открыть маршрут",
    th: "ดูเส้นทาง",
    zh: "查看路线",
  };

  return labels[locale] ?? labels.en;
}
