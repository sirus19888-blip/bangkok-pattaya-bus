import { Analytics } from "@vercel/analytics/next";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
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
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <ConsentManagementPlaceholder />
        <SiteFooter />
        <Analytics />
        <AnalyticsConsent lang={lang} />
      </body>
    </html>
  );
}
