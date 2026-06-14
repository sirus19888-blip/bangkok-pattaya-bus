import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const npmCommand = process.platform === "win32" ? (process.env.ComSpec ?? "cmd.exe") : "npm";

const buildBackedTests = new Set([
  "test:affiliate",
  "test:guide:ekkamai",
  "test:guide:jomtien",
  "test:guide:mochit",
  "test:guide-links",
  "test:i18n",
  "test:seo",
]);

const slowOrServerTests = new Set(["test:visual"]);

const testScripts = Object.keys(packageJson.scripts ?? {})
  .filter(
    (name) =>
      name.startsWith("test:") &&
      name !== "test:all",
  )
  .sort((left, right) => {
    const leftRank = rankTest(left);
    const rightRank = rankTest(right);

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }

    return left.localeCompare(right);
  });

if (testScripts.length === 0) {
  console.log("No test:* scripts found.");
  process.exit(0);
}

console.log(`Running ${testScripts.length} test scripts sequentially:`);
for (const scriptName of testScripts) {
  console.log(`- ${scriptName}`);
}

const results = [];

for (const scriptName of testScripts) {
  const startedAt = performance.now();

  console.log(`\n=== ${scriptName} ===`);
  const result = await runScript(scriptName);
  const durationMs = performance.now() - startedAt;

  results.push({
    scriptName,
    durationMs,
    status: result.ok ? "PASS" : "FAIL",
    exitCode: result.exitCode,
    signal: result.signal,
  });
}

printSummary(results);

if (results.some((result) => result.status === "FAIL")) {
  process.exit(1);
}

function rankTest(scriptName) {
  if (slowOrServerTests.has(scriptName)) {
    return 2;
  }

  if (buildBackedTests.has(scriptName)) {
    return 1;
  }

  return 0;
}

function runScript(scriptName) {
  return new Promise((resolve) => {
    let child;

    try {
      child = spawn(npmCommand, npmArgs(scriptName), {
        cwd: root,
        env: process.env,
        stdio: "inherit",
        windowsHide: true,
      });
    } catch (error) {
      console.error(`Failed to start ${scriptName}: ${error.message}`);
      resolve({ ok: false, exitCode: 1, signal: null });

      return;
    }

    child.on("error", (error) => {
      console.error(`Failed to start ${scriptName}: ${error.message}`);
      resolve({ ok: false, exitCode: 1, signal: null });
    });

    child.on("close", (exitCode, signal) => {
      resolve({ ok: exitCode === 0, exitCode, signal });
    });
  });
}

function npmArgs(scriptName) {
  if (process.platform === "win32") {
    return ["/d", "/s", "/c", `npm run ${scriptName}`];
  }

  return ["run", scriptName];
}

function printSummary(results) {
  const rows = results.map((result) => ({
    Test: result.scriptName,
    Status: result.status,
    Duration: formatDuration(result.durationMs),
    Exit: formatExit(result),
  }));

  console.log("\n=== test:all summary ===");
  console.table(rows);

  const passed = results.filter((result) => result.status === "PASS").length;
  const failed = results.length - passed;

  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
}

function formatDuration(durationMs) {
  return `${(durationMs / 1000).toFixed(1)}s`;
}

function formatExit(result) {
  if (result.signal) {
    return `signal ${result.signal}`;
  }

  return String(result.exitCode ?? 1);
}
