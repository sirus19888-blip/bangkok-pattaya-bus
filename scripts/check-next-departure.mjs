import assert from "node:assert/strict";

const {
  getMinutesUntilDeparture,
  getNextDeparture,
  isNextDepartureInTodaySchedule,
} = await import("../src/lib/scheduleTime.ts");

const schedule = {
  departures: [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ],
  nextDeparture: "06:00",
  subRoutes: [],
};

function bangkokDateAt(hour, minute) {
  return new Date(Date.UTC(2026, 4, 12, hour - 7, minute));
}

const cases = [
  ["05:59", 5, 59, "06:00", false, 1],
  ["06:00", 6, 0, "07:00", false, 60],
  ["14:01", 14, 1, "15:00", false, 59],
  ["14:59", 14, 59, "15:00", false, 1],
  ["15:00", 15, 0, "16:00", false, 60],
  ["20:28", 20, 28, "21:00", false, 32],
  ["20:59", 20, 59, "21:00", false, 1],
  ["21:01", 21, 1, "22:00", false, 59],
  ["21:59", 21, 59, "22:00", false, 1],
  ["22:01", 22, 1, "06:00", true, 479],
  ["after midnight", 0, 1, "06:00", false, 359],
];

for (const [label, hour, minute, expectedTime, expectedTomorrow, expectedGap] of cases) {
  const now = bangkokDateAt(hour, minute);
  const result = getNextDeparture(schedule, now, "Asia/Bangkok");

  assert.equal(result.time, expectedTime, `${label}: wrong next time`);
  assert.equal(
    result.isTomorrow,
    expectedTomorrow,
    `${label}: wrong tomorrow flag`,
  );

  const minutesUntil = getMinutesUntilDeparture(
    result.time,
    result.isTomorrow,
    now,
    "Asia/Bangkok",
  );

  assert.equal(minutesUntil, expectedGap, `${label}: wrong countdown`);
  assert.ok(
    minutesUntil > 0,
    `${label}: next departure must always be in the future`,
  );
}

const consistencyCases = [
  ["20:28", 20, 28, "21:00", false],
  ["20:59", 20, 59, "21:00", false],
  ["21:01", 21, 1, "22:00", false],
  ["21:59", 21, 59, "22:00", false],
  ["22:01", 22, 1, "06:00", true],
];

for (const [label, hour, minute, expectedTime, expectedTomorrow] of consistencyCases) {
  const now = bangkokDateAt(hour, minute);
  const nextDeparture = getNextDeparture(schedule.departures, now, "Asia/Bangkok");
  const heroNextDeparture = nextDeparture.time;
  const homepageCardNextDeparture = nextDeparture.time;
  const sidebarNextDeparture = nextDeparture.time;
  const scheduleNextMarkers = schedule.departures.filter((departure) =>
    isNextDepartureInTodaySchedule(departure, nextDeparture),
  );

  assert.equal(heroNextDeparture, expectedTime, `${label}: hero next time`);
  assert.equal(
    homepageCardNextDeparture,
    expectedTime,
    `${label}: homepage card next time`,
  );
  assert.equal(sidebarNextDeparture, expectedTime, `${label}: sidebar next time`);
  assert.equal(
    nextDeparture.isTomorrow,
    expectedTomorrow,
    `${label}: route-wide tomorrow flag`,
  );

  if (expectedTomorrow) {
    assert.deepEqual(
      scheduleNextMarkers,
      [],
      `${label}: today's schedule must not mark a past departure as next bus`,
    );
  } else {
    assert.deepEqual(
      scheduleNextMarkers,
      [expectedTime],
      `${label}: schedule grid must mark the same next bus as hero/sidebar`,
    );
  }
}

console.log("Next departure checks passed.");
