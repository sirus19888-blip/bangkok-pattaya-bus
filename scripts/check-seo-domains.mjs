import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { cwd } from "node:process";

const root = cwd();
const expectedSiteUrl = "https://www.bangkokpattayabus.com";
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

const siteFile = readProjectFile("src/lib/site.ts");
assert(
  siteFile.includes(`SITE_URL = "${expectedSiteUrl}"`),
  "SITE_URL must be the www production domain.",
);

const sitemapFile = readProjectFile("src/app/sitemap.ts");
const robotsFile = readProjectFile("src/app/robots.ts");
const routePageFile = readProjectFile("src/app/[locale]/[route]/page.tsx");
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
  seoRoutePageFile.includes("canonical: pageUrl(page.slug)"),
  "SEO route landing page canonical must be generated from the shared route URL.",
);

const routeCanonical = new URL(
  "/en/bangkok-to-pattaya",
  expectedSiteUrl,
).toString();
assert(
  routeCanonical ===
    "https://www.bangkokpattayabus.com/en/bangkok-to-pattaya",
  "Route page canonical must point to the www production domain.",
);

const sitemapSample = [
  new URL("/", expectedSiteUrl).toString(),
  new URL("/en/bangkok-to-pattaya", expectedSiteUrl).toString(),
  new URL("/routes/bangkok-to-pattaya", expectedSiteUrl).toString(),
].join("\n");
const robotsSample = `Sitemap: ${new URL(
  "/sitemap.xml",
  expectedSiteUrl,
).toString()}`;

for (const sample of [sitemapSample, robotsSample, routeCanonical]) {
  for (const { label, regex } of bannedPatterns) {
    assert(!regex.test(sample), `Generated SEO URL contains ${label}.`);
  }
}

for (const sourceRoot of sourceRoots) {
  for (const file of walk(sourceRoot)) {
    if (!checkedExtensions.has(extensionOf(file))) {
      continue;
    }

    const content = readFileSync(file, "utf8");

    for (const { label, regex } of bannedPatterns) {
      assert(
        !regex.test(content),
        `${relative(root, file)} contains banned ${label}.`,
      );
    }
  }
}

console.log("SEO domain checks passed.");
