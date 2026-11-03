# Theme Change: light to dark at "Case studies" (reverse portal)

Yes, this can be planned precisely. It is the hero zoom played backwards, anchored on the "C" of "Case studies".

## What the visitor sees
1. **Light page scrolling.** The visitor scrolls through About in the light theme as normal.
2. **Light content blurs away.** As About leaves the screen, it softens into a blur and fades. This mirrors how "Built for real-world AI" sharpened in after the hero.
3. **Dark floods in from the "C".** The screen fills with the dark colour, as if we're inside the stroke of a huge "C". The page holds still while you keep scrolling.
4. **Zoom out.** The camera pulls back out of the "C". The letter shrinks to normal size, and the whole Case Studies scene (indigo panel, headline, image, buttons) arrives together at its resting position. It's one camera, so nothing slides around.
5. **Dark from here on.** The page switches to dark, and Case Studies, Testimonials, FAQ, Pricing and Footer all show in the dark theme. Scrolling continues normally with no blank screen.
6. **Scrolling back up** plays everything in reverse and returns you to light.

Edges stay sharp the whole time: the letter is drawn as a crisp vector, the same way as in the hero. Blur appears only on the outgoing light content and on the scene while it is in motion.

## Assumptions (tell me if any are wrong)
- Everything from Case Studies down turns dark. If you want only Case Studies dark, say so.
- The floating menu stays as it is (not inverted), same as the hero.
- The zoom pulls out from the solid stroke of the "C" (its curve), so the screen starts fully dark. The "C" has no enclosed hole like the "K" gap, so the stroke is the clean choice.
- Phones get the same effect. Reduced-motion users get a simple cross-fade.

## Technical details
- New `CaseStudiesPortal` wrapper in `Homepage.tsx` around `<CaseStudies />`. It reuses the Hero's camera math (shared helper extracted from `Hero`: measure + `frame` with `direction: "out"`, i.e. progress p maps to scale `maxScale^(1-ease(p))`).
- Pinned stage: an outer block of height section + Z (~1.6vh), with an inner sticky stage containing the CaseStudies scene. One matrix transform is applied to both the scene and an SVG `<text>Case studies</text>` overlay. The origin is a point inside the C's ink, found via `interior()` sampling of filled pixels (new `mode: "ink"`) in `GlyphPortal.tsx`.
- Dark fill `<rect>` (`--brand-evergreen`/dark background) covers the screen at high scale, then fades out early in the zoom-out (p 0→0.12), mirroring the hero's 0.88→1.
- The preceding content (Intro…About) gets blur 0→24px, opacity 1→0 over the approach (mirror of the hero's 0.55→1 window).
- Theme state becomes section-driven: `Homepage` derives `dark = !heroLight || caseDark`, where the portal fires `onDark(p >= 0.4)`. Scrolling back resets it.
- Sections after Case Studies stay in normal flow. They're offset so they follow straight after the pinned stage, with no gap.
- Update `mem://design/theme-change` and the AGENTS.md portal rule to cover both portals sharing one camera helper.
- Verify with Playwright at 1280 and 390, stepping p = 0, 0.25, 0.5, 0.75, 1 and scrolling back up. Confirm a crisp C, no blank gap, dark theme after, and light restored on scroll-up.
