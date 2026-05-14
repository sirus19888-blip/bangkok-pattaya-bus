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

const forbiddenEncodingArtifacts = [
  "â€˘",
  "PokaĹĽ",
  "wiÄ™cej",
  "ĐźĐľ",
  "ĐµŃ",
  "â–ľ",
  "âŚ",
  "Ă—",
];

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
  pl: "Potrzebujesz biletu na dzi\u015b?",
  ru: "\u041d\u0443\u0436\u0435\u043d \u0431\u0438\u043b\u0435\u0442 \u0441\u0435\u0433\u043e\u0434\u043d\u044f?",
  th: "\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e15\u0e31\u0e4b\u0e27\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49\u0e44\u0e2b\u0e21?",
  zh: "\u4eca\u5929\u9700\u8981\u8f66\u7968\u5417\uff1f",
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

  for (const artifact of forbiddenEncodingArtifacts) {
    assert(
      !visibleHtml.includes(artifact),
      `Homepage HTML for ${locale} must not contain mojibake artifact: ${artifact}`,
    );
  }
}

console.log("Homepage structure checks passed.");
