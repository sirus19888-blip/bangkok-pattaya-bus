import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { supportedLocaleCodes } from "@/data/routes";

const siteUrl = "https://www.bangkokpattayabus.com";

export const metadata: Metadata = {
  title: "Bangkok Pattaya Bus Guide - Bus Times, Prices & Stations",
  description:
    "Check Bangkok to Pattaya, Pattaya to Bangkok, and Suvarnabhumi Airport to Pattaya bus times, ticket prices, travel time, stations, and practical travel tips.",
  alternates: {
    canonical: new URL("/", siteUrl).toString(),
    languages: {
      "x-default": new URL("/", siteUrl).toString(),
      ...Object.fromEntries(
        supportedLocaleCodes.map((locale) => [
          locale,
          new URL(`/${locale}`, siteUrl).toString(),
        ]),
      ),
    },
  },
};

export default function Home() {
  return <HomePage locale="en" />;
}
