import { createFileRoute } from "@tanstack/react-router";
import { Homepage } from "@/showcase/homepage/Homepage";

export const Route = createFileRoute("/homepage")({
  head: () => ({
    meta: [
      { title: "Homepage · The Konsol Design System" },
      { name: "description", content: "A full marketing homepage built entirely from The Konsol design system." },
      { property: "og:title", content: "Homepage · The Konsol Design System" },
      { property: "og:description", content: "A full marketing homepage built from The Konsol design system." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Homepage,
});
