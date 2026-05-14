import { readFileSync } from "node:fs";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const source = readFileSync(
  join(cwd(), "src/components/HomePage.tsx"),
  "utf8",
);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function count(pattern) {
  return source.match(pattern)?.length ?? 0;
}

assert(count(/<main\b/g) === 1, "Homepage must render exactly one <main>.");
assert(count(/<h1\b/g) === 1, "Homepage must render exactly one <h1>.");
assert(
  source.includes("{copy.homepageH1}"),
  "Homepage H1 must use the homepageH1 copy field.",
);
assert(
  source.includes('homepageH1: "Bangkok Pattaya Bus Times, Prices & Stations"'),
  "English homepage H1 must describe bus times, prices, and stations.",
);
assert(
  !source.match(/<h1[\s\S]*copy\.heroLineOne/),
  "Travel smart/travel easy copy must not be rendered as the H1.",
);
assert(
  !source.includes("<DesktopHome"),
  "Homepage must not render a separate desktop copy.",
);
assert(
  !source.includes("function DesktopHome"),
  "Homepage must not keep a separate DesktopHome implementation.",
);
assert(
  count(/<RouteSearch\b/g) === 1,
  "Homepage From/To form must be rendered once.",
);
assert(
  count(/<MobileRouteCard\b/g) === 1,
  "Homepage popular route cards must be rendered from one card list.",
);
assert(
  count(/copy\.tips\.map/g) === 1,
  "Homepage essential advice must be rendered once.",
);
assert(
  source.includes("lg:max-w-7xl"),
  "Homepage must use a wide desktop container.",
);
assert(
  source.includes("lg:grid lg:grid-cols-[minmax(0,1fr)_380px]"),
  "Homepage hero must switch to a two-column desktop layout.",
);
assert(
  source.includes("sm:grid sm:grid-cols-2") &&
    source.includes("lg:grid-cols-3"),
  "Homepage popular routes must use a responsive desktop grid.",
);
assert(
  source.includes("md:hidden") && source.includes("{copy.swipe}"),
  'Homepage "Swipe" hint must be hidden on desktop.',
);
assert(
  count(/<HomepageRevenueHeroCard\b/g) === 1,
  "Homepage revenue hero card must be rendered once.",
);
assert(
  source.includes('ctaPosition="homepage_hero"'),
  "Homepage revenue hero CTA must use the homepage_hero affiliate position.",
);
assert(
  source.includes('href="#popular-routes"') &&
    source.includes('id="popular-routes"'),
  "Homepage revenue hero secondary CTA must scroll to Popular routes.",
);

const localizedRevenueTitles = {
  de: "Brauchen Sie heute ein Ticket?",
  en: "Need a ticket today?",
  fr: "Besoin d&#x27;un billet aujourd&#x27;hui ?",
  pl: "Potrzebujesz biletu na dziś?",
  ru: "Нужен билет сегодня?",
  th: "ต้องการตั๋ววันนี้ไหม?",
  zh: "今天需要车票吗？",
};

for (const [locale, title] of Object.entries(localizedRevenueTitles)) {
  const htmlPath = join(cwd(), ".next/server/app", `${locale}.html`);

  if (!existsSync(htmlPath)) {
    continue;
  }

  const html = readFileSync(htmlPath, "utf8");
  const visibleHtml = html
    .split("</head>")
    .at(1)
    ?.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "") ?? html;
  const occurrences = visibleHtml.split(title).length - 1;

  assert(
    occurrences === 1,
    `Homepage revenue title for ${locale} must occur exactly once.`,
  );

  assert(
    !visibleHtml.includes("Estimate 31°Weather") &&
      !visibleHtml.includes("Estimate 31Â°Weather") &&
      !visibleHtml.includes("Estimate31"),
    `Homepage weather widget for ${locale} must not concatenate source, temperature, and label.`,
  );
}

console.log("Homepage structure checks passed.");
