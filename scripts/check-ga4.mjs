import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import vm from "node:vm";
import ts from "typescript";

const root = cwd();
const layoutSourcePath = join(root, "src/app/DocumentLayout.tsx");
const analyticsSourcePath = join(root, "src/lib/analytics.ts");
const analyticsConsentSourcePath = join(root, "src/lib/analyticsConsent.ts");
const analyticsConsentComponentPath = join(
  root,
  "src/components/AnalyticsConsent.tsx",
);
const packageJsonPath = join(root, "package.json");
const oldGoogleAnalyticsPath = join(root, "src/components/GoogleAnalytics.tsx");
const layoutSource = readFileSync(layoutSourcePath, "utf8");
const analyticsSource = readFileSync(analyticsSourcePath, "utf8");
const analyticsConsentSource = readFileSync(analyticsConsentSourcePath, "utf8");
const analyticsConsentComponentSource = readFileSync(
  analyticsConsentComponentPath,
  "utf8",
);
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const measurementId = "G-0DYTH1TLGB";

assert.equal(
  packageJson.dependencies?.["@next/third-parties"],
  undefined,
  "The official @next/third-parties package must not be used for GA4.",
);
assert.equal(
  existsSync(oldGoogleAnalyticsPath),
  false,
  "The custom GoogleAnalytics component must not exist.",
);
assert.doesNotMatch(
  layoutSource,
  /@next\/third-parties|@\/components\/GoogleAnalytics|from "next\/script"|<GoogleAnalytics|<Script\b/,
  "Root layout must not use @next/third-parties, custom GA component, or next/script for GA4.",
);
assert.doesNotMatch(
  layoutSource,
  /googletagmanager\.com\/gtag\/js|gtag\('js'|gtag\('config'|dangerouslySetInnerHTML/,
  "Root layout must not load or configure GA4 before analytics consent.",
);
assert.match(
  layoutSource,
  /<AnalyticsConsent lang=\{lang\} \/>/,
  "Root layout must render the analytics consent component.",
);
assert.match(
  layoutSource,
  /import \{ Analytics \} from "@vercel\/analytics\/next"/,
  "Root layout must import Vercel Analytics.",
);
assert.match(
  layoutSource,
  /<Analytics \/>/,
  "Root layout must render Vercel Analytics without GA4 consent gating.",
);
assert.doesNotMatch(
  analyticsConsentComponentSource,
  /@vercel\/analytics|<Analytics \/>/,
  "Analytics consent component must not gate Vercel Analytics.",
);
assert.match(
  analyticsSource,
  new RegExp(measurementId),
  "Analytics helper must define the production GA4 Measurement ID.",
);
assert.match(
  analyticsConsentComponentSource,
  /import \{ GA_ID \} from "@\/lib\/analytics"/,
  "Analytics consent component must use the shared GA4 Measurement ID.",
);
assert.match(
  analyticsConsentComponentSource,
  /GOOGLE_TAG_SRC = `https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=\$\{GA_ID\}`/,
  "GA4 script URL must be created only inside the consent component.",
);
assert.ok(
  analyticsConsentComponentSource.includes(
    'window.gtag?.("consent", "default", deniedConsent)',
  ),
  "GA4 must set denied consent defaults before config.",
);
assert.ok(
  analyticsConsentComponentSource.includes(
    'window.gtag?.("consent", "update", {',
  ) && analyticsConsentComponentSource.includes('analytics_storage: "granted"'),
  "GA4 must update analytics_storage to granted only after consent.",
);
assert.ok(
  analyticsConsentComponentSource.includes(
    'window.gtag("consent", "update", deniedConsent)',
  ),
  "GA4 must support revoking analytics consent.",
);
assert.match(
  analyticsConsentComponentSource,
  /data-analytics-consent="banner"/,
  "Analytics consent UI must expose a stable test marker.",
);
assert.match(
  analyticsConsentSource,
  /ANALYTICS_CONSENT_STORAGE_KEY = "bpb:analytics-consent"/,
  "Analytics consent choice must be persisted under the expected storage key.",
);
assert.match(
  analyticsConsentSource,
  /ANALYTICS_CONSENT_OPEN_EVENT = "bpb:open-analytics-consent"/,
  "Analytics consent settings must be reopenable from the footer.",
);
assert.match(
  analyticsSource,
  /hasAnalyticsConsentGranted/,
  "Analytics helper must check consent before sending events.",
);
assert.match(
  analyticsSource,
  /if \(!hasAnalyticsConsentGranted\(\)\) \{\s*return;\s*\}/,
  "Analytics helper must return before sending events when consent is missing.",
);
assert.doesNotMatch(
  analyticsSource,
  /NEXT_PUBLIC_GA_MEASUREMENT_ID|gtm\/js|GTM-|AW-/i,
  "Analytics helper must not use env GA ID, GTM, or Google Ads tags.",
);

for (const route of [
  "/",
  "/en/bangkok-to-pattaya",
  "/en/ekkamai-bus-terminal-to-pattaya-guide",
  "/en/pattaya-bus-station-to-jomtien",
]) {
  assert.ok(
    layoutSource.includes("<AnalyticsConsent lang={lang} />"),
    `The analytics consent gate must be available to ${route}.`,
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
const grantedGtagCalls = [];
const analyticsModuleWithConsent = loadAnalyticsModuleForTest(
  createWindowForConsentTest("granted", (...args) => grantedGtagCalls.push(args)),
);

analyticsModuleWithConsent.trackAffiliateClick(affiliatePayload);

assert.deepEqual(
  JSON.parse(JSON.stringify(grantedGtagCalls)),
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
  "trackAffiliateClick must call GA4 only when analytics consent is granted.",
);

const deniedGtagCalls = [];
const analyticsModuleWithoutConsent = loadAnalyticsModuleForTest(
  createWindowForConsentTest("denied", (...args) => deniedGtagCalls.push(args)),
);

analyticsModuleWithoutConsent.trackAffiliateClick(affiliatePayload);

assert.deepEqual(
  deniedGtagCalls,
  [],
  "trackAffiliateClick must not call GA4 when analytics consent is denied.",
);

const analyticsModuleWithoutGtag = loadAnalyticsModuleForTest(
  createWindowForConsentTest("granted"),
);

assert.doesNotThrow(
  () => analyticsModuleWithoutGtag.trackAffiliateClick(affiliatePayload),
  "trackAffiliateClick must not throw when window.gtag is unavailable.",
);

const builtHomePath = join(root, ".next/server/app/index.html");

if (existsSync(builtHomePath)) {
  const builtHome = readFileSync(builtHomePath, "utf8");

  assert.ok(
    !builtHome.includes("https://www.googletagmanager.com/gtag/js"),
    "Built homepage HTML must not include the GA4 network script before consent.",
  );
}

console.log("GA4 checks passed.");

function createWindowForConsentTest(consentValue, gtag) {
  return {
    gtag,
    localStorage: {
      getItem: (key) =>
        key === "bpb:analytics-consent" ? consentValue : undefined,
    },
  };
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
    require: (request) => {
      if (request === "@/lib/analyticsConsent") {
        return {
          ANALYTICS_CONSENT_GRANTED: "granted",
          ANALYTICS_CONSENT_STORAGE_KEY: "bpb:analytics-consent",
        };
      }

      throw new Error(`Unexpected test import: ${request}`);
    },
    window: windowValue,
  };

  vm.runInNewContext(transformed, sandbox, {
    filename: "analytics.cjs",
  });

  return cjsModule.exports;
}
