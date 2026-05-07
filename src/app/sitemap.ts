import type { MetadataRoute } from "next";
import { routePages, supportedLocaleCodes } from "@/data/routes";
import { routeSeoPages } from "@/data/seoRoutes";

const siteUrl = "https://www.bangkokpattayabus.com";

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/contact"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/privacy"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/routes"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const routeUrls: MetadataRoute.Sitemap = supportedLocaleCodes.flatMap(
    (locale) =>
      routePages.map((routePage) => ({
        url: absoluteUrl(`/${locale}/${routePage.slug}`),
        changeFrequency: "weekly",
        priority: locale === "en" ? 0.9 : 0.8,
      })),
  );

  const seoRouteUrls: MetadataRoute.Sitemap = routeSeoPages.map((routePage) => ({
    url: absoluteUrl(`/routes/${routePage.slug}`),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticPages, ...routeUrls, ...seoRouteUrls];
}
