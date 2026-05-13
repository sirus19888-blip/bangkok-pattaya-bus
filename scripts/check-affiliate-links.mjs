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
  /window\.gtag\("event", "affiliate_click", event\)/,
  "Affiliate tracking must send the affiliate_click event through GA4 when available.",
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
  "homepage_hero",
  "route_top",
  "route_sticky_desktop",
  "route_after_schedule",
  "route_sticky_mobile",
]) {
  assert.ok(
    ctaSource.includes(position) || twelveGoSource.includes(position),
    `Missing affiliate CTA position ${position}.`,
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
assert.ok(
  !ctaSource.includes("preventDefault"),
  "Affiliate CTA must not call preventDefault on 12Go links.",
);

for (const { file, tag } of findBuiltTwelveGoLinks()) {
  assert.match(tag, /target="_blank"/, `${file} has a 12Go link without target="_blank".`);
  assert.match(tag, /rel="[^"]*\bsponsored\b[^"]*"/, `${file} has a 12Go link without rel sponsored.`);
  assert.match(tag, /rel="[^"]*\bnofollow\b[^"]*"/, `${file} has a 12Go link without rel nofollow.`);
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
