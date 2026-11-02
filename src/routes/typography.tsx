import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader, Caption } from "@/showcase/Shell";
import { Container, MonoLabel, Highlight, TextLink } from "@/index";

export const Route = createFileRoute("/typography")({
  head: () => ({
    meta: [
      { title: "Typography · The Konsol Design System" },
      { name: "description", content: "Inter Tight and JetBrains Mono type scale for The Konsol." },
      { property: "og:title", content: "Typography · The Konsol Design System" },
      { property: "og:description", content: "Fonts and type scale for The Konsol." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Typography,
});

const scale = [
  ["Display", "text-7xl font-semibold tracking-tight leading-[1.02]", "Growth, on brand."],
  ["H1", "text-6xl font-semibold tracking-tight", "Websites that book meetings"],
  ["H2", "text-5xl font-semibold tracking-tight", "Brand revamps for service firms"],
  ["H3", "text-3xl font-semibold tracking-tight", "AI powered outbound"],
  ["H4", "text-2xl font-semibold", "What our clients say"],
  ["H5", "text-xl font-semibold", "Pricing that scales with you"],
  ["H6", "text-lg font-semibold", "Frequently asked questions"],
  ["Body large", "text-lg text-foreground-secondary", "We help growing service businesses look the part and fill their calendar."],
  ["Body", "text-base", "Most clients see their first booked call within three weeks of launch."],
  ["Caption", "text-sm text-muted-foreground", "Results from 42 campaigns run in 2026."],
] as const;

function Typography() {
  return (
    <Shell>
      <PageHeader eyebrow="Foundations" title="Typography" intro="One family for everything, plus a monospace for small labels." />
      <Container className="grid gap-6 pb-12 md:grid-cols-2">
        <div className="rounded-card border border-border p-6">
          <p className="text-4xl font-semibold">Inter Tight</p>
          <Caption>font-sans · 400, 500, 600, 700 · headings and body</Caption>
        </div>
        <div className="rounded-card border border-border p-6">
          <p className="font-mono text-2xl">JetBrains Mono</p>
          <Caption>font-mono · 400, 500 · 12px uppercase labels, 0.06em</Caption>
        </div>
      </Container>
      <Container className="flex flex-col divide-y divide-border pb-16">
        {scale.map(([name, cls, text]) => (
          <div key={name} className="grid gap-2 py-6 md:grid-cols-[180px_1fr] md:items-baseline">
            <Caption>{name}</Caption>
            <div>
              <p className={cls}>{text}</p>
              <Caption>{cls}</Caption>
            </div>
          </div>
        ))}
        <div className="grid gap-2 py-6 md:grid-cols-[180px_1fr]">
          <Caption>Inline</Caption>
          <div className="flex flex-col gap-3">
            <MonoLabel>Case study · Outbound</MonoLabel>
            <p>Read the <TextLink href="#">full case study</TextLink> to see how we booked <Highlight>63 meetings</Highlight> in a quarter.</p>
            <blockquote className="border-l-4 border-yellow-green pl-4 text-xl">"The Konsol rebuilt our brand and our pipeline in one go."</blockquote>
            <code className="font-mono text-sm bg-background-alt rounded-[4px] px-1.5 py-0.5 w-fit">bg-section-green</code>
          </div>
        </div>
      </Container>
    </Shell>
  );
}
