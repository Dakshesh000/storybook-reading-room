# Header "Get Started" and hero "Book a demo": hover text and border

## What changes
- **On hover and keyboard focus:** the label turns black. The background still turns green and the arrow box still slides from left to right.
- **Border:** both buttons get a brand indigo border. It is always there. You can't see it at rest because the button is also indigo, but it shows up as an indigo outline once the button turns green.
- **Everything else stays the same,** including all the other buttons.

## Technical details
- `src/styles.css`: add the `--brand-black: #000000` token and map it to `--color-black` in `@theme inline`. This follows the `--brand-white` pattern, so the buttons use a token rather than a raw value.
- `src/showcase/homepage/Homepage.tsx`: add `border border-indigo hover:text-black focus-visible:text-black` to the two selected links (header Get Started and hero Book a demo).
- Check both buttons at rest and on hover in the browser.
