import Link from "next/link";
import type { LocaleCode, RouteId } from "@/data/routes";
import {
  getHomepageSeoGuideLinks,
  getSeoGuideLinksForRoute,
} from "@/data/seoGuideLinks";
import { getUiTranslations } from "@/lib/uiTranslations";

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
  const guides = routeId
    ? getSeoGuideLinksForRoute(routeId)
    : getHomepageSeoGuideLinks();

  if (guides.length === 0) {
    return null;
  }

  const guideLinks = getUiTranslations(locale).guideLinks;
  const eyebrow = routeId
    ? guideLinks.routeEyebrow
    : guideLinks.homepageEyebrow;
  const heading = routeId
    ? guideLinks.routeHeading
    : guideLinks.homepageHeading;
  const showEnglishBadge = locale !== "en";

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
            {eyebrow}
          </p>
          <h2 className="mt-1 text-xl font-black leading-tight text-[#13233a]">
            {heading}
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
              {showEnglishBadge ? (
                <span className="mt-2 inline-flex rounded-full bg-[#fff8ec] px-2 py-0.5 text-[0.6rem] font-black uppercase tracking-wide text-[#8a5b12]">
                  {guideLinks.inEnglishBadge}
                </span>
              ) : null}
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
