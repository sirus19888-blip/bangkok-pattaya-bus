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

assert.ok(
  packageJson.dependencies?.["@next/third-parties"],
  "The official @next/third-parties package must be installed.",
);
assert.equal(
  existsSync(oldGoogleAnalyticsPath),
  false,
  "The custom GoogleAnalytics component must not exist.",
);
assert.match(
  layoutSource,
  /import \{ GoogleAnalytics \} from "@next\/third-parties\/google"/,
  "Root layout must use the official @next/third-parties/google integration.",
);
assert.doesNotMatch(
  layoutSource,
  /@\/components\/GoogleAnalytics|from "next\/script"|<Script\b|ga4-loader|ga4-init/,
  "Root layout must not use custom GA4 scripts or the old GoogleAnalytics component.",
);
assert.match(
  layoutSource,
  /const GA_ID = process\.env\.NEXT_PUBLIC_GA_MEASUREMENT_ID \|\| "G-0DYTH1TLGB"/,
  "GA4 measurement ID must use NEXT_PUBLIC_GA_MEASUREMENT_ID with the production fallback.",
);
assert.match(
  layoutSource,
  /<Analytics\s*\/>[\s\S]*<GoogleAnalytics gaId=\{GA_ID\}\s*\/>/,
  "GoogleAnalytics must render at the end of the body after Vercel Analytics.",
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
    layoutSource.includes("<GoogleAnalytics gaId={GA_ID} />"),
    `The official GoogleAnalytics component must be available to ${route}.`,
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
  /window\.gtag\("event", "affiliate_click", \{\s*send_to: GA_ID,[\s\S]*\.\.\.params,/,
  "trackAffiliateClick must call affiliate_click directly through window.gtag with send_to.",
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
