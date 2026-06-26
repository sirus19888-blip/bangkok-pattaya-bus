/* eslint-disable @next/next/next-script-for-ga -- Hard GA4 reset uses the raw official snippet for g/collect testing. */
import { Analytics } from "@vercel/analytics/next";
import { ConsentManagementPlaceholder } from "@/components/ConsentManagementPlaceholder";
import { SiteFooter } from "@/components/SiteFooter";

type DocumentLayoutProps = Readonly<{
  children: React.ReactNode;
  lang: string;
}>;

export function DocumentLayout({ children, lang }: DocumentLayoutProps) {
  return (
    <html lang={lang} className="h-full antialiased">
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
