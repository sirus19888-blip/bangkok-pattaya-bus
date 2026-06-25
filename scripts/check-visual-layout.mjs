import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import { chromium } from "@playwright/test";

const root = cwd();
const screenshotDir = join(root, "reports", "visual-layout");
const defaultBaseUrl = "http://127.0.0.1:3100";
let baseUrl = process.env.VISUAL_QA_BASE_URL ?? defaultBaseUrl;

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const screenshotPages = [
  { name: "homepage-en", path: "/en" },
  { name: "route-en-bangkok-to-pattaya", path: "/en/bangkok-to-pattaya" },
  { name: "route-pl-bangkok-to-pattaya", path: "/pl/bangkok-to-pattaya" },
  { name: "route-zh-bangkok-to-pattaya", path: "/zh/bangkok-to-pattaya" },
  { name: "route-fr-bangkok-to-pattaya", path: "/fr/bangkok-to-pattaya" },
  { name: "route-de-bangkok-to-pattaya", path: "/de/bangkok-to-pattaya" },
  { name: "route-ru-bangkok-to-pattaya", path: "/ru/bangkok-to-pattaya" },
  { name: "route-th-bangkok-to-pattaya", path: "/th/bangkok-to-pattaya" },
  {
    name: "route-en-suvarnabhumi-airport-to-pattaya",
    path: "/en/suvarnabhumi-airport-to-pattaya",
  },
];

const desktopSwipePatterns = [
  "Swipe",
  "Przesuń",
  "Faites glisser",
  "滑动",
  "เลื่อน",
];

let serverProcess = null;

const visualQaForced =
  process.env.VISUAL_QA === "1" || Boolean(process.env.VISUAL_QA_BASE_URL);

if (!visualQaForced) {
  const serverUp = await isReachable(baseUrl);
  const hasBrowser = Boolean(findBrowserExecutable());

  if (!serverUp || !hasBrowser) {
    console.log(
      "Visual layout QA skipped: " +
        (!serverUp
          ? "no local server reachable at " + baseUrl
          : "no local browser found") +
        ". Set VISUAL_QA=1 and start a local server to enable visual checks.",
    );
    process.exit(0);
  }
}

try {
  await mkdir(screenshotDir, { recursive: true });
  await ensureServer();

  const browser = await chromium.launch({
    executablePath: findBrowserExecutable(),
    headless: true,
  });

  try {
    await runHomepageDesktopChecks(browser);
    await runRouteDesktopChecks(browser);
    await runRouteMobileChecks(browser);
    await captureScreenshots(browser);
  } finally {
    await browser.close();
  }

  console.log(`Visual layout QA passed. Screenshots saved in ${screenshotDir}`);
} finally {
  if (serverProcess) {
    serverProcess.kill();
  }
}

async function runHomepageDesktopChecks(browser) {
  const page = await openPage(browser, "/en", viewports[2]);
  const routeGrid = page.locator('[data-visual-qa="homepage-route-grid"]');
  const cards = page.locator('[data-visual-qa="homepage-route-card"]');

  await assertNoVisibleDesktopSwipeText(page, "homepage desktop");
  await expectVisible(routeGrid, "homepage popular routes grid");
  assert.equal(
    await cssValue(routeGrid, "display"),
    "grid",
    "Homepage desktop popular routes must be a grid, not a carousel.",
  );
  assert.notEqual(
    await cssValue(routeGrid, "overflow-x"),
    "auto",
    "Homepage desktop popular routes must not use horizontal carousel overflow.",
  );

  const cardCount = await cards.count();
  assert.ok(cardCount >= 3, "Homepage desktop must render route cards.");

  const widths = await firstVisibleWidths(cards, 3);
  assert.ok(
    widths.length === 3 && Math.max(...widths) - Math.min(...widths) <= 3,
    `Homepage route cards must have equal desktop widths. Widths: ${widths.join(", ")}`,
  );
  assert.ok(
    (await visibleLinkTextCount(page, "Check tickets")) > 0,
    'homepage "Check tickets" CTA must be visible.',
  );

  await page.close();
}

async function runRouteDesktopChecks(browser) {
  const page = await openPage(
    browser,
    "/en/bangkok-to-pattaya",
    viewports[2],
  );
  const routeLayout = page.locator('[data-visual-qa="route-layout"]');
  const mainContent = page.locator('[data-visual-qa="route-main-content"]');
  const sidebarShell = page.locator('[data-visual-qa="affiliate-sidebar-shell"]');
  const bookingPanel = page.locator('[data-desktop-booking-panel="true"]');
  const scheduleGrid = page.locator('[data-visual-qa="schedule-grid"]');

  await expectVisible(routeLayout, "desktop route layout");
  assert.equal(
    await cssValue(routeLayout, "display"),
    "grid",
    "Route desktop layout must use two columns.",
  );
  assert.ok(
    (await cssValue(routeLayout, "grid-template-columns")).split(" ").length >=
      2,
    "Route desktop layout must expose two grid columns.",
  );

  await expectVisible(bookingPanel, "desktop AffiliateSidebar");
  assert.equal(
    await cssValue(sidebarShell, "position"),
    "sticky",
    "Desktop AffiliateSidebar shell must be sticky.",
  );
  assert.ok(
    Number.parseFloat(await cssValue(sidebarShell, "top")) >= 90,
    "Desktop AffiliateSidebar must use a top offset near top-24.",
  );

  const mainBox = await mainContent.boundingBox();
  assert.ok(
    mainBox && mainBox.width > 760,
    `Desktop main content must not be a narrow mobile column. Width: ${mainBox?.width}`,
  );
  assert.equal(
    await cssValue(scheduleGrid, "display"),
    "grid",
    "Desktop schedule must render as a grid/table-like layout.",
  );
  assert.ok(
    (await cssValue(scheduleGrid, "grid-template-columns")).split(" ").length >=
      4,
    "Desktop schedule grid must have multiple columns.",
  );

  await page.close();
}

async function runRouteMobileChecks(browser) {
  const page = await openPage(
    browser,
    "/en/bangkok-to-pattaya",
    viewports[0],
  );
  const routeLayout = page.locator('[data-visual-qa="route-layout"]');
  const bookingPanel = page.locator('[data-desktop-booking-panel="true"]');
  const mobileSticky = page.locator(
    '[data-mobile-booking-bar="true"]',
  );
  const showMore = page.getByRole("button", { name: "Show more" }).first();

  assert.notEqual(
    await cssValue(routeLayout, "display"),
    "grid",
    "Mobile route page must stay one column.",
  );
  assert.equal(
    await bookingPanel.isVisible(),
    false,
    "Mobile route page must not show the full desktop sidebar after content.",
  );
  await expectVisible(mobileSticky, "mobile booking CTA");

  assert.equal(
    await cssValue(mobileSticky, "position"),
    "fixed",
    "Mobile CTA must stay fixed at the bottom of the mobile viewport.",
  );

  const stickyBox = await mobileSticky.boundingBox();
  assert.ok(
    stickyBox &&
      stickyBox.x >= 0 &&
      stickyBox.x + stickyBox.width <= viewports[0].width,
    "Mobile booking CTA must stay inside the horizontal viewport.",
  );

  await expectVisible(showMore, "mobile Station information Show more");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);

  const finalStickyBox = await mobileSticky.boundingBox();
  const feedbackBox = await page
    .locator('[data-feedback-actions="true"]')
    .first()
    .boundingBox();

  if (finalStickyBox && feedbackBox) {
    assert.equal(
      boxesOverlap(finalStickyBox, feedbackBox),
      false,
      "Mobile booking CTA must not overlap the final feedback controls.",
    );
  }

  await page.close();
}

async function captureScreenshots(browser) {
  for (const viewport of viewports) {
    for (const screenshotPage of screenshotPages) {
      const page = await openPage(browser, screenshotPage.path, viewport);
      await page.screenshot({
        fullPage: true,
        path: join(
          screenshotDir,
          `${screenshotPage.name}-${viewport.name}-${viewport.width}x${viewport.height}.png`,
        ),
      });
      await page.close();
    }
  }
}

async function openPage(browser, path, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  });
  const page = await context.newPage();
  await page.goto(new URL(path, baseUrl).toString(), {
    timeout: 90_000,
    waitUntil: "domcontentloaded",
  });
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
  await page.waitForTimeout(400);

  const title = await page.title();
  assert.ok(title, `${path} should load a real page.`);

  page.on("close", async () => {
    await context.close().catch(() => {});
  });

  return page;
}

async function ensureServer() {
  if (await isReachable(baseUrl)) {
    return;
  }

  if (!process.env.VISUAL_QA_BASE_URL) {
    for (const candidateUrl of [
      "http://127.0.0.1:3000",
      "http://127.0.0.1:8080",
      "http://localhost:3000",
      "http://localhost:8080",
    ]) {
      if (await isReachable(candidateUrl)) {
        baseUrl = candidateUrl;

        return;
      }
    }
  }

  const url = new URL(baseUrl);

  if (!["127.0.0.1", "localhost"].includes(url.hostname)) {
    throw new Error(
      `VISUAL_QA_BASE_URL is not reachable and cannot be auto-started: ${baseUrl}`,
    );
  }

  const nextBin = join(root, "node_modules", "next", "dist", "bin", "next");
  const nextCommand = existsSync(join(root, ".next", "BUILD_ID"))
    ? "start"
    : "dev";
  serverProcess = spawn(
    process.execPath,
    [nextBin, nextCommand, "-H", url.hostname, "-p", url.port || "3000"],
    {
      cwd: root,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: "ignore",
      windowsHide: true,
    },
  );

  const deadline = Date.now() + 120_000;

  while (Date.now() < deadline) {
    if (await isReachable(baseUrl)) {
      return;
    }

    await delay(1_000);
  }

  throw new Error(`Timed out waiting for local Next.js server at ${baseUrl}`);
}

async function isReachable(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });

    return response.ok || response.status < 500;
  } catch {
    return false;
  }
}

function findBrowserExecutable() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ].filter(Boolean);

  return candidates.find((candidate) => existsSync(candidate));
}

async function assertNoVisibleDesktopSwipeText(page, contextLabel) {
  const visibleTexts = await page.locator("body").evaluate((body, patterns) => {
    const matches = [];
    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.textContent?.trim() ?? "";

      if (!text || !patterns.some((pattern) => text.includes(pattern))) {
        continue;
      }

      const parent = node.parentElement;

      if (!parent) {
        continue;
      }

      const style = window.getComputedStyle(parent);
      const box = parent.getBoundingClientRect();

      if (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        box.width > 0 &&
        box.height > 0
      ) {
        matches.push(text);
      }
    }

    return matches;
  }, desktopSwipePatterns);

  assert.deepEqual(
    visibleTexts,
    [],
    `${contextLabel} must not show mobile swipe hint text on desktop.`,
  );
}

async function cssValue(locator, property) {
  return retryOnNavigation(() =>
    locator.evaluate(
      (element, cssProperty) =>
        window.getComputedStyle(element).getPropertyValue(cssProperty),
      property,
    ),
  );
}

async function retryOnNavigation(callback, attempts = 3) {
  let lastError;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await callback();
    } catch (error) {
      lastError = error;

      if (!String(error?.message ?? "").includes("Execution context was destroyed")) {
        throw error;
      }

      await delay(750);
    }
  }

  throw lastError;
}

async function firstVisibleWidths(locator, count) {
  const widths = [];
  const total = await locator.count();

  for (let index = 0; index < total && widths.length < count; index += 1) {
    const item = locator.nth(index);

    if (!(await item.isVisible())) {
      continue;
    }

    const box = await item.boundingBox();

    if (box) {
      widths.push(Math.round(box.width));
    }
  }

  return widths;
}

async function visibleLinkTextCount(page, text) {
  return page.locator("a").evaluateAll(
    (links, expectedText) =>
      links.filter((link) => {
        const style = window.getComputedStyle(link);
        const box = link.getBoundingClientRect();

        return (
          link.textContent?.includes(expectedText) &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          box.width > 0 &&
          box.height > 0
        );
      }).length,
    text,
  );
}

async function expectVisible(locator, label) {
  await locator.waitFor({ state: "visible", timeout: 15_000 });
  assert.equal(await locator.isVisible(), true, `${label} must be visible.`);
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function boxesOverlap(first, second) {
  return !(
    first.x + first.width <= second.x ||
    second.x + second.width <= first.x ||
    first.y + first.height <= second.y ||
    second.y + second.height <= first.y
  );
}
