import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { supportedLocaleCodes } from "@/data/routes";
import { absoluteUrl } from "@/lib/site";

const pageTitle = "Bangkok Pattaya Bus Guide - Bus Times, Prices & Stations";
const pageDescription =
  "Check Bangkok to Pattaya, Pattaya to Bangkok, and Suvarnabhumi Airport to Pattaya bus times, ticket prices, travel time, stations, and practical travel tips.";
const openGraphDescription =
  "Check Bangkok to Pattaya, Pattaya to Bangkok, and Suvarnabhumi Airport to Pattaya bus times, prices, stations, and tips.";
const pageUrl = absoluteUrl("/");
const openGraphImageUrl = absoluteUrl("/images/hero/mobile-home-bus-guide.png");

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "x-default": pageUrl,
      ...Object.fromEntries(
        supportedLocaleCodes.map((locale) => [
          locale,
          absoluteUrl(`/${locale}`),
        ]),
      ),
    },
  },
  openGraph: {
    title: pageTitle,
    description: openGraphDescription,
    url: pageUrl,
    siteName: "Bangkok Pattaya Bus",
    images: [
      {
        url: openGraphImageUrl,
        width: 1774,
        height: 887,
        alt: "Bangkok Pattaya Bus Guide",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: openGraphDescription,
    images: [openGraphImageUrl],
  },
};

export default function Home() {
  return <HomePage locale="en" />;
}
