import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const root = cwd();
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
  "Swipe",
  "Swipe to see more",
  "Source ::",
  "Dernière vérification ::",
  "Zglos",
];

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
