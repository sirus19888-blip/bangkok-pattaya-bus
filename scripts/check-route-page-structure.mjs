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
const travelerFeedbackSource = readFileSync(
  join(root, "src/components/TravelerFeedback.tsx"),
  "utf8",
);
const relatedRoutesSource = readFileSync(
  join(root, "src/components/RelatedRoutes.tsx"),
  "utf8",
);
const routesSource = readFileSync(join(root, "src/data/routes.ts"), "utf8");
const homepageSource = readFileSync(
  join(root, "src/components/HomePage.tsx"),
  "utf8",
);

const expectedEnglishRoutes = [
  "/en/bangkok-to-pattaya",
  "/en/pattaya-to-bangkok",
  "/en/suvarnabhumi-airport-to-pattaya",
  "/en/pattaya-to-suvarnabhumi-airport",
  "/en/don-mueang-airport-to-pattaya",
  "/en/pattaya-to-don-mueang-airport",
];
const routeLocales = ["en", "th", "zh", "ru", "de", "fr", "pl"];
const routeSlugs = expectedEnglishRoutes.map((path) => path.replace("/en/", ""));
const relatedRouteCheckLocales = ["en", "pl", "zh", "fr", "de", "ru", "th"];

const routeTitlesByPath = new Map([
  ["/en/bangkok-to-pattaya", "Bangkok to Pattaya Bus"],
  ["/en/pattaya-to-bangkok", "Pattaya to Bangkok Bus"],
  [
    "/en/suvarnabhumi-airport-to-pattaya",
    "Suvarnabhumi Airport to Pattaya Bus",
  ],
  [
    "/en/pattaya-to-suvarnabhumi-airport",
    "Pattaya to Suvarnabhumi Airport Bus",
  ],
  [
    "/en/don-mueang-airport-to-pattaya",
    "Don Mueang Airport to Pattaya Bus",
  ],
  [
    "/en/pattaya-to-don-mueang-airport",
    "Pattaya to Don Mueang Airport Bus",
  ],
]);

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

const cleanDesktopSwipeTextPatterns = [
  /Przesuń/,
  /Листайте/,
  /滑动/,
  /เลื่อน/,
];

const forbiddenEncodingArtifacts = [
  [0xe2, 0x20ac, 0x02d8],
  [0x50, 0x6f, 0x6b, 0x61, 0x0139, 0x013d],
  [0x77, 0x69, 0x00c4, 0x2122, 0x63, 0x65, 0x6a],
  [0x0110, 0x017a, 0x0110, 0x013e],
  [0x0110, 0x00b5, 0x0143],
].map((codes) => String.fromCodePoint(...codes));

function count(source, pattern) {
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

for (const locale of routeLocales) {
  for (const slug of routeSlugs) {
    const builtHtmlPath = join(root, ".next/server/app", locale, `${slug}.html`);

    if (!existsSync(builtHtmlPath)) {
      continue;
    }

    const html = readFileSync(builtHtmlPath, "utf8");

    for (const artifact of forbiddenEncodingArtifacts) {
      assert.ok(
        !html.includes(artifact),
        `/${locale}/${slug} HTML must not contain encoding artifact: ${artifact}`,
      );
    }

    if (locale === "en" && slug === "suvarnabhumi-airport-to-pattaya") {
      const text = normalizeText(toTextContent(html));
      const cleanDurationAndDistance = `Around 2-2.5 hours ${String.fromCodePoint(
        0x2022,
      )} 120 km`;

      assert.ok(
        text.includes(cleanDurationAndDistance),
        "/en/suvarnabhumi-airport-to-pattaya must render clean travel time and distance text.",
      );
    }
  }
}

for (const path of expectedEnglishRoutes) {
  const slug = path.replace("/en/", "");
  assert.ok(routesSource.includes(`"${slug}"`), `Missing route data for ${path}.`);

  const builtHtmlPath = join(root, ".next/server/app/en", `${slug}.html`);

  if (existsSync(builtHtmlPath)) {
    const html = readFileSync(builtHtmlPath, "utf8");
    const bodyHtml = html.split("</head>")[1] ?? html;
    const visibleHtml = bodyHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    const desktopVisibleHtml = stripDesktopHidden(visibleHtml);
    const todayOccurrences =
      count(visibleHtml, /Today&#x27;s departures/g) +
      count(visibleHtml, /Today's departures/g);
    const scheduleDataOccurrences = count(visibleHtml, /data-schedule-data="true"/g);
    const stationInformationOccurrences = count(visibleHtml, /Station information/g);
    const questionsOccurrences = count(visibleHtml, /Questions/g);

    assert.equal(
      count(visibleHtml, /<h1\b/g),
      1,
      `${path} must render exactly one visible H1.`,
    );
    const routeTitle = routeTitlesByPath.get(path);

    if (routeTitle) {
      assert.equal(
        count(
          visibleHtml,
          new RegExp(`<h2[^>]*>\\s*${escapeRegExp(routeTitle)}\\s*</h2>`, "g"),
        ),
        0,
        `${path} desktop sidebar must not repeat the route title as an H2.`,
      );
    }
    for (const pattern of [
      ...desktopSwipeTextPatterns,
      ...cleanDesktopSwipeTextPatterns,
    ]) {
      assert.ok(
        !pattern.test(desktopVisibleHtml),
        `${path} desktop HTML must not show mobile swipe hint text: ${pattern}`,
      );
    }
    for (const artifact of forbiddenEncodingArtifacts) {
      assert.ok(
        !visibleHtml.includes(artifact),
        `${path} HTML must not contain mojibake artifact: ${artifact}`,
      );
    }
    assert.ok(
      !visibleHtml.includes("Station map Use this map"),
      `${path} station map text must not be glued together.`,
    );
    for (const stationMapId of [
      "station-map-ekkamai",
      "station-map-north-pattaya",
      "station-map-mo-chit",
      "station-map-suvarnabhumi-airport",
      "station-map-jomtien-bus-area",
      "station-map-don-mueang-airport",
      "station-map-pattaya-sukhumvit",
    ]) {
      assert.ok(
        count(visibleHtml, new RegExp(`id="${stationMapId}"`, "g")) <= 1,
        `${path} must render at most one station map component for ${stationMapId}.`,
      );
    }
    assert.ok(
      !visibleHtml.includes("Enlarge station map Enlarge station map") &&
        !visibleHtml.includes("Powiększ mapę stacji Powiększ mapę stacji"),
      `${path} station map enlarge button text must not be duplicated.`,
    );
    assert.ok(
      !visibleHtml.includes("Pattaya to Bangkok Bus Bus route") &&
        !visibleHtml.includes("Bangkok to Pattaya Bus Bus route") &&
        !visibleHtml.includes("Autobus Pattaya do Bangkok Trasa autobusowa") &&
        !visibleHtml.includes("Autobus Bangkok do Pattaya Trasa autobusowa"),
      `${path} related route cards must not glue duplicate route labels together.`,
    );
    const normalizedVisibleText = normalizeText(toTextContent(visibleHtml));

    for (const gluedRelatedRouteText of [
      "Bus Plan the return",
      "Autobus z Pattayi do Bangkoku Zaplanuj",
      "芭提雅到曼谷巴士 规划",
    ]) {
      assert.ok(
        !normalizedVisibleText.includes(gluedRelatedRouteText),
        `${path} related routes must separate title and description: ${gluedRelatedRouteText}`,
      );
    }
    assert.ok(
      visibleHtml.includes("<ul") && visibleHtml.includes("</ul>"),
      `${path} related routes and repeated route cards should use semantic lists.`,
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
      visibleHtml.includes("desktop_sidebar"),
      `${path} must track the desktop sidebar CTA position.`,
    );
    assert.ok(
      visibleHtml.includes("Next bus"),
      `${path} must keep the next bus UI.`,
    );
    assert.ok(
      visibleHtml.includes('data-feedback-actions="true"'),
      `${path} must keep feedback actions as separate controls.`,
    );
    assert.equal(
      count(visibleHtml, /data-feedback-action=/g),
      2,
      `${path} must render helpful and report feedback as two separate action elements.`,
    );
    assert.ok(
      !toTextContent(visibleHtml).includes(
        "Yes, it helpedReport outdated times",
      ),
      `${path} feedback action labels must not be glued together in textContent.`,
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

for (const locale of relatedRouteCheckLocales) {
  const builtHtmlPath = join(
    root,
    ".next/server/app",
    locale,
    "bangkok-to-pattaya.html",
  );

  if (!existsSync(builtHtmlPath)) {
    continue;
  }

  const html = readFileSync(builtHtmlPath, "utf8");
  const visibleHtml = html
    .split("</head>")[1]
    ?.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "") ?? html;

  assert.ok(
    visibleHtml.includes("<ul") &&
      visibleHtml.includes("<li") &&
      visibleHtml.includes('class="title') &&
      visibleHtml.includes('class="description') &&
      visibleHtml.includes("aria-label="),
    `/${locale}/bangkok-to-pattaya related routes must render semantic cards with title, description, CTA/aria-label.`,
  );

  for (const gluedRelatedRouteText of [
    "Bus Plan the return",
    "Autobus z Pattayi do Bangkoku Zaplanuj",
    "芭提雅到曼谷巴士 规划",
    "Pattaya à Bangkok Planifier",
    "Bus von Pattaya nach Bangkok Rückfahrt",
    "Автобус из Паттайи в Бангкок Запланируйте",
  ]) {
    assert.ok(
      !normalizeText(toTextContent(visibleHtml)).includes(gluedRelatedRouteText),
      `/${locale}/bangkok-to-pattaya related route text must not be glued: ${gluedRelatedRouteText}`,
    );
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
  mobileDecisionSource.includes("{sidebarTitle}") &&
    !mobileDecisionSource.includes("{routeTitle}\n      </h2>"),
  "Desktop booking panel must use a commercial sidebar title, not the route H2.",
);
assert.ok(
  mobileDecisionSource.includes('data-schedule-data="true"'),
  "Desktop route layout must show schedule data in the left column.",
);
assert.ok(
  !homepageSource.includes("{copy.swipe}"),
  "Homepage must not render textual swipe hints in shared markup.",
);
assert.ok(
  !stationCardSource.includes("<span>Swipe</span>") &&
    !stationPhotoGallerySource.includes("Swipe to see more"),
  "Station sections must not render textual swipe hints.",
);
assert.ok(
  stationCardSource.includes("getShowMoreLabel") &&
    stationCardSource.includes("md:hidden"),
  "Station tips must keep a localized mobile Show more control.",
);
const stationShowMoreLabels = {
  de: "Mehr anzeigen",
  fr: "Voir plus",
  pl: String.fromCodePoint(
    0x50,
    0x6f,
    0x6b,
    0x61,
    0x017c,
    0x20,
    0x77,
    0x69,
    0x0119,
    0x63,
    0x65,
    0x6a,
  ),
  ru: String.fromCodePoint(
    0x041f,
    0x043e,
    0x043a,
    0x0430,
    0x0437,
    0x0430,
    0x0442,
    0x044c,
    0x20,
    0x0435,
    0x0449,
    0x0451,
  ),
  th: String.fromCodePoint(
    0x0e14,
    0x0e39,
    0x0e40,
    0x0e1e,
    0x0e34,
    0x0e48,
    0x0e21,
    0x0e40,
    0x0e15,
    0x0e34,
    0x0e21,
  ),
  zh: String.fromCodePoint(0x67e5, 0x770b, 0x66f4, 0x591a),
};

assert.ok(
  Object.entries(stationShowMoreLabels).every(([locale, label]) =>
    stationCardSource.includes(`${locale}: "${label}"`),
  ),
  "Mobile Station information must keep clean localized Show more labels.",
);
assert.ok(
  stationPhotoGallerySource.includes("mobilePreviewLimit") &&
    stationPhotoGallerySource.includes("mobileShowAll") &&
    stationPhotoGallerySource.includes("hidden md:block"),
  "Mobile Station information must preview one photo and reveal the rest with Show more.",
);
assert.ok(
  stationCardSource.includes("stationTipPoints.length > 3") &&
    stationCardSource.includes("mobilePreviewLimit={1}") &&
    stationCardSource.includes("isExpanded ? \"block\" : \"hidden md:block\"") &&
    stationCardSource.includes("labels.openInGoogleMaps"),
  "Mobile Station information must show 2-3 tips, one photo, Google Maps, and hide extended details behind Show more.",
);
assert.equal(
  count(stationCardSource, /<StationMiniMap\b/g),
  1,
  "Station information must render one StationMiniMap component per station and use CSS for mobile/desktop layout.",
);
assert.ok(
  relatedRoutesSource.includes("<ul") &&
    relatedRoutesSource.includes("<li") &&
    relatedRoutesSource.includes('className="title') &&
    relatedRoutesSource.includes('className="description') &&
    relatedRoutesSource.includes('<span className="sr-only">. </span>') &&
    relatedRoutesSource.includes("getRelatedRouteCtaLabel") &&
    relatedRoutesSource.includes("aria-label"),
  "Related routes must render semantic cards with separated title, description, CTA, and aria-label.",
);
assert.ok(
  travelerFeedbackSource.includes('className="grid gap-3') &&
    travelerFeedbackSource.includes('data-feedback-action="helpful"') &&
    travelerFeedbackSource.includes('data-feedback-action="report_outdated"') &&
    travelerFeedbackSource.includes("<button") &&
    travelerFeedbackSource.includes("<a") &&
    travelerFeedbackSource.includes('trackEvent("feedback_helpful_click"') &&
    travelerFeedbackSource.includes('trackEvent("report_outdated_click"'),
  "Feedback actions must be separated and tracked.",
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
  ctaSource.includes("disclosureText") &&
    ctaSource.includes("shortDisclosureText"),
  "Affiliate disclosure must be supplied to the 12Go CTA.",
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
assert.ok(
  !stationCardSource.includes('<ul className="space-y-2 md:hidden">') &&
    stationCardSource.includes('<div className="md:hidden">'),
  "Mobile station name and best-for metadata must be header/meta content, not duplicate bullet points.",
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

function toTextContent(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

console.log("Route page structure checks passed.");
