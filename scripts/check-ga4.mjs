import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import vm from "node:vm";
import ts from "typescript";

const root = cwd();
const layoutSourcePath = join(root, "src/app/layout.tsx");
const analyticsSourcePath = join(root, "src/lib/analytics.ts");
const layoutSource = readFileSync(layoutSourcePath, "utf8");
const analyticsSource = readFileSync(analyticsSourcePath, "utf8");
const measurementId = "G-0DYTH1TLGB";

assert.doesNotMatch(
  layoutSource,
  /import \{ GoogleAnalytics \} from "@/,
  "Root layout must not import the GoogleAnalytics component.",
);
assert.doesNotMatch(
  layoutSource,
  /<GoogleAnalytics\s*\/>/,
  "Root layout must not render the GoogleAnalytics component.",
);
assert.match(
  layoutSource,
  /import Script from "next\/script"/,
  "Root layout must import next/script directly.",
);
assert.match(
  layoutSource,
  /const GA_ID = process\.env\.NEXT_PUBLIC_GA_MEASUREMENT_ID \|\| "G-0DYTH1TLGB"/,
  "GA4 measurement ID must use NEXT_PUBLIC_GA_MEASUREMENT_ID with the production fallback.",
);
assert.match(
  layoutSource,
  /id="ga4-loader"[\s\S]*src=\{`https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=\$\{GA_ID\}`\}[\s\S]*strategy="beforeInteractive"/,
  "Root layout must load the GA4 gtag script directly with beforeInteractive.",
);
assert.match(
  layoutSource,
  /<Script id="ga4-init" strategy="beforeInteractive">/,
  "Root layout must initialize GA4 directly with beforeInteractive.",
);
assert.match(
  layoutSource,
  /<body[^>]*>[\s\S]*id="ga4-loader"[\s\S]*id="ga4-init"[\s\S]*\{children\}/,
  "GA4 scripts must be rendered in the body before children.",
);
assert.match(
  layoutSource,
  /window\.dataLayer = window\.dataLayer \|\| \[\]/,
  "GA4 init must initialize dataLayer.",
);
assert.match(
  layoutSource,
  /function gtag\(\)\{window\.dataLayer\.push\(arguments\);\}/,
  "GA4 init must define the global gtag function.",
);
assert.match(
  layoutSource,
  /window\.gtag = gtag/,
  "GA4 init must expose window.gtag globally.",
);
assert.match(
  layoutSource,
  /gtag\('js', new Date\(\)\)/,
  "GA4 init must send the standard js command.",
);
assert.match(
  layoutSource,
  /gtag\('config', '\$\{GA_ID\}'\)/,
  "GA4 init must use the standard config call.",
);
assert.match(
  layoutSource,
  new RegExp(measurementId),
  "The production GA4 Measurement ID must appear in the root layout fallback.",
);
assert.doesNotMatch(
  layoutSource,
  /send_page_view:\s*false|analytics_storage|gtm\/js|GTM-|AW-/i,
  "Root layout must not disable page_view, set consent mode, use GTM, or use Google Ads tag.",
);
assert.doesNotMatch(
  analyticsSource,
  /trackPageView|PageViewEvent|send_page_view|analytics_storage|denied/i,
  "Analytics helper must not contain manual page_view or consent blocking.",
);

for (const route of [
  "/",
  "/en/bangkok-to-pattaya",
  "/en/ekkamai-bus-terminal-to-pattaya-guide",
  "/en/pattaya-bus-station-to-jomtien",
]) {
  assert.ok(
    layoutSource.includes("googletagmanager.com/gtag/js"),
    `The global Google tag script must be available to ${route}.`,
  );
  assert.ok(
    layoutSource.includes("gtag('config', '${GA_ID}')"),
    `The global Google tag config must be available to ${route}.`,
  );
}

const affiliatePayload = {
  cta_position: "desktop_sidebar",
  from: "bangkok",
  href: "https://12go.asia/en/travel/bangkok/pattaya?z=15791301&sub_id=bpb-bangkok-to-pattaya-desktop_sidebar",
  lang: "en",
  provider: "12go",
  route_id: "bangkok-to-pattaya",
  sub_id: "bpb-bangkok-to-pattaya-desktop_sidebar",
  to: "pattaya",
};
const gtagCalls = [];
const analyticsModule = loadAnalyticsModuleForTest({
  gtag: (...args) => gtagCalls.push(args),
}, measurementId);

analyticsModule.trackAffiliateClick(affiliatePayload);

assert.deepEqual(
  JSON.parse(JSON.stringify(gtagCalls)),
  [
    [
      "event",
      "affiliate_click",
      {
        send_to: measurementId,
        ...affiliatePayload,
      },
    ],
  ],
  'trackAffiliateClick must call window.gtag("event", "affiliate_click", params).',
);

const analyticsModuleWithoutGtag = loadAnalyticsModuleForTest({});

assert.doesNotThrow(
  () => analyticsModuleWithoutGtag.trackAffiliateClick(affiliatePayload),
  "trackAffiliateClick must not throw when window.gtag is unavailable.",
);
assert.match(
  analyticsSource,
  /trackAffiliateClick\(params: AffiliateClickEvent\) \{\s*trackEvent\("affiliate_click", params\);/,
  'trackAffiliateClick must stay simple and call trackEvent("affiliate_click", params).',
);

console.log("GA4 checks passed.");

function loadAnalyticsModuleForTest(windowValue, nextMeasurementId = measurementId) {
  const transformed = ts.transpileModule(analyticsSource, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: "analytics.ts",
  }).outputText;
  const cjsModule = { exports: {} };
  const sandbox = {
    exports: cjsModule.exports,
    module: cjsModule,
    process: {
      env: nextMeasurementId
        ? { NEXT_PUBLIC_GA_MEASUREMENT_ID: nextMeasurementId }
        : {},
    },
    window: windowValue,
  };

  vm.runInNewContext(transformed, sandbox, {
    filename: "analytics.cjs",
  });

  return cjsModule.exports;
}
