import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const root = cwd();
const locales = ["en", "th", "zh", "ru", "de", "fr", "pl"];
const routeSlugs = [
  "bangkok-to-pattaya",
  "pattaya-to-bangkok",
  "suvarnabhumi-airport-to-pattaya",
  "pattaya-to-suvarnabhumi-airport",
  "don-mueang-airport-to-pattaya",
  "pattaya-to-don-mueang-airport",
];

const hourUnits =
  "(?:hours?|hrs?|h|ชั่วโมง|ชม\\.?|小时|час(?:а|ов)?|ч\\.?|stunden|std\\.?|heures?|godzin(?:y|ę)?|godz\\.?)";
const minuteUnits =
  /^(?:\s|&nbsp;)*(?:\d+(?:[.,]\d+)?\s*)?(?:minutes?|mins?|min|m|นาที|分钟|минут(?:ы)?|мин\.?|Minuten|Min\.?|minut(?:y)?|min\.?)(?=$|[\s.,;:!?。])/iu;
const hourPattern = new RegExp(
  `(\\d+(?:[.,]\\d+)?(?:\\s*(?:-|–|—|to|à)\\s*\\d+(?:[.,]\\d+)?)?)\\s*${hourUnits}`,
  "giu",
);

const warnings = [];
const inconsistencies = [];
let parsedPairs = 0;
let checkedPairs = 0;

for (const locale of locales) {
  for (const slug of routeSlugs) {
    checkedPairs += 1;
    const pagePath = `/${locale}/${slug}`;
    const htmlPath = getBuiltHtmlPath(pagePath);

    if (!existsSync(htmlPath)) {
      warn(slug, locale, `missing built HTML at ${htmlPath}`);
      continue;
    }

    const html = stripNonVisibleHtml(readFileSync(htmlPath, "utf8"));
    const heroResult = extractHeroTravelTime(html);
    const faqResult = extractFaqTravelTime(html);

    if (!heroResult.value || !faqResult.value) {
      warn(
        slug,
        locale,
        [heroResult.warning, faqResult.warning].filter(Boolean).join("; "),
      );
      continue;
    }

    const heroRange = toRange(heroResult.value);
    const faqRange = toRange(faqResult.value);

    if (!heroRange || !faqRange) {
      warn(
        slug,
        locale,
        `could not convert parsed values to ranges: hero=${heroResult.value}, FAQ=${faqResult.value}`,
      );
      continue;
    }

    parsedPairs += 1;

    if (!rangesOverlap(heroRange, faqRange)) {
      inconsistencies.push({
        slug,
        locale,
        hero: heroResult.value,
        faq: faqResult.value,
        heroRange,
        faqRange,
      });
    }
  }
}

console.log("Travel time consistency check");
console.log(`Checked pairs: ${checkedPairs}`);
console.log(`Parsed comparisons: ${parsedPairs}`);
console.log(`Inconsistencies: ${inconsistencies.length}`);
console.log(`Warnings: ${warnings.length}`);

if (inconsistencies.length > 0) {
  console.log("\nInconsistencies:");

  for (const inconsistency of inconsistencies) {
    console.log(
      `- ${inconsistency.slug}/${inconsistency.locale}: hero=${inconsistency.hero} (${formatRange(
        inconsistency.heroRange,
      )}), FAQ=${inconsistency.faq} (${formatRange(inconsistency.faqRange)})`,
    );
  }
}

if (warnings.length > 0) {
  console.log("\nWarnings:");

  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (inconsistencies.length > 0) {
  process.exit(1);
}

console.log("\nTravel time consistency check passed.");

function getBuiltHtmlPath(path) {
  return join(root, ".next/server/app", `${path.replace(/^\/+/, "")}.html`);
}

function stripNonVisibleHtml(html) {
  const bodyHtml = html.split("</head>")[1] ?? html;

  return bodyHtml
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
}

function extractHeroTravelTime(html) {
  const sidebarShell = extractElementByAttribute(
    html,
    /data-visual-qa=["']affiliate-sidebar-shell["']/i,
  );
  const bookingPanel =
    sidebarShell ??
    extractElementByAttribute(html, /data-desktop-booking-panel=["']true["']/i);

  if (!bookingPanel) {
    return {
      value: null,
      warning: "hero/sidebar section not found",
    };
  }

  return extractSingleHourValue(
    visibleText(stripNextBusElements(bookingPanel)),
    "hero/sidebar",
  );
}

function stripNextBusElements(html) {
  return html.replace(
    /<span\b[^>]*\bdata-next-bus-(?:sidebar|hero)\b[^>]*>[\s\S]*?<\/span>/gi,
    "",
  );
}

function extractFaqTravelTime(html) {
  const faqRegion = extractBetween(
    html,
    /data-ad-slot=["']after-station-information["'][^>]*>/i,
    /<[^>]+data-ad-slot=["']after-faq["'][^>]*>/i,
  );

  if (!faqRegion) {
    return {
      value: null,
      warning: "FAQ region not found",
    };
  }

  const answerTexts = extractParagraphTexts(faqRegion);
  const values = unique(
    answerTexts.flatMap((answerText) => extractHourValues(answerText)),
  );

  if (values.length !== 1) {
    return {
      value: null,
      warning:
        values.length === 0
          ? "FAQ travel time not found unambiguously"
          : `FAQ has multiple hour values: ${values.join(", ")}`,
    };
  }

  return {
    value: values[0],
    warning: null,
  };
}

function extractSingleHourValue(text, label) {
  const values = unique(extractHourValues(text));

  if (values.length !== 1) {
    return {
      value: null,
      warning:
        values.length === 0
          ? `${label} travel time not found unambiguously`
          : `${label} has multiple hour values: ${values.join(", ")}`,
    };
  }

  return {
    value: values[0],
    warning: null,
  };
}

function extractHourValues(text) {
  const normalizedText = normalizeHourText(text);
  const values = [];

  for (const match of normalizedText.matchAll(hourPattern)) {
    const suffix = normalizedText.slice(match.index + match[0].length);
    const minuteMatch = suffix.match(minuteUnits);

    values.push(canonicalizeHourValue(match[1], extractMinuteValue(minuteMatch)));
  }

  return values;
}

function normalizeHourText(text) {
  return decodeHtmlEntities(text)
    .replace(/\u00a0/g, " ")
    .replace(/[–—]/g, "-")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/\s+/g, " ")
    .trim();
}

function canonicalizeHourValue(value, minuteValue = null) {
  const canonicalValue = value
    .replace(/[–—]/g, "-")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/\s*(?:-|to|à)\s*/giu, "-")
    .trim();

  if (!minuteValue) {
    return canonicalValue;
  }

  const minutes = Number.parseFloat(minuteValue.replace(",", "."));
  const hourRange = toRange(canonicalValue);

  if (!Number.isFinite(minutes) || !hourRange) {
    return canonicalValue;
  }

  const minuteHours = minutes / 60;

  return hourRange[0] === hourRange[1]
    ? formatHourNumber(hourRange[0] + minuteHours)
    : `${formatHourNumber(hourRange[0] + minuteHours)}-${formatHourNumber(
        hourRange[1] + minuteHours,
      )}`;
}

function extractMinuteValue(minuteMatch) {
  if (!minuteMatch) {
    return null;
  }

  return /^(?:\s|&nbsp;)*(\d+(?:[.,]\d+)?)/iu.exec(minuteMatch[0])?.[1] ?? null;
}

function toRange(value) {
  const parts = value.split("-").map((part) => Number.parseFloat(part));

  if (
    parts.length === 0 ||
    parts.length > 2 ||
    parts.some((part) => !Number.isFinite(part))
  ) {
    return null;
  }

  const [start, end = start] = parts;

  return start <= end ? [start, end] : [end, start];
}

function rangesOverlap(firstRange, secondRange) {
  return firstRange[0] <= secondRange[1] && secondRange[0] <= firstRange[1];
}

function formatRange(range) {
  return `[${formatHourNumber(range[0])}, ${formatHourNumber(range[1])}]`;
}

function formatHourNumber(value) {
  return Number.parseFloat(value.toFixed(4)).toString();
}

function extractParagraphTexts(html) {
  const paragraphs = [];
  const paragraphPattern = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;

  for (const match of html.matchAll(paragraphPattern)) {
    paragraphs.push(visibleText(match[1]));
  }

  return paragraphs;
}

function visibleText(html) {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, " ")).replace(
    /\s+/g,
    " ",
  );
}

function extractBetween(html, startPattern, endPattern) {
  const startMatch = startPattern.exec(html);

  if (!startMatch) {
    return null;
  }

  const startIndex = startMatch.index + startMatch[0].length;
  const endMatch = endPattern.exec(html.slice(startIndex));

  if (!endMatch) {
    return null;
  }

  return html.slice(startIndex, startIndex + endMatch.index);
}

function extractElementByAttribute(html, attributePattern) {
  const attributeMatch = attributePattern.exec(html);

  if (!attributeMatch) {
    return null;
  }

  const openStart = html.lastIndexOf("<", attributeMatch.index);
  const openEnd = html.indexOf(">", attributeMatch.index);

  if (openStart === -1 || openEnd === -1) {
    return null;
  }

  const tagName = /^<([a-z][a-z0-9-]*)\b/i.exec(html.slice(openStart, openEnd));

  if (!tagName) {
    return null;
  }

  const tagPattern = new RegExp(`</?${tagName[1]}\\b[^>]*>`, "gi");
  tagPattern.lastIndex = openStart;

  let depth = 0;
  let match;

  while ((match = tagPattern.exec(html)) !== null) {
    if (match[0].startsWith("</")) {
      depth -= 1;
    } else {
      depth += 1;
    }

    if (depth === 0) {
      return html.slice(openStart, tagPattern.lastIndex);
    }
  }

  return null;
}

function decodeHtmlEntities(text) {
  const namedEntities = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/giu, (entity, code) => {
    if (code.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    }

    if (code.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    }

    return namedEntities[code.toLowerCase()] ?? entity;
  });
}

function unique(values) {
  return [...new Set(values)];
}

function warn(slug, locale, reason) {
  warnings.push(
    `nie udalo sie wyodrebnic dla ${slug}/${locale}${
      reason ? `: ${reason}` : ""
    }`,
  );
}
