import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const CHECKED_AT = new Date().toISOString();
const SCHEDULES_PATH = path.join(process.cwd(), "src", "data", "schedules.ts");
const REPORT_PATH = path.join(
  process.cwd(),
  "reports",
  "schedule-check-latest.json",
);

const IGNORED_GLOBAL_TIMES = new Set(["00:00"]);

const routeProfiles = {
  "bangkok-to-pattaya": {
    allowedMinutes: ["00", "30"],
    contextKeywords: ["bangkok", "ekkamai", "pattaya"],
    sourceReliability: "mixed",
  },
  "pattaya-to-bangkok": {
    allowedMinutes: ["00", "30"],
    contextKeywords: ["pattaya", "ekkamai", "mochit", "mo chit", "bangkok"],
    sourceReliability: "mixed",
  },
  "suvarnabhumi-airport-to-pattaya": {
    allowedMinutes: ["00"],
    contextKeywords: ["suvarnabhumi", "airport", "pattaya"],
    sourceReliability: "mixed",
  },
  "pattaya-to-suvarnabhumi-airport": {
    allowedMinutes: ["00"],
    contextKeywords: ["pattaya", "jomtien", "suvarnabhumi", "airport"],
    sourceReliability: "mixed",
  },
  "don-mueang-airport-to-pattaya": {
    allowedMinutes: ["00", "30"],
    contextKeywords: [
      "pattaya",
      "route 1",
      "express bus",
      "don mueang airport - pattaya",
    ],
    sourceReliability: "weak-context",
  },
};

const sources = [
  {
    name: "Airport Pattaya Bus",
    url: "https://airportpattayabus.com/",
    routeIds: [
      "suvarnabhumi-airport-to-pattaya",
      "pattaya-to-suvarnabhumi-airport",
    ],
  },
  {
    name: "Pattaya Bus / Roong Reuang Coach",
    url: "https://pattayabus.com/",
    routeIds: ["bangkok-to-pattaya", "pattaya-to-bangkok"],
  },
  {
    name: "Don Mueang Airport transportation page",
    url: "https://donmueang.airportthai.co.th/service/transportation/detail/1290",
    routeIds: ["don-mueang-airport-to-pattaya"],
  },
];

function normalizeTime(hour, minute) {
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

function uniqueSorted(times) {
  return [...new Set(times)].sort();
}

function extractTimes(text) {
  const matches = text.matchAll(/\b([01]?\d|2[0-3]):([0-5]\d)\b/g);
  const times = [];

  for (const match of matches) {
    times.push(normalizeTime(match[1], match[2]));
  }

  return uniqueSorted(times);
}

function extractFares(text) {
  const fares = [];
  const patterns = [
    /\b(?:from\s+)?(?:fare|price|ticket price|published fare)\s*(?:is|:|shown|shown by operator)?\s*(?:around\s*)?(?:฿\s*)?(\d{2,4})\s*(?:baht|thb)?\b/gi,
    /\b(?:from\s+)?(\d{2,4})\s*(?:baht|thb)\b/gi,
    /฿\s*(\d{2,4})\b/gi,
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      fares.push({
        raw: match[0].trim(),
        normalized: `${Number.parseInt(match[1], 10)} THB`,
        amount: Number.parseInt(match[1], 10),
        isFrom: /\bfrom\b/i.test(match[0]),
      });
    }
  }

  return uniqueByNormalizedFare(fares);
}

function uniqueByNormalizedFare(fares) {
  const seen = new Set();
  const unique = [];

  for (const fare of fares) {
    const key = `${fare.normalized}:${fare.isFrom ? "from" : "exact"}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(fare);
    }
  }

  return unique.sort((a, b) => a.amount - b.amount);
}

function uniqueByNormalizedTravelTime(travelTimes) {
  const seen = new Set();
  const unique = [];

  for (const travelTime of travelTimes) {
    if (!seen.has(travelTime.normalized)) {
      seen.add(travelTime.normalized);
      unique.push(travelTime);
    }
  }

  return unique.sort((a, b) => a.minMinutes - b.minMinutes);
}

function extractTravelTimes(text) {
  const travelTimes = [];
  const patterns = [
    /\b(?:around\s*)?(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)\s*hours?\b/gi,
    /\b(?:around\s*)?(\d+(?:\.\d+)?)\s*h(?:ours?)?\s*(\d{1,2})\s*m(?:in(?:ute)?s?)?\b/gi,
    /\b(?:around\s*)?(\d+(?:\.\d+)?)\s*hours?\s*(\d{1,2})\s*minutes?\b/gi,
    /\b(?:around\s*)?(\d+(?:\.\d+)?)\s*hours?\b(?!\s*\d{1,2}\s*minutes?)/gi,
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const parsed = normalizeTravelTimeMatch(match);
      if (parsed) {
        travelTimes.push(parsed);
      }
    }
  }

  return uniqueByNormalizedTravelTime(travelTimes);
}

function normalizeTravelTimeMatch(match) {
  const raw = match[0].trim();
  const first = Number.parseFloat(match[1]);
  const second = match[2] ? Number.parseFloat(match[2]) : undefined;

  if (!Number.isFinite(first)) {
    return null;
  }

  if (/[-–]/.test(raw) && second !== undefined) {
    return {
      raw,
      normalized: `${formatHours(first)}-${formatHours(second)} hours`,
      minMinutes: Math.round(first * 60),
      maxMinutes: Math.round(second * 60),
    };
  }

  if (/\d+\s*h/i.test(raw) || /minutes?/i.test(raw)) {
    const totalMinutes = Math.round(first * 60 + (second ?? 0));
    return {
      raw,
      normalized: minutesToTravelTime(totalMinutes),
      minMinutes: totalMinutes,
      maxMinutes: totalMinutes,
    };
  }

  const minutes = Math.round(first * 60);
  return {
    raw,
    normalized: `${formatHours(first)} hours`,
    minMinutes: minutes,
    maxMinutes: minutes,
  };
}

function formatHours(hours) {
  return Number.isInteger(hours) ? String(hours) : String(hours);
}

function minutesToTravelTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hours`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function stripNoisyMarkup(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
}

function htmlToText(html) {
  return stripNoisyMarkup(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function extractRelevantContext(text, keywords) {
  const lowerText = text.toLowerCase();
  const windows = [];
  const windowSize = 700;

  for (const keyword of keywords) {
    let index = lowerText.indexOf(keyword);

    while (index !== -1) {
      const start = Math.max(0, index - windowSize);
      const end = Math.min(text.length, index + keyword.length + windowSize);
      windows.push(text.slice(start, end));
      index = lowerText.indexOf(keyword, index + keyword.length);
    }
  }

  return windows.join(" ");
}

function extractAppSchedules(source) {
  const schedules = {};
  const scheduleBlocks = source.matchAll(
    /\n  \{([\s\S]*?direction:\s*"([^"]+)"[\s\S]*?)\n  \},/g,
  );

  for (const block of scheduleBlocks) {
    const objectText = block[1];
    const routeId = block[2];
    const departureBlock =
      objectText.match(/departures:\s*\[([\s\S]*?)\]/)?.[1] ?? "";
    const departures = [...departureBlock.matchAll(/"(\d{1,2}:\d{2})"/g)].map(
      (match) => {
        const [hour, minute] = match[1].split(":");
        return normalizeTime(hour, minute);
      },
    );
    const travelTime = objectText.match(/travelTime:\s*"([^"]+)"/)?.[1] ?? "";
    const price = objectText.match(/price:\s*"([^"]+)"/)?.[1] ?? "";
    const fareNote = objectText.match(/fareNote:\s*"([^"]+)"/)?.[1] ?? "";

    schedules[routeId] = {
      times: uniqueSorted(departures),
      fareText: [price, fareNote].filter(Boolean).join(" "),
      travelTime,
    };
  }

  return schedules;
}

function isAllowedForRoute(time, routeProfile, currentAppTimes) {
  if (IGNORED_GLOBAL_TIMES.has(time)) {
    return false;
  }

  if (currentAppTimes.includes(time)) {
    return true;
  }

  const minute = time.slice(3);
  return routeProfile.allowedMinutes.includes(minute);
}

function filterTimesForRoute(rawExtractedTimes, routeProfile, currentAppTimes) {
  const filteredTimes = [];
  const ignoredTimes = [];

  for (const time of rawExtractedTimes) {
    if (isAllowedForRoute(time, routeProfile, currentAppTimes)) {
      filteredTimes.push(time);
    } else {
      ignoredTimes.push(time);
    }
  }

  return {
    filteredTimes: uniqueSorted(filteredTimes),
    ignoredTimes: uniqueSorted(ignoredTimes),
  };
}

function compareRoute({
  contextTimes,
  currentAppTimes,
  filteredTimes,
  ignoredTimes,
  rawExtractedTimes,
  routeId,
  routeProfile,
}) {
  const comparisonTimes =
    contextTimes.length > 0 ? uniqueSorted(contextTimes) : filteredTimes;
  const comparisonSet = new Set(comparisonTimes);
  const currentSet = new Set(currentAppTimes);
  const missingFromSource = currentAppTimes.filter(
    (time) => !comparisonSet.has(time),
  );
  const extraInSource = comparisonTimes.filter((time) => !currentSet.has(time));
  const hasParserNoise = ignoredTimes.length > 0;
  const hasMixedRouteData =
    routeProfile.sourceReliability === "mixed" && extraInSource.length > 0;

  if (currentAppTimes.length === 0) {
    return {
      result: "needs manual review",
      confidence: "low",
      comparisonTimes,
      missingFromSource,
      extraInSource,
      note: "No current app times found for this route.",
    };
  }

  if (rawExtractedTimes.length === 0 || comparisonTimes.length === 0) {
    return {
      result: "needs manual review",
      confidence: "low",
      comparisonTimes,
      missingFromSource,
      extraInSource,
      note: "No plausible route departure times were extracted from this source.",
    };
  }

  if (missingFromSource.length === 0 && extraInSource.length === 0) {
    return {
      result: "match",
      confidence: hasParserNoise ? "medium" : "high",
      comparisonTimes,
      missingFromSource,
      extraInSource,
      note: hasParserNoise
        ? "Current app times match after filtering likely parser noise."
        : "Extracted route times match current app times.",
    };
  }

  if (routeProfile.sourceReliability === "weak-context") {
    return {
      result: "needs manual review",
      confidence: "low",
      comparisonTimes,
      missingFromSource,
      extraInSource,
      note:
        "Needs manual review - possible parser noise. Source contains mixed or noisy schedule-like times.",
    };
  }

  if (hasMixedRouteData) {
    return {
      result: "needs manual review",
      confidence: "low",
      comparisonTimes,
      missingFromSource,
      extraInSource,
      note:
        "Needs manual review - source page contains mixed route data. Review manually before changing route data.",
    };
  }

  if (missingFromSource.length > 0) {
    return {
      result: "mismatch",
      confidence: "medium",
      comparisonTimes,
      missingFromSource,
      extraInSource,
      note:
        "Some current app times were not found in plausible extracted route times. Verify manually before changing app data.",
    };
  }

  return {
    result: "needs manual review",
    confidence: "medium",
    comparisonTimes,
    missingFromSource,
    extraInSource,
    note:
      "Current times were found, but source includes extra plausible times. Review manually before changing route data.",
  };
}

function compareFare({ currentAppFare, normalizedFares, routeProfile }) {
  const currentFares = extractFares(currentAppFare);

  if (currentFares.length === 0) {
    return {
      fareResult: "needs manual review",
      fareConfidence: "low",
      fareNote: "No current app fare value could be normalized.",
    };
  }

  if (normalizedFares.length === 0) {
    return {
      fareResult: "needs manual review",
      fareConfidence: "low",
      fareNote: "No fare-like source values were found.",
    };
  }

  const sourceAmounts = new Set(normalizedFares.map((fare) => fare.amount));
  const exactMatch = currentFares.some((fare) => sourceAmounts.has(fare.amount));

  if (exactMatch) {
    return {
      fareResult: "match",
      fareConfidence: routeProfile.sourceReliability === "mixed" ? "medium" : "high",
      fareNote: "Source fare value matches the current app fare.",
    };
  }

  const closeMatch = currentFares.some((currentFare) =>
    normalizedFares.some(
      (sourceFare) => Math.abs(sourceFare.amount - currentFare.amount) <= 2,
    ),
  );

  if (closeMatch) {
    return {
      fareResult: "needs manual review",
      fareConfidence: "medium",
      fareNote:
        "Source fare is close to the current app fare. Platform fees or 'from' prices may differ.",
    };
  }

  return {
    fareResult: "needs manual review",
    fareConfidence: "low",
    fareNote:
      "Source fare values differ from the current app fare. Verify manually before changing app data.",
  };
}

function parseTravelTimeText(text) {
  return extractTravelTimes(text);
}

function travelRangesOverlap(left, right) {
  return left.minMinutes <= right.maxMinutes && right.minMinutes <= left.maxMinutes;
}

function compareTravelTime({
  currentAppTravelTime,
  normalizedTravelTimes,
  routeProfile,
}) {
  const currentTravelTimes = parseTravelTimeText(currentAppTravelTime);

  if (currentTravelTimes.length === 0) {
    return {
      travelTimeResult: "needs manual review",
      travelTimeConfidence: "low",
      travelTimeNote: "No current app travel time could be normalized.",
    };
  }

  if (normalizedTravelTimes.length === 0) {
    return {
      travelTimeResult: "needs manual review",
      travelTimeConfidence: "low",
      travelTimeNote: "No travel-time-like source values were found.",
    };
  }

  const exactMatch = currentTravelTimes.some((currentTime) =>
    normalizedTravelTimes.some(
      (sourceTime) => sourceTime.normalized === currentTime.normalized,
    ),
  );

  if (exactMatch) {
    return {
      travelTimeResult: "match",
      travelTimeConfidence:
        routeProfile.sourceReliability === "mixed" ? "medium" : "high",
      travelTimeNote: "Source travel time matches the current app value.",
    };
  }

  const overlappingRange = currentTravelTimes.some((currentTime) =>
    normalizedTravelTimes.some((sourceTime) =>
      travelRangesOverlap(currentTime, sourceTime),
    ),
  );

  if (overlappingRange) {
    return {
      travelTimeResult: "needs manual review",
      travelTimeConfidence: "medium",
      travelTimeNote:
        "Source travel time overlaps with the current app value. Traffic wording may differ.",
    };
  }

  return {
    travelTimeResult: "needs manual review",
    travelTimeConfidence: "low",
    travelTimeNote:
      "Source travel time differs from the current app value. Verify manually before changing app data.",
  };
}

async function fetchSource(source) {
  const response = await fetch(source.url, {
    headers: {
      "user-agent":
        "BangkokPattayaBusGuideScheduleCheck/1.0 (+https://www.bangkokpattayabus.com)",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  return response.text();
}

function printTimes(label, times) {
  console.log(`  ${label}: ${times.length ? times.join(", ") : "none"}`);
}

function printValues(label, values, formatter) {
  const formattedValues = values.map(formatter);
  console.log(
    `  ${label}: ${formattedValues.length ? formattedValues.join(", ") : "none"}`,
  );
}

function printSourceReport(result) {
  console.log(`\nSource: ${result.sourceName}`);
  console.log(`URL: ${result.sourceUrl}`);
  console.log(`Checked: ${result.checkedAt}`);

  if (result.error) {
    console.log("Status: fetch error");
    console.log(`Error: ${result.error}`);
    return;
  }

  printTimes("Raw extracted times", result.rawExtractedTimes);
  printValues("Raw extracted fares", result.rawExtractedFares, (fare) => fare.raw);
  printValues(
    "Raw extracted travel times",
    result.rawExtractedTravelTimes,
    (travelTime) => travelTime.raw,
  );

  for (const route of result.routes) {
    console.log(`\n  Route: ${route.routeId}`);
    printTimes("Current app times", route.currentAppTimes);
    printTimes("Filtered times", route.filteredTimes);
    printTimes("Ignored likely noise", route.ignoredTimes);
    printTimes("Comparison times", route.comparisonTimes);
    console.log(`  Time result: ${route.timeResult}`);
    console.log(`  Time confidence: ${route.timeConfidence}`);
    console.log(`  Time note: ${route.timeNote}`);
    console.log(`  Fare result: ${route.fareResult}`);
    console.log(`  Fare confidence: ${route.fareConfidence}`);
    console.log(`  Fare note: ${route.fareNote}`);
    console.log(`  Travel time result: ${route.travelTimeResult}`);
    console.log(`  Travel time confidence: ${route.travelTimeConfidence}`);
    console.log(`  Travel time note: ${route.travelTimeNote}`);

    if (route.missingFromSource.length) {
      printTimes("Missing from source", route.missingFromSource);
    }

    if (route.extraInSource.length) {
      printTimes("Extra in source", route.extraInSource);
    }
  }
}

async function main() {
  const scheduleSource = await readFile(SCHEDULES_PATH, "utf8");
  const appSchedules = extractAppSchedules(scheduleSource);
  const report = {
    checkedAt: CHECKED_AT,
    purpose:
      "Detect possible schedule changes for manual review. This script does not update live route data.",
    sources: [],
  };

  console.log("Schedule source check");
  console.log(`Checked: ${CHECKED_AT}`);
  console.log("Mode: read-only; no live schedule data will be changed.");

  for (const source of sources) {
    const sourceReport = {
      sourceName: source.name,
      sourceUrl: source.url,
      checkedAt: CHECKED_AT,
      rawExtractedTimes: [],
      rawExtractedFares: [],
      rawExtractedTravelTimes: [],
      routes: [],
    };

    try {
      const html = await fetchSource(source);
      const text = htmlToText(html);
      const rawExtractedTimes = extractTimes(text);
      const rawExtractedFares = extractFares(text);
      const rawExtractedTravelTimes = extractTravelTimes(text);
      sourceReport.rawExtractedTimes = rawExtractedTimes;
      sourceReport.rawExtractedFares = rawExtractedFares;
      sourceReport.rawExtractedTravelTimes = rawExtractedTravelTimes;

      sourceReport.routes = source.routeIds.map((routeId) => {
        const routeProfile = routeProfiles[routeId];
        const currentAppSchedule = appSchedules[routeId] ?? {
          times: [],
          fareText: "",
          travelTime: "",
        };
        const currentAppTimes = currentAppSchedule.times;
        const currentAppFare = currentAppSchedule.fareText;
        const currentAppTravelTime = currentAppSchedule.travelTime;
        const contextText = extractRelevantContext(
          text,
          routeProfile.contextKeywords,
        );
        const contextRawTimes = extractTimes(contextText);
        const contextFares = extractFares(contextText);
        const contextTravelTimes = extractTravelTimes(contextText);
        const { filteredTimes, ignoredTimes } = filterTimesForRoute(
          rawExtractedTimes,
          routeProfile,
          currentAppTimes,
        );
        const { filteredTimes: contextTimes } = filterTimesForRoute(
          contextRawTimes,
          routeProfile,
          currentAppTimes,
        );
        const timeComparison = compareRoute({
          contextTimes,
          currentAppTimes,
          filteredTimes,
          ignoredTimes,
          rawExtractedTimes,
          routeId,
          routeProfile,
        });
        const routeFares =
          contextFares.length > 0 ? contextFares : rawExtractedFares;
        const routeTravelTimes =
          contextTravelTimes.length > 0
            ? contextTravelTimes
            : rawExtractedTravelTimes;
        const fareComparison = compareFare({
          currentAppFare,
          normalizedFares: routeFares,
          routeProfile,
        });
        const travelTimeComparison = compareTravelTime({
          currentAppTravelTime,
          normalizedTravelTimes: routeTravelTimes,
          routeProfile,
        });

        return {
          routeId,
          sourceUrl: source.url,
          checkedAt: CHECKED_AT,
          rawExtractedTimes,
          filteredTimes,
          ignoredTimes,
          currentAppTimes,
          timeResult: timeComparison.result,
          timeConfidence: timeComparison.confidence,
          timeNote: timeComparison.note,
          comparisonTimes: timeComparison.comparisonTimes,
          missingFromSource: timeComparison.missingFromSource,
          extraInSource: timeComparison.extraInSource,
          rawExtractedFares,
          normalizedFares: routeFares.map((fare) => fare.normalized),
          currentAppFare,
          ...fareComparison,
          rawExtractedTravelTimes,
          normalizedTravelTimes: routeTravelTimes.map(
            (travelTime) => travelTime.normalized,
          ),
          currentAppTravelTime,
          ...travelTimeComparison,
        };
      });
    } catch (error) {
      sourceReport.error =
        error instanceof Error ? error.message : "Unknown fetch error";
    }

    report.sources.push(sourceReport);
    printSourceReport(sourceReport);
  }

  await mkdir(path.dirname(REPORT_PATH), { recursive: true });
  await writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`\nJSON report written to ${path.relative(process.cwd(), REPORT_PATH)}`);
  console.log("Review mismatches manually before changing any schedule data.");
}

main().catch((error) => {
  console.error("Schedule check failed.");
  console.error(error);
  process.exitCode = 1;
});
