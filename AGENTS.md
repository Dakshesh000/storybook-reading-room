# Project rules
- Design-system components live in `src/components/konsol/` and must be re-exported from `src/index.ts`; the barrel drives publish and consumer imports.
- Tokens are CSS variables in `src/styles.css` (`:root` / `.dark`) mapped via `@theme inline`; components use token utilities only, so themes swap without code changes.
- Variants use class-variance-authority with fixed option sets, so consumers get a predictable API.
- Brand logos live in `src/assets/logos/` as the user's original files; they propagate to consumers, never redraw them.
- Showcase pages are routes in `src/routes/` with helpers in `src/showcase/` (excluded by `.dsignore`); they are preview-only.
- Fonts are self-hosted as files in `src/assets/fonts/` with relative `@font-face` rules in `src/styles.css`, and `src/index.ts` imports the stylesheet, so consumers get tokens and fonts with no head links.
