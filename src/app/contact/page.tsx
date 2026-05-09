import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";

const siteUrl = "https://www.bangkokpattayabus.com";

export const metadata: Metadata = {
  title: "Contact | Bangkok Pattaya Bus Guide",
  description:
    "Contact Bangkok Pattaya Bus Guide or report outdated Bangkok to Pattaya bus schedule information.",
  alternates: {
    canonical: new URL("/contact", siteUrl).toString(),
  },
};

export default function ContactPage() {
  return (
    <TrustPage
      eyebrow="Contact"
      title="Contact"
      intro="You can report outdated bus times, wrong prices, or station information that needs updating."
      sections={[
        {
          title: "Email",
          body: "You can contact the site owner at bangkokpattayabus@gmail.com.",
        },
        {
          title: "Content responsibility",
          body: "The site owner reviews correction requests and is responsible for publishing updates on this guide. This website is independent and is not an official bus operator website.",
        },
        {
          title: "For travelers",
          body: "If you notice outdated bus times, wrong prices, or station information that needs updating, please send a message.",
        },
        {
          title: "For operators",
          body: "If you represent a bus operator, ticketing platform, bus station, or airport transport desk, please send updated timetable information, fare, effective date, route name, boarding point, source link if available, and a contact person for verification.",
        },
        {
          title: "What to include",
          body: "Please include the route name, direction, departure times, ticket price, boarding point, destination, date the information becomes effective, and whether the update is official or temporary. This helps us review changes without guessing.",
        },
        {
          title: "Urgent travel support",
          body: "Please do not use this contact page for urgent travel support. Always confirm urgent travel details directly with the bus station or operator.",
        },
      ]}
    />
  );
}
