import { readFileSync } from "node:fs";
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
  source.includes("Need a ticket today?"),
  "Homepage must render the revenue hero card.",
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

console.log("Homepage structure checks passed.");
