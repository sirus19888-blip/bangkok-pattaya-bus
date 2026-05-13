import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const root = cwd();
const routeLayoutSource = readFileSync(
  join(root, "src/components/RoutePageLayout.tsx"),
  "utf8",
);
const mobileDecisionSource = readFileSync(
  join(root, "src/components/MobileRouteDecisionCard.tsx"),
  "utf8",
);
const ctaSource = readFileSync(
  join(root, "src/components/AffiliateCTA.tsx"),
  "utf8",
);
const stationCardSource = readFileSync(
  join(root, "src/components/StationCard.tsx"),
  "utf8",
);
const stationPhotoGallerySource = readFileSync(
  join(root, "src/components/StationPhotoGallery.tsx"),
  "utf8",
);
const stationMiniMapSource = readFileSync(
  join(root, "src/components/StationMiniMap.tsx"),
  "utf8",
);
const routesSource = readFileSync(join(root, "src/data/routes.ts"), "utf8");

const expectedEnglishRoutes = [
  "/en/bangkok-to-pattaya",
  "/en/pattaya-to-bangkok",
  "/en/suvarnabhumi-airport-to-pattaya",
  "/en/pattaya-to-suvarnabhumi-airport",
  "/en/don-mueang-airport-to-pattaya",
  "/en/pattaya-to-don-mueang-airport",
];

const stationTipSamplesByRoute = new Map([
  [
    "/en/bangkok-to-pattaya",
    "The easiest way is BTS Skytrain",
  ],
  [
    "/en/pattaya-to-bangkok",
    "From your hotel, open North Pattaya Bus Terminal in Google Maps first",
  ],
  [
    "/en/suvarnabhumi-airport-to-pattaya",
    "After landing, follow Arrivals",
  ],
]);

function count(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

for (const path of expectedEnglishRoutes) {
  const slug = path.replace("/en/", "");
  assert.ok(routesSource.includes(`"${slug}"`), `Missing route data for ${path}.`);

  const builtHtmlPath = join(root, ".next/server/app/en", `${slug}.html`);

  if (existsSync(builtHtmlPath)) {
    const html = readFileSync(builtHtmlPath, "utf8");
    const bodyHtml = html.split("</head>")[1] ?? html;
    const visibleHtml = bodyHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    const todayOccurrences =
      count(visibleHtml, /Today&#x27;s departures/g) +
      count(visibleHtml, /Today's departures/g);
    const scheduleDataOccurrences = count(visibleHtml, /Schedule data/g);
    const stationInformationOccurrences = count(visibleHtml, /Station information/g);
    const questionsOccurrences = count(visibleHtml, /Questions/g);

    assert.equal(
      count(visibleHtml, /<h1\b/g),
      1,
      `${path} must render exactly one visible H1.`,
    );
    assert.equal(
      todayOccurrences,
      1,
      `${path} must render Today's departures exactly once.`,
    );
    assert.equal(
      scheduleDataOccurrences,
      1,
      `${path} must render Schedule data exactly once.`,
    );
    assert.equal(
      stationInformationOccurrences,
      1,
      `${path} must render Station information exactly once.`,
    );
    assert.equal(
      questionsOccurrences,
      1,
      `${path} must render Questions exactly once.`,
    );
    assert.equal(
      count(visibleHtml, /Route summary/g),
      0,
      `${path} must not render the removed Route summary card.`,
    );
    assert.ok(
      visibleHtml.includes("150 km") ||
        visibleHtml.includes("120 km") ||
        visibleHtml.includes("155 km"),
      `${path} must still show route distance near the travel time.`,
    );
    assert.ok(
      visibleHtml.includes("Book ticket") ||
        visibleHtml.includes("Check availability") ||
        visibleHtml.includes("Check live seats &amp; prices") ||
        visibleHtml.includes("Check live seats & prices"),
      `${path} must keep the visible affiliate CTA.`,
    );
    assert.ok(
      visibleHtml.includes("Some booking links may be affiliate links."),
      `${path} must keep the affiliate disclosure.`,
    );
    assert.ok(
      visibleHtml.includes("Next bus"),
      `${path} must keep the next bus UI.`,
    );

    const stationTipSample = stationTipSamplesByRoute.get(path);

    if (stationTipSample) {
      assert.equal(
        count(visibleHtml, new RegExp(escapeRegExp(stationTipSample), "g")),
        1,
        `${path} must render station tips once, without mobile/desktop duplicate content.`,
      );
    }
  }
}

assert.equal(
  count(mobileDecisionSource, /<h1\b/g),
  1,
  "The route decision card must render exactly one H1.",
);
assert.equal(
  count(routeLayoutSource, /<h1\b/g),
  0,
  "RoutePageLayout must not render a second H1 outside the route decision card.",
);

assert.equal(
  count(routeLayoutSource, /<MobileRouteDecisionCard\b/g),
  1,
  "Route pages must render the main route layout exactly once.",
);
assert.equal(
  count(routeLayoutSource, /<RouteSummary\b/g),
  0,
  "Route summary must not be rendered as a separate card.",
);
assert.equal(
  count(routeLayoutSource, /<StationCard\b/g),
  1,
  "Station information content must be declared once in RoutePageLayout.",
);
assert.equal(
  count(routeLayoutSource, /<FAQ\b/g),
  1,
  "FAQ/questions content must be declared once in RoutePageLayout.",
);
assert.ok(
  !routeLayoutSource.includes('className="hidden md:block"'),
  "Route detail sections must not render duplicate desktop-only copies.",
);
assert.ok(
  routeLayoutSource.includes("lg:grid lg:grid-cols-[minmax(0,1fr)_380px]"),
  "Route pages must use a two-column desktop grid.",
);
assert.ok(
  routeLayoutSource.includes("lg:sticky lg:top-24"),
  "Route pages must keep a sticky desktop booking panel below the header.",
);
assert.ok(
  routeLayoutSource.includes("DesktopRouteBookingPanel"),
  "Route pages must render the desktop booking CTA panel.",
);
assert.ok(
  mobileDecisionSource.includes('data-desktop-booking-panel="true"'),
  "Desktop booking panel must expose a stable test marker.",
);
assert.ok(
  mobileDecisionSource.includes('data-desktop-schedule-data="true"'),
  "Desktop route layout must show schedule data in the left column.",
);

for (const oldDesktopMarker of [
  "NextBusCard",
  "RouteSearch",
  "ScheduleList",
  "desktopRouteHeroImages",
  "hidden gap-4 md:grid",
]) {
  assert.ok(
    !routeLayoutSource.includes(oldDesktopMarker),
    `Route pages still contain the old duplicate desktop layout marker: ${oldDesktopMarker}.`,
  );
}

assert.ok(
  mobileDecisionSource.includes("scheduleLabels.title"),
  "Today's departures title must be rendered once by the single route layout.",
);
assert.ok(
  mobileDecisionSource.includes("calculatedNextDeparture.time"),
  "Next bus display must still use the shared next departure calculation.",
);
assert.ok(
  mobileDecisionSource.includes("TwelveGoAffiliateButton"),
  "12Go affiliate CTA must remain on route pages.",
);
assert.ok(
  ctaSource.includes("Some booking links may be affiliate links. Timetable information stays independent."),
  "Affiliate disclosure must remain visible near the 12Go CTA.",
);
assert.match(
  ctaSource,
  /rel="sponsored nofollow"/,
  '12Go CTA must keep rel="sponsored nofollow".',
);
assert.ok(
  !stationCardSource.includes('<span className="hidden md:inline"> {stationTip}</span>'),
  "Station tips must not render a second hidden desktop paragraph.",
);
assert.equal(
  count(stationCardSource, /stationTipPoints\.map/g),
  1,
  "Station tips should be rendered from one responsive list.",
);
assert.ok(
  stationPhotoGallerySource.includes('loading="lazy"'),
  "Station photos must be lazy-loaded.",
);
assert.ok(
  stationMiniMapSource.includes("IntersectionObserver") &&
    stationMiniMapSource.includes("shouldLoadMap"),
  "Station maps must defer iframe loading until click or viewport entry.",
);
assert.ok(
  mobileDecisionSource.includes('className="hidden rounded-2xl') &&
    mobileDecisionSource.includes("lg:block"),
  "Desktop sticky CTA must reserve a stable desktop-only panel.",
);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

console.log("Route page structure checks passed.");
