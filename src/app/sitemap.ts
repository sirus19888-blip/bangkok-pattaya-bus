import type { MetadataRoute } from "next";
import { routePages, supportedLocaleCodes } from "@/data/routes";
import { getScheduleByRoute } from "@/data/schedules";
import { seoGuides } from "@/data/seoGuides";
import { getGuideLocales } from "@/data/translatedGuides";
import { absoluteUrl } from "@/lib/site";

const staticLastModified = new Date("2026-07-19T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/about"),
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: staticLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const localeHomeUrls: MetadataRoute.Sitemap = supportedLocaleCodes.map(
    (locale) => ({
      url: absoluteUrl(`/${locale}`),
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: locale === "en" ? 1 : 0.8,
    }),
  );

  const routeUrls: MetadataRoute.Sitemap = supportedLocaleCodes.flatMap(
    (locale) =>
      routePages.map((routePage) => {
        const schedule = getScheduleByRoute(routePage.slug);

        return {
          url: absoluteUrl(`/${locale}/${routePage.slug}`),
          lastModified: schedule
            ? new Date(`${schedule.lastUpdated}T00:00:00.000Z`)
            : staticLastModified,
          changeFrequency: "weekly",
          priority: locale === "en" ? 0.9 : 0.8,
        };
      }),
  );

  const seoGuideUrls: MetadataRoute.Sitemap = seoGuides.flatMap((guide) =>
    getGuideLocales(guide.slug).map((locale) => ({
      url: absoluteUrl(`/${locale}/${guide.slug}`),
      lastModified: new Date(`${guide.lastUpdated}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? 0.7 : 0.6,
    })),
  );

  return [
    ...staticPages,
    ...localeHomeUrls,
    ...routeUrls,
    ...seoGuideUrls,
  ];
}
