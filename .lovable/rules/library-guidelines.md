# The Reading Room — Guidelines

## Components

The design system exports these components — import them from `@ws-4sddodtigjmokx0gbl7o/56c358bb-165b-4796-98f3-75c2f9ea769b` and compose them before building anything from scratch:

`AccordionItem`, `Accordion`, `Alert`, `ArrowIcon`, `AvatarFallback`, `AvatarGroup`, `AvatarImage`, `Avatar`, `Badge`, `Button`, `CardDescription`, `CardTitle`, `Card`, `Container`, `Field`, `Highlight`, `Input`, `Label`, `Logo`, `MonoLabel`, `Photo`, `SectionMuted`, `Section`, `TextLink`, `Textarea`

Per-component details (import stanzas, props, variants, examples) live in `.lovable/rules/libraries/{slug}/components.md` — on disk, not auto-loaded. Read that file or the component source when the name alone isn't enough.

## Theme Files

The design system's theme is delivered through the following files. The author's original source files carry the full wiring the design system needs — variable declarations, framework-specific directives, provider objects, etc. — and are the canonical import target.

- `@ws-4sddodtigjmokx0gbl7o/56c358bb-165b-4796-98f3-75c2f9ea769b/styles.css` (source — preferred import)
- `@ws-4sddodtigjmokx0gbl7o/56c358bb-165b-4796-98f3-75c2f9ea769b/dist/tokens.css` (auto-generated flat list of CSS custom properties — a raw-values fallback only; does NOT carry framework-specific wiring that the source files above provide)

