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
