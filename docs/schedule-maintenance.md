# Schedule Maintenance

## Purpose

Bus times can change because of operator updates, holidays, traffic conditions, or ticketing changes. The schedule data in this app should be checked regularly so travelers see clear and useful information.

Always keep the confirm-before-travel note visible in the app. Never claim that Bangkok Pattaya Bus Guide is an official bus operator website.

## Weekly Check Process

Use this checklist when reviewing schedule data:

- Check Pattaya Bus / Roong Reuang Coach website.
- Check Airport Pattaya Bus website.
- Check ticketing platform listings if needed.
- Compare departure times with current app data.
- Update departure times if they changed.
- Update fare notes if prices changed.
- Update `lastVerified` date.
- Run `npm run build`.
- Commit and push changes.

## Current Main Sources

- Pattaya Bus / Roong Reuang Coach
  - https://pattayabus.com/
- Airport Pattaya Bus
  - https://airportpattayabus.com/
- BusOnlineTicket as secondary reference
  - https://www.busonlineticket.co.th/

## Data Status Rules

- Official operator website = strongest source.
- Ticketing platform = secondary source.
- Unconfirmed data must be marked clearly.
- Never claim this app is official.
- Always show a confirm-before-travel note.

## Suggested Weekly Routine

Every Monday:

- Verify route data.
- Update `lastVerified`.
- Check fare notes and source notes.
- Run `npm run build`.
- Push changes to GitHub.

## Changelog Template

```text
Date:
Route:
What changed:
Source checked:
Updated by:
Notes:
```
