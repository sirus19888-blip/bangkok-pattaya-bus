import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoutePage } from "@/data/routes";
import { getScheduleByRoute } from "@/data/schedules";
import { getRouteSeoPage, routeSeoPages } from "@/data/seoRoutes";
import { stations } from "@/data/stations";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

type SeoRoutePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function pageUrl(slug: string) {
  return absoluteUrl(`/routes/${slug}`);
}

export function generateStaticParams() {
  return routeSeoPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: SeoRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getRouteSeoPage(slug);

  if (!page) {
    return {
      title: "Route not found | Bangkok Pattaya Bus Guide",
    };
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.keywords,
    alternates: {
      canonical: pageUrl(page.slug),
    },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: pageUrl(page.slug),
      siteName: SITE_NAME,
      images: [
        {
          url: page.ogImage,
          width: 1200,
          height: 630,
          alt: page.h1,
        },
      ],
      type: "article",
    },
  };
}

export default async function SeoRoutePage({ params }: SeoRoutePageProps) {
  const { slug } = await params;
  const page = getRouteSeoPage(slug);
  const routePage = getRoutePage(slug);

  if (!page || !routePage) {
    notFound();
  }

  const schedule = getScheduleByRoute(page.slug);
  const routeStations = routePage.stationIds
    .map((stationId) => stations.find((station) => station.id === stationId))
    .filter((station) => station !== undefined);

  if (!schedule) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f0e3] px-4 py-8 text-[#13233a]">
      <SeoJsonLd
        page={page}
        routePage={routePage}
        schedule={schedule}
        stationNames={routeStations.map((station) => station.name)}
      />

      <article className="mx-auto max-w-5xl">
        <nav className="text-sm font-black text-[#0e7b6b]">
          <Link href="/">Home</Link>
          <span className="px-2 text-[#8a94a3]">/</span>
          <Link href="/routes">Routes</Link>
        </nav>

        <section className="mt-5 rounded-[1.75rem] border border-[#eadcc7] bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b9832e]">
            Thailand transport guide
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-[#4f5d6c]">
            {page.intro}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {page.keywords.slice(0, 5).map((keyword) => (
              <span
                className="rounded-full bg-[#eaf5fb] px-3 py-1 text-xs font-black text-[#0e7b6b]"
                key={keyword}
              >
                {keyword}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <Highlight title="Cheapest way" value={page.cheapestWay} />
          <Highlight title="Fastest way" value={page.fastestWay} />
          <Highlight title="Best with luggage" value={page.bestWithLuggage} />
        </section>

        <Section title="Best transport options">
          <div className="grid gap-4 md:grid-cols-3">
            {page.options.map((option) => (
              <div
                className="rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-5"
                key={option.title}
              >
                <h3 className="text-lg font-black">{option.title}</h3>
                <dl className="mt-4 space-y-3 text-sm font-semibold text-[#4f5d6c]">
                  <InfoRow label="Price" value={option.price} />
                  <InfoRow label="Time" value={option.duration} />
                  <InfoRow label="Best for" value={option.bestFor} />
                </dl>
                <p className="mt-4 text-sm font-semibold leading-6 text-[#4f5d6c]">
                  {option.note}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Grab vs Bolt vs inDrive">
          <div className="grid gap-4 md:grid-cols-3">
            <AppRideCard
              title="Grab"
              label="Easy and popular"
              text="Good default choice for many first-time tourists. Final price may change in the app."
            />
            <AppRideCard
              title="Bolt"
              label="Often cheaper"
              text="Can be cheaper than Grab, but availability may vary by area and time."
            />
            <AppRideCard
              title="inDrive"
              label="Negotiated fare"
              text="Agree the fare in the app and choose drivers carefully. Check rating, car and plate."
            />
          </div>
        </Section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Section title="Where to board legally" compact>
            <p className="text-sm font-semibold leading-6 text-[#4f5d6c]">
              {page.legalBoarding}
            </p>
            <div className="mt-4 space-y-2">
              {routeStations.map((station) => (
                <a
                  className="block rounded-xl border border-[#eadcc7] bg-[#fffaf2] px-4 py-3 text-sm font-black text-[#13233a]"
                  href={station.googleMapsUrl}
                  key={station.id}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {station.name}
                </a>
              ))}
            </div>
          </Section>

          <Section title="Estimated prices" compact>
            <ul className="space-y-3">
              {page.estimatedPrices.map((price) => (
                <li
                  className="rounded-xl bg-[#fffaf2] px-4 py-3 text-sm font-semibold leading-6 text-[#4f5d6c]"
                  key={price}
                >
                  {price}
                </li>
              ))}
            </ul>
          </Section>
        </section>

        <Section title="Tourist safety tips">
          <div className="grid gap-3 md:grid-cols-2">
            {page.safetyTips.map((tip) => (
              <p
                className="rounded-xl border border-[#eadcc7] bg-white px-4 py-3 text-sm font-semibold leading-6 text-[#4f5d6c]"
                key={tip}
              >
                {tip}
              </p>
            ))}
          </div>
        </Section>

        <Section title="Current schedule source">
          <div className="grid gap-3 text-sm font-semibold leading-6 text-[#4f5d6c] md:grid-cols-2">
            <InfoPanel label="Source" value={schedule.sourceName} />
            <InfoPanel label="Last checked" value={schedule.lastVerified} />
            <InfoPanel
              label="Verification status"
              value={schedule.verificationStatus}
            />
            <InfoPanel label="Ticket price note" value={schedule.fareNote} />
          </div>
          <p className="mt-4 rounded-2xl border border-[#eadcc7] bg-[#fff8ec] p-4 text-sm font-bold leading-6 text-[#4f5d6c]">
            {schedule.operatorNote}
          </p>
        </Section>

        <Section title="FAQ">
          <div className="space-y-3">
            {page.faq.map((faq) => (
              <details
                className="rounded-2xl border border-[#eadcc7] bg-white p-4"
                key={faq.question}
              >
                <summary className="cursor-pointer text-base font-black">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Section>
      </article>
    </main>
  );
}

function Section({
  children,
  compact = false,
  title,
}: {
  children: React.ReactNode;
  compact?: boolean;
  title: string;
}) {
  return (
    <section
      className={`mt-6 rounded-[1.5rem] border border-[#eadcc7] bg-white p-5 shadow-sm ${
        compact ? "" : "md:p-6"
      }`}
    >
      <h2 className="text-2xl font-black leading-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Highlight({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#c8dbe9] bg-[#eaf5fb] p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-[#0e7b6b]">
        {title}
      </p>
      <p className="mt-2 text-sm font-black leading-6 text-[#13233a]">
        {value}
      </p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-black uppercase tracking-wide text-[#8a94a3]">
        {label}
      </dt>
      <dd className="mt-1 font-black text-[#13233a]">{value}</dd>
    </div>
  );
}

function AppRideCard({
  label,
  text,
  title,
}: {
  label: string;
  text: string;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-[#c8dbe9] bg-[#f8fcff] p-5">
      <p className="text-xs font-black uppercase tracking-wide text-[#0e7b6b]">
        {label}
      </p>
      <h3 className="mt-2 text-lg font-black">{title}</h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-[#4f5d6c]">
        {text}
      </p>
    </div>
  );
}

function InfoPanel({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#eadcc7] bg-[#fffaf2] p-4">
      <p className="text-xs font-black uppercase tracking-wide text-[#8a94a3]">
        {label}
      </p>
      <p className="mt-1 font-black text-[#13233a]">{value}</p>
    </div>
  );
}

function SeoJsonLd({
  page,
  routePage,
  schedule,
  stationNames,
}: {
  page: NonNullable<ReturnType<typeof getRouteSeoPage>>;
  routePage: NonNullable<ReturnType<typeof getRoutePage>>;
  schedule: NonNullable<ReturnType<typeof getScheduleByRoute>>;
  stationNames: string[];
}) {
  const canonicalUrl = pageUrl(page.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.seoTitle,
        description: page.seoDescription,
        url: canonicalUrl,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Routes",
            item: absoluteUrl("/routes"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.h1,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "ItemList",
        name: `${page.h1} transport options`,
        itemListElement: page.options.map((option, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: option.title,
          description: `${option.price}; ${option.duration}; ${option.note}`,
        })),
      },
      {
        "@type": "Place",
        name: `${routePage.from} to ${routePage.to} boarding points`,
        description: stationNames.join(", "),
      },
      {
        "@type": "CreativeWork",
        name: `${page.h1} schedule source`,
        isBasedOn: {
          "@type": "CreativeWork",
          name: schedule.sourceName,
          url: schedule.sourceUrl,
        },
        dateModified: schedule.lastVerified,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
