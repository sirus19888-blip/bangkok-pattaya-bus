import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { ConsentManagementPlaceholder } from "@/components/ConsentManagementPlaceholder";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { PageViewTracker } from "@/components/PageViewTracker";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

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
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
