import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";

export const metadata: Metadata = {
  title: "Contact | Bangkok Pattaya Bus Guide",
  description:
    "Contact Bangkok Pattaya Bus Guide or report outdated Bangkok to Pattaya bus schedule information.",
};

export default function ContactPage() {
  return (
    <TrustPage
      eyebrow="Contact"
      title="Contact Bangkok Pattaya Bus Guide"
      intro="Questions, corrections, and schedule updates are welcome."
      sections={[
        {
          title: "Email",
          body: "You can contact the site owner at hello@example.com.",
        },
        {
          title: "Report outdated information",
          body: "If you notice a bus time, station detail, ticket price, or travel note that looks outdated, please send the route name and the information that should be checked.",
        },
      ]}
    />
  );
}
