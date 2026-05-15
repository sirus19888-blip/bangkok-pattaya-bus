import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const root = cwd();
const guideHrefs = [
  "/en/ekkamai-bus-terminal-to-pattaya-guide",
  "/en/suvarnabhumi-airport-gate-8-pattaya-bus",
  "/en/bangkok-to-pattaya-bus-vs-taxi",
  "/en/bangkok-to-pattaya-after-midnight",
  "/en/pattaya-to-bangkok-before-flight",
];

assertGuideLinks("/", guideHrefs);
assertGuideLinks("/en", guideHrefs);
assertGuideLinks("/en/bangkok-to-pattaya", [
  "/en/ekkamai-bus-terminal-to-pattaya-guide",
  "/en/bangkok-to-pattaya-bus-vs-taxi",
  "/en/bangkok-to-pattaya-after-midnight",
]);
assertGuideLinks("/en/suvarnabhumi-airport-to-pattaya", [
  "/en/suvarnabhumi-airport-gate-8-pattaya-bus",
]);
assertGuideLinks("/en/pattaya-to-bangkok", [
  "/en/pattaya-to-bangkok-before-flight",
]);

assertGuideBacklink(
  "/en/ekkamai-bus-terminal-to-pattaya-guide",
  "/en/bangkok-to-pattaya",
);
assertGuideBacklink(
  "/en/suvarnabhumi-airport-gate-8-pattaya-bus",
  "/en/suvarnabhumi-airport-to-pattaya",
);
assertGuideBacklink(
  "/en/bangkok-to-pattaya-bus-vs-taxi",
  "/en/bangkok-to-pattaya",
);
assertGuideBacklink(
  "/en/bangkok-to-pattaya-after-midnight",
  "/en/bangkok-to-pattaya",
);
assertGuideBacklink(
  "/en/pattaya-to-bangkok-before-flight",
  "/en/pattaya-to-bangkok",
);

console.log("SEO guide internal link checks passed.");

function assertGuideLinks(path, expectedHrefs) {
  const html = readBuiltHtml(path);

  assert.match(
    html,
    />Travel guides</,
    `${path} must render the Travel guides section.`,
  );

  for (const href of expectedHrefs) {
    assertHref(html, href, `${path} must link to ${href}.`);
  }
}

function assertGuideBacklink(path, expectedRouteHref) {
  const html = readBuiltHtml(path);

  assertHref(
    html,
    expectedRouteHref,
    `${path} must link back to ${expectedRouteHref}.`,
  );
}

function assertHref(html, href, message) {
  assert.match(
    html,
    new RegExp(`href="${escapeRegExp(href)}"`),
    message,
  );
}

function readBuiltHtml(path) {
  const htmlPath = builtHtmlPath(path);

  assert(
    existsSync(htmlPath),
    `Built HTML is missing for ${path}. Run npm run build first.`,
  );

  return readFileSync(htmlPath, "utf8");
}

function builtHtmlPath(path) {
  const filePath = path === "/" ? "index" : path.replace(/^\/+/, "");

  return join(root, ".next/server/app", `${filePath}.html`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
