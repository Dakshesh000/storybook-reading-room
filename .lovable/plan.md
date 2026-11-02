# The Konsol design system: first draft

Building the system here in Lovable from your design notes and the four logo files.

## What you will get
- **Brand tokens**: all 8 brand colours, the light and dark colour roles, the four colour sections (green, blue, indigo, evergreen), button colours, status colours, highlight marker. Inter Tight plus JetBrains Mono labels, 8px spacing, corners (8 / 12 / 16 / 32), 1280px content width, motion timings and easing, reduced-motion support. Light mode first, with the dark values wired in.
- **Logos**: your four logo files saved exactly as uploaded (black and white, solid and transparent), shown as a Logo with a light or dark choice. The black logo also becomes the browser tab icon.
- **Starter components**: Button (green, indigo, outline, ghost; sizes; arrow that slides on hover; disabled), Link, Section (one colour per section, text follows automatically), Container, Card (white with border, plus a version that fills with brand colour on hover), Badge, Mono label, Highlight marker, Alert (success, warning, error, info), Input, Textarea, Label and field helper text, Accordion (for the FAQ), black-and-white Photo that goes to colour on hover, Logo.
- **Showcase site** (preview only, never shipped): Overview, Colours, Typography, Logos, and Components pages with a searchable component list, a light/dark switch, live examples with realistic Konsol copy (e.g. "Book a demo"), and copyable code.

## Technical details
- Add Tailwind v4 (Vite plugin), class-variance-authority, clsx, tailwind-merge; `cn()` in `src/lib/utils.ts`.
- Tokens as CSS variables in `src/styles.css` (`:root` + `.dark`), mapped via `@theme inline`; fonts loaded by `<link>` in `__root.tsx`.
- Components in `src/components/konsol/`, re-exported from `src/index.ts`; logos in `src/assets/logos/`.
- Showcase routes under `src/routes/` (`/`, `/colors`, `/typography`, `/logos`, `/components`) with helpers in `src/showcase/` excluded via `.dsignore`.
- `.lovable/meta.yaml` (react, tailwind, local, custom_design_system), `.lovable/sources.yaml`, `.lovable/system.md` with hard rules (tokens only, section text follows background, focus ring on every control, reduced motion), `lovable.toml`, `AGENTS.md`.
- Component usage notes and examples filled in `design-system.json`; verify each showcase page in the browser in both themes.
