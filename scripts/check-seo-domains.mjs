import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { cwd } from "node:process";

const root = cwd();
const expectedSiteUrl = "https://www.bangkokpattayabus.com";
const locales = ["en", "th", "zh", "ru", "de", "fr", "pl"];
const routeSlugs = [
  "bangkok-to-pattaya",
  "pattaya-to-bangkok",
  "suvarnabhumi-airport-to-pattaya",
  "pattaya-to-suvarnabhumi-airport",
  "don-mueang-airport-to-pattaya",
  "pattaya-to-don-mueang-airport",
];
const bannedPatterns = [
  {
    label: "vercel.app preview domain",
    regex: /bangkok-pattaya-bus\.vercel\.app/i,
  },
  {
    label: "production domain without www",
    regex: /https?:\/\/bangkokpattayabus\.com(\/|["'`)\s]|$)/i,
  },
];

const sourceRoots = ["src", "scripts", "docs", "README.md"].map((path) =>
  join(root, path),
);
const checkedExtensions = new Set([
  ".js",
  ".mjs",
  ".ts",
  ".tsx",
  ".json",
  ".md",
  ".txt",
]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function absolute(path) {
  return new URL(path, expectedSiteUrl).toString();
}

function normalizeUrl(url) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function sameUrl(actual, expected) {
  return normalizeUrl(actual) === normalizeUrl(expected);
}

function walk(path, files = []) {
  const stats = statSync(path);

  if (stats.isFile()) {
    files.push(path);
    return files;
  }

  for (const entry of readdirSync(path)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") {
      continue;
    }

    walk(join(path, entry), files);
  }

  return files;
}

function extensionOf(path) {
  const match = path.match(/(\.[^.]+)$/);
  return match ? match[1] : "";
}

function readProjectFile(path) {
  return readFileSync(join(root, path), "utf8");
}

function assertNoBannedDomains(content, context) {
  for (const { label, regex } of bannedPatterns) {
    assert(!regex.test(content), `${context} contains banned ${label}.`);
  }
}

function builtHtmlPath(path) {
  const filePath = path === "/" ? "index" : path.replace(/^\/+/, "");
  return join(root, ".next/server/app", `${filePath}.html`);
}

function readBuiltHtml(path) {
  const htmlPath = builtHtmlPath(path);

  assert(
    existsSync(htmlPath),
    `Built HTML is missing for ${path}. Run npm run build before npm run test:seo.`,
  );

  return readFileSync(htmlPath, "utf8");
}

function headOf(html) {
  return html.split("</head>")[0] ?? html;
}

function extractCanonical(head) {
  const directMatch = head.match(
    /<link\s+rel="canonical"\s+href="([^"]+)"[^>]*>/i,
  );
  if (directMatch) {
    return directMatch[1];
  }

  const flexibleMatch = head.match(
    /<link(?=[^>]*\brel="canonical")(?=[^>]*\bhref="([^"]+)")[^>]*>/i,
  );

  return flexibleMatch?.[1];
}

function extractHreflangs(head) {
  const hreflangs = new Map();
  const directRegex =
    /<link\s+rel="alternate"\s+hrefLang="([^"]+)"\s+href="([^"]+)"[^>]*>/gi;
  let match;

  while ((match = directRegex.exec(head)) !== null) {
    hreflangs.set(match[1], match[2]);
  }

  if (hreflangs.size > 0) {
    return hreflangs;
  }

  const flexibleRegex =
    /<link(?=[^>]*\brel="alternate")(?=[^>]*\bhrefLang="([^"]+)")(?=[^>]*\bhref="([^"]+)")[^>]*>/gi;

  while ((match = flexibleRegex.exec(head)) !== null) {
    hreflangs.set(match[1], match[2]);
  }

  return hreflangs;
}

function expectedHomeHreflangs() {
  return new Map([
    ["x-default", absolute("/")],
    ...locales.map((locale) => [locale, absolute(`/${locale}`)]),
  ]);
}

function expectedRouteHreflangs(slug) {
  return new Map([
    ["x-default", absolute(`/en/${slug}`)],
    ...locales.map((locale) => [locale, absolute(`/${locale}/${slug}`)]),
  ]);
}

function assertCanonicalSelf(path, expectedUrl) {
  const html = readBuiltHtml(path);
  const head = headOf(html);
  const canonical = extractCanonical(head);

  assert(canonical, `${path} is missing canonical URL.`);
  assert(
    sameUrl(canonical, expectedUrl),
    `${path} canonical must be self URL ${expectedUrl}, got ${canonical}.`,
  );
  assertNoBannedDomains(canonical, `${path} canonical`);
}

function assertHreflangs(path, expectedHreflangs) {
  const html = readBuiltHtml(path);
  const head = headOf(html);
  const hreflangs = extractHreflangs(head);

  for (const [lang, expectedUrl] of expectedHreflangs.entries()) {
    assert(
      hreflangs.has(lang) && sameUrl(hreflangs.get(lang), expectedUrl),
      `${path} hreflang ${lang} must be ${expectedUrl}, got ${
        hreflangs.get(lang) ?? "missing"
      }.`,
    );
  }

  for (const lang of hreflangs.keys()) {
    assert(
      expectedHreflangs.has(lang),
      `${path} contains unexpected hreflang ${lang}.`,
    );
  }
}

function parseSitemapUrls(sitemapXml) {
  return [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
}

const siteFile = readProjectFile("src/lib/site.ts");
assert(
  siteFile.includes(`SITE_URL = "${expectedSiteUrl}"`),
  "SITE_URL must be the www production domain.",
);

const sitemapFile = readProjectFile("src/app/sitemap.ts");
const robotsFile = readProjectFile("src/app/robots.ts");
const routePageFile = readProjectFile("src/app/[locale]/[route]/page.tsx");
const localeHomeFile = readProjectFile("src/app/[locale]/page.tsx");
const rootHomeFile = readProjectFile("src/app/page.tsx");
const seoRoutePageFile = readProjectFile("src/app/routes/[slug]/page.tsx");

assert(
  sitemapFile.includes('from "@/lib/site"') &&
    sitemapFile.includes("absoluteUrl("),
  "sitemap.ts must use the shared www production URL helper.",
);
assert(
  robotsFile.includes('from "@/lib/site"') &&
    robotsFile.includes('absoluteUrl("/sitemap.xml")'),
  "robots.ts must point to the shared www sitemap URL.",
);
assert(
  routePageFile.includes("canonical: routeUrl(locale, routePage.slug)"),
  "Route page canonical must be generated from the localized route URL.",
);
assert(
  localeHomeFile.includes("canonical: homeUrl(locale)"),
  "Localized homepage canonical must be generated from the localized home URL.",
);
assert(
  rootHomeFile.includes("canonical: absoluteUrl(\"/\")"),
  "Root homepage canonical must be generated from the shared site URL.",
);
assert(
  seoRoutePageFile.includes("canonical: pageUrl(page.slug)"),
  "SEO route landing page canonical must be generated from the shared route URL.",
);

for (const sourceRoot of sourceRoots) {
  for (const file of walk(sourceRoot)) {
    if (!checkedExtensions.has(extensionOf(file))) {
      continue;
    }

    assertNoBannedDomains(
      readFileSync(file, "utf8"),
      relative(root, file),
    );
  }
}

assertCanonicalSelf("/", absolute("/"));
assertHreflangs("/", expectedHomeHreflangs());

for (const locale of locales) {
  const homePath = `/${locale}`;
  assertCanonicalSelf(homePath, absolute(homePath));
  assertHreflangs(homePath, expectedHomeHreflangs());
}

for (const slug of routeSlugs) {
  const routeHreflangs = expectedRouteHreflangs(slug);

  for (const locale of locales) {
    const routePath = `/${locale}/${slug}`;
    assertCanonicalSelf(routePath, absolute(routePath));
    assertHreflangs(routePath, routeHreflangs);
  }
}

const sitemapPath = join(root, ".next/server/app/sitemap.xml.body");
assert(
  existsSync(sitemapPath),
  "Built sitemap is missing. Run npm run build before npm run test:seo.",
);

const sitemapXml = readFileSync(sitemapPath, "utf8");
assertNoBannedDomains(sitemapXml, "sitemap.xml");

const sitemapUrls = parseSitemapUrls(sitemapXml);
assert(sitemapUrls.length > 0, "sitemap.xml must contain URL entries.");

for (const url of sitemapUrls) {
  assert(
    url.startsWith(expectedSiteUrl),
    `sitemap URL must use the www production domain: ${url}`,
  );
}

const requiredSitemapUrls = [
  absolute("/"),
  ...locales.map((locale) => absolute(`/${locale}`)),
  ...routeSlugs.flatMap((slug) =>
    locales.map((locale) => absolute(`/${locale}/${slug}`)),
  ),
  ...routeSlugs.map((slug) => absolute(`/routes/${slug}`)),
];

for (const requiredUrl of requiredSitemapUrls) {
  assert(
    sitemapUrls.includes(requiredUrl),
    `sitemap.xml is missing ${requiredUrl}.`,
  );
}

const robotsPath = join(root, ".next/server/app/robots.txt.body");
assert(
  existsSync(robotsPath),
  "Built robots.txt is missing. Run npm run build before npm run test:seo.",
);

const robotsTxt = readFileSync(robotsPath, "utf8");
assertNoBannedDomains(robotsTxt, "robots.txt");
assert(
  robotsTxt.includes(`Sitemap: ${absolute("/sitemap.xml")}`),
  "robots.txt must point to https://www.bangkokpattayabus.com/sitemap.xml.",
);

console.log("SEO canonical, hreflang, sitemap, and robots checks passed.");
