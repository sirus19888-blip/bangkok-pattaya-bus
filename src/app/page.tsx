import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { supportedLocaleCodes } from "@/data/routes";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bangkok Pattaya Bus Guide - Bus Times, Prices & Stations",
  description:
    "Check Bangkok to Pattaya, Pattaya to Bangkok, and Suvarnabhumi Airport to Pattaya bus times, ticket prices, travel time, stations, and practical travel tips.",
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "x-default": absoluteUrl("/"),
      ...Object.fromEntries(
        supportedLocaleCodes.map((locale) => [
          locale,
          absoluteUrl(`/${locale}`),
        ]),
      ),
    },
  },
};

export default function Home() {
  return <HomePage locale="en" />;
}
