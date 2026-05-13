import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { spawnSync } from "node:child_process";

const baseUrl = process.env.LIGHTHOUSE_BASE_URL ?? "http://localhost:3000";
const pages = [
  { name: "homepage", path: "/" },
  { name: "route-bangkok-to-pattaya", path: "/en/bangkok-to-pattaya" },
];
const reportsDir = join(cwd(), "reports", "lighthouse");

mkdirSync(reportsDir, { recursive: true });

for (const page of pages) {
  const url = new URL(page.path, baseUrl).toString();
  const outputPath = join(reportsDir, `${page.name}.json`);
  const result = spawnSync(
    "npx",
    [
      "lighthouse",
      url,
      "--quiet",
      "--chrome-flags=--headless",
      "--only-categories=performance",
      "--output=json",
      `--output-path=${outputPath}`,
    ],
    {
      encoding: "utf8",
      shell: true,
      stdio: "pipe",
    },
  );

  if (result.status !== 0) {
    console.error(`Lighthouse check failed for ${url}.`);
    console.error(
      "Make sure the production build is running locally: npm run build && npm run start",
    );
    console.error(result.stderr || result.stdout);
    process.exit(result.status ?? 1);
  }

  console.log(`Lighthouse performance report saved: ${outputPath}`);
}
