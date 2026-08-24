import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import assert from "node:assert/strict";

const root = cwd();
const readSource = (path) => readFileSync(path, "utf8").replace(/\r\n/g, "\n");
const schedulePath = join(root, "src/data/schedules.ts");
const guidePath = join(root, "src/data/seoGuides.ts");
const registryPath = join(root, "src/data/translatedGuides.ts");
const localesDir = join(root, "src/locales");
const locales = ["en", "th", "zh", "ru", "de", "fr", "pl"];
const RANGE =
  /(\d{1,2})[:\uFF1Ah](\d{2})\s*(?:to|do|bis|à|a|до|ถึง|至|\u5230|\u81f3|-|~|\uFF5E|–|—)\s*(\d{1,2})[:\uFF1Ah](\d{2})/giu;
const TIME = /(?<!\d)(\d{1,2})[:\uFF1A](\d{2})(?!\d)/gu;
const timeMentions = { checked: 0 };
const proseRouteOverrides = {
  "pattaya-to-bangkok-before-flight": "pattaya-to-suvarnabhumi-airport",
};

assert.ok(existsSync(schedulePath), `Missing ${schedulePath}`);
assert.ok(existsSync(guidePath), `Missing ${guidePath}`);
assert.ok(existsSync(registryPath), `Missing ${registryPath}`);

const scheduleSource = readSource(schedulePath);
const guideSource = readSource(guidePath);
const registrySource = readSource(registryPath);
const schedules = extractSchedules(scheduleSource);
assert.ok(schedules.size > 0, "Parser found no schedules - source format changed?");
assert.equal(schedules.size, 6, `Expected 6 routes, found ${schedules.size}`);

const mismatches = [];
const guideRoutes = extractGuideRoutes(guideSource);
const expectedGuideTranslations = countRegisteredGuideTranslations(registrySource);

scanGuides(guideSource, schedules, mismatches);
scanLocaleFaqs(schedules, mismatches);
const scannedGuideTranslations = scanLocaleGuides(schedules, guideRoutes, mismatches);
console.log(`Parsed schedules: ${schedules.size} routes; guides: 15; guide translations: ${scannedGuideTranslations}; time mentions checked: ${timeMentions.checked}.`);
assert.equal(scannedGuideTranslations, expectedGuideTranslations, `Expected ${expectedGuideTranslations} guide translations, scanned ${scannedGuideTranslations}`);

if (mismatches.length > 0) {
  console.error("Prose vs schedule mismatches detected:");

  for (const mismatch of mismatches) {
    console.error(
      `- ${mismatch.source}: ${mismatch.range} vs ${mismatch.expected} for ${mismatch.route}`,
    );
  }

  process.exit(1);
}

console.log("Prose vs schedule checks passed.");

function extractSchedules(source) {
  const result = new Map();
  const directionPattern = /direction:\s*"([^"]+)"/g;

  for (const match of source.matchAll(directionPattern)) {
    const direction = match[1];
    if (result.has(direction)) {
      continue;
    }

    // Read only forward from direction: this avoids capturing a neighboring entry.
    const segment = source.slice(match.index, match.index + 1400);
    const departuresMatch = segment.match(
      /departures:\s*\[([\s\S]*?)\]/,
    );
    const departures = departuresMatch ? [...departuresMatch[1].matchAll(/"(\d{2}\:\d{2})"/g)].map((departure) => departure[1]) : [];


    result.set(direction, {
      first: departures[0],
      last: departures.at(-1),
      count: departures.length,
      departures,
    });
  }

  return result;
}

function scanGuides(source, schedules, mismatches) {
  const guideStarts = [...source.matchAll(/^\s*\{\n\s+slug:/gm)].map(
    (match) => match.index,
  );

  assert.ok(guideStarts.length > 0, "Parser found no guides - source format changed?");
  assert.equal(guideStarts.length, 15, `Expected 15 guides, found ${guideStarts.length}`);
  for (let index = 0; index < guideStarts.length; index += 1) {
    const start = guideStarts[index];
    const end = guideStarts[index + 1] ?? source.length;
    const block = source.slice(start, end);
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const declaredRoute = block.match(/routeId:\s*"([^"]+)"/)?.[1];

    if (!slug || !declaredRoute) {
      continue;
    }

    const route = proseRouteOverrides[slug] ?? declaredRoute;
    checkTextRanges(block, schedules, route, `guide ${slug}`, mismatches);
  }
}

function extractGuideRoutes(source) {
  const routes = new Map();
  const starts = [...source.matchAll(/^\s*\{\n\s+slug:/gm)].map((match) => match.index);
  for (let index = 0; index < starts.length; index += 1) {
    const block = source.slice(starts[index], starts[index + 1] ?? source.length);
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const route = block.match(/routeId:\s*"([^"]+)"/)?.[1];
    if (slug && route) routes.set(slug, proseRouteOverrides[slug] ?? route);
  }
  return routes;
}

function countRegisteredGuideTranslations(source) {
  let count = 0;
  for (const match of source.matchAll(/"[^"]+"\s*:\s*\[([^\]]*)\]/g)) {
    count += [...match[1].matchAll(/"[^"]+"/g)].length;
  }
  return count;
}

function scanLocaleGuides(schedules, guideRoutes, mismatches) {
  let scanned = 0;
  for (const locale of locales) {
    if (locale === "en") continue;
    const dictionary = JSON.parse(readFileSync(join(localesDir, `${locale}.json`), "utf8"));
    for (const [slug, guide] of Object.entries(dictionary.guides ?? {})) {
      const route = guideRoutes.get(slug);
      if (!route || !guide || typeof guide !== "object") continue;
      scanned += 1;
      for (const text of [guide.description, guide.shortAnswer, guide.intro, ...(guide.keyPoints ?? [])]) {
        if (typeof text === "string") checkTextRanges(text, schedules, route, `guide ${locale} ${slug}`, mismatches);
      }
      for (const section of guide.sections ?? []) {
        for (const text of [section?.title, section?.body]) {
          if (typeof text === "string") checkTextRanges(text, schedules, route, `guide ${locale} ${slug} section`, mismatches);
        }
      }
      for (const item of guide.faq ?? []) {
        for (const text of [item?.question, item?.answer]) {
          if (typeof text === "string") checkTextRanges(text, schedules, route, `guide ${locale} ${slug} FAQ`, mismatches);
        }
      }
    }
  }
  return scanned;
}function scanLocaleFaqs(schedules, mismatches) {
  for (const locale of locales) {
    const localePath = join(localesDir, `${locale}.json`);
    assert.ok(existsSync(localePath), `Missing ${localePath}`);
    const dictionary = JSON.parse(readFileSync(localePath, "utf8"));

    for (const [route, items] of Object.entries(dictionary.routeFaqItems ?? {})) {
      if (!Array.isArray(items)) {
        continue;
      }

      for (const [index, item] of items.entries()) {
        if (typeof item?.answer !== "string") {
          continue;
        }

        checkTextRanges(
          item.answer,
          schedules,
          route,
          `FAQ ${locale} ${route}[${index}]`,
          mismatches,
        );
      }
    }
  }
}

function checkTextTimes(text, schedule, route, source, mismatches) {
  const allowed = new Set(schedule.departures ?? []);
  const intervalAllowed = new Set(["06:30", "17:30"]);
  for (const match of text.matchAll(TIME)) {
    const time = `${match[1].padStart(2, "0")}:${match[2]}`;
    timeMentions.checked += 1;
    if (time === "06:00" || time === "22:00") continue;
    if (schedule.count === 0 ? intervalAllowed.has(time) : allowed.has(time)) continue;
    mismatches.push({ source, route, range: time, expected: schedule.count === 0 ? "06:30-17:30" : [...allowed].join(", ") });
  }
}
function checkTextRanges(text, schedules, route, source, mismatches) {
  const schedule = schedules.get(route);
  if (!schedule) {
    return;
  }

  checkTextTimes(text, schedule, route, source, mismatches);
  if (schedule.count === 0) {
    for (const match of text.matchAll(RANGE)) {
      const start = `${match[1].padStart(2, "0")}:${match[2]}`;
      const end = `${match[3].padStart(2, "0")}:${match[4]}`;
      if ((start === "06:00" && end === "22:00") || (start === "06:30" && end === "17:30")) continue;
      mismatches.push({ source, route, range: `${start}-${end}`, expected: schedule.departureWindow || "no fixed departure times" });
    }
    return;
  }
  for (const match of text.matchAll(RANGE)) {
    const start = `${match[1].padStart(2, "0")}:${match[2]}`;
    const end = `${match[3].padStart(2, "0")}:${match[4]}`;

    // This is the separate hourly Suvarnabhumi-Jomtien service.
    if (start === "06:00" && end === "22:00") {
      continue;
    }

    if (start !== schedule.first || end !== schedule.last) {
      mismatches.push({
        source,
        route,
        range: `${start}-${end}`,
        expected: `${schedule.first}-${schedule.last}`,
      });
    }
  }
}
