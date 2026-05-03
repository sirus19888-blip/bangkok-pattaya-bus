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
    <section className="rounded-lg border border-[#eadcc7] bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm font-bold uppercase tracking-wide text-[#2f6f93]">
        {heading}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {relatedRoutes.map((routePage) => (
          <Link
            key={routePage.slug}
            href={`/${locale}/${routePage.slug}`}
            className="rounded-lg border border-[#eadcc7] bg-[#fffaf2] p-3.5 shadow-sm transition hover:bg-white sm:p-4"
          >
            <span className="block text-base font-black text-[#13233a]">
              {routePage.title}
            </span>
            <span className="mt-1 block text-sm font-semibold text-[#4f5d6c]">
              {routePage.from} to {routePage.to}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
