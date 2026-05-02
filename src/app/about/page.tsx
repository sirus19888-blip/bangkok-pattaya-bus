import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";

export const metadata: Metadata = {
  title: "About | Bangkok Pattaya Bus Guide",
  description:
    "Learn about Bangkok Pattaya Bus Guide, an independent travel guide for checking bus information between Bangkok and Pattaya.",
};

export default function AboutPage() {
  return (
    <TrustPage
      eyebrow="About"
      title="Independent Bangkok to Pattaya bus guide"
      intro="Bangkok Pattaya Bus Guide helps tourists quickly check practical bus information between Bangkok and Pattaya."
      sections={[
        {
          title: "Independent guide",
          body: "This website is an independent travel guide. It is not an official bus operator website and it does not sell official bus tickets.",
        },
        {
          title: "What it helps with",
          body: "The guide brings together useful information such as routes, departure times, station notes, travel time, ticket price guidance, and simple travel tips.",
        },
        {
          title: "Check before travel",
          body: "Bus schedules may change because of traffic, holidays, weather, or operator changes. Please confirm times at the station or with the operator before you travel.",
        },
      ]}
    />
  );
}
