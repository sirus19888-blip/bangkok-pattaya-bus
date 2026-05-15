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

assert.match(
  layoutSource,
  /<GoogleAnalytics\s*\/>/,
  "Root layout must render the GoogleAnalytics component.",
);
assert.match(
  gaSource,
  /process\.env\.NEXT_PUBLIC_GA_MEASUREMENT_ID/,
  "GA4 measurement ID must come from NEXT_PUBLIC_GA_MEASUREMENT_ID.",
);
assert.ok(
  !gaSource.includes("G-XXXXXXXX") && !gaSource.includes("G-TEST123"),
  "GA4 component must not hardcode a real or test measurement ID.",
);

const htmlWithEnv = renderGoogleAnalyticsForTest("G-TEST123");

assert.match(
  htmlWithEnv,
  /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-TEST123/,
  "GA4 script must render when NEXT_PUBLIC_GA_MEASUREMENT_ID exists.",
);
assert.match(
  htmlWithEnv,
  /gtag\('config', 'G-TEST123'\)/,
  "GA4 init script must configure the env measurement ID.",
);
assert.match(
  htmlWithEnv,
  /id="ga4-init"/,
  "GA4 init script must use a stable script ID.",
);

const htmlWithoutEnv = renderGoogleAnalyticsForTest(undefined);

assert.equal(
  htmlWithoutEnv,
  "",
  "GA4 script must not render when NEXT_PUBLIC_GA_MEASUREMENT_ID is missing.",
);

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
  "trackAffiliateClick must send affiliate_click through gtag with the full payload.",
);

const analyticsModuleWithoutGtag = loadAnalyticsModuleForTest({});

assert.doesNotThrow(
  () => analyticsModuleWithoutGtag.trackAffiliateClick(affiliatePayload),
  "trackAffiliateClick must not block navigation or throw when GA4 is unavailable.",
);

console.log("GA4 checks passed.");

function renderGoogleAnalyticsForTest(measurementId) {
  const originalMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (measurementId) {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = measurementId;
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
          default: function Script(props) {
            return React.createElement("script", props, props.children);
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
