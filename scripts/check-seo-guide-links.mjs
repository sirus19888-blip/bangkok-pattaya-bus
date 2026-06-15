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
assertRouteGuideLinks(
  "/en/bangkok-to-pattaya",
  [
    "/en/ekkamai-bus-terminal-to-pattaya-guide",
    "/en/bangkok-to-pattaya-bus-vs-taxi",
    "/en/bangkok-to-pattaya-after-midnight",
  ],
  [
    "/en/suvarnabhumi-airport-gate-8-pattaya-bus",
    "/en/pattaya-to-bangkok-before-flight",
  ],
);
assertRouteGuideLinks(
  "/en/suvarnabhumi-airport-to-pattaya",
  ["/en/suvarnabhumi-airport-gate-8-pattaya-bus"],
  [
    "/en/ekkamai-bus-terminal-to-pattaya-guide",
    "/en/bangkok-to-pattaya-bus-vs-taxi",
    "/en/bangkok-to-pattaya-after-midnight",
    "/en/pattaya-to-bangkok-before-flight",
  ],
);
assertRouteGuideLinks(
  "/en/pattaya-to-bangkok",
  [
    "/en/pattaya-to-bangkok-before-flight",
    "/en/pattaya-to-bangkok-which-terminal",
  ],
  [
    "/en/ekkamai-bus-terminal-to-pattaya-guide",
    "/en/suvarnabhumi-airport-gate-8-pattaya-bus",
    "/en/bangkok-to-pattaya-bus-vs-taxi",
    "/en/bangkok-to-pattaya-after-midnight",
  ],
);

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
assertGuideBacklink(
  "/en/pattaya-to-bangkok-which-terminal",
  "/en/pattaya-to-bangkok",
);

assertRouteGuideLinks(
  "/en/don-mueang-airport-to-pattaya",
  ["/en/don-mueang-airport-to-pattaya-bus"],
  [
    "/en/ekkamai-bus-terminal-to-pattaya-guide",
    "/en/suvarnabhumi-airport-gate-8-pattaya-bus",
    "/en/pattaya-to-bangkok-before-flight",
  ],
);
assertRouteGuideLinks(
  "/en/pattaya-to-don-mueang-airport",
  ["/en/pattaya-to-don-mueang-airport-bus"],
  [
    "/en/ekkamai-bus-terminal-to-pattaya-guide",
    "/en/suvarnabhumi-airport-gate-8-pattaya-bus",
    "/en/pattaya-to-bangkok-before-flight",
  ],
);
assertGuideBacklink(
  "/en/don-mueang-airport-to-pattaya-bus",
  "/en/don-mueang-airport-to-pattaya",
);
assertGuideBacklink(
  "/en/pattaya-to-don-mueang-airport-bus",
  "/en/pattaya-to-don-mueang-airport",
);
assertRouteGuideLinks(
  "/en/pattaya-to-suvarnabhumi-airport",
  [
    "/en/pattaya-bus-station-to-jomtien",
    "/en/pattaya-to-suvarnabhumi-airport-before-flight",
  ],
  [
    "/en/ekkamai-bus-terminal-to-pattaya-guide",
    "/en/suvarnabhumi-airport-gate-8-pattaya-bus",
    "/en/bangkok-to-pattaya-after-midnight",
  ],
);
assertGuideBacklink(
  "/en/pattaya-to-suvarnabhumi-airport-before-flight",
  "/en/pattaya-to-suvarnabhumi-airport",
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

function assertRouteGuideLinks(path, expectedHrefs, absentHrefs) {
  const html = readBuiltHtml(path);

  assert.match(
    html,
    />Popular travel guides</,
    `${path} must render the Popular travel guides section.`,
  );

  for (const href of expectedHrefs) {
    assertHref(html, href, `${path} must link to ${href}.`);
  }

  for (const href of absentHrefs) {
    assert.doesNotMatch(
      html,
      new RegExp(`href="${escapeRegExp(href)}"`),
      `${path} must not link to unrelated guide ${href}.`,
    );
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
