# Agent card stack redesign

## Avatar bar (from the pasted component)
- The four agent avatars become a row of overlapping round photos, each with a ring in the section's colour, like the pasted example.
- The active agent's avatar lifts slightly, grows and sits on top with a green ring. The others stay a little faded.
- The agent's name shows under the row and changes with the card.
- Clicking an avatar still brings that agent's card to the front. The progress line stays under the row and shows when the next switch is coming.

## Card changes
- **Image:** each card is filled edge to edge with a robot / agent character picture, in black and white. I'll make four placeholder pictures that you can swap later.
- **Top:** only the agent's name, in the top-left corner.
- **Bottom (aligned to the bottom of the card):** role, one-line description, the headline number and its label, then a button.
- **Tags:** removed.
- **Button:** "Meet [name]" with the sliding arrow box. It's green with dark text, so it stands out against the blue section, and it matches the other buttons' 50px height.
- **Glare:** a soft diagonal light sweeps across the front card every 3 seconds.
- **Hover:** the picture fades from black and white to colour.
- A dark gradient behind the bottom text keeps it readable on any picture.
- **Auto-switch:** slowed from every 4 seconds to every 7 seconds. It still pauses on hover or keyboard focus.

## Technical details
- **New design-system component** `src/components/konsol/avatar.tsx`, adapted from the pasted Radix avatar:
  - `Avatar`, `AvatarImage`, `AvatarFallback`, plus `AvatarGroup` for the overlapping row.
  - Props: CVA `size` (sm/md/lg) and a `ring` variant, built from token utilities only.
  - Exported from `src/index.ts`.
  - Install `@radix-ui/react-avatar`.
  - Skip the pasted CSS block: it adds generic info/success/warning tokens, and the project already has its own status tokens.
- **Pictures:** generate four square robot portraits into `src/assets/photography/agents/` as `atlas.jpg`, `nova.jpg`, `sage.jpg` and `echo.jpg`.
- **`AgentStack.tsx`:**
  - `INTERVAL = 7000`.
  - Card markup: a full-bleed `<img>` with the `grayscale` class, removed on `group-hover`/`focus-within` with a duration-move transition. Name at the top, content block at `mt-auto`.
  - Glare: a `pointer-events-none` overlay with a skewed white gradient, animated by a new `@keyframes agent-glare` (3s loop) in `src/styles.css`. It is disabled under `prefers-reduced-motion`.
  - The CTA reuses the existing `cta-slide` + `ArrowBox` pattern with `bg-yellow-green text-evergreen`.
- Verify in the browser at desktop and phone widths: auto-switch timing, the hover colour change, and that clicking an avatar switches the card.
