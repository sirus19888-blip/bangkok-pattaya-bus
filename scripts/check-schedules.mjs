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
    /\{[\s\S]*?direction:\s*"([^"]+)"[\s\S]*?departures:\s*\[([\s\S]*?)\][\s\S]*?\},/g,
  );

  for (const block of scheduleBlocks) {
    const routeId = block[1];
    const departureBlock = block[2];
    const departures = [...departureBlock.matchAll(/"(\d{1,2}:\d{2})"/g)].map(
      (match) => {
        const [hour, minute] = match[1].split(":");
        return normalizeTime(hour, minute);
      },
    );

    schedules[routeId] = uniqueSorted(departures);
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

  for (const route of result.routes) {
    console.log(`\n  Route: ${route.routeId}`);
    printTimes("Current app times", route.currentAppTimes);
    printTimes("Filtered times", route.filteredTimes);
    printTimes("Ignored likely noise", route.ignoredTimes);
    printTimes("Comparison times", route.comparisonTimes);
    console.log(`  Result: ${route.result}`);
    console.log(`  Confidence: ${route.confidence}`);
    console.log(`  Note: ${route.note}`);

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
      routes: [],
    };

    try {
      const html = await fetchSource(source);
      const text = htmlToText(html);
      const rawExtractedTimes = extractTimes(text);
      sourceReport.rawExtractedTimes = rawExtractedTimes;

      sourceReport.routes = source.routeIds.map((routeId) => {
        const routeProfile = routeProfiles[routeId];
        const currentAppTimes = appSchedules[routeId] ?? [];
        const contextText = extractRelevantContext(
          text,
          routeProfile.contextKeywords,
        );
        const contextRawTimes = extractTimes(contextText);
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

        return {
          routeId,
          sourceUrl: source.url,
          checkedAt: CHECKED_AT,
          rawExtractedTimes,
          filteredTimes,
          ignoredTimes,
          currentAppTimes,
          ...compareRoute({
            contextTimes,
            currentAppTimes,
            filteredTimes,
            ignoredTimes,
            rawExtractedTimes,
            routeId,
            routeProfile,
          }),
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
