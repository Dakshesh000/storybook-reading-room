# Case Studies portal: drop the black screen and the colour change

## What changes for the visitor
- After About, there is no full black screen anymore.
- The zoom starts deep inside the **white** "C" of "Case studies". The light page flows straight into the white letter, so there is no break.
- As the camera pulls back, the dark Case Studies panel shows up around the shrinking "C".
- The "C" (and the rest of "Case studies") stays white the whole time. It no longer fades from black to white.
- Scrolling back up still plays everything in reverse.

## Technical details
- `CasePortal` in `src/showcase/homepage/Homepage.tsx`:
  - Remove the solid fill layer (`bg-[var(--brand-black)]`) and its opacity logic in `frame()`.
  - Keep the SVG "Case studies" overlay fill fixed at `var(--section-indigo-foreground)` (white). Remove the p > 0.7 swap and its 500ms transition.
  - Keep the SVG visible from p = 0. It was only hidden before because the fill covered it. At high scale the white ink covers the screen, so it takes over the old fill's job.
  - Keep the rule that hides the DOM scene when it's scaled past 40× (needed for performance). The white SVG ink covers the screen at that point.
  - Leave the About blur/fade and the dark-theme handoff as they are.
- Check at 1280 and 390 wide, at p = 0, 0.3, 0.6, 1, and scrolling back up: no black frame, the C is white at every step, and nothing stalls.
