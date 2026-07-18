import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { homeSeoMetadata } from "@/data/homeSeo";
import {
  isSupportedLocale,
  supportedLocaleCodes,
  type LocaleCode,
} from "@/data/routes";
import { absoluteUrl } from "@/lib/site";

type LocaleHomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

function homeUrl(locale: string) {
  return absoluteUrl(`/${locale}`);
}

const openGraphImageUrl = absoluteUrl("/images/hero/home-og-bus-guide.jpg");

export function generateStaticParams() {
  return supportedLocaleCodes.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: LocaleHomeProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {
      title: "Home not found | Bangkok Pattaya Bus Guide",
    };
  }

  const seo = homeSeoMetadata[locale];
  const languages = Object.fromEntries(
    supportedLocaleCodes.map((localeCode) => [
      localeCode,
      homeUrl(localeCode),
    ]),
  );

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: homeUrl(locale),
      languages: {
        "x-default": absoluteUrl("/en"),
        ...languages,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: homeUrl(locale),
      siteName: "Bangkok Pattaya Bus",
      images: [
        {
          url: openGraphImageUrl,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [openGraphImageUrl],
    },
  };
}

export default async function LocaleHome({ params }: LocaleHomeProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale as LocaleCode} />;
}
