# Design QA — PCG 2026 premium redesign

## Reference and implementation

- Selected source: `C:/Users/Arvind Govindasamy/.codex/generated_images/019fd752-f0ee-7bf0-b4db-d2e0f5ac1ab2/exec-4682fc8f-a143-4992-8c64-ccb63debeeb0.png`
- Source dimensions: 1374 × 1145
- Implementation screenshot: `qa/2026-premium-desktop.png`
- Implementation viewport and dimensions: 1440 × 1200
- Side-by-side comparison: `qa/2026-premium-comparison.png`
- Responsive screenshot: `qa/2026-premium-mobile.png` at 390 × 844
- Dark-theme screenshot: `qa/2026-premium-dark-products.png` at 1440 × 1200
- Sticky ODM/OEM screenshot: `qa/2026-premium-odm-oem.png` at 1440 × 1200

## Visual comparison

The implementation preserves the selected direction's deep-teal rail, full-bleed factory photography, compact header, oversized editorial headline, chapter navigator, kinetic 50+ years proof band, and clear two-path ODM/OEM composition. The intentional difference is a full-viewport opening so the user experiences the hero, proof band, and manufacturing comparison as distinct scroll chapters rather than one compressed poster.

Hierarchy, image treatment, hairline dividers, square geometry, high-contrast typography, and authentic facility imagery remain consistent with the reference. Desktop density is editorial and premium; mobile retains the same identity while stacking the story without horizontal overflow.

## QA passes

### Pass 1

- P1: duplicate React navigation keys produced console errors.
  - Fixed by keying repeated manufacturing links with label plus destination.
- P2: missing favicon produced a 404 console error.
  - Fixed by using the existing PCG mark as the browser icon.
- P2: the vertical hero label came too close to the mobile headline.
  - Fixed by hiding only the vertical word label below 560 px while keeping the requested spinning mark.

### Pass 2

- No console errors or page errors on desktop or mobile.
- Desktop document width equals viewport width: 1440 px.
- Mobile document width equals viewport width: 390 px.
- Mobile navigation opens fully and reports `aria-expanded="true"`.
- ODM CTA routes to the quote form and preselects `ODM — develop my product`.
- Theme toggle applies dark mode and persists `pcg-theme=dark`.
- Reveal animation, hero parallax, logo spin, cloud drift, marquee, sticky comparison, and reduced-motion fallbacks are present.
- Quote form, success state, local Transformers.js helper, product links, phone, and email remain intact.
- Production build and Sites worker tests pass.

## Unresolved issues

None at P0, P1, or P2.

final result: passed

