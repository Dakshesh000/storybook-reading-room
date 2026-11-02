import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/index";
import { cn } from "@/lib/utils";
import { img } from "./images";
import {
  ArrowBox, BwImg, ClientGlyph, Eyebrow, IconArrowLeft, IconArrowRight, IconArrowUpRight, IconChart, IconChevron,
  IconChevronRight, IconDots, IconLinkedIn, IconPlay, IconStar, IconX, IconYouTube, InkReveal, Reveal,
} from "./parts";

const t = {
  display: "font-display font-bold uppercase leading-[0.85] tracking-[-0.05em] text-[clamp(4rem,15vw,13.5rem)]",
  h1: "font-heading font-medium leading-none tracking-[-0.04em] text-5xl md:text-[4.5rem]",
  h2: "font-heading font-medium leading-[1.1] tracking-[-0.03em] text-[1.75rem] md:text-[2.75rem]",
  h3: "font-heading font-medium leading-[1.2] tracking-[-0.02em] text-xl md:text-2xl",
  label: "font-mono text-xs uppercase leading-[1.3] tracking-label",
  micro: "text-[0.625rem] leading-[1.3]",
};
const ring = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const wrap = "mx-auto max-w-content";

const clients = ["QuartzAI", "Pollinate", "Nietzsche", "45 Degrees", "Railspeed", "Northwind", "Interlock", "Halcyon", "Brightline", "Lumen"];

/* ============ Top bar + header ============ */
function ThemeBar({ dark, setDark }: { dark: boolean; setDark: (d: boolean) => void }) {
  return (
    <div className="sticky top-0 z-[60] flex items-center justify-center gap-2 border-b border-border bg-background/90 py-2 backdrop-blur">
      <Link to="/" className={cn(t.label, "mr-2 rounded-[4px] text-muted-foreground hover:text-foreground", ring)}>Konsol</Link>
      {(["Light", "Dark"] as const).map((m) => {
        const active = (m === "Dark") === dark;
        return (
          <button
            key={m}
            type="button"
            aria-pressed={active}
            onClick={() => setDark(m === "Dark")}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-hover",
              active ? "border-foreground bg-foreground text-background" : "border-border text-foreground hover:bg-background-alt",
              ring,
            )}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}

function Header({ dark }: { dark: boolean }) {
  return (
    <header className="relative z-50">
      <div className={cn(wrap, "flex items-center justify-between px-6 py-6")}>
        <a href="#" aria-label="The Konsol home" className={cn("rounded-control", ring)}>
          <Logo color={dark ? "white" : "black"} className="size-10" />
        </a>
        <nav aria-label="Main" className="hidden gap-10 md:flex">
          {["About", "Services", "Insights", "Testimonials"].map((n) => (
            <a key={n} href="#" className={cn("rounded-[4px] hover:underline underline-offset-4", ring)}>{n}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#" className={cn("cta-slide hidden rounded-control bg-indigo text-white border border-indigo hover:text-black focus-visible:text-black transition-colors duration-move hover:bg-yellow-green focus-visible:bg-yellow-green [--cta-box:2.75rem] [--cta-gap:1rem] sm:inline-flex", ring)}>
            <ArrowBox className="h-9" /><span data-cta-label className="leading-9">Get Started</span>
          </a>
        </div>
      </div>

    </header>
  );
}

/* ============ Hero ============ */
function LogoRotator() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((x) => x + 1), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mt-5 grid grid-cols-3 gap-4 md:grid-cols-6">
      {Array.from({ length: 6 }, (_, slot) => {
        const active = (slot + tick * 6) % clients.length;
        return (
          <div key={slot} className={cn("relative h-10", slot >= 3 && "hidden md:block")}>
            {clients.map((name, i) => (
              <div key={name} aria-hidden={i !== active}
                className={cn(
                  "absolute inset-0 flex items-center justify-center gap-2 rounded-control bg-background text-sm font-medium text-foreground transition-[opacity,transform] duration-move ease-konsol",
                  i === active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                )}>
                <ClientGlyph i={i} />
                <span className="whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Hero() {
  return (
    <section className={wrap}>
      <h1 className={cn(t.display, "mt-6 px-6 text-center leading-[0.78]")}>Marketing</h1>
      <div className="relative mx-3 mt-3 min-h-[512px] rounded-section bg-section-green p-8 text-section-green-foreground md:p-10">
        <img src={img.gtmFigure} alt="Person in a suit wearing a GTM mask" className="pointer-events-none absolute bottom-0 right-0 z-10 h-[55%] w-auto max-w-none opacity-90 md:left-1/2 md:right-auto md:h-[115%] md:-translate-x-1/2 md:opacity-100" />
        <div className="relative z-20 max-w-md">
          <Reveal>
            <p className={cn(t.h2, "text-section-green-muted")}>Scale your ideas.</p>
            <p className={t.h2}>Automate with AI.</p>
            <p className="mt-5 text-section-green-muted">Custom agents, built and shipped in weeks.</p>
            <a href="#" className={cn("cta-slide mt-6 rounded-control bg-indigo text-white border border-indigo hover:text-black focus-visible:text-black transition-colors duration-move hover:bg-yellow-green focus-visible:bg-yellow-green [--cta-box:3.5rem] [--cta-gap:1rem]", ring)}>
              <ArrowBox /><span data-cta-label className="leading-12">Book a demo</span>
            </a>
          </Reveal>
        </div>
        <a href="#" className={cn("group/card absolute right-8 top-10 z-20 hidden w-54 rounded-frame border border-border bg-background p-1.5 text-foreground shadow-lg md:block", ring)}>
          <BwImg src={img.flower} alt="Black and white flower" className="h-33 w-full rounded-control object-cover" />
          <div className="flex items-center justify-between p-2">
            <div>
              <p className="text-sm font-medium">Agent Studio</p>
              <p className={cn(t.label, "text-muted-foreground")}>// Model v4.0.2</p>
            </div>
            <IconArrowRight className="transition-transform duration-hover group-hover/card:translate-x-1" />
          </div>
        </a>
        <div className="absolute inset-x-0 bottom-0 z-20 p-8 md:p-10">
          <p className={cn(t.label, "max-w-xs")}>Opening doors for business with organizations like:</p>
          <LogoRotator />
        </div>
      </div>
    </section>
  );
}

/* ============ Intro ============ */
function Intro() {
  return (
    <section className={cn(wrap, "px-6 pb-20 pt-10")}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex min-w-0 flex-col justify-between gap-8">
          <p className="flex items-center gap-2 text-muted-foreground">
            <span className="size-2.5 rounded-full bg-muted-foreground" /> Built for real-world AI
          </p>
          <div className="flex flex-col gap-6">
            <p className={cn(t.h3, "max-w-sm")}>
              <InkReveal text="“They shipped our sales agent in three weeks. It books meetings while we sleep.”" />
            </p>
            <div className="flex items-center gap-4">
              <BwImg src={img.priyaShah} alt="Priya Shah" className="size-14 shrink-0 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="font-medium">Priya Shah</p>
                <p className={cn(t.label, "text-muted-foreground")}>Head of Growth, Railspeed</p>
              </div>
            </div>
          </div>
        </div>
        <Reveal className="min-w-0">
          <h2 className={t.h2}>
            We build AI agents that turn busy work into growth.{" "}
            <span className="text-muted-foreground">Our work blends strategy with engineering.</span>
          </h2>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button type="button" aria-label="Play video: see how our agents plug in" className={cn("group relative aspect-[9/7] w-36 shrink-0 overflow-hidden rounded-control", ring)}>
              <BwImg src={img.teamDashboard} alt="" className="h-full w-full object-cover" />
              <span className="absolute inset-0 m-auto grid size-9 place-items-center rounded-full bg-background text-foreground transition-transform duration-hover group-hover:scale-110">
                <IconPlay />
              </span>
            </button>
            <p className="text-sm">See how our agents plug into your stack, data and workflow in days.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ Blue panel ============ */
function PerformanceChart() {
  const pts = [8, 40, 18, 52, 30, 62, 26, 70, 44, 58, 36, 66, 48, 74, 40, 80, 54];
  const w = 300, h = 90;
  const d = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - p}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full text-indigo" aria-hidden="true">
      <polyline points={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function BluePanel() {
  return (
    <section className={cn(wrap, "pb-20")}>
      <div className="mx-3 grid gap-10 rounded-section bg-section-blue p-8 text-section-blue-foreground md:grid-cols-[minmax(0,22rem)_1fr] md:p-10">
        <div className="flex flex-col justify-between gap-10">
          <div className="relative overflow-hidden rounded-frame">
            <BwImg src={img.clientPhone} alt="Client checking results on her phone" className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="rounded-frame bg-btn-indigo-hover/90 p-4 text-center text-sm font-medium text-btn-indigo-foreground">
                “Their agents gave us clarity and freed our team to focus on growth.”
              </p>
            </div>
          </div>
          <div>
            <p className={cn(t.h2, "flex items-center gap-2")}><IconStar /> 5.0</p>
            <p className="mt-1 text-section-blue-muted">Client satisfaction</p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <Reveal><h2 className={t.h2}>We build custom AI agents focused on clarity, automation, measurable growth and outcomes.</h2></Reveal>
          <div className="grid flex-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <BwImg src={img.glassTowers} alt="Glass office towers" className="h-full min-h-72 w-full rounded-frame object-cover" />
            <div className="flex flex-col gap-4">
              <a href="#" className={cn("cta-slide self-end rounded-control bg-btn-green text-btn-green-foreground transition-colors duration-hover hover:bg-btn-green-hover [--cta-box:3rem] [--cta-gap:1rem]", ring)}>
                <ArrowBox /><span data-cta-label className="leading-10">Book a demo</span>
              </a>
              <div className="relative flex flex-1 items-center justify-center rounded-frame bg-btn-indigo-hover/40 p-8">
                <div className="w-full max-w-sm rounded-frame border border-border bg-background p-4 text-foreground shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <span className="grid size-7 place-items-center rounded-full bg-indigo text-btn-indigo-foreground"><IconChart /></span>
                      Agent performance
                    </p>
                    <span className="grid size-6 place-items-center rounded-full border border-border"><IconDots /></span>
                  </div>
                  <div className="relative mt-6">
                    <PerformanceChart />
                    <div className="absolute right-6 top-0 h-full w-8 bg-border/60" />
                    <div className="absolute -top-4 right-2 rounded-control bg-btn-indigo-hover p-2 text-btn-indigo-foreground">
                      <p className={t.micro}>Hours saved</p>
                      <p className="flex items-center gap-2 text-sm font-medium">+12,892 <IconArrowUpRight className="size-3" /></p>
                    </div>
                  </div>
                  <div className={cn(t.micro, "mt-2 flex justify-between text-muted-foreground")}>
                    {["12-03", "13-03", "15-03", "16-03", "17-03", "18-03", "19-03"].map((d) => <span key={d}>{d}</span>)}
                  </div>
                </div>
                <span className={cn(t.micro, "absolute left-3 top-1/2 flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-foreground shadow-sm")}>
                  <IconChart className="size-3" /> Tasks automated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Services ============ */
const services = [
  { t: "AI strategy & consulting", d: "Get a clear roadmap on how AI can drive growth and efficiency for your business.", a: img.illuStrategy, c: img.illuStrategyColor, wide: true },
  { t: "AI content creation", d: "Produce on-brand video, copy and visuals at scale with AI-assisted workflows.", a: img.illuContent, c: img.illuContentColor, wide: true },
  { t: "AI agent development", d: "Design and deploy AI agents built specifically to solve your unique business challenges.", a: img.illuAgent, c: img.illuAgentColor },
  { t: "CRM AI automation", d: "Automate customer interactions and follow-ups to keep relationships strong and organized.", a: img.illuCrm, c: img.illuCrmColor },
  { t: "AI process automation", d: "Transform repetitive workflows into smooth, automated systems that save time.", a: img.illuProcess, c: img.illuProcessColor },
];

function ServiceCard({ s }: { s: (typeof services)[number] }) {
  const illu = (
    <>
      <img src={s.a} alt="" className={s.wide ? "h-auto w-full" : "h-full w-auto object-contain"} />
      <img src={s.c} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-move group-hover:opacity-100" />
    </>
  );
  return (
    <article className={cn(
      "group relative flex min-h-80 flex-col overflow-hidden rounded-frame border border-border bg-card p-6 transition-colors duration-hover hover:bg-background-alt md:p-8",
      s.wide ? "justify-end" : "justify-between gap-8",
    )}>
      <div className={cn(
        "transition-transform duration-300 group-hover:-translate-y-1.5",
        s.wide ? "absolute -right-8 -top-6 w-64 md:w-72" : "relative h-28 self-start",
      )}>{illu}</div>
      <div className="relative">
        <h3 className={t.h3}>{s.t}</h3>
        <p className="mt-3 max-w-xs text-sm text-muted-foreground">{s.d}</p>
      </div>
    </article>
  );
}

function Services() {
  return (
    <section className={cn(wrap, "px-6 pb-20")}>
      <Eyebrow label="Our services" />
      <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className={t.h1}>Automation solutions</h2>
        <p className="max-w-sm text-sm">Our AI-driven automation eliminates busywork, streamlines your operations, and helps your business grow, without extra effort.</p>
      </div>
      <div className="mt-12 grid gap-2 md:grid-cols-2">
        {services.slice(0, 2).map((s) => <Reveal key={s.t}><ServiceCard s={s} /></Reveal>)}
      </div>
      <div className="mt-2 grid gap-2 md:grid-cols-3">
        {services.slice(2).map((s, i) => <Reveal key={s.t} delay={i * 80}><ServiceCard s={s} /></Reveal>)}
      </div>
    </section>
  );
}

/* ============ About ============ */
function About() {
  return (
    <section className={cn(wrap, "px-6 pb-20")}>
      <Eyebrow label="About us" />
      <div className="mt-3 grid gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <h2 className={t.h1}>The humans <br /> behind Northwind</h2>
          <BwImg src={img.cofounders} alt="Our two co-founders" className="mt-10 aspect-[2/1] w-full rounded-frame object-cover" />
          <p className="mt-8 max-w-md text-sm text-muted-foreground">
            With years of experience in automation and a deep curiosity for AI's potential, we help companies move beyond repetitive work and unlock their team's true potential.
          </p>
        </div>
        <BwImg src={img.teamLaughing} alt="The Northwind team laughing together" className="h-full min-h-96 w-full rounded-frame object-cover" />
      </div>
    </section>
  );
}

/* ============ Case studies ============ */
const cases = [
  { name: ["Interlock", "Industries"], d: "A customer-focused e-commerce company handling high volumes of orders and inquiries. Our support agents now resolve most tickets end to end.", stat: "-62%", statLabel: "Response time", image: img.interlockLead, alt: "Interlock Industries team lead" },
];

function CaseStudies() {
  const [i, setI] = useState(0);
  const c = cases[i];
  const btn = "grid size-14 place-items-center transition-colors duration-hover disabled:cursor-not-allowed";
  return (
    <section className="mx-3 mb-20 overflow-hidden rounded-section bg-section-indigo text-section-indigo-foreground [background-image:radial-gradient(color-mix(in_oklab,var(--section-indigo-foreground)_14%,transparent)_1.2px,transparent_1.4px)] [background-size:10px_10px]">
      <div className={cn(wrap, "relative grid md:grid-cols-[1fr_2fr]")}>
        <span className="pointer-events-none absolute inset-y-0 left-1/3 hidden border-l border-dashed border-section-indigo-muted/50 md:block" />
        <span className="pointer-events-none absolute inset-x-0 top-48 hidden border-t border-section-indigo-muted/50 md:block" />
        <span className="pointer-events-none absolute left-6 top-48 hidden -translate-x-1/2 -translate-y-1/2 text-section-indigo-muted md:block">+</span>
        <div className="px-6 pt-10 md:col-start-2 md:h-48 md:px-0 md:pt-12">
          <p className={cn(t.label, "inline-flex")}>
            <span className="bg-parchment px-2 py-1 text-evergreen">05</span>
            <span className="bg-btn-indigo-hover px-3 py-1">Projects</span>
          </p>
          <h2 className={cn(t.h1, "mt-4")}>Case studies</h2>
        </div>
        <div key={`t${i}`} className="order-3 flex animate-reveal flex-col px-6 pb-10 md:order-none md:row-start-2 md:pb-16">
          <h3 className={t.h1}>{c.name[0]} <br /> {c.name[1]}</h3>
          <div className="mt-10 border-t border-dashed border-section-indigo-muted/50 pt-6 md:mt-auto">
            <p className="max-w-[16rem] text-sm text-section-indigo-muted">{c.d}</p>
            <p className={cn(t.h2, "mt-8")}>{c.stat}</p>
            <p className={cn(t.label, "text-section-indigo-muted")}>{c.statLabel}</p>
          </div>
        </div>
        <div className="px-6 pt-8 md:row-start-2 md:px-0 md:pr-6 md:pt-0">
          <div className="relative">
            <BwImg key={`i${i}`} src={c.image} alt={c.alt} className="aspect-[5/3] w-full animate-reveal object-cover" />
            <div className="absolute right-0 top-0 flex">
              <button type="button" aria-label="Previous case study" disabled={i === 0} onClick={() => setI(i - 1)}
                className={cn(btn, "bg-background text-foreground disabled:text-muted-foreground", ring)}><IconArrowLeft /></button>
              <button type="button" aria-label="Next case study" disabled={i === cases.length - 1} onClick={() => setI(i + 1)}
                className={cn(btn, "bg-btn-indigo-hover text-btn-indigo-foreground disabled:text-section-indigo-muted/60", ring)}><IconArrowRight /></button>
            </div>
          </div>
          <a href="#" className={cn(t.label, "mb-10 mt-8 hidden w-full place-items-center bg-btn-indigo-hover py-6 transition-colors duration-hover hover:bg-btn-indigo-pressed md:mb-16 md:mt-24 md:grid", ring)}>
            See all case studies
          </a>
        </div>
        <a href="#" className={cn(t.label, "order-4 mx-6 mb-10 grid place-items-center bg-btn-indigo-hover py-5 transition-colors duration-hover hover:bg-btn-indigo-pressed md:hidden", ring)}>
          See all case studies
        </a>
      </div>
    </section>
  );
}

/* ============ Testimonials ============ */
const quotes = [
  { q: "Working with Northwind was a game changer. Their agents automated our support queue, cleaned up our CRM, and gave our team hours back every week.", n: "Marcus Bell", r: "Head of Ops at Railspeed", img: img.marcusBell },
  { q: "They shipped our sales agent in three weeks. It books meetings while we sleep.", n: "Priya Shah", r: "Head of Growth, Railspeed", img: img.priyaShah },
  { q: "Their agents gave us clarity and freed our team to focus on growth.", n: "Interlock Industries", r: "Support team lead", img: img.interlockLead },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const q = quotes[i];
  const btn = cn("grid size-9 place-items-center rounded-control bg-btn-green text-btn-green-foreground transition-colors duration-hover hover:bg-btn-green-hover disabled:bg-btn-disabled disabled:text-btn-disabled-foreground", ring);
  return (
    <section className="pb-20">
      <div className={cn(wrap, "px-6")}>
        <Eyebrow label="Testimonials" accent="green" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-[5rem_1fr] md:gap-0 md:px-16">
          <span aria-hidden="true" className="select-none font-heading text-6xl leading-[0.7] text-muted-foreground md:text-7xl">“</span>
          <div className="max-w-2xl">
            <blockquote key={i} className="font-medium"><InkReveal text={q.q} delay={100} step={14} /></blockquote>
            <div className="relative mt-10 h-px bg-border">
              <span className="absolute left-0 top-0 h-[3px] -translate-y-px bg-input transition-all duration-500" style={{ width: `${((i + 1) / quotes.length) * 100}%` }} />
            </div>
            <div className="mt-6 flex items-center justify-between gap-6">
              <div key={`p${i}`} className="flex animate-reveal items-center gap-3">
                <BwImg src={q.img} alt={q.n} className="size-10 rounded-control object-cover" />
                <div>
                  <p className="font-medium">{q.n}</p>
                  <p className={cn(t.label, "text-muted-foreground")}>{q.r}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button type="button" aria-label="Previous testimonial" disabled={i === 0} onClick={() => setI(i - 1)} className={btn}><IconArrowLeft /></button>
                <button type="button" aria-label="Next testimonial" disabled={i === quotes.length - 1} onClick={() => setI(i + 1)} className={btn}><IconArrowRight /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
const faqs = [
  ["What does Northwind do?", "We design, build and run custom AI agents that take repetitive work off your team, from support and sales outreach to ops and reporting."],
  ["How long does it take to launch an agent?", "Most first agents go live in 2–4 weeks: one week to scope, one to two to build and test, then a guided rollout."],
  ["Do your agents work with our CRM and tools?", "Yes. We connect to HubSpot, Salesforce, Slack, Notion, Google Workspace and most tools with an API, so agents work where your team already does."],
  ["How is our data kept secure?", "Your data stays in your accounts, access is scoped to what each agent needs, and every action is logged so you can review it."],
  ["What does pricing look like?", "A fixed project fee to build, then a monthly plan for hosting, monitoring and improvements. We share a clear quote after a short scoping call."],
  ["What support do you offer after launch?", "Ongoing tuning, monthly performance reviews and a dedicated Slack channel with our team for questions and new ideas."],
] as const;

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={cn(wrap, "px-6 py-20")}>
      <div className="grid gap-12 md:grid-cols-2 md:gap-24">
        <div className="flex flex-col">
          <Eyebrow label="FAQs" accent="blue" />
          <h2 className={cn(t.h1, "mt-3")}>Got questions?</h2>
          <p className="mt-8 max-w-md text-muted-foreground">Everything you need to know about working with Northwind, from scoping and pricing to security and support.</p>
          <div className="relative order-last mt-12 h-36 w-1/2 min-w-64 overflow-hidden rounded-frame md:order-none md:h-40">
            <BwImg src={img.supportSpecialist} alt="Support specialist wearing a headset" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-2 bottom-2 rounded-control bg-section-blue p-3 text-section-blue-foreground">
              <p className={cn(t.micro, "max-w-xs text-section-blue-muted")}>Still have questions? Our team will walk you through it.</p>
              <a href="#" className={cn("group/cta mt-1 inline-flex items-center gap-1 rounded-[4px] text-sm font-medium", ring)}>
                Contact us <IconArrowUpRight className="size-3.5 transition-transform duration-hover group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
        <ul className="divide-y divide-border self-start border-y border-border">
          {faqs.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <li key={q}>
                <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                  className={cn("flex w-full items-center justify-between gap-6 rounded-control py-6 text-left font-medium", ring)}>
                  {q}
                  <IconChevron className={cn("text-muted-foreground transition-transform duration-hover", isOpen && "rotate-180")} />
                </button>
                <div id={`faq-${i}`} className={cn("grid transition-all duration-300 ease-konsol", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <p className="max-w-lg overflow-hidden text-sm text-muted-foreground"><span className="block pb-6">{a}</span></p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ============ Pricing ============ */
const plans = [
  { n: "Core", p: 495, tag: "Automate your repetitive tasks.", f: ["3 automation flows", "Standard RAG support", "1 admin seat", "Email support"] },
  { n: "Growth", p: 1250, tag: "Advanced agentic workflows.", f: ["10 automation flows", "Vector DB hosting", "5 admin seats", "Priority email"] },
  { n: "Pro", p: 2900, tag: "Custom neural architecture.", f: ["Unlimited flows", "Custom fine-tuning", "15 admin seats", "24/7 Slack connect"], hi: true },
  { n: "Scale", p: 7500, tag: "Enterprise infrastructure.", f: ["Full neural stack", "On-premise LLMs", "Unlimited seats", "Dedicated engineer"] },
];
/** Listed prices are the annual rate (20% off); monthly billing is the full price. */
export const monthlyPrice = (annual: number) => Math.round(annual / 0.8);

function Pricing() {
  const [annual, setAnnual] = useState(true);
  return (
    <section className="relative z-10 bg-background py-20">
      <div className={cn(wrap, "px-6")}>
        <Eyebrow label="Pricing" accent="green" />
        <div className="mt-10 grid items-end gap-8 md:grid-cols-2">
          <h2 className={t.h2}>Pricing</h2>
          <div className="flex items-center gap-3 text-sm md:justify-self-end">
            <span className={annual ? "text-muted-foreground" : ""}>Monthly</span>
            <button type="button" role="switch" aria-checked={annual} aria-label="Bill annually" onClick={() => setAnnual(!annual)}
              className={cn("relative h-7 w-12 rounded-full bg-background-alt", ring)}>
              <span className={cn("absolute top-1 size-5 rounded-full bg-indigo transition-all duration-hover", annual ? "left-6" : "left-1")} />
            </button>
            <span className={annual ? "" : "text-muted-foreground"}>Annually</span>
            <span className={cn(t.label, "text-muted-foreground")}>Save 20%</span>
          </div>
        </div>
        <p className="mt-6 max-w-md text-muted-foreground">Flexible intelligence tiers designed to scale alongside your business. No hidden costs, just high-performance results.</p>
        <div className="mt-12 grid overflow-hidden rounded-section border border-border md:grid-cols-2 lg:grid-cols-4">
          {plans.map((pl) => {
            const price = annual ? pl.p : monthlyPrice(pl.p);
            const muted = pl.hi ? "text-section-evergreen-muted" : "text-muted-foreground";
            return (
              <div key={pl.n} className={cn(
                "relative flex flex-col border-border [&:not(:last-child)]:border-b lg:[&:not(:last-child)]:border-b-0 lg:[&:not(:last-child)]:border-r",
                pl.hi ? "bg-section-evergreen text-section-evergreen-foreground" : "bg-card text-foreground",
              )}>
                <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-radial-gradient(circle_at_120%_-20%,transparent_0_22px,currentColor_22px_23px)]" />
                <div className="relative p-8">
                  <h3 className={t.h3}>{pl.n}</h3>
                  <p className={cn(t.h1, "mt-6")}>${price.toLocaleString("en-US")}<span className={cn("ml-1 font-sans text-sm tracking-normal", muted)}>/mo</span></p>
                  <p className={cn("mt-3 text-sm", muted)}>USD billed {annual ? "annually" : "monthly"}</p>
                </div>
                <div className={cn("relative border-y p-8", pl.hi ? "border-section-evergreen-foreground/15" : "border-border bg-background-alt")}>
                  <p className="min-h-12 max-w-[12rem]">{pl.tag}</p>
                  <a href="#" className={cn(
                    "cta-slide mt-6 rounded-control text-sm font-medium transition-colors duration-hover [--cta-box:1.75rem] [--cta-gap:0.75rem]",
                    pl.hi ? "bg-background text-foreground hover:bg-background-alt" : "bg-btn-indigo text-btn-indigo-foreground hover:bg-btn-indigo-hover",
                    ring,
                  )}>
                    <span data-cta-box className={cn("grid place-items-center rounded-control", pl.hi ? "bg-btn-indigo text-btn-indigo-foreground" : "bg-btn-indigo-foreground/15")}>
                      <IconChevronRight />
                    </span>
                    <span data-cta-label className="leading-7">Get started</span>
                  </a>
                </div>
                <ul className={cn("relative space-y-3 p-8 text-sm", muted)}>
                  {pl.f.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ Footer ============ */
function Footer() {
  const cols = [
    ["Navigate", ["Home", "About", "Services", "Team"]],
    ["Resources", ["Case studies", "How we work", "FAQ", "Blog"]],
    ["Connect", ["Book a call", "X", "LinkedIn", "Instagram"]],
    ["Legal", ["Privacy", "Terms", "Cookies", "Accessibility"]],
  ] as const;
  const social = [["X", IconX], ["LinkedIn", IconLinkedIn], ["YouTube", IconYouTube]] as const;
  return (
    <footer className={cn(wrap, "px-6 pb-10 pt-24")}>
      <div className="text-center">
        <p className={t.h1}>Northwind</p>
        <p className="mt-4 text-muted-foreground">Helping you automate what matters.</p>
        <div className="mt-6 flex justify-center gap-2">
          {social.map(([n, I]) => (
            <a key={n} href="#" aria-label={n} className={cn("grid size-10 place-items-center rounded-full bg-btn-green text-btn-green-foreground transition-colors duration-hover hover:bg-btn-green-hover", ring)}><I /></a>
          ))}
        </div>
      </div>
      <div className="relative mx-auto mt-12 max-w-md">
        <img src={img.aiCore} alt="Abstract AI core illustration" className="w-full object-contain [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-4">
        {cols.map(([h, links]) => (
          <div key={h}>
            <p className="font-medium">{h}</p>
            <ul className="mt-5 space-y-3">
              {links.map((l) => <li key={l}><a href="#" className={cn("rounded-[4px] text-sm text-muted-foreground hover:text-foreground", ring)}>{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-16 flex max-w-5xl flex-col justify-between gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
        <span>© 2026 Northwind. All rights reserved.</span>
        <span>Built by Northwind</span>
      </div>
    </footer>
  );
}

export function Homepage() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <ThemeBar dark={dark} setDark={setDark} />
      <main>
        <Header dark={dark} />
        <Hero />
        <div className="mt-6"><Intro /></div>
        <BluePanel />
        <Services />
        <About />
        <CaseStudies />
        <Testimonials />
        <Faq />
        <Pricing />
        <Footer />
      </main>
    </div>
  );
}
