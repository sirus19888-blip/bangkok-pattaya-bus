import type { MetadataRoute } from "next";
import { routePages, supportedLocaleCodes } from "@/data/routes";
import { getScheduleByRoute } from "@/data/schedules";
import { seoGuides } from "@/data/seoGuides";
import { routeSeoPages } from "@/data/seoRoutes";
import { absoluteUrl } from "@/lib/site";

const staticLastModified = new Date("2026-05-08T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
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
    {
      url: absoluteUrl("/routes"),
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const localeHomeUrls: MetadataRoute.Sitemap = supportedLocaleCodes.map(
    (locale) => ({
      url: absoluteUrl(`/${locale}`),
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: locale === "en" ? 0.9 : 0.8,
    }),
  );

  const routeUrls: MetadataRoute.Sitemap = supportedLocaleCodes.flatMap(
    (locale) =>
      routePages.map((routePage) => {
        const schedule = getScheduleByRoute(routePage.slug);

        return {
          url: absoluteUrl(`/${locale}/${routePage.slug}`),
          lastModified: schedule
            ? new Date(`${schedule.lastVerified}T00:00:00.000Z`)
            : staticLastModified,
          changeFrequency: "weekly",
          priority: locale === "en" ? 0.9 : 0.8,
        };
      }),
  );

  const seoRouteUrls: MetadataRoute.Sitemap = routeSeoPages.map((routePage) => ({
    url: absoluteUrl(`/routes/${routePage.slug}`),
    lastModified: staticLastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const seoGuideUrls: MetadataRoute.Sitemap = seoGuides.map((guide) => ({
    url: absoluteUrl(`/en/${guide.slug}`),
    lastModified: new Date(`${guide.lastUpdated}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...localeHomeUrls,
    ...routeUrls,
    ...seoRouteUrls,
    ...seoGuideUrls,
  ];
}
