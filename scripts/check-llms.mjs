import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

// public/llms.txt to plik utrzymywany RECZNIE - opisy sa pisane recznie i sa lepsze
// niz cokolwiek generowanego. Cena za to jest taka, ze potrafi sie cicho rozjechac:
// 2026-08-24 doszedl przewodnik Tomorrowland, a llms.txt zostal z 14 pozycjami.
// Ten straznik pilnuje, zeby lista adresow zgadzala sie z danymi serwisu.

const root = cwd();
const read = (p) => readFileSync(join(root, p), "utf8").replace(/\r\n/g, "\n");

const llmsPath = join(root, "public/llms.txt");
assert.ok(existsSync(llmsPath), "Missing public/llms.txt");
const llms = readFileSync(llmsPath, "utf8").replace(/\r\n/g, "\n");
assert.ok(llms.trim().length > 500, "llms.txt looks empty or truncated");
assert.ok(llms.startsWith("# "), "llms.txt must start with a markdown H1");

const SITE = "https://www.bangkokpattayabus.com";

// adresy /en/<slug> wymienione w pliku
const listed = [...new Set([...llms.matchAll(/https:\/\/www\.bangkokpattayabus\.com\/en\/([a-z0-9-]+)/g)].map((m) => m[1]))];
assert.ok(listed.length > 0, "Parser found no /en/ URLs in llms.txt - format changed?");

// oczekiwane: przewodniki z seoGuideLinks + trasy z routes
const guideSlugs = [...new Set([...read("src/data/seoGuideLinks.ts").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]))];
const routeSlugs = [...new Set([...read("src/data/routes.ts").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]))];
assert.ok(guideSlugs.length > 0, "Parser found no guide slugs - seoGuideLinks.ts format changed?");
assert.ok(routeSlugs.length > 0, "Parser found no route slugs - routes.ts format changed?");
const expected = [...new Set([...guideSlugs, ...routeSlugs])];

const errors = [];
for (const slug of expected) {
  if (!listed.includes(slug)) {
    const kind = guideSlugs.includes(slug) ? "guide" : "route";
    errors.push(`llms.txt is missing the ${kind} "${slug}" - AI crawlers will not see it listed`);
  }
}
for (const slug of listed) {
  if (!expected.includes(slug)) errors.push(`llms.txt lists "${slug}" which is not a known guide or route`);
}

// bezwzgledne adresy na wlasnej domenie, zeby crawler nie musial zgadywac bazy
const relative = [...llms.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]);
for (const r of relative) errors.push(`llms.txt uses a relative link "${r}" - use the absolute ${SITE} form`);

// sitemap i strona glowna maja byc wymienione
if (!llms.includes(`${SITE}/sitemap.xml`)) errors.push("llms.txt must link the sitemap");
if (!new RegExp(`${SITE.replace(/[.]/g, "\\.")}/en\\)`).test(llms)) errors.push("llms.txt must link the English homepage");

if (errors.length) {
  console.error("llms.txt errors detected:");
  errors.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}

console.log(`llms.txt: ${listed.length} adresow /en/ (${guideSlugs.length} przewodnikow + ${routeSlugs.length} tras), sitemap i strona glowna obecne.`);
console.log("llms.txt checks passed.");
