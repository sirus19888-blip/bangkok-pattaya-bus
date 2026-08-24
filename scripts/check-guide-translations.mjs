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
// --- karty przewodnikow na stronie glownej (guideCards) ---
// Blad z 2026-08-23: karty byly po angielsku we wszystkich 6 jezykach,
// bo TravelGuideLinks czytal napisy wprost z seoGuideLinks.ts.
const cardErrors = [];
const linkSlugs = [...readSource(join(root, "src/data/seoGuideLinks.ts")).matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
const uniqueLinkSlugs = [...new Set(linkSlugs)];
assert.ok(uniqueLinkSlugs.length > 0, "Parser found no seoGuideLinks slugs - format changed?");
const enCards = dictionaries.get("en")?.guideCards ?? {};
for (const slug of uniqueLinkSlugs) {
  const card = enCards[slug];
  if (!card || typeof card.title !== "string" || !card.title.trim() || typeof card.description !== "string" || !card.description.trim())
    cardErrors.push(`en guideCards missing or empty for "${slug}"`);
}
for (const locale of locales) {
  const cards = dictionaries.get(locale)?.guideCards;
  if (!cards) continue;
  for (const slug of Object.keys(cards)) {
    // literowka w slugu = cicho wraca angielski, dokladnie ten blad co wyzej
    if (!uniqueLinkSlugs.includes(slug)) cardErrors.push(`${locale} guideCards has unknown slug "${slug}"`);
    const card = cards[slug];
    if (typeof card?.title !== "string" || !card.title.trim()) cardErrors.push(`${locale} guideCards "${slug}" has empty title`);
    if (typeof card?.description !== "string" || !card.description.trim()) cardErrors.push(`${locale} guideCards "${slug}" has empty description`);
  }
}
// jezyk z kompletem przetlumaczonych przewodnikow musi miec tez komplet kart
for (const locale of locales) {
  if (locale === "en") continue;
  const translatedAll = guides.every((g) => (registered[g.slug] ?? []).includes(locale));
  if (!translatedAll) continue;
  const cards = dictionaries.get(locale)?.guideCards ?? {};
  const missing = uniqueLinkSlugs.filter((s) => !cards[s]);
  if (missing.length) cardErrors.push(`${locale} has all guides translated but guideCards missing: ${missing.join(", ")}`);
}
if (cardErrors.length) { console.error("Guide card errors detected:"); cardErrors.forEach((x) => console.error(`- ${x}`)); process.exit(1); }
console.log(`Guide cards: ${uniqueLinkSlugs.length} slugs; locales with cards: ${locales.filter((l) => dictionaries.get(l)?.guideCards).join(", ")}.`);
// --- daty modyfikacji tlumaczen (guideTranslationUpdatedAt) ---
// Blad z 2026-08-24: /zh/ podawalo Google dateModified wersji angielskiej, wiec
// w wynikach stala data sprzed trzech tygodni przy stronie przepisanej dzien wczesniej.
const dateErrors = [];
const registrySource = readSource(registryPath);
const updatedAtBody = registrySource.match(/guideTranslationUpdatedAt[^=]*=\s*\{([\s\S]*?)\n\};/)?.[1] ?? "";
assert.ok(updatedAtBody.trim().length > 0, "Parser found no guideTranslationUpdatedAt - format changed?");
const updatedAt = Object.fromEntries(
  [...updatedAtBody.matchAll(/"([a-z0-9-]+)":\s*\{([^}]*)\}/g)].map((m) => [
    m[1],
    Object.fromEntries([...m[2].matchAll(/(\w+):\s*"([^"]+)"/g)].map((x) => [x[1], x[2]])),
  ]),
);
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok" }).format(new Date());
// kazda zarejestrowana para (slug, locale) musi miec date
for (const [slug, locs] of Object.entries(registered)) {
  for (const locale of locs) {
    const d = updatedAt[slug]?.[locale];
    if (!d) dateErrors.push(`guideTranslationUpdatedAt missing date for "${slug}" / ${locale}`);
  }
}
for (const [slug, entry] of Object.entries(updatedAt)) {
  if (!guides.some((g) => g.slug === slug)) dateErrors.push(`guideTranslationUpdatedAt has unknown slug "${slug}"`);
  for (const [locale, d] of Object.entries(entry)) {
    if (!locales.includes(locale)) dateErrors.push(`guideTranslationUpdatedAt "${slug}" has unknown locale "${locale}"`);
    if (locale === "en") dateErrors.push(`guideTranslationUpdatedAt "${slug}" must not set "en" - en uses the source date`);
    if (!ISO.test(d)) dateErrors.push(`guideTranslationUpdatedAt "${slug}"/${locale} has malformed date "${d}"`);
    else if (d > today) dateErrors.push(`guideTranslationUpdatedAt "${slug}"/${locale} is in the future ("${d}" > "${today}")`);
    // data bez rejestracji w translatedGuideLocales = martwy wpis
    if (!(registered[slug] ?? []).includes(locale)) dateErrors.push(`guideTranslationUpdatedAt "${slug}"/${locale} is not registered in translatedGuideLocales`);
  }
}
if (dateErrors.length) { console.error("Guide translation date errors detected:"); dateErrors.forEach((x) => console.error(`- ${x}`)); process.exit(1); }
const datePairs = Object.values(updatedAt).reduce((n, e) => n + Object.keys(e).length, 0);
console.log(`Guide translation dates: ${datePairs} pary (slug, locale); najnowsza ${Object.values(updatedAt).flatMap((e) => Object.values(e)).sort().at(-1)}.`);
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



