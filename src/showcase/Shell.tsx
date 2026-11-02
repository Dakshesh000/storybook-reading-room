import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Logo, MonoLabel, Container } from "@/index";

const nav = [
  { to: "/", label: "Overview" },
  { to: "/colors", label: "Colours" },
  { to: "/typography", label: "Typography" },
  { to: "/logos", label: "Logos" },
  { to: "/components", label: "Components" },
  { to: "/homepage", label: "Homepage" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <Container className="flex h-16 items-center gap-6">
          <Link to="/" className="flex items-center gap-3 rounded-control outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Logo color={dark ? "white" : "black"} className="size-8" />
            <span className="font-semibold tracking-tight">The Konsol</span>
            <MonoLabel className="text-muted-foreground hidden sm:inline">Design system</MonoLabel>
          </Link>
          <nav className="ml-auto flex items-center gap-1 overflow-x-auto">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-control px-3 py-2 text-sm text-foreground-secondary hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                activeProps={{ className: "bg-background-alt text-foreground font-medium" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="rounded-control border border-border px-3 py-2 font-mono text-xs uppercase tracking-label outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </Container>
      </header>
      <main>{children}</main>
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <Container className="pt-16 pb-10">
      <MonoLabel className="text-muted-foreground">{eyebrow}</MonoLabel>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-6xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-foreground-secondary">{intro}</p>
    </Container>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs text-muted-foreground">{children}</p>;
}

export function Code({ code }: { code: string }) {
  return (
    <details className="rounded-card border border-border bg-background-alt">
      <summary className="cursor-pointer px-4 py-2 font-mono text-xs uppercase tracking-label text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-card">
        Code
      </summary>
      <pre className="overflow-x-auto px-4 pb-4 font-mono text-xs leading-relaxed">{code}</pre>
    </details>
  );
}
