# Rebuild the MARKETING portal zoom

## What you will see
- **No sliding headline.** The top of the page pins in place when you start scrolling. "MARKETING" stays exactly where it sits under the menu, and the zoom into the top of the "K" begins right away.
- **Headline always in front.** "MARKETING" sits above the green box and the masked figure the whole time, so the figure never covers it.
- **Sharp letters while zooming.** The edges of the K stay crisp at every zoom level, with no blur or stretched pixels.
- **Next section joins in early.** In the last part of the zoom, "Built for real-world AI" shows through the opening as a soft blur. It sharpens as the K fills the screen, so the zoom ends with the section already in place and readable. There is no gap or pop-in.
- **Smooth pacing.** The zoom eases in and out. Each scroll step adds a little more zoom, so there are no jumps.
- With reduced motion turned on, a simple cross-fade replaces the zoom.

## Technical details
- `Hero` becomes a pinned stage: an outer wrapper about 200vh tall, holding a `sticky top-0 h-svh` inner stage. Progress is 0→1 across the wrapper's scroll. This replaces the current `hold`/`phase1` translate logic, which moved the h1 down the page.
- Stacking: the h1 moves out of the flow stacking and into its own top layer (`z-40` above the green box's layer, with `isolation` on the stage). The figure stays inside the box layer.
- Crisp zoom: drop the CSS `scale()` on HTML text, along with `will-change-transform`, which rasterises it. At zoom time a vector overlay takes over: an SVG `<text>MARKETING</text>` in the same font, aligned to the h1's measured rect. Its group transform is `translate·scale·translate` around the K's interior point (already computed via `interior()`), with `text-rendering: geometricPrecision`. This keeps vector edges at any scale. The h1 hides once the overlay takes over at progress greater than 0.
- Next-section reveal: the Intro section renders inside the stage, under the overlay, at full size. From progress 0.55 to 1, `filter: blur(24px→0)`, `opacity 0→1` and `scale 1.06→1` interpolate on it. The overlay fades out over 0.9 to 1. Light theme switches at 0.6, so the colours shift with the reveal.
- After the stage ends, the page continues straight into the Intro content, with no spacer. That removes the blank stretch for good.
- One rAF-throttled scroll handler, re-measured on resize and after `document.fonts.ready`.
- Verify in a test browser at 1280 and 390 wide, with screenshots at progress 0, 0.4, 0.7 and 1.
