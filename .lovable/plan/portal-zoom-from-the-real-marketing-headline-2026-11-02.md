# Portal zoom from the real MARKETING headline

## What you'll see
- No separate full-screen "MARKETING" appears anymore. The zoom uses the actual headline under the menu.
- As you scroll past the green box, the headline stays in place. Once the green box has gone by, the camera zooms into the top of the "K".
- The K's dark ink fills the screen and covers the green box completely. It then opens straight onto the light "Built for real-world AI" section.
- The blank screen between the zoom and the next section is gone. The section appears the moment the zoom finishes.
- The floating menu stays as it is.

## Technical details
- `Homepage.tsx`: delete the `Portal` wrapper around `Intro`. Move the hero (headline, then green box) inside one scroll-driven block that sticks to the top of the screen. The real `h1` stays the accessible headline.
- Phase 1 (scroll progress 0 to about 0.4): the green box slides up while the headline stays sticky.
- Phase 2 (about 0.4 to 1): scale the h1 around the measured top-of-K point. Use `GlyphPortal`'s `interior(..., top=true)` helper, exported, to find the point from the h1's own font and box. Scale until the ink covers the viewport and the green box sits beneath it. Then switch the theme to light and hand off to `Intro`, rendered directly after with no extra height.
- Remove the blank gap: the old portal added `(length - 1) × viewport` margin plus a 100svh centred content block that faded in late. The new block's height is just hero height + zoom travel, and `Intro` follows in normal flow at full opacity.
- `GlyphPortal.tsx`: keep it for future "Theme Change" uses, but stop rendering it on the homepage. Remove the unused import.
- Reduced motion: no zoom; the hero scrolls normally and the theme switches instantly at the Intro.
- Verify with Playwright at 1280 and 390 wide, with screenshots at the start, mid-zoom (on the K's top) and right after. Confirm there's no blank frame and no duplicate MARKETING.
