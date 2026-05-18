import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ConsentManagementPlaceholder } from "@/components/ConsentManagementPlaceholder";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-0DYTH1TLGB";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <ConsentManagementPlaceholder />
        <SiteFooter />
        <Analytics />
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  );
}
