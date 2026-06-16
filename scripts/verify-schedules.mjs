import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SCHEDULES_PATH = path.join(process.cwd(), "src", "data", "schedules.ts");
const DEPARTURE_HEADING =
  "\u0e40\u0e14\u0e34\u0e19\u0e17\u0e32\u0e07\u0e08\u0e32\u0e01";

const STATIONS = {
  mochit: "\u0e2b\u0e21\u0e2d\u0e0a\u0e34\u0e15",
  ekkamai: "\u0e40\u0e2d\u0e01\u0e21\u0e31\u0e22",
  pattaya: "\u0e1e\u0e31\u0e17\u0e22\u0e32",
  suvarnabhumi: "\u0e2a\u0e38\u0e27\u0e23\u0e23\u0e13\u0e20\u0e39\u0e21\u0e34",
};

// Lista zrodel: kazde ma wlasny URL i wlasna liste tras (parsowanych osobno).
// Bangkok-Pattaya: 4 sekcje na stronie. Suvarnabhumi-Pattaya: 2 sekcje.
const SOURCES = [
  {
    name: "Bangkok-Pattaya",
    url: "https://airportpattayabus.com/bangkok-terminal-pattaya/",
    routes: [
      {
        routeId: "bangkok-mochit-to-pattaya",
        sectionLabel: "mochit-to-pattaya",
        stationKeyword: STATIONS.mochit,
      },
      {
        routeId: "pattaya-to-mochit",
        sectionLabel: "pattaya-to-mochit",
        stationKeyword: STATIONS.pattaya,
      },
      {
        routeId: "bangkok-ekkamai-to-pattaya",
        sectionLabel: "ekkamai-to-pattaya",
        stationKeyword: STATIONS.ekkamai,
      },
      {
        routeId: "pattaya-to-ekkamai",
        sectionLabel: "pattaya-to-ekkamai",
        stationKeyword: STATIONS.pattaya,
      },
    ],
  },
  {
    name: "Suvarnabhumi-Pattaya",
    url: "https://airportpattayabus.com/airport-pattaya/",
    routes: [
      {
        routeId: "suvarnabhumi-airport-to-pattaya",
        sectionLabel: "suvarnabhumi-to-pattaya",
        stationKeyword: STATIONS.suvarnabhumi,
      },
      {
        routeId: "pattaya-to-suvarnabhumi-airport",
        sectionLabel: "pattaya-to-suvarnabhumi",
        stationKeyword: STATIONS.pattaya,
      },
    ],
  },
];

// Wszystkie routeId ze wszystkich zrodel (do wyciagania z schedules.ts)
const ALL_ROUTE_IDS = new Set(
  SOURCES.flatMap((source) => source.routes.map((route) => route.routeId)),
);

function normalizeTime(hour, minute) {
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

function uniqueSorted(times) {
  return [...new Set(times)].sort();
}

function extractTimes(text) {
  const times = [];
  const matches = text.matchAll(/\b([01]?\d|2[0-3]):([0-5]\d)\b/g);

  for (const match of matches) {
    times.push(normalizeTime(match[1], match[2]));
  }

  return uniqueSorted(times);
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'");
}

function htmlToLines(html) {
  const text = decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(?:br|hr)\s*\/?>/gi, "\n")
      .replace(/<\/(?:p|div|li|h[1-6]|section|article|tr|td|th)>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  );

  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

// Parsuje sekcje dla JEDNEGO zrodla. Mapuje sekcje "edzintagjak" po kolejnosci
// na route'y danego zrodla, weryfikuje przez stationKeyword.
function parseSourceSections(html, routes) {
  const lines = htmlToLines(html);
  const headingIndexes = [];

  lines.forEach((line, index) => {
    if (line.includes(DEPARTURE_HEADING)) {
      headingIndexes.push(index);
    }
  });

  return routes.map((route, index) => {
    const start = headingIndexes[index];
    const nextHeading = headingIndexes[index + 1];

    if (start === undefined) {
      return {
        ...route,
        error: `nie znaleziono sekcji nr ${index + 1}`,
        sourceTimes: [],
      };
    }

    const sectionLines = lines.slice(start, nextHeading ?? lines.length);
    const sectionText = sectionLines.join(" ");
    const sourceTimes = extractTimes(sectionText);

    if (!sectionText.includes(route.stationKeyword)) {
      return {
        ...route,
        error: "sekcja nie pasuje do oczekiwanej stacji",
        sourceTimes,
      };
    }

    if (sourceTimes.length === 0) {
      return {
        ...route,
        error: "nie znaleziono godzin w sekcji",
        sourceTimes,
      };
    }

    return {
      ...route,
      sourceTimes,
    };
  });
}

function extractAppSchedules(source) {
  const schedules = new Map();
  const blocks = source.matchAll(
    /id:\s*"([^"]+)"([\s\S]*?)departures:\s*\[([\s\S]*?)\]/g,
  );

  for (const block of blocks) {
    const routeId = block[1];

    if (!ALL_ROUTE_IDS.has(routeId) || schedules.has(routeId)) {
      continue;
    }

    schedules.set(routeId, extractTimes(block[3]));
  }

  return schedules;
}

async function fetchSourceHtml(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "BangkokPattayaBusGuideScheduleVerify/1.0 (+https://www.bangkokpattayabus.com)",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  return response.text();
}

function compareTimes(appTimes, sourceTimes) {
  const sourceSet = new Set(sourceTimes);
  const appSet = new Set(appTimes);

  return {
    missingFromSource: appTimes.filter((time) => !sourceSet.has(time)),
    extraInSource: sourceTimes.filter((time) => !appSet.has(time)),
  };
}

function printUnverifiable(route, reason) {
  console.log(`NIE MOZNA ZWERYFIKOWAC ${route.sectionLabel} (${route.routeId})`);
  console.log(`  powod: ${reason}`);
}

// Zwraca true jesli trasa ma ROZNICE (do zliczenia globalnego statusu)
function printRouteResult(route, appTimes, sourceTimes) {
  const { missingFromSource, extraInSource } = compareTimes(appTimes, sourceTimes);

  if (missingFromSource.length === 0 && extraInSource.length === 0) {
    console.log(`ZGODNE ${route.sectionLabel} (${route.routeId})`);
    return false;
  }

  console.log(`ROZNICE ${route.sectionLabel} (${route.routeId})`);

  if (missingFromSource.length > 0) {
    console.log(`  brakuje na stronie: ${missingFromSource.join(", ")}`);
  }

  if (extraInSource.length > 0) {
    console.log(`  nadmiar na stronie: ${extraInSource.join(", ")}`);
  }

  return true;
}

async function main() {
  const scheduleSource = await readFile(SCHEDULES_PATH, "utf8");
  const appSchedules = extractAppSchedules(scheduleSource);

  console.log("Weryfikacja rozkladow (wielozrodlowa)");
  console.log("Tryb: read-only; skrypt nie zmienia danych.");

  let hasAnyDifference = false;

  for (const source of SOURCES) {
    console.log("");
    console.log(`=== Zrodlo: ${source.name} ===`);
    console.log(`URL: ${source.url}`);

    let sourceSections = [];
    let sourceError = null;

    try {
      const html = await fetchSourceHtml(source.url);
      sourceSections = parseSourceSections(html, source.routes);
    } catch (error) {
      sourceError = error instanceof Error ? error.message : "nieznany blad";
    }

    for (const route of source.routes) {
      const appTimes = appSchedules.get(route.routeId);
      const sourceSection = sourceSections.find(
        (section) => section.routeId === route.routeId,
      );

      if (!appTimes || appTimes.length === 0) {
        printUnverifiable(route, "nie znaleziono rozkladu w schedules.ts");
        hasAnyDifference = true;
        continue;
      }

      if (sourceError) {
        printUnverifiable(route, `nie udalo sie pobrac strony: ${sourceError}`);
        hasAnyDifference = true;
        continue;
      }

      if (!sourceSection || sourceSection.error) {
        printUnverifiable(
          route,
          sourceSection?.error ?? "nie udalo sie sparsowac sekcji",
        );
        hasAnyDifference = true;
        continue;
      }

      const hasDiff = printRouteResult(
        route,
        appTimes,
        sourceSection.sourceTimes,
      );
      if (hasDiff) {
        hasAnyDifference = true;
      }
    }
  }

  if (hasAnyDifference) {
    console.log("");
    console.log("ROZNICE wykryto - sprawdz powyzsze trasy.");
  }
}

main().catch((error) => {
  console.error("Nie udalo sie uruchomic weryfikacji rozkladow.");
  console.error(error);
  process.exitCode = 1;
});
