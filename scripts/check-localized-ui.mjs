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

const forbiddenPhrases = [
  "Need a ticket today?",
  "Check before you go",
  "Check live availability before you go to the station.",
  "View all routes",
  "Check tickets",
  "Book ticket",
  "Affiliate link",
  "Some booking links may be affiliate links",
  "What if the bus is full?",
  "After the last bus",
  "Bus vs taxi vs private transfer",
  "Return route",
  "Compare tickets and alternatives",
  "Check alternatives",
  "Check availability",
  "Report outdated times",
  "Around 2-3 hours",
  "THB per seat",
  "partially verified",
  "Source ::",
  "Dernière vérification ::",
  "Zglos",
];

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

for (const locale of locales) {
  const homepagePath = join(root, ".next/server/app", locale, "page.html");

  if (existsSync(homepagePath)) {
    assertNoForbiddenPhrase(`/${locale}`, readFileSync(homepagePath, "utf8"));
  }

  for (const slug of routeSlugs) {
    const routeHtmlPath = join(root, ".next/server/app", locale, `${slug}.html`);

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
