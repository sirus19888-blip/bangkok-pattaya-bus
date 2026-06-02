# Manual Contrast Audit - 2026-06-02

Scope: Stage 6 manual review of `axe` color-contrast `incomplete` results.

## Why manual review was needed

`axe-core` returned `color-contrast` as `incomplete`, not as a violation, for text rendered over images, gradients, or overlapping decorative layers. This means axe could not compute the effective background color. It does not prove failure, so the affected UI was manually hardened and checked.

## Changes made

- Homepage hero overlay was darkened from `#0e1e2e` at 45/70/100% to 80/88/100%.
- Homepage hero gold accent was changed from `#e8b05a` to brighter `#f3d77b`.
- Homepage hero kicker now uses a dark solid backing: `#0e1e2e` at 90%.
- Route header decorative background image was removed; the header now uses stable `#13233a`.
- Mobile related-route cards no longer place text over photos; they use stable `#13233a`.
- Station map placeholder no longer uses a text symbol; it uses a decorative CSS shape.

## Deterministic Color Ratios

The following foreground/background pairs were checked with WCAG relative luminance math:

- `#f3d77b` on `#0e1e2e`: 11.91.
- `#ffffff` on `#0e1e2e`: 16.88.
- `#e8edf5` on `#0e1e2e`: 14.36.
- `#ffffff` on `#13233a`: 15.80.
- `#4f5d6c` on `#fffaf2`: 6.49.
- `#13233a` on `#ffffff`: 15.80.

All are above WCAG AA thresholds for normal text. Large hero text also exceeds the lower large-text threshold by a wide margin.

## Worst-Case Hero Background

The homepage hero still uses a real image, so axe may continue to classify that area as incomplete. The overlay is now strong enough to make the background deterministic:

- Top overlay: 80% `#0e1e2e`.
- Middle overlay: 88% `#0e1e2e`.
- Bottom overlay: 100% `#0e1e2e`.

Even if the image underneath were pure white, the 80% dark overlay keeps the rendered background dark enough for the chosen white and gold text to exceed AA contrast.

## Verification Notes

- Smoke axe after changes:
  - `/en/bangkok-to-pattaya` mobile: 0 violations, 0 incomplete.
  - `/en/bangkok-to-pattaya` desktop: 0 violations, 0 incomplete.
  - `/en` homepage still returns `color-contrast` incomplete because the hero intentionally uses image-backed text.
- This remaining homepage result is a manual-check limitation, not an axe violation.
