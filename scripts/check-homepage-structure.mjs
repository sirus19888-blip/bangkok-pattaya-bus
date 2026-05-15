import { readFileSync } from "node:fs";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const source = readFileSync(
  join(cwd(), "src/components/HomePage.tsx"),
  "utf8",
);
const routeSearchSource = readFileSync(
  join(cwd(), "src/components/RouteSearch.tsx"),
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

function stripDesktopHidden(source) {
  let output = source;
  const desktopHiddenElementPattern =
    /<([a-z0-9]+)\b[^>]*class="[^"]*\bmd:hidden\b[^"]*"[^>]*>[\s\S]*?<\/\1>/gi;

  for (let index = 0; index < 10; index += 1) {
    const next = output.replace(desktopHiddenElementPattern, "");

    if (next === output) {
      return next;
    }

    output = next;
  }

  return output;
}

function toTextContent(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&deg;/g, "\u00b0")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const forbiddenEncodingArtifacts = [
  [0xe2, 0x20ac, 0x02d8],
  [0x50, 0x6f, 0x6b, 0x61, 0x0139, 0x013d],
  [0x77, 0x69, 0x00c4, 0x2122, 0x63, 0x65, 0x6a],
  [0x0110, 0x017a, 0x0110, 0x013e],
  [0x0110, 0x00b5, 0x0143],
  [0xe2, 0x2013, 0x013e],
  [0xe2, 0x015a],
  [0x0102, 0x2014],
].map((codes) => String.fromCodePoint(...codes));

const desktopSwipeTextPatterns = [
  /Swipe/,
  /Swipe to see more/,
  /Tip Swipe/,
  /Wischen/,
  /Wische, um mehr zu sehen/,
  /Faites glisser/,
  /Przesuń/,
  /Листайте/,
  /滑动/,
  /เลื่อน/,
];

const forbiddenTextContentFragments = [
  "From:Bangkok",
  "From: Bangkok Pattaya Suvarnabhumi Airport",
  "Z:Bangkok",
  "Z: Bangkok Pattaya Suvarnabhumi Airport",
  "31\u00b0M\u00e9t\u00e9o",
  "Estimation 31\u00b0M\u00e9t\u00e9o",
  "Szacunek 31\u00b0 Pogoda",
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
  routeSearchSource.includes("<form") &&
    routeSearchSource.includes('data-route-finder="true"') &&
    routeSearchSource.includes("onSubmit={handleSubmit}"),
  "Route finder must be a semantic form with a submit handler.",
);
assert(
  routeSearchSource.includes("<label") &&
    routeSearchSource.includes("<select") &&
    routeSearchSource.includes("<button"),
  "Route finder must use labels, selects, and a button as separate controls.",
);
assert(
  routeSearchSource.includes("htmlFor={fromSelectId}") &&
    routeSearchSource.includes("htmlFor={toSelectId}"),
  "Route finder labels must be separate elements linked to selects.",
);
assert(
  routeSearchSource.includes("aria-label={`${getAriaLabelText(displayLabels.from)}") &&
    routeSearchSource.includes("aria-label={`${getAriaLabelText(displayLabels.to)}") &&
    routeSearchSource.includes("aria-label={`${goLabel}:"),
  "Route finder selects and submit button must include localized aria-labels.",
);
assert(
  routeSearchSource.includes('data-route-finder="true"'),
  "Route finder must expose a stable accessibility test marker.",
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
  !source.includes("{copy.swipe}"),
  'Homepage must not render a textual "Swipe" hint in shared markup.',
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
  const desktopVisibleHtml = stripDesktopHidden(visibleHtml);
  const textContent = toTextContent(visibleHtml);
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

  for (const pattern of desktopSwipeTextPatterns) {
    assert(
      !pattern.test(desktopVisibleHtml),
      `Desktop homepage HTML for ${locale} must not show mobile swipe hint text: ${pattern}`,
    );
  }

  for (const fragment of forbiddenTextContentFragments) {
    assert(
      !textContent.includes(fragment),
      `Homepage public textContent for ${locale} must not contain glued text: ${fragment}`,
    );
  }
}

console.log("Homepage structure checks passed.");
