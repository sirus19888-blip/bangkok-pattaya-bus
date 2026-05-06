import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Bangkok Pattaya Bus Guide - Bus Times, Prices & Stations",
  description:
    "Check Bangkok to Pattaya, Pattaya to Bangkok, and Suvarnabhumi Airport to Pattaya bus times, ticket prices, travel time, stations, and practical travel tips.",
};

export default function Home() {
  return <HomePage locale="en" />;
}
