import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import vm from "node:vm";
import ts from "typescript";

const root = cwd();
const layoutSourcePath = join(root, "src/app/layout.tsx");
const analyticsSourcePath = join(root, "src/lib/analytics.ts");
const packageJsonPath = join(root, "package.json");
const oldGoogleAnalyticsPath = join(root, "src/components/GoogleAnalytics.tsx");
const layoutSource = readFileSync(layoutSourcePath, "utf8");
const analyticsSource = readFileSync(analyticsSourcePath, "utf8");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const measurementId = "G-0DYTH1TLGB";

assert.equal(
  packageJson.dependencies?.["@next/third-parties"],
  undefined,
  "The official @next/third-parties package must not be used during the hard GA4 reset.",
);
assert.equal(
  existsSync(oldGoogleAnalyticsPath),
  false,
  "The custom GoogleAnalytics component must not exist.",
);
assert.doesNotMatch(
  layoutSource,
  /@next\/third-parties|@\/components\/GoogleAnalytics|from "next\/script"|<GoogleAnalytics|<Script\b|ga4-loader|ga4-init/,
  "Root layout must not use @next/third-parties, custom GA component, or next/script for GA4.",
);
assert.match(
  layoutSource,
  /<head>[\s\S]*<script\s+async\s+src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-0DYTH1TLGB"\s*\/>[\s\S]*<script\s+dangerouslySetInnerHTML=\{\{[\s\S]*<\/head>/,
  "Root layout must render raw GA4 scripts directly in head.",
);
assert.match(
  layoutSource,
  /window\.dataLayer = window\.dataLayer \|\| \[\]/,
  "GA4 init must initialize dataLayer.",
);
assert.match(
  layoutSource,
  /function gtag\(\)\{dataLayer\.push\(arguments\);\}/,
  "GA4 init must define the raw global gtag function.",
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
  /gtag\('config', 'G-0DYTH1TLGB'\)/,
  "GA4 init must use the hardcoded production config call.",
);
assert.match(
  layoutSource,
  new RegExp(measurementId),
  "The production GA4 Measurement ID must appear in the root layout.",
);
assert.doesNotMatch(
  layoutSource,
  /NEXT_PUBLIC_GA_MEASUREMENT_ID|send_page_view:\s*false|analytics_storage|gtm\/js|GTM-|AW-/i,
  "Root layout must not use env GA ID, disable page_view, set consent mode, use GTM, or use Google Ads tag.",
);
assert.doesNotMatch(
  analyticsSource,
  /trackPageView|PageViewEvent|send_page_view|analytics_storage|denied|NEXT_PUBLIC_GA_MEASUREMENT_ID/i,
  "Analytics helper must not contain manual page_view, consent blocking, or GA env routing.",
);

for (const route of [
  "/",
  "/en/bangkok-to-pattaya",
  "/en/ekkamai-bus-terminal-to-pattaya-guide",
  "/en/pattaya-bus-station-to-jomtien",
]) {
  assert.ok(
    layoutSource.includes("https://www.googletagmanager.com/gtag/js?id=G-0DYTH1TLGB"),
    `The hardcoded Google tag script must be available to ${route}.`,
  );
  assert.ok(
    layoutSource.includes("gtag('config', 'G-0DYTH1TLGB')"),
    `The hardcoded Google tag config must be available to ${route}.`,
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
});

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
  /window\.gtag\("event", "affiliate_click", \{\s*send_to: "G-0DYTH1TLGB",[\s\S]*\.\.\.params,/,
  "trackAffiliateClick must call affiliate_click directly through window.gtag with the hardcoded GA4 ID.",
);

console.log("GA4 checks passed.");

function loadAnalyticsModuleForTest(windowValue) {
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
      env: {},
    },
    window: windowValue,
  };

  vm.runInNewContext(transformed, sandbox, {
    filename: "analytics.cjs",
  });

  return cjsModule.exports;
}
