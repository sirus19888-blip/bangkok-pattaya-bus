/* eslint-disable @next/next/next-script-for-ga -- Hard GA4 reset uses the raw official snippet for g/collect testing. */
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ConsentManagementPlaceholder } from "@/components/ConsentManagementPlaceholder";
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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0DYTH1TLGB"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-0DYTH1TLGB');
      `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <ConsentManagementPlaceholder />
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
