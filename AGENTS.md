# Project rules
- Design-system components live in `src/components/konsol/` and must be re-exported from `src/index.ts`; the barrel drives publish and consumer imports.
- Tokens are CSS variables in `src/styles.css` (`:root` / `.dark`) mapped via `@theme inline`; components use token utilities only, so themes swap without code changes.
- Variants use class-variance-authority with fixed option sets, so consumers get a predictable API.
- Brand logos live in `src/assets/logos/` as the user's original files; they propagate to consumers, never redraw them.
- Showcase pages (homepage reference build at `/`, design-system pages under `/brand`) are routes in `src/routes/` with helpers and image pointers in `src/showcase/` (excluded by `.dsignore`); they are preview-only and never re-exported from the barrel.
- Fonts are self-hosted as files in `src/assets/fonts/` with relative `@font-face` rules in `src/styles.css`, and `src/index.ts` imports the stylesheet, so consumers get tokens and fonts with no head links.
- The homepage portal pins one hero scene and applies the same camera transform to its card and vector headline; the headline stays behind the card, and the floating navigation remains independent.
- Reverse portals (light→dark, e.g. `CasePortal`) pin a stage, start fully zoomed into a letter's ink under a solid fill, and zoom out to 1x; at very large scales the DOM scene is hidden and untransformed, because painting a 100×+ scaled DOM stalls the browser.
