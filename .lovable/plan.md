# Agent card stack: taller card, left-aligned avatars, no auto-switch

## What changes
1. **Card height and alignment**
   - The front card's top lines up with the top of the heading in the right column.
   - The card grows taller to fill the space down to the avatar row, instead of keeping its fixed 4:5 shape.
   - The cards behind it peek out below or to the sides, so nothing pokes above the heading line.
2. **Avatars**
   - The avatar row and the name/role line under it sit on the left instead of in the centre.
   - Echo is the agent shown when the page loads.
3. **No auto-switch**
   - The cards stop changing on their own. They change only when you click an avatar.
   - The progress line under the avatars is removed, along with the pause-on-hover logic.

## Technical details
- `Homepage.tsx` BluePanel: drop the `pt-10` wrapper, make the left cell `flex flex-col` so it stretches to the full height of the right column.
- `AgentStack.tsx`:
  - The root becomes `flex h-full flex-col`. The stack div changes from `aspect-[4/5]` to `flex-1 min-h-[28rem]`.
  - The back cards' offset changes from `translateY(-depth*14px)` to a positive value, so they peek below the front card rather than above it.
  - The avatar block changes from `items-center` to `items-start`.
  - `useState(3)` makes Echo the starting agent.
  - Remove `INTERVAL`, the interval effect, the `paused` state and its handlers, and the progress `<span>`.
- `styles.css`: remove the now-unused `agent-progress` keyframe.
