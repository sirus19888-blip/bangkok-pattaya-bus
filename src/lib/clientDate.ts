const SCHEDULE_TIMEZONE = "Asia/Bangkok";

export function getLocalDateValue(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SCHEDULE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
