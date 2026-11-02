import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Shell, Caption, Code } from "@/showcase/Shell";
import {
  Button, Container, Section, SectionMuted, Card, CardTitle, CardDescription, MonoLabel, Highlight, TextLink,
  Badge, Alert, Input, Textarea, Label, Field, Accordion, AccordionItem, Photo, Logo,
} from "@/index";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Components · The Konsol Design System" },
      { name: "description", content: "Live gallery of every The Konsol component with variants, states and code." },
      { property: "og:title", content: "Components · The Konsol Design System" },
      { property: "og:description", content: "Every The Konsol component, live." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Components,
});

const PHOTO = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=70";

function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-3">
      {children}
      <Caption>{label}</Caption>
    </div>
  );
}

type Entry = { id: string; name: string; desc: string; code: string; body: ReactNode };

const entries: Entry[] = [
  {
    id: "button", name: "Button", desc: "Green for header and hero actions, indigo for the main call to action. Arrow slides on hover.",
    code: `<Button variant="indigo">Book a demo</Button>\n<Button variant="green" size="sm">Get started</Button>`,
    body: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-6">
          <Spec label='variant="green"'><Button variant="green">Get started</Button></Spec>
          <Spec label='variant="indigo"'><Button variant="indigo">Book a demo</Button></Spec>
          <Spec label='variant="outline"'><Button variant="outline">See pricing</Button></Spec>
          <Spec label='variant="ghost"'><Button variant="ghost">Learn more</Button></Spec>
          <Spec label="disabled"><Button disabled>Book a demo</Button></Spec>
          <Spec label="arrow={false}"><Button arrow={false} variant="green">Contact us</Button></Spec>
        </div>
        <div className="flex flex-wrap items-end gap-6">
          <Spec label='size="sm"'><Button size="sm">Book a demo</Button></Spec>
          <Spec label='size="md"'><Button size="md">Book a demo</Button></Spec>
          <Spec label='size="lg"'><Button size="lg">Book a demo</Button></Spec>
        </div>
        <Section tone="indigo" className="py-8 md:py-8 flex flex-wrap gap-3">
          <Button variant="green">Get started</Button>
          <Button variant="outline">View case studies</Button>
        </Section>
      </div>
    ),
  },
  {
    id: "section", name: "Section", desc: "One full colour card per section. Text and muted text follow the tone.",
    code: `<Section tone="blue">\n  <h2>About us</h2>\n  <SectionMuted>Supporting copy</SectionMuted>\n</Section>`,
    body: (
      <div className="grid gap-4 md:grid-cols-3">
        {(["plain", "alt", "green", "blue", "indigo", "evergreen"] as const).map((t) => (
          <Section key={t} tone={t} className="py-8 md:px-8 md:py-8 border border-border">
            <MonoLabel>tone="{t}"</MonoLabel>
            <p className="mt-2 text-2xl font-semibold">Brand revamps</p>
            <SectionMuted className="mt-1 text-sm">For growing service businesses</SectionMuted>
          </Section>
        ))}
      </div>
    ),
  },
  {
    id: "container", name: "Container", desc: "Centred 1280px column with 24px side padding.",
    code: `<Container>…</Container>`,
    body: <div className="rounded-card border border-dashed border-border"><Container className="py-6 bg-background-alt"><p>Content max width 1280px</p></Container></div>,
  },
  {
    id: "card", name: "Card", desc: "White with a 1px border, no shadow. `fill` floods with brand colour on hover (services).",
    code: `<Card fill="green">\n  <CardTitle>Websites</CardTitle>\n  <CardDescription>…</CardDescription>\n</Card>`,
    body: (
      <div className="grid gap-6 md:grid-cols-3">
        {([["green", "Brand Revamp", "New identity, voice and guidelines in six weeks."],
          ["blue", "Websites", "Fast, on-brand sites that turn visitors into calls."],
          ["indigo", "Outbound", "AI powered prospecting that books qualified meetings."]] as const).map(([f, t, d]) => (
          <Card key={f} fill={f}>
            <MonoLabel>fill="{f}"</MonoLabel>
            <CardTitle>{t}</CardTitle>
            <CardDescription>{d}</CardDescription>
          </Card>
        ))}
      </div>
    ),
  },
  {
    id: "badge", name: "Badge", desc: "Small mono tag for categories and status.",
    code: `<Badge variant="green">New</Badge>`,
    body: (
      <div className="flex flex-wrap gap-6">
        {(["neutral", "green", "indigo", "outline"] as const).map((v) => (
          <Spec key={v} label={`variant="${v}"`}><Badge variant={v}>Outbound</Badge></Spec>
        ))}
      </div>
    ),
  },
  {
    id: "text", name: "MonoLabel, Highlight, TextLink", desc: "Inline type helpers.",
    code: `<MonoLabel>Case study</MonoLabel>\n<Highlight>3x pipeline</Highlight>\n<TextLink href="/pricing">pricing</TextLink>`,
    body: (
      <div className="flex flex-col gap-4">
        <MonoLabel className="text-muted-foreground">Case study · Northwind Legal</MonoLabel>
        <p className="text-2xl font-semibold">We tripled their pipeline with <Highlight>3x more booked calls</Highlight>.</p>
        <p>Compare plans on our <TextLink href="#">pricing page</TextLink>.</p>
      </div>
    ),
  },
  {
    id: "alert", name: "Alert", desc: "Status messages. Accent colours are for status only.",
    code: `<Alert status="success" title="Demo booked">We'll email you shortly.</Alert>`,
    body: (
      <div className="grid gap-4 md:grid-cols-2">
        <Alert status="success" title="Demo booked">Check your inbox for the calendar invite.</Alert>
        <Alert status="warning" title="Almost full">Only two onboarding slots left this month.</Alert>
        <Alert status="error" title="Something went wrong">We couldn't send your message. Try again.</Alert>
        <Alert status="info" title="New">Outbound now includes LinkedIn sequences.</Alert>
      </div>
    ),
  },
  {
    id: "form", name: "Input, Textarea, Label, Field", desc: "8px corners, focus ring on every field, helper and error text wired up.",
    code: `<Field label="Work email" htmlFor="email" hint="We never share it.">\n  <Input type="email" />\n</Field>`,
    body: (
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Field label="Work email" htmlFor="f-email" hint="We'll only use it to confirm your demo."><Input type="email" placeholder="jane@company.com" /></Field>
          <Field label="Company website" htmlFor="f-site" error="Enter a full web address, like https://acme.com"><Input defaultValue="acme" /></Field>
          <div className="flex flex-col gap-2"><Label htmlFor="f-dis">Disabled</Label><Input id="f-dis" disabled placeholder="Not editable" /></div>
        </div>
        <Card>
          <CardTitle>Book a demo</CardTitle>
          <Field label="Full name" htmlFor="d-name"><Input placeholder="Jane Cooper" /></Field>
          <Field label="What do you need help with?" htmlFor="d-msg"><Textarea placeholder="We want to rebrand before our Series A…" /></Field>
          <Button variant="indigo" className="mt-2 self-start">Book a demo</Button>
        </Card>
      </div>
    ),
  },
  {
    id: "accordion", name: "Accordion", desc: "FAQ list. Works inside any Section and adopts its colours.",
    code: `<Accordion>\n  <AccordionItem title="How long does a revamp take?">Six weeks.</AccordionItem>\n</Accordion>`,
    body: (
      <Section tone="blue" className="py-10 md:py-10">
        <h3 className="mb-6 text-3xl font-semibold">FAQ</h3>
        <Accordion>
          <AccordionItem title="How long does a brand revamp take?">Most revamps take six weeks from kickoff to guidelines.</AccordionItem>
          <AccordionItem title="Do you work with companies outside the UK?">Yes, about half our clients are in Europe and North America.</AccordionItem>
          <AccordionItem title="What does outbound cost?">Plans start at a fixed monthly fee. See pricing for details.</AccordionItem>
        </Accordion>
      </Section>
    ),
  },
  {
    id: "photo", name: "Photo", desc: "Black and white by default, turns to brand colour on hover.",
    code: `<Photo src="/team.jpg" alt="Our team" tint="indigo" />`,
    body: (
      <div className="grid gap-6 md:grid-cols-3">
        {(["green", "blue", "indigo"] as const).map((t) => (
          <Spec key={t} label={`tint="${t}"`}><Photo src={PHOTO} alt="The Konsol team in a workshop" tint={t} wrapperClassName="aspect-[4/3] w-full" /></Spec>
        ))}
      </div>
    ),
  },
  {
    id: "logo", name: "Logo", desc: "Official logo files. Black on light, white on dark.",
    code: `<Logo color="black" />`,
    body: (
      <div className="flex flex-wrap gap-6">
        <Spec label='color="black"'><div className="rounded-frame bg-white border border-border p-4"><Logo /></div></Spec>
        <Spec label='color="white"'><div className="rounded-frame bg-evergreen p-4"><Logo color="white" /></div></Spec>
      </div>
    ),
  },
];

function Components() {
  const [q, setQ] = useState("");
  const shown = entries.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Shell>
      <Container className="grid gap-10 py-10 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start flex flex-col gap-3">
          <Label htmlFor="cmp-search">Search components</Label>
          <Input id="cmp-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Button, Card…" className="h-9 text-sm" />
          <nav className="flex flex-col">
            {shown.map((e) => (
              <a key={e.id} href={`#${e.id}`} className="rounded-control px-2 py-1.5 text-sm text-foreground-secondary hover:bg-background-alt hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {e.name}
              </a>
            ))}
            {shown.length === 0 && <Caption>No matches</Caption>}
          </nav>
        </aside>
        <div className="flex flex-col gap-16">
          {shown.map((e) => (
            <section key={e.id} id={e.id} className="scroll-mt-24 flex flex-col gap-5">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">{e.name}</h2>
                <p className="mt-1 text-foreground-secondary">{e.desc}</p>
              </div>
              <div className="rounded-frame border border-border p-6">{e.body}</div>
              <Code code={e.code} />
            </section>
          ))}
        </div>
      </Container>
    </Shell>
  );
}
