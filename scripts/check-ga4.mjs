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
  /<body[^>]*>[\s\S]*<GoogleAnalytics\s*\/>[\s\S]*<\/body>/,
  "Root layout must render GoogleAnalytics globally in the body.",
);
assert.doesNotMatch(
  layoutSource,
  /PageViewTracker/,
  "Root layout must not render a manual PageViewTracker.",
);
assert.match(
  gaSource,
  /"use client"/,
  "GoogleAnalytics must be a client component.",
);
assert.match(
  gaSource,
  /import Script from "next\/script"/,
  "GoogleAnalytics must use next/script.",
);
assert.match(
  gaSource,
  /process\.env\.NEXT_PUBLIC_GA_MEASUREMENT_ID \|\| "G-0DYTH1TLGB"/,
  "GA4 measurement ID must use NEXT_PUBLIC_GA_MEASUREMENT_ID with the production fallback.",
);
assert.doesNotMatch(
  gaSource,
  /send_page_view:\s*false/,
  "GA4 config must not disable automatic page_view.",
);
assert.doesNotMatch(
  gaSource,
  /analytics_storage|denied|consent/i,
  "GA4 config must not set consent mode or block analytics storage.",
);
assert.doesNotMatch(
  analyticsSource,
  /trackPageView|PageViewEvent|send_page_view|analytics_storage|denied/i,
  "Analytics helper must not contain manual page_view or consent blocking.",
);

const htmlWithEnv = renderGoogleAnalyticsForTest(measurementId);
const htmlWithFallback = renderGoogleAnalyticsForTest(undefined);

for (const html of [htmlWithEnv, htmlWithFallback]) {
  assert.match(
    html,
    new RegExp(measurementId),
    "The production GA4 Measurement ID must appear in rendered GA4 HTML.",
  );
  assert.match(
    html,
    new RegExp(
      `https://www\\.googletagmanager\\.com/gtag/js\\?id=${measurementId}`,
    ),
    "GA4 script must render with the production measurement ID.",
  );
  assert.match(
    html,
    /window\.dataLayer = window\.dataLayer \|\| \[\]/,
    "GA4 init must initialize dataLayer.",
  );
  assert.match(
    html,
    /function gtag\(\)\{window\.dataLayer\.push\(arguments\);\}/,
    "GA4 init must define the global gtag function.",
  );
  assert.match(
    html,
    /window\.gtag = gtag/,
    "GA4 init must expose window.gtag globally.",
  );
  assert.match(
    html,
    new RegExp(`gtag\\('config', '${measurementId}'\\)`),
    "GA4 init must use the standard gtag config call.",
  );
  assert.doesNotMatch(
    html,
    /send_page_view|analytics_storage|denied/i,
    "Rendered GA4 HTML must not contain page_view overrides or consent blocking.",
  );
}

for (const route of [
  "/",
  "/en/bangkok-to-pattaya",
  "/en/ekkamai-bus-terminal-to-pattaya-guide",
  "/en/pattaya-bus-station-to-jomtien",
]) {
  assert.ok(
    htmlWithFallback.includes(`googletagmanager.com/gtag/js?id=${measurementId}`),
    `The global Google tag script must be available to ${route}.`,
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
  "trackAffiliateClick must stay simple and include send_to.",
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

      if (request === "next/script") {
        return {
          __esModule: true,
          default: function Script(scriptProps) {
            return React.createElement(
              "script",
              {
                id: scriptProps.id,
                src: scriptProps.src,
                "data-strategy": scriptProps.strategy,
              },
              scriptProps.children,
            );
          },
        };
      }

      return requireFromRoot(request);
    },
  };

  vm.runInNewContext(transformed, sandbox, {
    filename: "GoogleAnalytics.cjs",
  });

  return cjsModule.exports;
}

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

function requireFromRoot(request) {
  return moduleRequire(request);
}
