import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const root = cwd();
const privacySource = readFileSync(join(root, "src/app/privacy/page.tsx"), "utf8");
const routeLayoutSource = readFileSync(
  join(root, "src/components/RoutePageLayout.tsx"),
  "utf8",
);
const adSlotSource = readFileSync(join(root, "src/components/AdSlot.tsx"), "utf8");
const cmpSource = readFileSync(
  join(root, "src/components/ConsentManagementPlaceholder.tsx"),
  "utf8",
);
const adsLibSource = readFileSync(join(root, "src/lib/ads.ts"), "utf8");
const layoutSource = readFileSync(join(root, "src/app/layout.tsx"), "utf8");
const envExamplePath = join(root, ".env.local.example");
const envExample = existsSync(envExamplePath)
  ? readFileSync(envExamplePath, "utf8")
  : "";

for (const section of [
  "Cookies and similar technologies",
  "Analytics",
  "Affiliate links",
  "Advertising",
  "Google products",
  "Third-party providers",
  "Maps and embedded content",
  "Consent and withdrawal",
  "Data retention basics",
  "Contact",
]) {
  assert.ok(
    privacySource.includes(section),
    `/privacy must include section: ${section}`,
  );
}

assert.ok(
  envExample.includes("NEXT_PUBLIC_ENABLE_ADS=false"),
  ".env.local.example must keep ads disabled by default.",
);
assert.ok(
  adsLibSource.includes('process.env.NEXT_PUBLIC_ENABLE_ADS === "true"'),
  "Ads must be behind the NEXT_PUBLIC_ENABLE_ADS feature flag.",
);
assert.ok(
  adSlotSource.includes("data-ads-enabled=\"false\"") &&
    adSlotSource.includes("hidden"),
  "Disabled ad slots must be hidden and non-intrusive.",
);
assert.ok(
  cmpSource.includes("google-certified-cmp-required-before-ads") &&
    cmpSource.includes("data-tcf-required=\"true\"") &&
    cmpSource.includes("EEA,UK,Switzerland"),
  "CMP placeholder must document Google certified CMP / TCF readiness for EEA, UK, and Switzerland.",
);
assert.ok(
  layoutSource.includes("<ConsentManagementPlaceholder />"),
  "Root layout must include the CMP placeholder.",
);

for (const slot of [
  "AD_SLOT_IDS.afterSchedule",
  "AD_SLOT_IDS.afterStationInformation",
  "AD_SLOT_IDS.afterFaq",
]) {
  assert.ok(routeLayoutSource.includes(slot), `Route pages must include ${slot}.`);
}

assert.ok(
  routeLayoutSource.indexOf("AD_SLOT_IDS.afterSchedule") >
    routeLayoutSource.indexOf("<MobileRouteDecisionCard"),
  "After-schedule ad slot must not appear above the H1/route decision card.",
);
assert.ok(
  routeLayoutSource.indexOf("AD_SLOT_IDS.afterSchedule") <
    routeLayoutSource.indexOf("<RouteCommercialBlocks"),
  "After-schedule ad slot must not be placed between individual departure times.",
);
assert.ok(
  routeLayoutSource.indexOf("AD_SLOT_IDS.afterStationInformation") >
    routeLayoutSource.indexOf("<StationCard"),
  "After-station ad slot must be placed after station information.",
);
assert.ok(
  routeLayoutSource.indexOf("AD_SLOT_IDS.afterFaq") >
    routeLayoutSource.indexOf("<FAQ"),
  "After-FAQ ad slot must be placed after FAQ.",
);

for (const source of [layoutSource, routeLayoutSource, adSlotSource]) {
  assert.ok(
    !source.includes("adsbygoogle") &&
      !source.includes("pagead2.googlesyndication.com"),
    "AdSense scripts must not be enabled yet.",
  );
}

const builtRoutePath = join(root, ".next/server/app/en/bangkok-to-pattaya.html");

if (existsSync(builtRoutePath)) {
  const html = readFileSync(builtRoutePath, "utf8");

  for (const slot of [
    'data-ad-slot="after-schedule"',
    'data-ad-slot="after-station-information"',
    'data-ad-slot="after-faq"',
  ]) {
    assert.ok(html.includes(slot), `Built route HTML must include disabled ${slot}.`);
  }
  assert.ok(
    html.includes('data-ads-enabled="false"'),
    "Built route HTML must keep ad slots disabled.",
  );
  assert.ok(
    !html.includes("pagead2.googlesyndication.com") &&
      !html.includes("adsbygoogle"),
    "Built HTML must not load AdSense while ads are disabled.",
  );
}

console.log("Ads readiness checks passed.");
