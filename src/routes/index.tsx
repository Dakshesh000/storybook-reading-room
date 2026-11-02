import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/showcase/Shell";
import { Button, Container, Section, SectionMuted, MonoLabel, Highlight, Card, CardTitle, CardDescription } from "@/index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Konsol Design System" },
      { name: "description", content: "Tokens, components and brand assets for The Konsol, a bold B2B marketing agency." },
      { property: "og:title", content: "The Konsol Design System" },
      { property: "og:description", content: "Tokens, components and brand assets for The Konsol." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Overview,
});

const pages = [
  { to: "/colors", title: "Colours", body: "Brand palette, light and dark roles, section colours, buttons and status." },
  { to: "/typography", title: "Typography", body: "Inter display, Space Grotesk headings, Roboto body." },
  { to: "/logos", title: "Logos", body: "Official black and white logos for light and dark surfaces." },
  { to: "/components", title: "Components", body: "Every building block, live, with variants and code." },
] as const;

function Overview() {
  return (
    <Shell>
      <Container className="flex flex-col gap-6 py-10">
        <Section tone="green" className="animate-reveal">
          <MonoLabel>Design system · v0.1</MonoLabel>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            Bold, clean and <Highlight className="bg-btn-green-pressed">confident</Highlight> by default.
          </h1>
          <SectionMuted className="mt-6 max-w-2xl text-lg">
            Brand revamps, websites and AI powered outbound for growing service businesses. Mostly white and black,
            with one big block of brand colour per section.
          </SectionMuted>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="indigo" size="lg">Book a demo</Button>
            <Button variant="outline" size="lg" arrow={false}>See case studies</Button>
          </div>
        </Section>
        <div className="grid gap-6 md:grid-cols-2">
          {pages.map((p, i) => (
            <Link key={p.to} to={p.to} className="rounded-card outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Card fill={(["green", "blue", "indigo", "green"] as const)[i]} className="h-full">
                <CardTitle>{p.title}</CardTitle>
                <CardDescription>{p.body}</CardDescription>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Shell>
  );
}
