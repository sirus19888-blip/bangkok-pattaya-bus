import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import vm from "node:vm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = cwd();
const moduleRequire = createRequire(import.meta.url);
const gaSourcePath = join(root, "src/components/GoogleAnalytics.tsx");
const layoutSourcePath = join(root, "src/app/layout.tsx");
const analyticsSourcePath = join(root, "src/lib/analytics.ts");
const gaSource = readFileSync(gaSourcePath, "utf8");
const layoutSource = readFileSync(layoutSourcePath, "utf8");
const analyticsSource = readFileSync(analyticsSourcePath, "utf8");
const measurementId = "G-0DYTH1TLGB";

assert.match(
  layoutSource,
  /<GoogleAnalytics\s*\/>/,
  "Root layout must render the GoogleAnalytics component globally.",
);
assert.match(
  layoutSource,
  /<head>[\s\S]*<GoogleAnalytics\s*\/>[\s\S]*<\/head>/,
  "Root layout must render the Google tag in the document head.",
);
assert.doesNotMatch(
  layoutSource,
  /PageViewTracker/,
  "Root layout must not render the manual PageViewTracker while GA4 automatic page_view is restored.",
);
assert.match(
  gaSource,
  /process\.env\.NEXT_PUBLIC_GA_MEASUREMENT_ID/,
  "GA4 measurement ID must come from NEXT_PUBLIC_GA_MEASUREMENT_ID.",
);
assert.doesNotMatch(
  gaSource,
  /send_page_view:\s*false/,
  "GA4 config must not disable automatic page_view.",
);
assert.doesNotMatch(
  gaSource,
  /analytics_storage/,
  "GA4 config must not set consent mode or analytics_storage.",
);

const htmlWithEnv = renderGoogleAnalyticsForTest(measurementId);

assert.match(
  htmlWithEnv,
  new RegExp(measurementId),
  "The production GA4 Measurement ID must appear in rendered GA4 HTML when env is set.",
);
assert.match(
  htmlWithEnv,
  new RegExp(
    `https://www\\.googletagmanager\\.com/gtag/js\\?id=${measurementId}`,
  ),
  "GA4 script must render with the env measurement ID.",
);
assert.match(
  htmlWithEnv,
  /window\.dataLayer = window\.dataLayer \|\| \[\]/,
  "GA4 init must initialize dataLayer.",
);
assert.match(
  htmlWithEnv,
  /function gtag\(\)\{window\.dataLayer\.push\(arguments\);\}/,
  "GA4 init must define the global gtag function.",
);
assert.match(
  htmlWithEnv,
  /window\.gtag = gtag/,
  "GA4 init must expose window.gtag globally.",
);
assert.match(
  htmlWithEnv,
  new RegExp(`gtag\\("config", "${measurementId}"\\)`),
  "GA4 init must use standard gtag config without send_page_view:false.",
);
assert.doesNotMatch(
  htmlWithEnv,
  /send_page_view/,
  "Rendered GA4 HTML must not contain send_page_view overrides.",
);
assert.doesNotMatch(
  htmlWithEnv,
  /analytics_storage|denied/,
  "Rendered GA4 HTML must not deny analytics storage or set consent mode.",
);

const htmlWithoutEnv = renderGoogleAnalyticsForTest(undefined);

assert.equal(
  htmlWithoutEnv,
  "",
  "GA4 script must not render when NEXT_PUBLIC_GA_MEASUREMENT_ID is missing.",
);

for (const route of [
  "/",
  "/en/bangkok-to-pattaya",
  "/en/ekkamai-bus-terminal-to-pattaya-guide",
  "/en/pattaya-bus-station-to-jomtien",
]) {
  assert.ok(
    htmlWithEnv.includes(`googletagmanager.com/gtag/js?id=${measurementId}`),
    `The global Google tag script must be available to ${route}.`,
  );
  assert.ok(
    htmlWithEnv.includes(`gtag("config", "${measurementId}")`),
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
});

analyticsModule.trackAffiliateClick(affiliatePayload);

assert.deepEqual(
  gtagCalls,
  [["event", "affiliate_click", affiliatePayload]],
  'trackAffiliateClick must call window.gtag("event", "affiliate_click", params).',
);

const analyticsModuleWithoutGtag = loadAnalyticsModuleForTest({});

assert.doesNotThrow(
  () => analyticsModuleWithoutGtag.trackAffiliateClick(affiliatePayload),
  "trackAffiliateClick must not throw when window.gtag is unavailable.",
);
assert.match(
  analyticsSource,
  /window\.gtag\("event", "affiliate_click", event\)/,
  'trackAffiliateClick must stay as a direct window.gtag("event", "affiliate_click", params) call.',
);

console.log("GA4 checks passed.");

function renderGoogleAnalyticsForTest(nextMeasurementId) {
  const originalMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (nextMeasurementId) {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = nextMeasurementId;
  } else {
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  }

  try {
    const googleAnalyticsModule = loadGoogleAnalyticsModuleForTest();

    return renderToStaticMarkup(
      React.createElement(googleAnalyticsModule.GoogleAnalytics),
    );
  } finally {
    if (originalMeasurementId === undefined) {
      delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    } else {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalMeasurementId;
    }
  }
}

function loadGoogleAnalyticsModuleForTest() {
  const transformed = ts.transpileModule(gaSource, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: "GoogleAnalytics.tsx",
  }).outputText;
  const cjsModule = { exports: {} };
  const sandbox = {
    exports: cjsModule.exports,
    module: cjsModule,
    process,
    require: (request) => {
      if (request === "react/jsx-runtime") {
        return requireFromRoot("react/jsx-runtime");
      }

      return requireFromRoot(request);
    },
  };

  vm.runInNewContext(transformed, sandbox, {
    filename: "GoogleAnalytics.cjs",
  });

  return cjsModule.exports;
}

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
    window: windowValue,
  };

  vm.runInNewContext(transformed, sandbox, {
    filename: "analytics.cjs",
  });

  return cjsModule.exports;
}

function requireFromRoot(request) {
  return moduleRequire(request);
}
