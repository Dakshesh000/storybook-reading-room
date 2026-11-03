import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader, Caption } from "@/showcase/Shell";
import { Container, MonoLabel, Section, SectionMuted } from "@/index";

export const Route = createFileRoute("/brand/colours")({
  head: () => ({
    meta: [
      { title: "Colours · The Konsol Design System" },
      { name: "description", content: "The Konsol brand palette, colour roles, section colours and status colours." },
      { property: "og:title", content: "Colours · The Konsol Design System" },
      { property: "og:description", content: "Brand palette and colour roles for The Konsol." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Colors,
});

const brand = [
  ["yellow-green", "Main brand. Green buttons and sections"],
  ["indigo", "Main call to action, links, focus"],
  ["smart-blue", "Blue sections"],
  ["evergreen", "Our black. Text and dark sections"],
  ["parchment", "Quiet bands and soft backgrounds"],
  ["emerald", "Success only"],
  ["amber", "Warnings and small highlights"],
  ["brick", "Errors only"],
] as const;

const roles = [
  ["background", "Page background"],
  ["background-alt", "Quiet bands and cards"],
  ["card", "Cards, with a border"],
  ["foreground", "Headings and body"],
  ["foreground-secondary", "Supporting copy"],
  ["muted-foreground", "Captions, labels, helper text"],
  ["link", "Links in body copy"],
  ["border", "Card outlines, dividers"],
  ["input", "Form field borders"],
  ["ring", "Keyboard focus"],
  ["highlight", "Marker behind key words"],
] as const;

const sections = ["green", "blue", "indigo", "evergreen"] as const;
const statuses = ["success", "warning", "error", "info"] as const;

function Swatch({ token, role, cssVar }: { token: string; role: string; cssVar: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-24 rounded-card border border-border" style={{ background: `var(--${cssVar})` }} />
      <p className="text-sm font-medium">{role}</p>
      <Caption>bg-{token} · --{cssVar}</Caption>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Container className="pb-14">
      <MonoLabel className="text-muted-foreground">{title}</MonoLabel>
      <div className="mt-4">{children}</div>
    </Container>
  );
}

function Colors() {
  return (
    <Shell>
      <PageHeader eyebrow="Foundations" title="Colours" intro="Always reach for the token, never the raw value. Use the dark switch above to check both themes." />
      <Group title="Brand">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {brand.map(([t, r]) => <Swatch key={t} token={t} role={r} cssVar={`brand-${t}`} />)}
        </div>
      </Group>
      <Group title="Roles · switch with theme">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6">
          {roles.map(([t, r]) => <Swatch key={t} token={t} role={r} cssVar={t} />)}
        </div>
      </Group>
      <Group title="Sections · text follows the section">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <Section key={s} tone={s} className="py-10 md:py-10">
              <h3 className="text-3xl font-semibold capitalize">{s}</h3>
              <SectionMuted className="mt-2">Muted copy on {s}</SectionMuted>
              <p className="mt-4 font-mono text-xs opacity-80">bg-section-{s} · text-section-{s}-foreground</p>
            </Section>
          ))}
        </div>
      </Group>
      <Group title="Status">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statuses.map((s) => (
            <div key={s} className="flex flex-col gap-2">
              <div className="rounded-card border px-4 py-6 font-medium capitalize"
                style={{ background: `var(--${s}-bg)`, color: `var(--${s}-fg)`, borderColor: `var(--${s}-border)` }}>
                {s}
              </div>
              <Caption>bg-{s}-bg · text-{s}-fg · border-{s}-border</Caption>
            </div>
          ))}
        </div>
      </Group>
    </Shell>
  );
}
