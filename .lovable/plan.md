# Homepage on "/" and the design system under "/brand"

## What changes
- **"/" becomes the homepage.** The marketing homepage moves from /homepage to the main address.
- **The design system moves to /brand.** It stays as a few short pages grouped under one Brand section, rather than one very long page:
  - /brand — overview
  - /brand/colours, /brand/typography, /brand/logos, /brand/components
- **Why keep sub-pages:** the components page alone is long, and one giant page would be slow to scroll and hard to link to. The Brand side menu keeps them feeling like one place.
- **Links updated:** the Brand menu, overview cards, and the small "Konsol" link on the homepage top bar (now points to /brand). Old addresses (/homepage, /colors, etc.) redirect to their new spots.

## Technical details
- `src/routes/index.tsx` renders `Homepage` (head from current homepage route); delete `homepage.tsx` content, replace with redirect to `/`.
- New `brand.tsx` layout (`<Outlet />`), `brand.index.tsx` (current overview), `brand.colours.tsx`, `brand.typography.tsx`, `brand.logos.tsx`, `brand.components.tsx` (moved bodies, unique head()).
- Old `colors.tsx`, `typography.tsx`, `logos.tsx`, `components.tsx` become `beforeLoad` redirects.
- Update `Shell.tsx` nav (Overview → /brand, Homepage → /), overview card links, homepage "Konsol" link → /brand. Archive files left untouched.
- Update AGENTS.md showcase rule (homepage at `/`, design system under `/brand`). Verify both pages in browser.
