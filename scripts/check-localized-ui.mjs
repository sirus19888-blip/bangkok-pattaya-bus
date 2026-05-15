import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const root = cwd();
const languageSwitcherSource = readFileSync(
  join(root, "src/components/LanguageSwitcher.tsx"),
  "utf8",
);
const locales = ["th", "zh", "ru", "de", "fr", "pl"];
const routeSlugs = [
  "bangkok-to-pattaya",
  "pattaya-to-bangkok",
  "suvarnabhumi-airport-to-pattaya",
  "pattaya-to-suvarnabhumi-airport",
  "don-mueang-airport-to-pattaya",
  "pattaya-to-don-mueang-airport",
];
const requiredLocalizedPaths = [
  ...locales.map((locale) => `/${locale}`),
  ...locales.map((locale) => `/${locale}/bangkok-to-pattaya`),
];

const forbiddenPhrases = [
  "Need a ticket today",
  "Check before you go",
  "Check live availability",
  "View all routes",
  "Affiliate link",
  "Book ticket",
  "Check tickets",
  "Plan the return trip",
  "Useful information for travelers",
  "Check bus times",
  "Check bus information",
  "What if the bus is full",
  "After the last bus",
  "Bus vs taxi",
  "Return route",
  "Compare tickets",
  "Check alternatives",
  "Check availability",
  "Report outdated times",
  "Some booking links may be affiliate links",
  "About",
  "Contact",
  "Privacy",
  "Around",
  "per seat",
  "partially verified",
  "Estimate",
  "Weather in",
  "Clear",
  "Station map Use",
  "Enlarge station map Enlarge station map",
  "Use this photo",
  "Look for the ticket counters",
  "Boarding areas may change",
  "Exterior entrance of Ekkamai Bus Terminal",
  "Inside area of Ekkamai Bus Terminal",
  "Bus boarding area at Ekkamai Bus Terminal",
  "North Pattaya Bus Station entrance",
  "Swipe",
  "Swipe to see more",
  "Source ::",
  "Dernière vérification ::",
  "Zglos",
  "Autobus z lotniska Autobus z lotniska",
  "Autobus Pattaya na lotnisko Don Mueang",
  "Подходит для центр Бангкока",
  "Подходит для город Паттайя",
  "车站区域照片",
  "车站识别参考图",
  "Photo de la zone de station",
  "Photo pratique pour reconnaître la station",
  "Stationsfoto",
  "Фото станции",
  ...[
    [0xe2, 0x20ac, 0x02d8],
    [0x50, 0x6f, 0x6b, 0x61, 0x0139, 0x013d],
    [0x77, 0x69, 0x00c4, 0x2122, 0x63, 0x65, 0x6a],
    [0x0110, 0x017a, 0x0110, 0x013e],
    [0x0110, 0x00b5, 0x0143],
  ].map((codes) => String.fromCodePoint(...codes)),
  "â–ľ",
  "âŚ",
  "Ă—",
];

const forbiddenLocalizedLanguageCodes = [
  [0x0410, 0x041d, 0x0413],
  [0x0422, 0x0410, 0x0419],
  [0x041a, 0x0418, 0x0422],
  [0x041d, 0x0415, 0x041c],
  [0x041f, 0x041e, 0x041b],
].map((codes) => String.fromCodePoint(...codes));

for (const forbiddenLanguageCode of forbiddenLocalizedLanguageCodes) {
  assert.ok(
    !languageSwitcherSource.includes(forbiddenLanguageCode),
    `Language switcher must use stable language codes, not localized code ${forbiddenLanguageCode}.`,
  );
}

assert.ok(
  !languageSwitcherSource.includes("localeLabels"),
  "Language switcher must not localize language code labels.",
);

function getBuiltHtmlPath(path) {
  return join(root, ".next/server/app", `${path.replace(/^\/+/, "")}.html`);
}

function stripNonVisibleHtml(html) {
  const bodyHtml = html.split("</head>")[1] ?? html;

  return bodyHtml
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "");
}

function assertNoForbiddenPhrase(path, html) {
  const visibleHtml = stripNonVisibleHtml(html);

  for (const phrase of forbiddenPhrases) {
    assert.ok(
      !visibleHtml.includes(phrase),
      `${path} must not contain untranslated English phrase: ${phrase}`,
    );
  }
}

for (const path of requiredLocalizedPaths) {
  const htmlPath = getBuiltHtmlPath(path);

  assert.ok(
    existsSync(htmlPath),
    `${path} must have a built static HTML file before i18n checks run.`,
  );
  assertNoForbiddenPhrase(path, readFileSync(htmlPath, "utf8"));
}

for (const locale of locales) {
  assertNoForbiddenPhrase(
    `/${locale}`,
    readFileSync(getBuiltHtmlPath(`/${locale}`), "utf8"),
  );

  for (const slug of routeSlugs) {
    const routeHtmlPath = getBuiltHtmlPath(`/${locale}/${slug}`);

    if (!existsSync(routeHtmlPath)) {
      continue;
    }

    assertNoForbiddenPhrase(
      `/${locale}/${slug}`,
      readFileSync(routeHtmlPath, "utf8"),
    );
  }
}

console.log("Localized UI checks passed.");
