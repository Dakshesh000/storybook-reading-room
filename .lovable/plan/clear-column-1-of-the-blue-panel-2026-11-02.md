# Clear column 1 of the blue panel

## What gets removed now
In the blue section's left column on the homepage:
- The black-and-white photo of the woman with the phone
- The quote overlay ("Their agents gave us clarity...")
- The "5.0" star rating and "Client satisfaction" text

The column stays in place, same width and height, but is left empty, so the right column doesn't shift. Nothing else in the section changes.

## What you're planning next (not built now)
That column will become an agent demo for 4 agents:
- **Top: a card** showing the current agent — a character-style persona with real abilities and skills.
- **Bottom: an avatar bar** with the 4 agent avatars. It switches agent automatically, and the card above updates to match.

When you're ready, send the 4 agents (names, roles, skills, and avatar art if you have it) and I'll build it.

## Technical details
- In `BluePanel` (`src/showcase/homepage/Homepage.tsx`), replace the left column's contents with an empty placeholder div that keeps the 4:5 frame height (`aspect-[4/5]`) so the grid layout holds.
- The `clientPhone` image pointer becomes unused in that spot; leave the file, since it may be reused later.
