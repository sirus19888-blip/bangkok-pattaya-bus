import Link from "next/link";
import type { LocaleCode, RouteId } from "@/data/routes";
import {
  getHomepageSeoGuideLinks,
  getSeoGuideLinksForRoute,
} from "@/data/seoGuideLinks";

type TravelGuideLinksProps = {
  className?: string;
  locale: LocaleCode;
  routeId?: RouteId;
};

export function TravelGuideLinks({
  className,
  locale,
  routeId,
}: TravelGuideLinksProps) {
  if (locale !== "en") {
    return null;
  }

  const guides = routeId
    ? getSeoGuideLinksForRoute(routeId)
    : getHomepageSeoGuideLinks();

  if (guides.length === 0) {
    return null;
  }

  return (
    <section
      className={
        className ??
        "rounded-2xl border border-[#eadcc7] bg-white p-4 shadow-sm sm:p-5"
      }
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0e7b6b]">
            Travel guides
          </p>
          <h2 className="mt-1 text-xl font-black leading-tight text-[#13233a]">
            Practical Bangkok and Pattaya guides
          </h2>
        </div>
      </div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              className="block h-full rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-4 transition hover:border-[#e8b05a] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b05a] focus-visible:ring-offset-2"
              href={guide.href}
            >
              <span className="block text-sm font-black leading-tight text-[#13233a]">
                {guide.title}
              </span>
              <span className="mt-2 block text-xs font-semibold leading-5 text-[#5f6874]">
                {guide.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
