# Portal theme change: hero "MARKETING" to light site

## What you'll see
- Scrolling past the green hero, the camera zooms into the top part of the "K" in the big "MARKETING" headline. The K's ink fills the screen and opens onto the light "Built for real-world AI" section. From there the rest of the site stays light.
- The placeholder giant "KONSOL" section and its "Step inside the console." line are gone.
- The Fade option is gone, along with the Fade / Portal switch in the thin top bar. Only the portal remains.
- The floating header menu stays as it is for now (not inverted).

## "Theme Change" rule (saved to project memory)
When you write "Theme Change" between two sections, I'll put a portal there:
- **Dark to light:** zoom in through a letter of the previous section's headline (like this one).
- **Light to dark:** the reverse. The next section's view starts close up inside a letter and zooms out until the letter sits in its headline.
- Changes keep alternating this way down the page.

## Technical details
- `GlyphPortal.tsx`: add a `focusChar`-relative anchor option (for example `focusAnchor: "top"`). The zoom then targets the largest ink patch in the upper part of the glyph (the K's upper arm/stem junction) instead of the whole glyph. Also add a `direction: "in" | "out"` prop that reverses the progress mapping, for future light-to-dark changes.
- `Homepage.tsx`: remove the `Transition` type, the mode state, the Fade/Portal buttons in ThemeBar and the `Portal()` dummy. Wire the hero's "MARKETING" so the portal uses word `MARKETING`, `focusChar="K"`, `focusAnchor="top"`, with the same display font/weight/size and positioning as the hero headline. That way the zoom visually starts from the real headline: the portal's opening frame replaces the static h1 and keeps an accessible h1. The portal's revealed field is the light background, and its children are the Intro ("Built for real-world AI") section.
- Theme switch: turn light (remove `.dark`) when the portal reaches full zoom, rather than with the scroll-position fade, and keep it light for everything below.
- Respect reduced motion: no zoom, instant switch.
- Verify with Playwright at 1280 and 390 wide: the zoom lands on the K's top, Intro appears light, and there's no leftover KONSOL section or Fade switch.
