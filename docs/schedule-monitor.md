# Schedule Monitor

This project includes a semi-automatic monitoring tool for known bus schedule sources.

The tool does not update the app. It checks source pages, extracts schedule-like time values, fare-like values, and travel-time-like phrases, then reports possible differences for manual review.

## Why This Is Read-Only

Bus operator pages can change layout, include unrelated times, or show notes that need human interpretation. They may also include technical timestamps, script values, footer times, mixed route data, or booking-widget values that are not bus departures.

A read-only checker is safer than full automation because it helps detect possible changes without publishing unverified schedule data.

Any schedule, fare, or travel-time change must be manually verified before updating production route data.

Do not change schedules based only on this script.

## Sources Checked

- Airport Pattaya Bus: https://airportpattayabus.com/
- Pattaya Bus / Roong Reuang Coach: https://pattayabus.com/
- Don Mueang Airport transportation page: https://donmueang.airportthai.co.th/service/transportation/detail/1290

The checker does not scrape Google Maps, TripAdvisor, random blogs, or image search results.

## How To Run

```bash
npm run check:schedules
```

The command prints a terminal report with:

- source checked
- raw extracted schedule-like times
- filtered route-plausible times
- ignored likely-noise times
- current app times
- fare check result
- travel time check result
- result and confidence values: high, medium, or low
- source URL
- checked timestamp

It also writes a local report file:

```text
reports/schedule-check-latest.json
```

Report JSON files are ignored by Git because they are generated check output.

## How To Use The Report

If the checker reports a mismatch or manual review:

1. Open the source page manually.
2. Confirm whether the extracted times are real route departure times.
3. Confirm whether fare values are base operator fares, booking-platform fares, or "from" prices.
4. Confirm whether travel times are route durations or unrelated wording.
5. Check whether the source is official or secondary.
6. Update app schedule data only after manual verification.
7. Update the `lastVerified` field.
8. Run `npm run build`.

Never claim a schedule is official unless the source supports that claim.

Never change schedules, fares, or travel-time values based only on this script.

## False Positives

False positives are still possible. The checker uses conservative rules:

- ignores obvious non-departure values such as `00:00`
- ignores unusual minute values unless they already exist in current app data
- allows route-plausible minute values such as `00` and `30`
- treats mixed source pages as manual review rather than strong mismatches
- treats Don Mueang extraction as weak context when unrelated times appear near route text

For noisy pages, the report may say:

```text
Source contains mixed or noisy schedule-like times. Review manually before changing route data.
```

That wording means the monitor found something worth checking, not that the live app data is wrong.

## Fare And Travel Time Checks

The monitor also extracts fare-like values such as:

- `162 baht`
- `162 THB`
- `฿162`
- `from 163 THB`

It normalizes those to simple THB values for comparison. Fares can vary by operator, ticketing platform, booking fee, promotion, currency display, or "from" wording, so close values are usually reported as manual review rather than a hard mismatch.

The monitor also extracts travel-time-like phrases such as:

- `2 hours`
- `2-3 hours`
- `2.5 hours`
- `3h 25m`
- `3 hours 25 minutes`

Travel time depends on traffic, airport processing, boarding point, and source wording. Treat travel-time differences as review prompts, not automatic changes.
