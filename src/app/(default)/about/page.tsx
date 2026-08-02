import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Bangkok Pattaya Bus Guide",
  description:
    "Learn about Bangkok Pattaya Bus Guide, an independent travel guide for checking bus information between Bangkok and Pattaya.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <TrustPage
      eyebrow="About"
      title="About Bangkok Pattaya Bus Guide"
      intro="Bangkok Pattaya Bus Guide is an independent travel guide that helps visitors quickly check bus times, prices, stations, and practical notes for travel between Bangkok, Pattaya, Suvarnabhumi Airport, and Don Mueang Airport."
      sections={[
        {
          title: "Who runs this site",
          body: "Bangkok Pattaya Bus Guide is run by an independent site owner who maintains the content, checks sources, and updates route information when better data is available. Contact: bangkokpattayabus@gmail.com.",
        },
        {
          title: "Purpose of the site",
          body: "The purpose of this website is to make practical bus information easier for tourists to understand before they travel. It focuses on routes, station details, prices, travel notes, and source transparency.",
        },
        {
          title: "Independent travel guide",
          body: "This website is independent. It is not an official bus operator website. The goal is to make bus travel information easier to understand for tourists.",
        },
        {
          title: "Schedule accuracy",
          body: "Bus times may change. Travelers should confirm departure times with the station or operator before travel. The site uses published operator information and manual checks where possible.",
        },
        {
          title: "Content responsibility",
          body: "The site owner is responsible for reviewing and publishing the information shown on this guide. Operator names, station names, and source links are used for reference only and do not imply ownership or official operator status.",
        },
        {
          title: "Affiliate disclosure",
          body: "Some booking links may be affiliate links. This means the site may earn a commission if you book through those links. This does not affect the timetable information, route notes, prices shown from operator sources, or our recommendation to confirm before travel.",
        },
        {
          title: "Help improve this guide",
          body: "If you notice outdated bus times, prices, station information, or route details, please send a correction request with the route name, source, and what should be updated.",
        },
      ]}
    />
  );
}
