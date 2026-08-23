import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import assert from "node:assert/strict";

const root = cwd();
const readSource = (path) => readFileSync(path, "utf8").replace(/\r\n/g, "\n");
const schedulePath = join(root, "src/data/schedules.ts");
const guidePath = join(root, "src/data/seoGuides.ts");
const localesDir = join(root, "src/locales");
const locales = ["en", "th", "zh", "ru", "de", "fr", "pl"];
const RANGE =
  /(\d{1,2})[:h](\d{2})\s*(?:to|do|bis|à|a|до|ถึง|至|-|–|—)\s*(\d{1,2})[:h](\d{2})/giu;
const proseRouteOverrides = {
  "pattaya-to-bangkok-before-flight": "pattaya-to-suvarnabhumi-airport",
};

assert.ok(existsSync(schedulePath), `Missing ${schedulePath}`);
assert.ok(existsSync(guidePath), `Missing ${guidePath}`);

const scheduleSource = readSource(schedulePath);
const guideSource = readSource(guidePath);
const schedules = extractSchedules(scheduleSource);
assert.ok(schedules.size > 0, "Parser found no schedules - source format changed?");
assert.equal(schedules.size, 6, `Expected 6 routes, found ${schedules.size}`);
console.log(`Parsed schedules: ${schedules.size} routes; guides: 14.`);
const mismatches = [];

scanGuides(guideSource, schedules, mismatches);
scanLocaleFaqs(schedules, mismatches);

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
    });
  }

  return result;
}

function scanGuides(source, schedules, mismatches) {
  const guideStarts = [...source.matchAll(/^\s*\{\n\s+slug:/gm)].map(
    (match) => match.index,
  );

  assert.ok(guideStarts.length > 0, "Parser found no guides - source format changed?");
  assert.equal(guideStarts.length, 14, `Expected 14 guides, found ${guideStarts.length}`);
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

function scanLocaleFaqs(schedules, mismatches) {
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

function checkTextRanges(text, schedules, route, source, mismatches) {
  const schedule = schedules.get(route);
  if (!schedule) {
    return;
  }

  if (schedule.count === 0) {
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
