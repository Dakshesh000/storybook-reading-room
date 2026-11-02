import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader, Caption, Code } from "@/showcase/Shell";
import { Container, Logo } from "@/index";

export const Route = createFileRoute("/logos")({
  head: () => ({
    meta: [
      { title: "Logos · The Konsol Design System" },
      { name: "description", content: "Official The Konsol logo files for light and dark surfaces." },
      { property: "og:title", content: "Logos · The Konsol Design System" },
      { property: "og:description", content: "Official The Konsol logos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Logos,
});

const items = [
  { color: "black", background: "transparent", surface: "bg-white", note: "Light surfaces" },
  { color: "white", background: "transparent", surface: "bg-evergreen", note: "Dark surfaces" },
  { color: "black", background: "solid", surface: "bg-parchment", note: "Avatars, app icons" },
  { color: "white", background: "solid", surface: "bg-parchment", note: "Avatars, app icons" },
] as const;

function Logos() {
  return (
    <Shell>
      <PageHeader eyebrow="Brand" title="Logos" intro="Always use the official files. Never redraw, recolour or stretch the logo." />
      <Container className="grid gap-6 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.color + i.background} className="flex flex-col gap-2">
            <div className={`flex h-48 items-center justify-center rounded-frame border border-border ${i.surface}`}>
              <Logo color={i.color} background={i.background} className="size-24" />
            </div>
            <p className="text-sm font-medium">{i.note}</p>
            <Caption>{`<Logo color="${i.color}" background="${i.background}" />`}</Caption>
          </div>
        ))}
      </Container>
      <Container className="pb-16">
        <Code code={`import { Logo } from "@/design-system/konsol";\n\n<Logo color="white" className="size-10" />`} />
      </Container>
    </Shell>
  );
}
