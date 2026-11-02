# Centred floating header bar

## What changes
- **After scrolling:** the small floating bar with only Get Started sits in the horizontal centre of the page instead of on the right.
- **When it opens (hover near it):** it grows evenly to both sides to full page width. Get Started stays exactly where it was, in the centre, so it never moves under the cursor.
- **Opened layout:** the Konsol logo sits on the far left. The four menu links sit centred, two on each side of the button.
- **At the top of the page:** the full header (logo, "The Konsol", links, Get Started) stays as it is now.
- Proximity hover, fade timings, reduced-motion behaviour and the phone tap behaviour stay as they are.

## Technical details
- In `Header` (`src/showcase/homepage/Homepage.tsx`), change the compact bar from `ml-auto` to `mx-auto`, so its width transition (button width to 100%) expands symmetrically.
- Expanded content uses a 3-column grid `[1fr_auto_1fr]`: the left cell has the logo (absolutely pinned left) and links 1–2 right-aligned toward the button; the middle cell has the button; the right cell has links 3–4 left-aligned. The equal side columns keep the button at the exact centre.
- The logo and links fade in only when the bar is open; when it's collapsed the side cells are zero-width with no padding, so the collapsed width still equals the button.
- Check in the browser that the button's x-position is the same before and after opening, on desktop and on a phone.
