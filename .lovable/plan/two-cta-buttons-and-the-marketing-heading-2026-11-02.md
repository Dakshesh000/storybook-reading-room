# Two CTA buttons and the "Marketing" heading

## 1. Header "Get Started" and hero "Book a demo": hover text and border
- **On hover and keyboard focus:** the label turns black. The background still turns green and the arrow box still slides from left to right.
- **Border:** both buttons get a brand indigo border. It is always there. You can't see it at rest because the button is also indigo, but it shows up as an indigo outline once the button turns green.
- **Everything else stays the same,** including all the other buttons.

## 2. "Marketing" heading: less space above and below
- The space above the heading (after the header) and the gap between the heading and the green panel both get smaller.
- The heading's size stays the same.

## Technical details
- `src/styles.css`: add the `--brand-black: #000000` token and map it to `--color-black` in `@theme inline`. This follows the `--brand-white` pattern.
- `src/showcase/homepage/Homepage.tsx`:
  - Add `border border-indigo hover:text-black focus-visible:text-black` to the two selected links.
  - On the hero `<h1>`, tighten the line height from 0.85 to about 0.78 for this heading only, and pull it closer to the header with a small negative top margin.
  - Reduce the green panel's top margin from `mt-8` to `mt-3`.
- Check the buttons (at rest and on hover) and the hero spacing in the browser, at desktop and phone widths.
