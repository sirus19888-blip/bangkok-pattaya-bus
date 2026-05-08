import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";

const siteUrl = "https://www.bangkokpattayabus.com";

export const metadata: Metadata = {
  title: "About | Bangkok Pattaya Bus Guide",
  description:
    "Learn about Bangkok Pattaya Bus Guide, an independent travel guide for checking bus information between Bangkok and Pattaya.",
  alternates: {
    canonical: new URL("/about", siteUrl).toString(),
  },
};

export default function AboutPage() {
  return (
    <TrustPage
      eyebrow="About"
      title="About Bangkok Pattaya Bus Guide"
      intro="Bangkok Pattaya Bus Guide is an independent travel guide that helps visitors quickly check bus times, prices, stations, and practical notes for travel between Bangkok, Pattaya, and Suvarnabhumi Airport."
      sections={[
        {
          title: "Independent travel guide",
          body: "This website is independent. It is not an official bus operator website. The goal is to make bus travel information easier to understand for tourists.",
        },
        {
          title: "Schedule accuracy",
          body: "Bus times may change. Travelers should confirm departure times with the station or operator before travel. The site uses published operator information and manual checks where possible.",
        },
        {
          title: "Help improve this guide",
          body: "If you notice outdated bus times, prices, or station information, you can contact the site owner so the information can be checked.",
        },
      ]}
    />
  );
}
