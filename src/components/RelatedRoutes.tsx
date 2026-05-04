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

  return (
    <section className="rounded-2xl border border-[#eadcc7] bg-white p-3.5 shadow-sm sm:p-5 md:p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#2f6f93] sm:text-sm">
        {heading}
      </p>
      <div className="mt-3 grid gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3 md:mt-3 md:grid-cols-3 md:gap-2.5">
        {relatedRoutes.map((routePage) => (
          <Link
            key={routePage.slug}
            href={`/${locale}/${routePage.slug}`}
            className="rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-3.5 shadow-sm transition hover:bg-white sm:p-4 md:p-3"
          >
            <span className="block text-sm font-black leading-tight text-[#13233a] sm:text-base md:text-sm">
              {routePage.title}
            </span>
            <span className="mt-1 hidden text-sm font-semibold text-[#4f5d6c] md:block md:text-xs">
        {routePage.from}{" "}
        {locale === "th" ? "ไป" : locale === "ru" ? "—" : "to"}{" "}
        {routePage.to}
      </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
