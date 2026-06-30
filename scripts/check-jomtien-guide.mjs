import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { cwd } from "node:process";
import vm from "node:vm";
import React from "react";
import ts from "typescript";

const root = cwd();
const moduleRequire = createRequire(import.meta.url);
const slug = "pattaya-bus-station-to-jomtien";
const path = `/en/${slug}`;
const canonicalUrl = `https://www.bangkokpattayabus.com${path}`;
const expectedSubId = "bpb-pattaya-to-suvarnabhumi-guide_jomtien";
const expectedHref = `https://12go.asia/en/travel/pattaya/suvarnabhumi-airport?z=15791301&sub_id=${expectedSubId}`;
const htmlPath = join(root, ".next/server/app/en", `${slug}.html`);
const sitemapPath = join(root, ".next/server/app/sitemap.xml.body");
const affiliateCtaSource = readFileSync(
  join(root, "src/components/AffiliateCTA.tsx"),
  "utf8",
);

assert(
  existsSync(htmlPath),
  "Jomtien guide must be prerendered as a 200 HTML page. Run npm run build first.",
);

const html = readFileSync(htmlPath, "utf8");
const head = html.split("</head>")[0] ?? html;
const h1Matches = html.match(/<h1\b/gi) ?? [];

assert.equal(h1Matches.length, 1, "Jomtien guide must render exactly one H1.");
assert.match(
  html,
  /Pattaya Bus Station to Jomtien Guide/,
  "Guide H1 must be present in the HTML.",
);
assert.match(
  head,
  /<title>Pattaya Bus Station to Jomtien: Taxi, Songthaew &amp; Transfer Guide<\/title>/,
  "Guide must render the requested meta title.",
);
assert.match(
  head,
  /Practical guide to getting from North Pattaya Bus Station to Jomtien, including taxi, songthaew, Grab\/Bolt, travel time and airport bus connection tips\./,
  "Guide must render the requested meta description.",
);
assert.match(
  head,
  new RegExp(`<link[^>]+rel="canonical"[^>]+href="${escapeRegExp(canonicalUrl)}"`),
  "Guide must have a canonical self URL.",
);
assert.match(
  html,
  /href="\/en\/bangkok-to-pattaya"/,
  "Guide must link internally to the Bangkok to Pattaya route page.",
);
assert.match(
  html,
  /href="\/en\/pattaya-to-bangkok"/,
  "Guide must link internally to the Pattaya to Bangkok route page.",
);
assert.match(
  html,
  /href="\/en\/pattaya-to-suvarnabhumi-airport"/,
  "Guide must link internally to the Pattaya to Suvarnabhumi Airport route page.",
);
assert.match(
  html,
  /Is North Pattaya Bus Station the same as Jomtien Bus Station\?/,
  "Guide FAQ question must be present in HTML.",
);
assert.match(
  html,
  /No\. North Pattaya Bus Station is in North Pattaya, while the Jomtien bus station or Thappraya airport bus area is farther south\./,
  "Guide FAQ answer must be present in HTML.",
);

const guideCta = findAnchorByText(
  html,
  "Check Pattaya → Suvarnabhumi Airport tickets",
  "guide_body",
);

assert(guideCta, "Guide must render the requested 12Go CTA.");
assert.match(
  guideCta,
  /href="https:\/\/12go\.asia\/en\/travel\/pattaya\/suvarnabhumi-airport\?[^"]*"/,
  "Guide 12Go CTA must use the Pattaya to Suvarnabhumi Airport deep link.",
);
assert.match(
  guideCta,
  /rel="[^"]*\bsponsored\b[^"]*\bnofollow\b[^"]*"/,
  'Guide 12Go CTA must use rel="sponsored nofollow".',
);
assert.match(
  guideCta,
  /target="_blank"/,
  'Guide 12Go CTA must use target="_blank".',
);
assert.match(
  guideCta.replace(/&amp;/g, "&"),
  new RegExp(`sub_id=${escapeRegExp(expectedSubId)}`),
  "Guide 12Go CTA must use the requested guide-specific sub_id.",
);
assert.match(
  guideCta,
  /data-affiliate-cta-position="guide_body"/,
  "Guide 12Go CTA must expose cta_position guide_body.",
);

assert(existsSync(sitemapPath), "Built sitemap is missing. Run npm run build first.");
assert.match(
  readFileSync(sitemapPath, "utf8"),
  new RegExp(`<loc>${escapeRegExp(canonicalUrl)}</loc>`),
  "Guide URL must be included in sitemap.xml.",
);

const clickTest = simulateAffiliateClickForTest({
  ctaPosition: "guide_body",
  disclosureText:
    "Some booking links may be affiliate links. Timetable information stays independent.",
  from: "pattaya",
  href: expectedHref,
  label: "Check Pattaya → Suvarnabhumi Airport tickets",
  lang: "en",
  provider: "12go",
  routeId: "pattaya-to-suvarnabhumi-airport",
  shortDisclosureText: "Affiliate link",
  subId: expectedSubId,
  to: "suvarnabhumi-airport",
  variant: "afterSchedule",
});

assert.deepEqual(
  JSON.parse(JSON.stringify(clickTest.events[0])),
  {
    cta_position: "guide_body",
    from: "pattaya",
    href: expectedHref,
    lang: "en",
    provider: "12go",
    route_id: "pattaya-to-suvarnabhumi-airport",
    sub_id: expectedSubId,
    to: "suvarnabhumi-airport",
  },
  "Guide CTA must send affiliate_click with cta_position guide_body.",
);
assert.equal(
  clickTest.preventDefaultCalled,
  false,
  "Guide CTA click must not block 12Go navigation.",
);

console.log("Jomtien guide checks passed.");

function findAnchorByText(source, text, ctaPosition) {
  const anchors = source.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) ?? [];

  return anchors.find(
    (anchor) =>
      stripTags(anchor).includes(text) &&
      (!ctaPosition ||
        anchor.includes(`data-affiliate-cta-position="${ctaPosition}"`)),
  );
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function simulateAffiliateClickForTest(props) {
  const events = [];
  const affiliateModule = loadAffiliateCTAModuleForTest((event) => {
    events.push(event);
  });
  const element = affiliateModule.AffiliateCTA(props);
  const anchor = findReactElementByType(element, "a");
  let preventDefaultCalled = false;

  assert(anchor, "Rendered AffiliateCTA must include a clickable anchor.");

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
  const transformed = ts.transpileModule(affiliateCtaSource, {
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function requireFromRoot(request) {
  return moduleRequire(request);
}
