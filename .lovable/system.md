# The Konsol design system

The Konsol is a B2B marketing agency (brand revamps, websites, AI powered outbound for growing service businesses). Everything should feel **bold, clean and confident**: mostly white and black, with big blocks of brand colour that change section to section — a pop-art rhythm of one colour per section.

## Setup
- Importing anything from the library loads its stylesheet (`styles.css`) automatically. It contains every token as CSS variables plus the Tailwind v4 `@theme inline` mapping.
- Fonts are bundled: the library entry imports the stylesheet, which self-hosts Inter, Space Grotesk, Roboto and Roboto Mono. No `<link>` tags needed.
- Dark mode is class-based: add `.dark` to `<html>`. Build light mode first.
- Import components from the barrel: `import { Button, Section } from "@/design-system/konsol"`.

## Hard rules
1. **Tokens only.** Never write hex/rgb values. Use token utilities (`bg-section-green`, `text-foreground-secondary`, `border-border`, `rounded-control`). See `rules/design-tokens.md`.
2. **Section text follows the section.** Build big page bands with `<Section tone="green|blue|indigo|evergreen|plain|alt">`; never set a section background by hand. Use `<SectionMuted>` for supporting copy inside it.
3. **One colour per section,** alternating down the page. Don't put two brand-coloured sections next to each other in the same colour.
4. **Buttons:** indigo is the main call to action; green is for header "Get started" and hero "Book a demo". Buttons carry the arrow by default — keep it for forward actions. **Arrow motion:** the arrow sits in its own container on the left; on hover/focus the whole container slides to the right edge while the label shifts left (the `cta-slide` utility with `data-cta-box` / `data-cta-label` children). Never animate the arrow icon on its own.
5. **Accent colours (emerald, amber, brick) are for status only** — use `<Alert>`, never as decoration.
6. **Cards** are flat: white, 1px `border-border`, no heavy shadows. Services cards use `fill` to flood with brand colour on hover.
7. **Photos** are black and white by default via `<Photo>`, turning to brand colour on hover.
8. **Logo:** always `<Logo>` from the official files. Black on light, white on dark. Never redraw or recolour.
9. Corners: sections `rounded-section` (32), images/frames `rounded-frame` (16), small cards `rounded-card` (12), buttons/inputs `rounded-control` (8).
10. Spacing on an 8px grid: 8–16px inside cards, 24px between cards, 40px+ between sections, 24px page side padding, content max 1280px (`<Container>`).

## Motion
- Colour hovers 250ms (`duration-hover`), scroll reveals 350ms rising 10px (`animate-reveal`), bigger moves 600ms (`duration-move`). Easing `ease-konsol`.
- Respect `prefers-reduced-motion` (handled globally in the stylesheet); never add motion that ignores it.

## Accessibility
- Every interactive control shows the focus ring (`focus-visible:ring-2 ring-ring`).
- Use semantic elements: `<button>` for actions, `<a>` for navigation, labels wired to inputs (use `<Field>`).
- Icon-only controls need `aria-label`.
- Check contrast when placing text on section colours — always use the section's own foreground token.

## Voice
Plain, direct, confident. Short sentences. Talk about outcomes ("Book a demo", "See case studies"), never "Click here" or "Submit".

## Don't
- No gradients, glassmorphism or drop shadows.
- No extra fonts. Display = `font-display font-bold` (Inter 700), headings = `font-heading` (Space Grotesk 600, applied to h1–h6 by default), body/UI = `font-sans` (Roboto), labels = `font-mono` (Roboto Mono).
- No raw colour values or inline styles.
