import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy | Bangkok Pattaya Bus Guide",
  description:
    "Simple privacy policy for Bangkok Pattaya Bus Guide, including analytics, ads, cookies, and contact information.",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <TrustPage
      eyebrow="Privacy"
      title="Privacy policy"
      intro="This page explains the basic privacy approach for Bangkok Pattaya Bus Guide."
      sections={[
        {
          title: "Information use",
          body: "This site is designed as a simple travel guide. If you contact the site owner by email, your message may be used to reply to you or check reported schedule information.",
        },
        {
          title: "Analytics",
          body: "The site may use analytics in the future to understand which pages are useful and to improve the guide. Analytics services may collect basic usage information.",
        },
        {
          title: "Ads and cookies",
          body: "The site may use ads in the future. Analytics, advertising, maps, or other third-party services may use cookies or similar technologies according to their own policies.",
        },
        {
          title: "Affiliate links",
          body: "Some booking links, including links to third-party ticketing or travel services, may be affiliate links. This does not affect the timetable information shown on this guide.",
        },
        {
          title: "Contact",
          body: "Users can contact the site owner at bangkokpattayabus@gmail.com with privacy questions or requests.",
        },
      ]}
    />
  );
}
