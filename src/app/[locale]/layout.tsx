import { notFound } from "next/navigation";
import { DocumentLayout } from "../DocumentLayout";
import {
  isSupportedLocale,
  supportedLocaleCodes,
} from "@/data/routes";
import "../globals.css";

export { metadata } from "../rootMetadata";

type LocaleRootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export function generateStaticParams() {
  return supportedLocaleCodes.map((locale) => ({
    locale,
  }));
}

export default async function LocaleRootLayout({
  children,
  params,
}: LocaleRootLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <DocumentLayout lang={locale}>{children}</DocumentLayout>;
}
