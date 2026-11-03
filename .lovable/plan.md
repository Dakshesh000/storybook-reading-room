# About Us shrinks into the "C" of Case Studies

## What the visitor sees
1. While scrolling out of About Us, the whole section shrinks and blurs toward the spot where the "C" will appear, and fades as it goes.
2. The white inside of the "C" rises up behind it, so the screen stays light the whole time. No black frames.
3. Once About Us has disappeared into the "C", the camera pulls back out of the letter as it does now, and the blue Case Studies panel settles into place.
4. Scrolling back up plays the same steps in reverse.

## Why black shows today
- The Case Studies stage comes up from the bottom of the screen before the white letter is drawn, so the dark page background shows through it.
- The page also switches to dark partway through that rise, before anything covers the screen.

## Technical details (`CasePortal` in `src/showcase/homepage/Homepage.tsx`)
- **Approach (stage rising, `a` 0→1):**
  - Show the white SVG "C" at full zoom from the start of the approach, so the rising stage is solid white instead of transparent.
  - About Us (`previousElementSibling`) gets `transform: scale(1 → 0.6)` with `transform-origin` set to the C's on-screen point, plus `blur(0 → 16px)` and `opacity(1 → 0)`, all eased with the same smoothstep curve.
- **Theme switch:** flip to dark only when the stage is pinned and covered by white (`a >= 1`, i.e. `p >= 0`), not at `a >= 0.6`.
- **Zoom-out (p 0→1):** no change. The DOM scene stays hidden past 40×, as the performance rule requires.
- Clear the About Us transform, filter and opacity on cleanup and in reduced motion.
- Check at 1280 and 390 wide by sampling screen pixels at about 10 points through the approach and the zoom: no black frames before the panel appears, and About Us visibly shrinks toward the C. Then scroll back up.
