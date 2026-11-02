# Responsive floating header + uncropped logo

## Logo fix (all screen sizes)
- In the open floating bar, the logo shows in full at its natural shape and is never cut off. That holds on standard laptops (1280–1440px wide) and on wider screens.

## How the open floating bar behaves at each width
Get Started always stays centred and never moves when the bar opens.

- **Laptops and desktops (1024px and wider):** as now. The logo is on the far left, with About and Services on the left of the button and Insights and Testimonials on its right.
- **Tablets (640–1023px):** same layout, with smaller text and gaps so all four links and the logo fit without overlapping.
- **Phones (under 640px):** the bar opens into two rows.
  - Row 1: the logo on the left, with Get Started centred.
  - Row 2: all four links, centred and evenly spaced, wrapping onto a second line if needed.

Hover, keyboard and tap behaviour, the scroll trigger and the full header at the top of the page stay as they are.

## Technical details
- `Header` in `src/showcase/homepage/Homepage.tsx`:
  - Move the logo out of the `overflow-hidden` left cell into an absolutely positioned slot on the bar itself (left edge, vertically centred to the button row). Render it at `h-8 w-auto shrink-0 object-contain` so it keeps its aspect ratio. Fade it in only when the bar is open. Give the left cell enough left padding at each breakpoint so the links never overlap it.
  - At `sm` and up: keep the `[1fr_auto_1fr]` grid with split links. Use `sm:gap-4 sm:text-sm lg:gap-8 lg:text-base`.
  - Below `sm`: hide the split link cells and add a full-width second row (`col-span-3`) holding all four links. It animates open with a grid-rows `0fr` to `1fr` transition and is `inert` while closed. Mobile links get min 44px tap targets.
- Verify with Playwright at 390, 768, 1280 and 1440 wide:
  - The logo's bounding box sits inside the bar and its rendered width matches its natural aspect ratio.
  - No link overlaps the logo or overflows the bar.
  - The button's x-position is unchanged before and after opening.
