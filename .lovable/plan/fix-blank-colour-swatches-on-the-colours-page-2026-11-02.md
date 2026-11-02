# Fix blank colour swatches on the Colours page

## What's wrong
The swatches on the Colours page show as empty white boxes, both the brand colours and the status samples. Each swatch asks for its colour by an internal name (`--color-indigo`, for example), but the way the colours are set up means those names are never created in the page. They come back empty, so the swatch has no colour. The real colours exist under their original names (like `--brand-indigo` and `--background`), and the buttons, sections and cards that use them display correctly.

Only the showcase page is affected. The design system's components are fine.

## Fix
- Point each swatch at the colour names that really exist on the page:
  - brand swatches use `--brand-<name>` (for example `--brand-indigo`)
  - role swatches use the role name (for example `--background` or `--muted-foreground`)
  - status samples use `--success-bg`, `--success-fg`, `--success-border` and the matching names for warning, error and info
- Update each swatch caption to the class people should use, like `bg-indigo` or `bg-muted-foreground`, so the caption shows what to write in code.
- Remove the unused dynamic status classes on the status samples.
- Open the Colours page in light and dark and confirm every swatch shows its colour.

## Technical details
- `@theme inline` inlines values into utilities and does not emit `--color-*` custom properties, so `var(--color-x)` resolves empty at runtime (confirmed in the browser: `--color-indigo` is empty, `--brand-indigo` is `#363bd3`).
- Change only `src/routes/colors.tsx`. Swatch data becomes `[cssVar, utility, role]`, and status samples use `var(--${s}-bg)` and the other status names.
