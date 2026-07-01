import type { Schedule } from "@/data/schedules";

export type NextDepartureResult = {
  time: string;
  isTomorrow: boolean;
  subRoutes: {
    id: string;
    label: string;
    to: string;
  }[];
};

export type RouteScheduleInput = Schedule | string[];

const DEFAULT_TIMEZONE = "Asia/Bangkok";
const TIME_PATTERN = /^([01]?\d|2[0-3]):([0-5]\d)$/;

function createTimeFormatter(timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: timezone,
  });
}

export function timeToMinutes(time: string) {
  if (!TIME_PATTERN.test(time)) {
    return Number.NaN;
  }

  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function getRouteDepartures(schedule: RouteScheduleInput) {
  if (Array.isArray(schedule)) {
    return Array.from(
      new Set(schedule.filter((departure) => TIME_PATTERN.test(departure))),
    ).sort(
      (first, second) => timeToMinutes(first) - timeToMinutes(second),
    );
  }

  const departures = schedule.subRoutes?.length
    ? schedule.subRoutes.flatMap((subRoute) => subRoute.departures)
    : schedule.departures;

  return Array.from(
    new Set(departures.filter((departure) => TIME_PATTERN.test(departure))),
  ).sort(
    (first, second) => timeToMinutes(first) - timeToMinutes(second),
  );
}

function getMatchingSubRoutes(schedule: RouteScheduleInput, departure: string) {
  if (Array.isArray(schedule)) {
    return [];
  }

  return (
    schedule.subRoutes
      ?.filter((subRoute) => subRoute.departures.includes(departure))
      .map((subRoute) => ({
        id: subRoute.id,
        label: subRoute.label,
        to: subRoute.to,
      })) ?? []
  );
}

export function getCurrentThailandTime(
  now = new Date(),
  timezone = DEFAULT_TIMEZONE,
) {
  const timeParts = createTimeFormatter(timezone).formatToParts(now);
  const hour = Number(
    timeParts.find((part) => part.type === "hour")?.value ?? "0",
  );
  const minute = Number(
    timeParts.find((part) => part.type === "minute")?.value ?? "0",
  );

  return {
    hour,
    minute,
    minutesSinceMidnight: hour * 60 + minute,
  };
}

export function getNextDeparture(
  schedule: RouteScheduleInput,
  now = new Date(),
  timezone = DEFAULT_TIMEZONE,
): NextDepartureResult {
  const departures = getRouteDepartures(schedule);

  if (departures.length === 0) {
    return {
      time: Array.isArray(schedule) ? "" : schedule.nextDeparture,
      isTomorrow: false,
      subRoutes: [],
    };
  }

  const currentMinutes = getCurrentThailandTime(
    now,
    timezone,
  ).minutesSinceMidnight;
  const nextToday = departures.find(
    (departure) => timeToMinutes(departure) > currentMinutes,
  );

  if (nextToday) {
    return {
      time: nextToday,
      isTomorrow: false,
      subRoutes: getMatchingSubRoutes(schedule, nextToday),
    };
  }

  const firstTomorrow = departures[0] ?? "";

  return {
    time: firstTomorrow,
    isTomorrow: true,
    subRoutes: firstTomorrow
      ? getMatchingSubRoutes(schedule, firstTomorrow)
      : [],
  };
}

export function isNextDepartureInTodaySchedule(
  departure: string,
  nextDeparture: NextDepartureResult,
) {
  return !nextDeparture.isTomorrow && departure === nextDeparture.time;
}

export function getMinutesUntilDeparture(
  departure: string,
  isTomorrow: boolean,
  now = new Date(),
  timezone = DEFAULT_TIMEZONE,
) {
  if (!TIME_PATTERN.test(departure)) {
    return null;
  }

  const departureMinutes = timeToMinutes(departure);
  const currentMinutes = getCurrentThailandTime(
    now,
    timezone,
  ).minutesSinceMidnight;
  const dayOffset = isTomorrow ? 24 * 60 : 0;

  return dayOffset + departureMinutes - currentMinutes;
}
