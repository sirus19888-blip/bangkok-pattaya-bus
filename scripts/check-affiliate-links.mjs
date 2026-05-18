import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import vm from "node:vm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { createRequire } from "node:module";

const root = cwd();
const moduleRequire = createRequire(import.meta.url);
const buttonSource = readFileSync(
  join(root, "src/components/TwelveGoAffiliateButton.tsx"),
  "utf8",
);
const ctaSource = readFileSync(join(root, "src/components/AffiliateCTA.tsx"), "utf8");
const analyticsSource = readFileSync(join(root, "src/lib/analytics.ts"), "utf8");
const affiliateRouteSource = readFileSync(
  join(root, "src/data/affiliateRoutes.ts"),
  "utf8",
);
const twelveGoSource = readFileSync(join(root, "src/lib/twelveGo.ts"), "utf8");
const requiredAffiliatePositions = [
  "guide_body",
  "guide_sidebar",
  "homepage_hero",
  "homepage_route_card",
  "route_after_schedule",
  "route_commercial_help",
  "desktop_sidebar",
  "mobile_sticky",
];
const requiredBuiltAffiliatePositions = requiredAffiliatePositions.filter(
  (position) => position !== "guide_sidebar",
);
const renderedAffiliateCTA = renderAffiliateCTAForTest({
  disclosureText:
    "Some booking links may be affiliate links. Timetable information stays independent.",
  from: "bangkok",
  href: "https://12go.asia/en/travel/bangkok/pattaya?z=15791301",
  label: "Tickets and alternatives on 12Go",
  lang: "en",
  provider: "12go",
  routeId: "bangkok-to-pattaya",
  shortDisclosureText: "Affiliate link",
  subId: "bpb-bangkok-to-pattaya",
  to: "pattaya",
  variant: "top",
});
const clickTest = simulateAffiliateClickForTest({
  disclosureText:
    "Some booking links may be affiliate links. Timetable information stays independent.",
  from: "bangkok",
  href: "https://12go.asia/en/travel/bangkok/pattaya?z=15791301",
  label: "Tickets and alternatives on 12Go",
  lang: "en",
  provider: "12go",
  routeId: "bangkok-to-pattaya",
  shortDisclosureText: "Affiliate link",
  subId: "bpb-bangkok-to-pattaya",
  to: "pattaya",
  variant: "afterSchedule",
});
const desktopSidebarClickTest = simulateAffiliateClickForTest({
  ctaPosition: "desktop_sidebar",
  disclosureText:
    "Some booking links may be affiliate links. Timetable information stays independent.",
  from: "bangkok",
  href: "https://12go.asia/en/travel/bangkok/pattaya?z=15791301",
  label: "Check availability",
  lang: "en",
  provider: "12go",
  routeId: "bangkok-to-pattaya",
  shortDisclosureText: "Affiliate link",
  subId: "bpb-bangkok-to-pattaya-desktop_sidebar",
  to: "pattaya",
  variant: "top",
});
const mobileStickyClickTest = simulateAffiliateClickForTest({
  ctaPosition: "mobile_sticky",
  disclosureText:
    "Some booking links may be affiliate links. Timetable information stays independent.",
  from: "bangkok",
  href: "https://12go.asia/en/travel/bangkok/pattaya?z=15791301",
  label: "Book ticket",
  lang: "en",
  provider: "12go",
  routeId: "bangkok-to-pattaya",
  shortDisclosureText: "Affiliate link",
  subId: "bpb-bangkok-to-pattaya-mobile_sticky",
  to: "pattaya",
  variant: "stickyMobile",
});
const requiredPositionClickTests = requiredAffiliatePositions.map((position) =>
  simulateAffiliateClickForTest({
    ctaPosition: position,
    disclosureText:
      "Some booking links may be affiliate links. Timetable information stays independent.",
    from: "bangkok",
    href: `https://12go.asia/en/travel/bangkok/pattaya?z=15791301&sub_id=bpb-bangkok-to-pattaya-${position}`,
    label: "Tickets and alternatives on 12Go",
    lang: "en",
    provider: "12go",
    routeId: "bangkok-to-pattaya",
    shortDisclosureText: "Affiliate link",
    subId: `bpb-bangkok-to-pattaya-${position}`,
    to: "pattaya",
    variant: position === "mobile_sticky" ? "stickyMobile" : "afterSchedule",
  }),
);

assert.match(
  ctaSource,
  /rel="sponsored nofollow"/,
  'Every rendered 12Go affiliate link must use rel="sponsored nofollow".',
);
assert.match(
  ctaSource,
  /target="_blank"/,
  'Every rendered 12Go affiliate link must use target="_blank".',
);
assert.ok(
  !buttonSource.includes("noopener noreferrer sponsored") &&
    !ctaSource.includes("noopener noreferrer sponsored"),
  "12Go links must not use the old rel value.",
);
assert.match(
  ctaSource,
  /disclosureText\?: string/,
  "Affiliate CTA must receive the independent timetable disclosure from i18n.",
);
assert.match(
  analyticsSource,
  /window\.gtag\("event", "affiliate_click", \{\s*send_to: "G-0DYTH1TLGB",[\s\S]*\.\.\.params,/,
  "Affiliate tracking must send affiliate_click directly through window.gtag with the hardcoded GA4 ID.",
);
for (const parameter of [
  "route_id",
  "from",
  "to",
  "lang",
  "provider",
  "cta_position",
  "sub_id",
  "href",
]) {
  assert.ok(
    analyticsSource.includes(parameter) || ctaSource.includes(parameter),
    `Affiliate click tracking is missing ${parameter}.`,
  );
}
assert.match(
  ctaSource,
  /onClick=\{\(\) =>\s*trackAffiliateClick\(\{/,
  "Clicking an affiliate CTA must call trackAffiliateClick.",
);
assert.match(
  ctaSource,
  /cta_position: ctaPosition \?\? variant/,
  "Affiliate click tracking must include the CTA position.",
);
assert.match(
  ctaSource,
  /route_id: routeId/,
  "Affiliate click tracking must include the route ID.",
);
assert.match(
  ctaSource,
  /provider,/,
  "Affiliate click tracking must include the provider.",
);
assert.match(ctaSource, /"top"/, "Affiliate CTA must support top variant.");
assert.match(
  ctaSource,
  /"afterSchedule"/,
  "Affiliate CTA must support afterSchedule variant.",
);
assert.match(
  ctaSource,
  /"stickyMobile"/,
  "Affiliate CTA must support stickyMobile variant.",
);
assert.match(
  ctaSource,
  /"afterFaq"/,
  "Affiliate CTA must support afterFaq variant.",
);
assert.match(
  ctaSource,
  /md:static/,
  "Sticky affiliate CTA must become a normal inline CTA on desktop.",
);
assert.ok(
  !ctaSource.includes("fixed bottom"),
  "Sticky affiliate CTA must not be fixed over the schedule.",
);
assert.match(
  twelveGoSource,
  /build12GoRouteUrl\(\s*routeId: RouteId,\s*lang: LocaleCode,\s*subIdPosition\?: string,/,
  "12Go links must be built per route, locale, and CTA position.",
);

const requiredRoutes = [
  "bangkok-to-pattaya",
  "pattaya-to-bangkok",
  "suvarnabhumi-airport-to-pattaya",
  "pattaya-to-suvarnabhumi-airport",
  "don-mueang-airport-to-pattaya",
  "pattaya-to-don-mueang-airport",
];

for (const routeId of requiredRoutes) {
  assert.ok(
    affiliateRouteSource.includes(`"${routeId}"`),
    `Missing 12Go affiliate config for ${routeId}.`,
  );
  assert.ok(
    affiliateRouteSource.includes(`subId: \`bpb-\${routeId}\``),
    `Missing subId template for ${routeId}.`,
  );
}

assert.match(
  affiliateRouteSource,
  /deepLinkUrl: `https:\/\/12go\.asia\/\$\{lang\}\/travel\/\$\{route\.from\}\/\$\{route\.to\}`/,
  "Affiliate config must generate route-specific 12Go deep links.",
);
assert.match(
  twelveGoSource,
  /`\$\{affiliateRoute\.subId\}-\$\{subIdPosition\}`/,
  "12Go sub_id must include the CTA position when provided.",
);
for (const position of [
  "guide_body",
  "guide_sidebar",
  "homepage_hero",
  "homepage_route_card",
  "route_top",
  "desktop_sidebar",
  "route_after_schedule",
  "route_commercial_help",
  "mobile_sticky",
]) {
  assert.ok(
    ctaSource.includes(position) || twelveGoSource.includes(position),
    `Missing affiliate CTA position ${position}.`,
  );
}
for (const [index, position] of requiredAffiliatePositions.entries()) {
  assert.deepEqual(
    JSON.parse(JSON.stringify(requiredPositionClickTests[index].events[0])),
    {
      cta_position: position,
      from: "bangkok",
      href: `https://12go.asia/en/travel/bangkok/pattaya?z=15791301&sub_id=bpb-bangkok-to-pattaya-${position}`,
      lang: "en",
      provider: "12go",
      route_id: "bangkok-to-pattaya",
      sub_id: `bpb-bangkok-to-pattaya-${position}`,
      to: "pattaya",
    },
    `Affiliate click tracking must include the full payload for ${position}.`,
  );
  assert.equal(
    requiredPositionClickTests[index].preventDefaultCalled,
    false,
    `Affiliate CTA click for ${position} must not block 12Go navigation.`,
  );
}
assert.match(
  renderedAffiliateCTA,
  /href="https:\/\/12go\.asia\/en\/travel\/bangkok\/pattaya\?z=15791301"/,
  "Rendered AffiliateCTA must include the correct deep link href.",
);
assert.match(
  renderedAffiliateCTA,
  /rel="[^"]*\bsponsored\b[^"]*"/,
  'Rendered AffiliateCTA rel must include "sponsored".',
);
assert.match(
  renderedAffiliateCTA,
  /rel="[^"]*\bnofollow\b[^"]*"/,
  'Rendered AffiliateCTA rel must include "nofollow".',
);
assert.match(
  renderedAffiliateCTA,
  /target="_blank"/,
  'Rendered AffiliateCTA must use target="_blank".',
);
assert.match(
  renderedAffiliateCTA,
  /data-affiliate-provider="12go"/,
  'Rendered AffiliateCTA must mark the link with data-affiliate-provider="12go".',
);
assert.match(
  renderedAffiliateCTA,
  /data-affiliate-sub-id="bpb-bangkok-to-pattaya"/,
  "Rendered AffiliateCTA must expose the affiliate sub_id on the link.",
);
assert.match(
  renderedAffiliateCTA,
  /Some booking links may be affiliate links\. Timetable information stays independent\./,
  "Rendered AffiliateCTA must show the disclosure next to the CTA.",
);
assert.equal(
  clickTest.preventDefaultCalled,
  false,
  "Affiliate CTA click must not block navigation to 12Go.",
);
assert.equal(
  clickTest.events.length,
  1,
  "Clicking AffiliateCTA must send exactly one affiliate tracking event.",
);
assert.deepEqual(
  JSON.parse(JSON.stringify(clickTest.events[0])),
  {
    cta_position: "afterSchedule",
    from: "bangkok",
    href: "https://12go.asia/en/travel/bangkok/pattaya?z=15791301",
    lang: "en",
    provider: "12go",
    route_id: "bangkok-to-pattaya",
    sub_id: "bpb-bangkok-to-pattaya",
    to: "pattaya",
  },
  "Affiliate click tracking must include the full affiliate_click payload.",
);
assert.deepEqual(
  JSON.parse(JSON.stringify(desktopSidebarClickTest.events[0])),
  {
    cta_position: "desktop_sidebar",
    from: "bangkok",
    href: "https://12go.asia/en/travel/bangkok/pattaya?z=15791301",
    lang: "en",
    provider: "12go",
    route_id: "bangkok-to-pattaya",
    sub_id: "bpb-bangkok-to-pattaya-desktop_sidebar",
    to: "pattaya",
  },
  "Desktop sidebar affiliate CTA must send cta_position desktop_sidebar.",
);
assert.deepEqual(
  JSON.parse(JSON.stringify(mobileStickyClickTest.events[0])),
  {
    cta_position: "mobile_sticky",
    from: "bangkok",
    href: "https://12go.asia/en/travel/bangkok/pattaya?z=15791301",
    lang: "en",
    provider: "12go",
    route_id: "bangkok-to-pattaya",
    sub_id: "bpb-bangkok-to-pattaya-mobile_sticky",
    to: "pattaya",
  },
  "Mobile sticky affiliate CTA must send cta_position mobile_sticky.",
);
assert.ok(
  !ctaSource.includes("preventDefault"),
  "Affiliate CTA must not call preventDefault on 12Go links.",
);

const builtTwelveGoLinks = findBuiltTwelveGoLinks();
const builtAffiliatePositions = new Set();

assert.ok(
  builtTwelveGoLinks.length > 0,
  "The built app must contain rendered 12Go affiliate links.",
);

for (const { file, tag } of builtTwelveGoLinks) {
  assert.match(tag, /target="_blank"/, `${file} has a 12Go link without target="_blank".`);
  assert.match(tag, /rel="[^"]*\bsponsored\b[^"]*"/, `${file} has a 12Go link without rel sponsored.`);
  assert.match(tag, /rel="[^"]*\bnofollow\b[^"]*"/, `${file} has a 12Go link without rel nofollow.`);
  assert.match(
    tag,
    /data-affiliate-provider="12go"/,
    `${file} has a 12Go link without data-affiliate-provider="12go".`,
  );

  const href = getHrefFromAnchorTag(tag);
  const url = new URL(href);
  const subId = url.searchParams.get("sub_id");
  const position = subId ? getAffiliatePositionFromSubId(subId) : null;

  assert.ok(subId, `${file} has a 12Go link without sub_id.`);
  assert.match(
    tag,
    new RegExp(`data-affiliate-sub-id="${escapeRegExp(subId)}"`),
    `${file} has a 12Go link whose data-affiliate-sub-id does not match href sub_id ${subId}.`,
  );
  assert.ok(
    position,
    `${file} has a 12Go link with an invalid position-specific sub_id: ${subId}.`,
  );
  builtAffiliatePositions.add(position);
}

for (const position of requiredBuiltAffiliatePositions) {
  assert.ok(
    builtAffiliatePositions.has(position),
    `Built 12Go links must include the ${position} sub_id position.`,
  );
}

console.log("Affiliate link checks passed.");

function renderAffiliateCTAForTest(props) {
  const affiliateModule = loadAffiliateCTAModuleForTest();

  return renderToStaticMarkup(React.createElement(affiliateModule.AffiliateCTA, props));
}

function simulateAffiliateClickForTest(props) {
  const events = [];
  const affiliateModule = loadAffiliateCTAModuleForTest((event) => {
    events.push(event);
  });
  const element = affiliateModule.AffiliateCTA(props);
  const anchor = findReactElementByType(element, "a");
  let preventDefaultCalled = false;

  assert.ok(anchor, "Rendered AffiliateCTA must include a clickable anchor.");
  assert.equal(anchor.props.href, props.href, "Clicked AffiliateCTA must keep the 12Go href.");
  assert.equal(anchor.props.target, "_blank", "Clicked AffiliateCTA must open in a new tab.");

  anchor.props.onClick({
    preventDefault() {
      preventDefaultCalled = true;
    },
  });

  return {
    events,
    preventDefaultCalled,
  };
}

function loadAffiliateCTAModuleForTest(trackAffiliateClick = () => {}) {
  const transformed = ts.transpileModule(ctaSource, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: "AffiliateCTA.tsx",
  }).outputText;
  const cjsModule = { exports: {} };
  const sandbox = {
    exports: cjsModule.exports,
    module: cjsModule,
    require: (request) => {
      if (request === "react/jsx-runtime") {
        return requireFromRoot("react/jsx-runtime");
      }

      if (request === "next/image") {
        return {
          __esModule: true,
          default: function Image(imageProps) {
            const imgProps = { ...imageProps };
            delete imgProps.fill;
            delete imgProps.priority;

            return React.createElement("img", imgProps);
          },
        };
      }

      if (request === "@/lib/analytics") {
        return {
          trackAffiliateClick,
        };
      }

      return requireFromRoot(request);
    },
  };

  vm.runInNewContext(transformed, sandbox, {
    filename: "AffiliateCTA.cjs",
  });

  return cjsModule.exports;
}

function findReactElementByType(element, type) {
  if (!element || typeof element !== "object") {
    return null;
  }

  if (element.type === type) {
    return element;
  }

  const children = React.Children.toArray(element.props?.children);

  for (const child of children) {
    const match = findReactElementByType(child, type);

    if (match) {
      return match;
    }
  }

  return null;
}

function findBuiltTwelveGoLinks() {
  const builtAppRoot = join(root, ".next/server/app");
  const tags = [];

  collectHtmlFiles(builtAppRoot).forEach((file) => {
    const html = readFileSync(file, "utf8");
    const matches = html.match(/<a\b[^>]*href="https:\/\/12go\.asia[^"]*"[^>]*>/g) ?? [];

    for (const tag of matches) {
      tags.push({
        file,
        tag,
      });
    }
  });

  return tags;
}

function getHrefFromAnchorTag(tag) {
  const href = tag.match(/href="([^"]+)"/)?.[1];

  assert.ok(href, "Rendered 12Go anchor must include an href.");

  return href.replace(/&amp;/g, "&");
}

function getAffiliatePositionFromSubId(subId) {
  if (subId.includes("-guide_")) {
    return "guide_body";
  }

  return requiredAffiliatePositions.find((position) =>
    subId.endsWith(`-${position}`),
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function collectHtmlFiles(directory) {
  try {
    const { readdirSync, statSync } = requireFromRoot("node:fs");
    const files = [];

    for (const entry of readdirSync(directory)) {
      const fullPath = join(directory, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...collectHtmlFiles(fullPath));
      } else if (fullPath.endsWith(".html")) {
        files.push(fullPath);
      }
    }

    return files;
  } catch {
    return [];
  }
}

function requireFromRoot(request) {
  return moduleRequire(request);
}
