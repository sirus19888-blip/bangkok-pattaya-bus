/**
 * Analiza raportu 12Go pod kryterium z T66.
 *
 * Uruchom ten sam skrypt na linii bazowej i po zamknieciu okna pomiarowego,
 * zeby "przed" i "po" liczyla identyczna metoda:
 *
 *   node scripts/analyze-12go-report.mjs reports/baseline-2026-08-30/12go-bookings.tsv
 *   node scripts/analyze-12go-report.mjs <plik-po-oknie> --users 2700
 *
 * Wejscie: eksport z panelu 12Go zapisany jako TSV lub CSV, z kolumnami
 * SubID, Agent fee i Vehicle class. Reszta kolumn jest opcjonalna.
 *
 * WAZNE: 12Go zapisuje SubID bez podkreslnikow (mobilesticky zamiast
 * mobile_sticky), a w widoku przegladarki skraca je do postaci "bpb-p...debar".
 * Uzywaj eksportu z pelnymi wartosciami, inaczej pozycji nie da sie rozroznic.
 */

import { readFileSync } from "node:fs";
import { argv } from "node:process";

// Pozycje objete filtrem charter w T65a. Kopia listy z src/lib/twelveGo.ts,
// zapisana bez podkreslnikow, bo tak zwraca je 12Go.
const CHARTER_POSITIONS = new Set([
  "guidetransfer",
  "routeairporttransfer",
  "routechartergap",
  "routecitytransfer",
  "routehelpafterlast",
  "routehelpbusfull",
  "routehelpvstaxi",
]);

const ROUTES = [
  "bangkok-to-pattaya",
  "pattaya-to-bangkok",
  "suvarnabhumi-airport-to-pattaya",
  "pattaya-to-suvarnabhumi-airport",
  "don-mueang-airport-to-pattaya",
  "pattaya-to-don-mueang-airport",
];

const file = argv[2];
const usersFlag = argv.indexOf("--users");
const users = usersFlag > -1 ? Number(argv[usersFlag + 1]) : null;

if (!file) {
  console.error("Podaj sciezke do eksportu 12Go.");
  process.exit(1);
}

const raw = readFileSync(file, "utf8");
const sep = raw.includes("\t") ? "\t" : ",";
const rows = raw
  .split(/\r?\n/)
  .filter((line) => line.trim() && !line.startsWith("Current page"))
  .map((line) =>
    sep === "\t"
      ? line.split("\t")
      : (line.match(/("([^"]|"")*"|[^,]*)/g) ?? [])
          .filter((_, i) => i % 2 === 0)
          .map((cell) => cell.replace(/^"|"$/g, "")),
  );

const header = rows.shift().map((h) => h.trim().toLowerCase());
const col = (name) => header.findIndex((h) => h === name);
const iSub = col("subid");
const iFee = col("agent fee");
const iVeh = col("vehicle class");

if (iSub < 0 || iFee < 0 || iVeh < 0) {
  console.error("Brakuje kolumny SubID, Agent fee albo Vehicle class.");
  process.exit(1);
}

function parseEur(cell) {
  const m = String(cell).match(/EUR\s*([\d.]+)/i);
  return m ? Number(m[1]) : 0;
}

function splitSubId(sub) {
  if (!sub.startsWith("bpb-")) return { own: false, route: null, position: sub };
  const rest = sub.slice(4);
  const route = ROUTES.find((r) => rest.startsWith(`${r}-`));
  return route
    ? { own: true, route, position: rest.slice(route.length + 1) }
    : { own: true, route: null, position: rest };
}

const bookings = [];
for (const r of rows) {
  const sub = (r[iSub] ?? "").trim();
  if (!sub) continue;
  const { own, route, position } = splitSubId(sub);
  bookings.push({
    sub,
    own,
    route,
    position,
    eur: parseEur(r[iFee]),
    vehicle: (r[iVeh] ?? "").trim().toLowerCase(),
    charterEligible: CHARTER_POSITIONS.has(position),
  });
}

const own = bookings.filter((b) => b.own);
const foreign = bookings.filter((b) => !b.own);
const sum = (list) => list.reduce((acc, b) => acc + b.eur, 0);
const money = (n) => `EUR ${n.toFixed(2)}`;
const line = (n = 78) => "=".repeat(n);

console.log(line());
console.log(`RAPORT 12Go — ${file}`);
console.log(line());
console.log(`  rezerwacji ogolem:        ${bookings.length}`);
console.log(`  z tego BPB (bpb-*):       ${own.length}   ${money(sum(own))}`);
if (foreign.length) {
  console.log(`  spoza BPB (inne prefiksy): ${foreign.length}   ${money(sum(foreign))}`);
  for (const b of foreign) console.log(`     ${b.sub}  ${money(b.eur)}  ${b.vehicle}`);
}
console.log(`  srednia prowizja BPB:     ${money(sum(own) / own.length)}`);

console.log(`\n${line()}`);
console.log("KLASA POJAZDU — tu mieszka roznica prowizji");
console.log(line());
const byVehicle = new Map();
for (const b of own) {
  const v = byVehicle.get(b.vehicle) ?? { n: 0, eur: 0 };
  v.n += 1;
  v.eur += b.eur;
  byVehicle.set(b.vehicle, v);
}
console.log(`  ${"klasa".padEnd(10)} ${"szt".padStart(4)} ${"udzial".padStart(7)} ${"prowizja".padStart(11)} ${"srednia".padStart(9)} ${"udz.przych".padStart(11)}`);
for (const [v, d] of [...byVehicle].sort((a, b) => b[1].eur - a[1].eur)) {
  console.log(
    `  ${v.padEnd(10)} ${String(d.n).padStart(4)} ${(((d.n / own.length) * 100).toFixed(1) + "%").padStart(7)} ` +
      `${money(d.eur).padStart(11)} ${money(d.eur / d.n).padStart(9)} ${(((d.eur / sum(own)) * 100).toFixed(1) + "%").padStart(11)}`,
  );
}

console.log(`\n${line()}`);
console.log("POZYCJE OBJETE FILTREM charter (T65a) vs POZOSTALE");
console.log(line());
for (const [label, list] of [
  ["objete zmiana ", own.filter((b) => b.charterEligible)],
  ["nieobjete     ", own.filter((b) => !b.charterEligible)],
]) {
  const ch = list.filter((b) => b.vehicle === "charter");
  console.log(
    `  ${label}  rezerwacji ${String(list.length).padStart(3)}   ${money(sum(list)).padStart(11)}   ` +
      `srednia ${money(list.length ? sum(list) / list.length : 0).padStart(9)}   ` +
      `charter: ${ch.length} szt. ${money(sum(ch))}`,
  );
}

console.log(`\n${line()}`);
console.log("PER POZYCJA CTA");
console.log(line());
const byPos = new Map();
for (const b of own) {
  const v = byPos.get(b.position) ?? { n: 0, eur: 0, charter: 0, charterEur: 0, elig: b.charterEligible };
  v.n += 1;
  v.eur += b.eur;
  if (b.vehicle === "charter") {
    v.charter += 1;
    v.charterEur += b.eur;
  }
  byPos.set(b.position, v);
}
console.log(`  ${"pozycja".padEnd(28)} ${"obj".padStart(4)} ${"szt".padStart(4)} ${"prowizja".padStart(11)} ${"srednia".padStart(9)} ${"charter".padStart(8)}`);
for (const [p, d] of [...byPos].sort((a, b) => b[1].eur - a[1].eur)) {
  console.log(
    `  ${p.padEnd(28)} ${(d.elig ? "TAK" : "-").padStart(4)} ${String(d.n).padStart(4)} ` +
      `${money(d.eur).padStart(11)} ${money(d.eur / d.n).padStart(9)} ${String(d.charter).padStart(8)}`,
  );
}

console.log(`\n${line()}`);
console.log("MIARY Z T66");
console.log(line());
const total = sum(own);
console.log(`  laczna prowizja BPB:        ${money(total)}`);
console.log(`  rezerwacji BPB:             ${own.length}`);
if (users) {
  console.log(`  uzytkownicy (podane):       ${users}`);
  console.log(`  prowizja / 1000 sesji:      ${money((total / users) * 1000)}   <- miara rozstrzygajaca`);
  console.log(`  rezerwacje / 1000 sesji:    ${((own.length / users) * 1000).toFixed(1)}   <- miara strażnicza`);
} else {
  console.log("  (podaj --users N, zeby policzyc miary na 1000 sesji)");
}
