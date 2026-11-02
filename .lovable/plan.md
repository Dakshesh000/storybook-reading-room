# Homepage header: scroll-to-floating menu

## What you'll see
- **At the top of the page:** the header looks as it does now, with "The Konsol" written next to the logo, the four menu links in the middle, and Get Started on the right.
- **Once you scroll down a little (about 80px):** the header shrinks smoothly into a compact bar that floats near the top of the screen, with rounded corners, a soft shadow and a solid background. It shows only the logo and Get Started. The company name and the menu links fade out.
- **Pointing at the floating bar (or tabbing into it with the keyboard):** the bar widens and the four menu links slide in. When you move away, it shrinks back.
- **Phones:** the floating bar shows the logo and button. Tapping the bar expands it to show the links, and tapping outside it closes them again.
- **Scrolling back to the top:** the bar returns to the full header.
- If your device is set to reduce motion, the switch happens instantly with no sliding.

## Technical details
- `src/showcase/homepage/Homepage.tsx` `Header`:
  - Make the header `sticky top-0`, track scroll past 80px, and track hover or focus-within to expand it.
  - Animate width, padding, radius, shadow and background with the `duration-move` / `ease-konsol` tokens.
  - Fade and collapse the company name, and hide the nav links when compact and not expanded. Hidden links get `inert` so keyboard and screen readers skip them.
  - Use the existing tokens for the floating surface and shadow (`bg-background`, `border-border`, `shadow-lg`); no raw values.
- The company name is set in the heading font beside the logo, and it's hidden on very narrow screens.
- Verify in the browser at the top of the page, scrolled, and scrolled with the bar hovered, on desktop and phone widths.

## Open assumption
- "Reach the nav bar" is read as hovering over the floating bar (or keyboard focus, or a tap on touch screens).
