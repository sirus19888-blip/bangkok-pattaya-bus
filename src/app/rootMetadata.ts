import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bangkok Pattaya Bus Guide",
  description:
    "Mobile bus schedules, station tips, and travel guidance between Bangkok and Pattaya.",
  applicationName: "Bangkok Pattaya Bus Guide",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "BP Bus Guide",
    statusBarStyle: "default",
  },
  verification: {
    google: "ifux0qG_0u-B8hmrEgqocKaAcCTfk5EqOBqU8udza5A",
  },
};
