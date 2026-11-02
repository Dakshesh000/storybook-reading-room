# Make the homepage dark-only and archive the light version

## What changes
- From now on the homepage always opens in the dark version. The Light / Dark switch at the top of the page goes away. The small "Konsol" link back to the design-system pages stays.
- **Archiving the light version:** the light colours stay in the design system untouched, so nothing is lost and they can come back later. A dated snapshot of the current light homepage is also saved as a frozen reference copy. It is never edited and it is not linked from anywhere on the site.
- A project rule is saved: all future homepage changes target this single dark version, which will later become the "mixed" version.
- The design-system pages (Overview, Colours, Typography, Logos, Components) keep their own Light / Dark switch. They aren't part of the website.

## Technical details
- `Homepage.tsx`: force `document.documentElement.classList.add("dark")` on mount and remove it on unmount, so the design-system pages aren't left dark. Drop the `useState`, the theme buttons in `ThemeBar` (keep the Konsol link) and the `dark` prop on `Header`. The logo picks the light-on-dark variant.
- Archive: copy the current `src/showcase/homepage/` folder to `src/showcase/archive/homepage-light-2026-11-02/` as reference only, with no route. It stays excluded from consumers by the existing `src/showcase/**` rule.
- Memory: add a rule to `mem://index.md` Core saying the homepage is a single dark version (soon to become mixed), the light version is archived, and no changes are made to it.

## Client-name boxes in the green hero ("Opening doors for business with...")
- Every box gets a white background with a black icon and black name, in both themes (so it holds up on the dark-only page).
- The swap gets slower and smoother: one box changes about every 2.4 seconds instead of every 0.9 seconds.
- The outgoing name dissolves into drifting dust particles and the new name gathers in from particles, replacing the slide up / slide down. With reduced motion turned on, the names simply cross-fade.

### Technical details
- Box classes use the existing `bg-white` / `text-black` brand tokens instead of `bg-background` / `text-foreground`.
- Dust effect: on swap, a small canvas over the slot samples the outgoing name's pixels (drawn with the same font) and animates about 150 particles drifting up and right while fading over roughly 1.1s. The incoming name fades in with a light blur-to-sharp step plus particles converging. The canvas is decorative only (`aria-hidden`, pointer-events none).
- The interval goes from 900ms to about 2400ms, and the transition duration lengthens to match.
