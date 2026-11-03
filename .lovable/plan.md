# Fix the space above "Built for real-world AI" after the zoom

## What's wrong
When the zoom ends, the light section is placed right at the very top edge of the screen. The top bar and the floating menu sit on top of it, so the "Built for real-world AI" label and heading start hidden under (or jammed against) the menu. Adding padding inside the section barely helped because the section itself starts behind the menu.

## What changes
- At the end of the zoom, the light section lands so its content starts clearly **below the floating menu**, with a comfortable gap (about 48px) between the menu's bottom edge and the "Built for real-world AI" label.
- The gap is measured from the real menu height, so it stays correct on laptop, tablet and phone.
- Revert the earlier 40px to 48px tweak, since it didn't address this.
- Nothing else in the zoom changes.

## Technical details
- In `Hero.measure()`, read the bottom of the sticky header (top bar + floating bar) and store it as `navClear`.
- Set `next.current.style.paddingTop` / or offset the landing so content top = `navClear + 48px` (CSS var `--intro-offset` applied to `Intro`'s `pt`).
- Recompute on resize. Reduced-motion path unchanged except same top clearance.
- Verify with Playwright at 1280 and 390: screenshot at scroll = end of zoom and confirm label sits below the menu.
