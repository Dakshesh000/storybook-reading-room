# Make the brand styles and fonts travel with the design system

Projects that use The Konsol design system should automatically get the colours, base styles and brand fonts, without any extra setup on their side.

## Changes
- **Styles come along automatically:** the library's main entry will load the stylesheet itself, so any project using it picks up every colour, spacing and corner value plus the base page styles.
- **Fonts come along automatically:** fonts will be bundled with the library instead of being linked only from the showcase page. Today that covers Inter Tight and JetBrains Mono. The font change you asked for comes in the same way once I have your answers:
  - Inter Bold for display headlines, from a free font package
  - Roboto for body and secondary text, from a free font package
  - Philosphere 600 for headings, from the font files you upload, saved in the brand fonts folder
- **Left alone:** the version-pinning setting doesn't apply here. These components are built in this project, not taken from an outside package, so there's nothing to pin.

## Technical details
- `src/index.ts`: add `import "./styles.css";` as the first line.
- Install `@fontsource/inter-tight` and `@fontsource/jetbrains-mono` (later `@fontsource/inter` 700 and `@fontsource/roboto`), and `@import` the needed weights at the top of `src/styles.css`.
- Philosphere: put it in `src/assets/fonts/` with a relative `@font-face` in `src/styles.css`.
- Remove the Google Fonts `<link>` tags from `__root.tsx`.
- Update `.lovable/system.md` setup notes (fonts are bundled, no `<link>` needed) and the `AGENTS.md` rule on font loading.
- Leave `.lovable/meta.yaml` unchanged: `source_type: local` needs no upstream pins.
- Check the showcase in the browser to confirm the fonts and colours still display.
