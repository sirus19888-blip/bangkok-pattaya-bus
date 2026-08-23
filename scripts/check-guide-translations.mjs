import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const root = cwd();
const locales = ["en", "th", "zh", "ru", "de", "fr", "pl"];
const sourcePath = join(root, "src/data/seoGuides.ts");
const registryPath = join(root, "src/data/translatedGuides.ts");
const localesDir = join(root, "src/locales");
const readSource = (path) => readFileSync(path, "utf8").replace(/\r\n/g, "\n");
assert.ok(existsSync(sourcePath), `Missing ${sourcePath}`);
assert.ok(existsSync(registryPath), `Missing ${registryPath}`);
const guides = parseSourceGuides(readSource(sourcePath));
const registered = parseRegistry(readSource(registryPath));
assert.ok(guides.length > 0, "Parser found no guides - source format changed?");
assert.equal(guides.length, 14, `Expected 14 guides, found ${guides.length}`);
const dictionaries = new Map();
for (const locale of locales) {
  const path = join(localesDir, `${locale}.json`);
  assert.ok(existsSync(path), `Missing ${path}`);
  dictionaries.set(locale, JSON.parse(readFileSync(path, "utf8").replace(/^\uFEFF/, "")));
}
const errors = [];
const warnings = [];
const matrix = guides.map((guide) => {
  const row = locales.map((locale) => {
    const content = dictionaries.get(locale)?.guides?.[guide.slug];
    if (locale === "en") return "pelne";
    const exists = content && typeof content === "object";
    const complete = exists && isComplete(content, guide);
    if (registered[guide.slug]?.includes(locale) && !exists) errors.push(`Registered translation missing: ${guide.slug} [${locale}]`);
    if (registered[guide.slug]?.includes(locale) && exists && !complete) errors.push(`Incomplete registered translation: ${guide.slug} [${locale}]`);
    if (!registered[guide.slug]?.includes(locale) && exists) warnings.push(`${guide.slug} [${locale}]`);
    return !exists ? "brak" : complete ? "pelne" : "niepelne";
  });
  return { slug: guide.slug, row };
});
for (const [slug, list] of Object.entries(registered)) if (!guides.some((g) => g.slug === slug)) errors.push(`Registered guide not found: ${slug}`); else for (const locale of list) if (!locales.includes(locale)) errors.push(`Unknown locale: ${slug} [${locale}]`);
console.log("Guide translation matrix (pelne / niepelne / brak):");
console.log(["guide", ...locales].join(" | "));
for (const item of matrix) console.log([item.slug, ...item.row].join(" | "));
const full = matrix.reduce((n, item) => n + item.row.slice(1).filter((x) => x === "pelne").length, 0);
console.log(`Coverage: ${full}/${guides.length * locales.length}`);
if (warnings.length) { console.warn("Unregistered guide translations (warning):"); warnings.forEach((x) => console.warn(`- ${x}`)); }
if (errors.length) { console.error("Guide translation errors detected:"); errors.forEach((x) => console.error(`- ${x}`)); process.exit(1); }
console.log("Guide translation completeness checks passed.");

function parseRegistry(text) {
  const body = text.match(/translatedGuideLocales[^=]*=\s*\{([\s\S]*?)\n\};/)?.[1] ?? "";
  return Object.fromEntries([...body.matchAll(/"([^\"]+)"\s*:\s*\[([^\]]*)\]/g)].map((m) => [m[1], [...m[2].matchAll(/"([^\"]+)"/g)].map((x) => x[1])]));
}
function parseSourceGuides(text) {
  const starts = [...text.matchAll(/^\s*\{\n\s+slug:/gm)].map((m) => m.index);
  return starts.map((start, i) => { const block = text.slice(start, starts[i + 1] ?? text.length); const slug = block.match(/slug:\s*"([^"]+)"/)?.[1]; assert.ok(slug); return { slug, fields: ["title", "description", "h1", "intro", "shortAnswer", "ctaLabel", "routeLinkLabel"], keyPoints: count(block, "keyPoints", /^\s*"/gm), sections: count(block, "sections", /^\s*\{\n\s*title:/gm), faq: count(block, "faq", /^\s*\{\n\s*question:/gm) }; });
}
function count(block, field, itemPattern) { const body = block.match(new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\n    \\]`))?.[1] ?? ""; return [...body.matchAll(itemPattern)].length; }
function isComplete(content, source) { return source.fields.every((f) => typeof content[f] === "string" && content[f].trim()) && Array.isArray(content.keyPoints) && content.keyPoints.length === source.keyPoints && Array.isArray(content.sections) && content.sections.length === source.sections && content.sections.every((x) => typeof x?.title === "string" && typeof x?.body === "string") && Array.isArray(content.faq) && content.faq.length === source.faq && content.faq.every((x) => typeof x?.question === "string" && typeof x?.answer === "string"); }



