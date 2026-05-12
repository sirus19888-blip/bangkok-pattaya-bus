import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const root = cwd();
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
  /Some booking links may be affiliate links\. Timetable information stays independent\./,
  "Affiliate CTA must show the independent timetable disclosure.",
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
  /cta_position: variant/,
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
  /build12GoRouteUrl\(routeId: RouteId, lang: LocaleCode\)/,
  "12Go links must be built per route and locale.",
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

console.log("Affiliate link checks passed.");
