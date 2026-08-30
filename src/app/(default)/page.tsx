import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { supportedLocaleCodes } from "@/data/routes";
import { absoluteUrl } from "@/lib/site";

// Odliczanie i domyslna data podrozy sa liczone przy renderowaniu, wiec strona
// nie moze byc zamrozona na czas builda. ISR co 60 s zamiast trybu dynamicznego.
export const revalidate = 60;

const pageTitle = "Bangkok Pattaya Bus Guide - Bus Times, Prices & Stations";
const pageDescription =
  "Check Bangkok to Pattaya, Pattaya to Bangkok, and Suvarnabhumi Airport to Pattaya bus times, ticket prices, travel time, stations, and practical travel tips.";
const openGraphDescription =
  "Check Bangkok to Pattaya, Pattaya to Bangkok, and Suvarnabhumi Airport to Pattaya bus times, prices, stations, and tips.";
const openGraphImageUrl = absoluteUrl("/images/hero/home-og-bus-guide.jpg");

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: absoluteUrl("/en"),
    languages: {
      "x-default": absoluteUrl("/en"),
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
    url: absoluteUrl("/en"),
    siteName: "Bangkok Pattaya Bus",
    images: [
      {
        url: openGraphImageUrl,
        width: 1200,
        height: 630,
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
