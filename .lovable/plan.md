# Floating header: button only, expands leftward on approach

## What you'll see
- **At the top of the page:** unchanged. The logo, "The Konsol", the menu links and Get Started are all there.
- **After scrolling:** the floating bar shows only the Get Started button, pinned to the right side of the page. The logo and company name are gone from it entirely.
- **Hovering near the bar:** the bar expands as your cursor gets close, within about 40px of it, so you don't have to land exactly on it. It stretches only toward the left, across the full page width, and the menu links appear on the left side. The Get Started button stays in exactly the same spot, so it never moves out from under your cursor.
- **Moving away:** it shrinks back to just the button, again shrinking toward the right.
- **Keyboard:** tabbing into the bar expands it the same way.
- **Phones:** the button floats at the right. Tapping the bar's edge (not the button) opens the links to its left, and tapping elsewhere closes them.
- If your device is set to reduce motion, the change happens instantly.

## Technical details
- `src/showcase/homepage/Homepage.tsx` `Header`, compact state:
  - Anchor the bar with `ml-auto`, then grow its `max-width` from the button's width to the full container width. Because only the left edge travels, the button's position is fixed.
  - Remove the logo and name from the compact layout. Unmount them, or hide them with `inert`, while compact.
  - Put the links in a left-aligned flex region that fades in once expanded, and keep the button as the last child.
  - Add an invisible hit area around the bar (about 40px of padding on a transparent wrapper with `pointer-events-auto`) to catch "hovering near". The outer sticky header uses `pointer-events-none`, so the page under it stays clickable outside that area.
  - Keep using `duration-move`, `ease-konsol` and the existing surface tokens.
- Verify on desktop (scrolled; cursor near but not on the bar; on the bar; button position the same before and after expanding) and on a phone.
