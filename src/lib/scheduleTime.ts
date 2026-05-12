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

const DEFAULT_TIMEZONE = "Asia/Bangkok";

function createTimeFormatter(timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: timezone,
  });
}

export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function getRouteDepartures(schedule: Schedule) {
  const departures = schedule.subRoutes?.length
    ? schedule.subRoutes.flatMap((subRoute) => subRoute.departures)
    : schedule.departures;

  return Array.from(new Set(departures)).sort(
    (first, second) => timeToMinutes(first) - timeToMinutes(second),
  );
}

function getMatchingSubRoutes(schedule: Schedule, departure: string) {
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
  schedule: Schedule,
  now = new Date(),
  timezone = DEFAULT_TIMEZONE,
): NextDepartureResult {
  const departures = getRouteDepartures(schedule);

  if (departures.length === 0) {
    return {
      time: schedule.nextDeparture,
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

export function getMinutesUntilDeparture(
  departure: string,
  isTomorrow: boolean,
  now = new Date(),
  timezone = DEFAULT_TIMEZONE,
) {
  if (!departure) {
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
