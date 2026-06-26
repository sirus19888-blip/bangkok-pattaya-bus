import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { cwd } from "node:process";

const root = cwd();
const expectedSiteUrl = "https://www.bangkokpattayabus.com";
const locales = ["en", "th", "zh", "ru", "de", "fr", "pl"];
const expectedHreflangCodes = [...locales, "x-default"];
const routeSlugs = [
  "bangkok-to-pattaya",
  "pattaya-to-bangkok",
  "suvarnabhumi-airport-to-pattaya",
  "pattaya-to-suvarnabhumi-airport",
  "don-mueang-airport-to-pattaya",
  "pattaya-to-don-mueang-airport",
];
const guideSlugs = [
  "ekkamai-bus-terminal-to-pattaya-guide",
  "suvarnabhumi-airport-gate-8-pattaya-bus",
  "bangkok-to-pattaya-bus-vs-taxi",
  "bangkok-to-pattaya-after-midnight",
  "pattaya-to-bangkok-before-flight",
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

function extractHtmlLang(html) {
  return html.match(/<html\s+lang="([^"]+)"/i)?.[1];
}

function assertHtmlLang(path, expectedLang) {
  const htmlLang = extractHtmlLang(readBuiltHtml(path));

  assert(
    htmlLang === expectedLang,
    `${path} must render <html lang="${expectedLang}">, got ${
      htmlLang ?? "missing"
    }.`,
  );
}

function readSeoForPath(path) {
  const html = readBuiltHtml(path);
  const head = headOf(html);

  return {
    canonical: extractCanonical(head),
    hreflangs: extractHreflangs(head),
  };
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
  const { canonical } = readSeoForPath(path);

  assert(canonical, `${path} is missing canonical URL.`);
  assert(
    sameUrl(canonical, expectedUrl),
    `${path} canonical must be self URL ${expectedUrl}, got ${canonical}.`,
  );
  assertNoBannedDomains(canonical, `${path} canonical`);
}

function assertHreflangs(path, expectedHreflangs) {
  const { hreflangs } = readSeoForPath(path);

  assert(
    hreflangs.size === expectedHreflangCodes.length,
    `${path} must contain exactly ${expectedHreflangCodes.length} hreflang links, got ${hreflangs.size}.`,
  );

  for (const lang of expectedHreflangCodes) {
    assert(
      hreflangs.has(lang),
      `${path} must include hreflang ${lang}.`,
    );
  }

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

function assertHreflangReciprocal(pagePaths) {
  const pageSeo = new Map(
    pagePaths.map((path) => [
      path,
      {
        ...readSeoForPath(path),
        expectedUrl: absolute(path),
      },
    ]),
  );

  for (const [path, { expectedUrl, hreflangs }] of pageSeo.entries()) {
    for (const [lang, href] of hreflangs.entries()) {
      const targetPath = new URL(href).pathname;
      const targetSeo = pageSeo.get(targetPath);

      assert(
        targetSeo,
        `${path} hreflang ${lang} points to ${href}, but that target page is not part of the SEO QA set.`,
      );

      const reciprocalLang = path === "/" ? "x-default" : path.split("/")[1];
      const reciprocalHref = targetSeo.hreflangs.get(reciprocalLang);

      assert(
        reciprocalHref && sameUrl(reciprocalHref, expectedUrl),
        `${path} hreflang ${lang} must be reciprocal on ${targetPath} as ${reciprocalLang}; got ${
          reciprocalHref ?? "missing"
        }.`,
      );
    }
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
const rootHomeFile = readProjectFile("src/app/(default)/page.tsx");

assert(
  sitemapFile.includes('from "@/lib/site"') &&
    sitemapFile.includes("absoluteUrl("),
  "sitemap.ts must use the shared www production URL helper.",
);
assert(
  sitemapFile.includes('from "@/data/seoGuides"') &&
    sitemapFile.includes("/en/${guide.slug}"),
  "sitemap.ts must include English SEO guides.",
);
assert(
  !sitemapFile.includes('from "@/data/seoRoutes"') &&
    !sitemapFile.includes("seoRouteUrls") &&
    !sitemapFile.includes("absoluteUrl(`/routes/${routePage.slug}`)"),
  "sitemap.ts must not include old /routes route aliases.",
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

const homepagePaths = ["/", ...locales.map((locale) => `/${locale}`)];
const routePagePaths = routeSlugs.flatMap((slug) =>
  locales.map((locale) => `/${locale}/${slug}`),
);

assertHtmlLang("/", "en");
assertCanonicalSelf("/", absolute("/"));
assertHreflangs("/", expectedHomeHreflangs());

for (const locale of locales) {
  const homePath = `/${locale}`;
  assertHtmlLang(homePath, locale);
  assertCanonicalSelf(homePath, absolute(homePath));
  assertHreflangs(homePath, expectedHomeHreflangs());
}

for (const slug of routeSlugs) {
  const routeHreflangs = expectedRouteHreflangs(slug);

  for (const locale of locales) {
    const routePath = `/${locale}/${slug}`;
    assertHtmlLang(routePath, locale);
    assertCanonicalSelf(routePath, absolute(routePath));
    assertHreflangs(routePath, routeHreflangs);
  }
}

for (const locale of locales) {
  assertHtmlLang(`/${locale}/${guideSlugs[0]}`, locale);
}

assertHreflangReciprocal([...homepagePaths, ...routePagePaths]);

for (const slug of guideSlugs) {
  const guidePath = `/en/${slug}`;
  assertCanonicalSelf(guidePath, absolute(guidePath));
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
assert(
  new Set(sitemapUrls).size === sitemapUrls.length,
  "sitemap.xml must not contain duplicate URLs.",
);

for (const url of sitemapUrls) {
  const parsedUrl = new URL(url);

  assert(
    parsedUrl.origin === expectedSiteUrl,
    `sitemap URL must use the www production domain: ${url}`,
  );
}

const requiredSitemapUrls = [
  absolute("/"),
  ...locales.map((locale) => absolute(`/${locale}`)),
  ...routeSlugs.flatMap((slug) =>
    locales.map((locale) => absolute(`/${locale}/${slug}`)),
  ),
  ...guideSlugs.map((slug) => absolute(`/en/${slug}`)),
];

for (const requiredUrl of requiredSitemapUrls) {
  assert(
    sitemapUrls.includes(requiredUrl),
    `sitemap.xml is missing ${requiredUrl}.`,
  );
}

for (const url of sitemapUrls) {
  const pathname = new URL(url).pathname;

  assert(
    pathname !== "/routes" && !pathname.startsWith("/routes/"),
    `sitemap.xml must not contain old /routes aliases: ${url}.`,
  );

  const { canonical } = readSeoForPath(pathname);

  assert(canonical, `${url} is in sitemap.xml but has no canonical URL.`);
  assert(
    sameUrl(canonical, url),
    `${url} is in sitemap.xml but its canonical points to ${canonical}.`,
  );
}

const localizedHomepageUrls = sitemapUrls.filter((url) => {
  const pathname = new URL(url).pathname;

  return locales.some((locale) => pathname === `/${locale}`);
});

assert(
  localizedHomepageUrls.length === locales.length,
  "sitemap.xml must contain exactly one homepage URL for each supported language.",
);

for (const locale of locales) {
  assert(
    sitemapUrls.includes(absolute(`/${locale}`)),
    `sitemap.xml is missing localized homepage /${locale}.`,
  );
}

const localizedRouteUrls = sitemapUrls.filter((url) => {
  const pathname = new URL(url).pathname;

  return routeSlugs.some((slug) =>
    locales.some((locale) => pathname === `/${locale}/${slug}`),
  );
});

assert(
  localizedRouteUrls.length === locales.length * routeSlugs.length,
  "sitemap.xml must contain every main route page for all 7 languages.",
);

for (const slug of routeSlugs) {
  for (const locale of locales) {
    assert(
      sitemapUrls.includes(absolute(`/${locale}/${slug}`)),
      `sitemap.xml is missing route page /${locale}/${slug}.`,
    );
  }
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
