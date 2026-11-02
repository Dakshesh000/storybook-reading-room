# Homepage from the reference file

A new **Homepage** page in the showcase, copying `konsol-homepage-v5.html` as closely as possible, section by section, using the design system's own colours, fonts, buttons, cards and FAQ list. The current Overview page stays where it is, and a "Homepage" link is added to the top menu.

## Sections (same order, layout, wording and images as the reference)
1. **Top bar:** small "KONSOL · Light / Dark" switch. Below it, the header: logo, About / Services / Insights / Testimonials, a green "Get Started" button with an arrow box, and a menu button that opens the Company / Services / Resources panel.
2. **Hero:** giant "MARKETING" word with the masked "GTM" figure overlapping a green rounded panel. Inside the panel: "Scale your ideas. Automate with AI.", a dark "Book a demo" button, the "Agent Studio // MODEL V4.0.2" card with the flower photo, and a scrolling row of client name chips (Interlock, Pollinate, Nietzsche…).
3. **Intro:** "Built for real-world AI", the Priya Shah quote with photo, a big statement with the second half greyed, and a video thumbnail with caption.
4. **Blue panel:** woman-on-phone photo with a quote bubble, "5.0 Client satisfaction", the large headline, a towers photo, a green "Book a demo" button and the "Agent performance" chart card (Hours saved +12,892, Tasks automated).
5. **Services:** "/OUR SERVICES · Automation solutions" with 2 wide and 3 narrow cards and their line illustrations.
6. **About:** "The humans behind Northwind" with the two team photos and the paragraph.
7. **Case studies:** indigo panel with dashed grid lines, "05 PROJECTS" tag, Interlock Industries, the halftone portrait, prev/next arrows, "-62% RESPONSE TIME" and "SEE ALL CASE STUDIES".
8. **Testimonials:** the Marcus Bell quote with a progress line and green prev/next arrows.
9. **FAQ:** "Got questions?" with the photo card and "Contact us", plus the 6 questions as an accordion (first one open).
10. **Pricing:** Monthly / Annually switch with "SAVE 20%". Four plans (Core, Growth, Pro highlighted dark, Scale) with prices, buttons and feature lists. The switch changes the prices: monthly shows the full price, annual is 20% off.
11. **Footer:** big name, tagline, green social circles, the orb illustration, four link columns and the copyright line.

Interactions copied too: hover colour and arrow slides, accordion, the menu panel, the case-study and testimonial arrows (cycling through the content in the file), scrolling logos, and fade-ins on scroll, with reduced motion respected.

## Choices to flag
- **Fonts and colours:** these follow your design system (Inter Bold display, Space Grotesk headings, Roboto body, Roboto Mono labels) instead of the reference's Inter Tight, so the page shows off the system.
- **Placeholder names:** "Logo" becomes your real Konsol logo. "Northwind" stays exactly as written in the reference, unless you'd like it swapped to "The Konsol".
- **Images:** all 22 images embedded in the file are saved and used as-is.

## Technical details
- Extract the base64 images from the HTML into `/tmp`, then upload them with `lovable-assets` to `src/showcase/homepage/assets/*.asset.json`, which is preview-only and excluded by `.dsignore`.
- Route `src/routes/homepage.tsx` with its own `head()`. Section components go in `src/showcase/homepage/` and compose barrel components (Button, Section, Card, Accordion, MonoLabel, Logo, Photo, Container), with token utilities only. Add a "Homepage" nav entry in `Shell.tsx`, hidden on this route in favour of the reference header.
- Small new pieces stay page-local: marquee, pricing switch, chart SVG and carousel state. Add to the library only what is clearly reusable, and only if you ask later.
- Verify with screenshots against the reference renders at 1280px and at mobile width.
