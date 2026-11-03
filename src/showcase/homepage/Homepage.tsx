import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Logo } from "@/index";
import { cn } from "@/lib/utils";
import { img } from "./images";
import { AgentStack } from "./AgentStack";
import { interior } from "./GlyphPortal";
import {
  ArrowBox, BwImg, ClientGlyph, Eyebrow, IconArrowLeft, IconArrowRight, IconArrowUpRight, IconChart, IconChevron,
  IconChevronRight, IconDots, IconLinkedIn, IconPlay, IconX, IconYouTube, InkReveal, Reveal,
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
function ThemeBar() {
  return (
    <div className="dark sticky top-0 z-[60] flex items-center justify-center gap-2 border-b border-border bg-background/90 py-2 backdrop-blur">
      <Link to="/brand" className={cn(t.label, "rounded-[4px] text-muted-foreground hover:text-foreground", ring)}>Konsol</Link>
    </div>
  );
}

function Header() {
  const [compact, setCompact] = useState(false);
  const [hover, setHover] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const [tapped, setTapped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!tapped) return;
    const close = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setTapped(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [tapped]);
  useEffect(() => { if (!compact) setTapped(false); }, [compact]);
  const expanded = !compact || hover || focusIn || tapped;
  const open = compact && expanded;
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [btnW, setBtnW] = useState(0);
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBtnW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [compact]);
  const motion = "transition-all duration-move ease-konsol motion-reduce:transition-none";
  const links = ["About", "Services", "Insights", "Testimonials"];
  const cta = (
    <a ref={btnRef} href="#" className={cn("cta-slide shrink-0 whitespace-nowrap rounded-control bg-indigo text-white border border-indigo hover:text-black focus-visible:text-black transition-colors duration-move hover:bg-yellow-green focus-visible:bg-yellow-green [--cta-box:2.75rem] [--cta-gap:1rem]", compact ? "inline-flex" : "hidden sm:inline-flex", ring)}>
      <ArrowBox className="h-9" /><span data-cta-label className="leading-9">Get Started</span>
    </a>
  );
  return (
    <header className={cn("dark sticky top-[42px] z-50 h-[88px] text-foreground sm:h-[100px]", compact && "pointer-events-none")}>
      <div className={cn("mx-auto flex max-w-[1440px] items-center", motion, compact ? "px-3 pt-3" : "px-6 py-6")}>
        {!compact && (
          <a href="#" aria-label="The Konsol home" className={cn("flex shrink-0 items-center rounded-control", ring)}>
            <Logo color="white" className="size-10" />
            <span className="ml-3 whitespace-nowrap font-heading text-lg font-semibold max-[380px]:hidden">The Konsol</span>
          </a>
        )}
        <div
          ref={ref}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
          onPointerDown={(e) => { if (compact && e.pointerType !== "mouse" && !(e.target as HTMLElement).closest("a")) setTapped(true); }}
          onFocus={() => setFocusIn(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusIn(false); }}
          style={compact ? { width: open ? "100%" : btnW + 18 } : undefined}
          className={cn(
            "relative flex items-center",
            compact
              ? cn("pointer-events-auto mx-auto grid grid-cols-[1fr_auto_1fr] rounded-frame border border-border bg-background p-2 shadow-lg", motion)
              : "ml-auto flex-1 justify-between border border-transparent",
          )}
        >
          {/* invisible zone so the bar opens when the cursor gets near it */}
          {compact && <span aria-hidden className="absolute -inset-10 -z-10" />}
          {compact ? (
            <>
              {/* Logo sits on the bar itself (not inside a clipped cell) so it's never cut off */}
              <a href="#" aria-label="The Konsol home" inert={!open}
                className={cn("absolute left-3 top-[33px] z-10 -translate-y-1/2 rounded-control", motion, ring, open ? "opacity-100" : "pointer-events-none opacity-0")}>
                <Logo color="white" className="h-8 w-auto shrink-0 object-contain" />
              </a>
              {/* Left: links 1-2 hug the centred button (sm and up) */}
              <div inert={!open} className={cn("flex min-w-0 items-center justify-end overflow-hidden whitespace-nowrap", motion, open ? "pl-14 pr-3 opacity-100 lg:pr-8" : "pointer-events-none px-0 opacity-0")}>
                <nav aria-label="Main" className="hidden gap-4 text-sm sm:flex lg:gap-8 lg:text-base">
                  {links.slice(0, 2).map((n) => (
                    <a key={n} href="#" className={cn("rounded-[4px] hover:underline underline-offset-4", ring)}>{n}</a>
                  ))}
                </nav>
              </div>
              {cta}
              <div inert={!open} className={cn("flex min-w-0 items-center overflow-hidden whitespace-nowrap", motion, open ? "pl-3 opacity-100 lg:pl-8" : "pointer-events-none px-0 opacity-0")}>
                <nav aria-label="More" className="hidden gap-4 text-sm sm:flex lg:gap-8 lg:text-base">
                  {links.slice(2).map((n) => (
                    <a key={n} href="#" className={cn("rounded-[4px] hover:underline underline-offset-4", ring)}>{n}</a>
                  ))}
                </nav>
              </div>
              {/* Phones: all links on a second row */}
              <div inert={!open} className={cn("col-span-3 grid sm:hidden", motion, open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <nav aria-label="Main mobile" className="flex flex-wrap justify-center overflow-hidden text-sm">
                  {links.map((n) => (
                    <a key={n} href="#" className={cn("inline-flex min-h-11 items-center rounded-[4px] px-3 hover:underline underline-offset-4", ring)}>{n}</a>
                  ))}
                </nav>
              </div>
            </>
          ) : (
            <>
              <nav aria-label="Main" className="mx-auto hidden gap-10 overflow-hidden whitespace-nowrap md:flex">
                {links.map((n) => (
                  <a key={n} href="#" className={cn("rounded-[4px] hover:underline underline-offset-4", ring)}>{n}</a>
                ))}
              </nav>
              {cta}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* ============ Hero ============ */
const SWAP_MS = 2400;

/** Decorative canvas: the outgoing name breaks apart into drifting dust. */
function DustBurst({ text, run }: { text: string; run: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!run || !c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = c.offsetWidth, h = c.offsetHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.scale(dpr, dpr);
    const font = getComputedStyle(c).font;
    ctx.font = font.includes("px") ? font : "500 14px sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = "#000";
    ctx.fillText(text, w / 2 + 12, h / 2);
    const data = ctx.getImageData(0, 0, w * dpr, h * dpr).data;
    const pts: { x: number; y: number; vx: number; vy: number; d: number }[] = [];
    const step = Math.max(2, Math.round(2 * dpr));
    for (let y = 0; y < h * dpr; y += step) for (let x = 0; x < w * dpr; x += step) {
      if (data[(y * w * dpr + x) * 4 + 3] > 128)
        pts.push({ x: x / dpr, y: y / dpr, vx: 0.2 + Math.random() * 0.8, vy: -0.2 - Math.random() * 0.6, d: Math.random() * 0.35 });
    }
    const t0 = performance.now(), dur = 1100;
    let raf = 0;
    const frame = (now: number) => {
      const p = (now - t0) / dur;
      ctx.clearRect(0, 0, w, h);
      for (const q of pts) {
        const k = Math.max(0, (p - q.d) / (1 - q.d));
        if (k >= 1) continue;
        const e = k * k;
        ctx.globalAlpha = 1 - k;
        ctx.fillRect(q.x + q.vx * e * 40, q.y + q.vy * e * 30, 1.2, 1.2);
      }
      if (p < 1) raf = requestAnimationFrame(frame); else ctx.clearRect(0, 0, w, h);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [run, text]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full text-sm font-medium" />;
}

function LogoRotator() {
  // One slot swaps at a time, left to right: the old name dissolves into dust
  // while the next one resolves from a soft blur.
  const [slots, setSlots] = useState(() => [0, 1, 2, 3, 4, 5].map((i) => ({ cur: i, prev: -1, run: 0 })));
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let step = 0;
    let next = 6;
    const id = setInterval(() => {
      const visible = window.matchMedia("(min-width: 768px)").matches ? 6 : 3;
      const slot = step % visible;
      step += 1;
      setSlots((s) => {
        const shown = new Set(s.slice(0, visible).map((v) => v.cur));
        while (shown.has(next % clients.length)) next += 1;
        const incoming = next % clients.length;
        next += 1;
        return s.map((v, i) => (i === slot ? { cur: incoming, prev: v.cur, run: v.run + 1 } : v));
      });
    }, SWAP_MS);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mt-5 grid grid-cols-3 gap-4 md:grid-cols-6">
      {slots.map(({ cur, prev, run }, slot) => (
        <div key={slot} className={cn("relative h-10 overflow-hidden rounded-control bg-white text-black", slot >= 3 && "hidden md:block")}>
          {clients.map((name, i) => (
            <div key={name} aria-hidden={i !== cur}
              className={cn(
                "absolute inset-0 flex items-center justify-center gap-2 text-sm font-medium text-black ease-konsol transition-[opacity,filter,transform] motion-reduce:transition-opacity",
                i === cur ? "opacity-100 blur-0 scale-100 duration-[1200ms] delay-300" : "opacity-0 blur-sm scale-95",
                i === prev && "duration-200",
              )}>
              <ClientGlyph i={i} />
              <span className="whitespace-nowrap">{name}</span>
            </div>
          ))}
          {prev >= 0 && <DustBurst text={clients[prev]} run={run} />}
        </div>
      ))}
    </div>
  );
}

/**
 * "Theme Change" (dark to light): the hero pins in place and the camera zooms into the
 * top of the real MARKETING "K". One camera moves the entire scene, with a vector
 * headline behind the card; the next section resolves from blur during the zoom.
 */
function Hero({ onLight, next }: { onLight: (light: boolean) => void; next: RefObject<HTMLDivElement | null> }) {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const h1 = useRef<HTMLHeadingElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const k = useRef<HTMLSpanElement>(null);
  const spacer = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const g = useRef<SVGGElement>(null);
  const txt = useRef<SVGTextElement>(null);
  const cb = useRef(onLight);
  cb.current = onLight;
  useEffect(() => {
    const section = sec.current, st = stage.current, sc = scene.current;
    const el = h1.current, w = word.current, kEl = k.current, sp = spacer.current;
    const sv = svg.current, gr = g.current, tx = txt.current;
    if (!section || !st || !sc || !el || !w || !kEl || !sp || !sv || !gr || !tx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let Z = 0, H = 0, O = { x: 0, y: 0 }, maxScale = 1, raf = 0, disposed = false;
    const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
    const ease = (v: number) => v * v * (3 - 2 * v);
    const measure = () => {
      st.style.transform = "";
      sc.style.transform = "";
      const vw = window.innerWidth, vh = window.innerHeight;
      Z = reduce.matches ? 0 : vh * 1.6;
      sp.style.height = `${Z}px`;
      H = st.offsetHeight;
      const n = next.current;
      if (n) n.style.marginTop = reduce.matches ? "" : `${-H}px`;
      // Land the next section's content below the sticky menu (bars measured live).
      const hd = document.querySelector("header");
      if (n) n.style.setProperty("--intro-offset", `${(hd ? hd.getBoundingClientRect().bottom : 130) + 48}px`);
      // Vector copy of the headline, aligned to the live text (scroll-independent coords).
      const cs = getComputedStyle(el), fs = parseFloat(cs.fontSize);
      const wr = w.getBoundingClientRect(), kr = kEl.getBoundingClientRect();
      const sr = st.getBoundingClientRect();
      const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
      let asc = fs * 0.9, px = kr.left + kr.width * 0.2, py = kr.top + kr.height * 0.35, rad = kr.width * 0.08;
      if (ctx) {
        ctx.font = `${cs.fontWeight} 100px ${cs.fontFamily}`;
        asc = (ctx.measureText("K").fontBoundingBoxAscent || 90) * fs / 100;
        const ink = interior(ctx, "K", `${cs.fontWeight} 300px ${cs.fontFamily}`, true);
        if (ink) { const u = fs / 100; px = kr.left + ink.x * u; py = kr.top + asc + ink.y * u; rad = ink.radius * u; }
      }
      // Every layer uses stage-local coordinates and exactly the same camera.
      tx.setAttribute("x", String(wr.left - sr.left));
      tx.setAttribute("y", String(wr.top - sr.top + asc));
      tx.style.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
      tx.style.letterSpacing = cs.letterSpacing;
      O = { x: px - sr.left, y: py - sr.top };
      maxScale = Math.max(1, Math.hypot(vw, vh) / Math.max(1, rad));
    };
    const frame = () => {
      raf = 0;
      const y = window.scrollY; // pin from the very first scroll
      const n = next.current;
      if (reduce.matches) {
        sv.style.display = "none"; el.style.visibility = "";
        st.style.transform = ""; sc.style.transform = ""; st.style.visibility = ""; st.style.opacity = "";
        cb.current(y > H * 0.5);
        if (n) { n.style.transform = ""; n.style.filter = ""; n.style.opacity = ""; n.style.pointerEvents = ""; }
        return;
      }
      const hold = Math.min(Math.max(y, 0), Z);
      st.style.transform = `translate3d(0, ${hold}px, 0)`;
      st.style.visibility = hold >= Z ? "hidden" : "";
      const p = Z ? hold / Z : 1;
      const e = ease(p);
      const vw = window.innerWidth, vh = window.innerHeight;
      const sr = st.getBoundingClientRect();
      const s = Math.pow(maxScale, e);
      const ox = O.x, oy = O.y;
      const cx = ox + (vw / 2 - sr.left - ox) * e, cy = oy + (vh / 2 - sr.top - oy) * e;
      const zooming = p > 0 && p < 1;
      sv.style.display = zooming ? "" : "none";
      el.style.visibility = zooming ? "hidden" : "";
      const dx = cx - s * ox, dy = cy - s * oy;
      sc.style.transform = `matrix(${s}, 0, 0, ${s}, ${dx}, ${dy})`;
      gr.setAttribute("transform", `matrix(${s} 0 0 ${s} ${dx} ${dy})`);
      st.style.opacity = String(1 - ease(clamp((p - 0.88) / 0.12)));
      if (n) {
        const r = clamp((p - 0.55) / 0.45), er = ease(r);
        n.style.transform = p < 1 ? `translate3d(0, ${-(Z - hold)}px, 0) scale(${1.06 - 0.06 * er})` : "";
        n.style.filter = p < 1 ? `blur(${24 * (1 - er)}px)` : "";
        n.style.opacity = p < 1 ? String(er) : "";
        n.style.pointerEvents = p < 1 ? "none" : "";
      }
      cb.current(p >= 0.6);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const onResize = () => { if (!disposed) { measure(); frame(); } };
    measure(); frame();
    document.fonts.ready.then(onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", onResize);
    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", onResize);
      cancelAnimationFrame(raf);
    };
  }, [next]);
  return (
    <section ref={sec} className={wrap}>
      <div ref={stage} className="relative isolate flow-root">
        <svg ref={svg} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" style={{ display: "none", textRendering: "geometricPrecision" }}>
          <g ref={g}><text ref={txt} fill="var(--brand-parchment)">MARKETING</text></g>
        </svg>
        <div ref={scene} className="relative z-10 origin-top-left flow-root">
        <h1 ref={h1} className={cn(t.display, "relative z-0 mt-[28px] px-6 text-center leading-[0.78]")}><span ref={word}>MAR<span ref={k}>K</span>ETING</span></h1>
        <div className="relative z-10 mx-3 mt-4 min-h-[512px] rounded-section bg-section-green p-8 text-section-green-foreground md:p-10">
<img src={img.gtmFigure} alt="Person in a suit wearing a GTM mask" className="pointer-events-none absolute bottom-0 right-0 z-10 h-[55%] w-auto max-w-none opacity-90 md:left-1/2 md:right-auto md:h-[115%] md:-translate-x-1/2 md:opacity-100" />
        <div className="relative z-20 max-w-md">
          <Reveal>
            <p className={cn(t.h2, "text-evergreen")}>Scale your ideas.</p>
            <p className={cn(t.h2, "text-evergreen")}>Automate with AI.</p>
            <p className="mt-5 text-section-green-muted">Custom agents, built and shipped in weeks.</p>
            <a href="#" className={cn("cta-slide mt-6 rounded-control bg-indigo text-white border border-indigo hover:text-black focus-visible:text-black transition-colors duration-move hover:bg-yellow-green focus-visible:bg-yellow-green [--cta-box:2.75rem] [--cta-gap:1rem]", ring)}>
              <ArrowBox className="h-9" /><span data-cta-label className="leading-9">Explore The Magic{"\n"}</span>
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
      </div>
      </div>
      <div ref={spacer} aria-hidden="true" />
    </section>
  );
}

/* ============ Intro ============ */
function Intro() {
  return (
    <section className={cn(wrap, "px-6 pb-20 pt-[var(--intro-offset,3rem)]")}>
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
        <div className="flex flex-col"><AgentStack /></div>
        <div className="flex flex-col gap-10">
          <Reveal><h2 className={t.h2}>We build custom AI agents focused on clarity, automation, measurable growth and outcomes.</h2></Reveal>
          <div className="grid flex-1 gap-6">
            <div className="flex flex-col gap-4">
              <div className="relative flex flex-1 items-stretch rounded-frame bg-btn-indigo-hover/40 p-4">
                <div className="flex w-full flex-col justify-between rounded-frame border border-border bg-background p-6 text-foreground">
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
          <h2 data-case-title className={cn(t.h1, "mt-4")}><span data-case-word><span data-case-c>C</span>ase studies</span></h2>
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

/* ============ Theme Change: light to dark (reverse portal on the "C") ============ */
/**
 * Reverse of the hero portal: while the stage rises, it is shown fully zoomed into the
 * ink of the "C" (dark), covering the outgoing light content, which blurs away.
 * Pinned, the camera then pulls back out of the "C" until the scene rests at 1x.
 */
function CasePortal({ onDark, children }: { onDark: (dark: boolean) => void; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const g = useRef<SVGGElement>(null);
  const txt = useRef<SVGTextElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const cb = useRef(onDark);
  cb.current = onDark;
  useEffect(() => {
    const o = outer.current, st = stage.current, sc = scene.current, sv = svg.current, gr = g.current, tx = txt.current, fl = fill.current;
    if (!o || !st || !sc || !sv || !gr || !tx || !fl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let Z = 0, O = { x: 0, y: 0 }, maxScale = 1, raf = 0, disposed = false;
    let el: HTMLElement | null = null;
    const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
    const ease = (v: number) => v * v * (3 - 2 * v);
    const prev = () => o.previousElementSibling as HTMLElement | null;
    const measure = () => {
      sc.style.transform = "";
      el = sc.querySelector<HTMLElement>("[data-case-title]");
      const w = sc.querySelector<HTMLElement>("[data-case-word]"), c = sc.querySelector<HTMLElement>("[data-case-c]");
      const vw = window.innerWidth, vh = window.innerHeight;
      Z = reduce.matches ? 0 : vh * 1.6;
      o.style.height = `${st.offsetHeight + Z}px`;
      if (!el || !w || !c) return;
      const cs = getComputedStyle(el), fs = parseFloat(cs.fontSize);
      const sr = st.getBoundingClientRect(), wr = w.getBoundingClientRect(), kr = c.getBoundingClientRect();
      const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
      let asc = fs * 0.9, px = kr.left + kr.width * 0.12, py = kr.top + kr.height * 0.5, rad = kr.width * 0.06;
      if (ctx) {
        ctx.font = `${cs.fontWeight} 100px ${cs.fontFamily}`;
        asc = (ctx.measureText("C").fontBoundingBoxAscent || 90) * fs / 100;
        const ink = interior(ctx, "C", `${cs.fontWeight} 300px ${cs.fontFamily}`);
        if (ink) { const u = fs / 100; px = kr.left + ink.x * u; py = kr.top + asc + ink.y * u; rad = ink.radius * u; }
      }
      tx.setAttribute("x", String(wr.left - sr.left));
      tx.setAttribute("y", String(wr.top - sr.top + asc));
      tx.style.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
      tx.style.letterSpacing = cs.letterSpacing;
      O = { x: px - sr.left, y: py - sr.top };
      maxScale = Math.max(1, Math.hypot(vw, vh) / Math.max(1, rad));
    };
    const frame = () => {
      raf = 0;
      const vw = window.innerWidth, vh = window.innerHeight;
      const or = o.getBoundingClientRect();
      const pv = prev();
      if (reduce.matches) {
        sv.style.display = "none"; fl.style.opacity = "0"; sc.style.transform = ""; sc.style.filter = "";
        if (el) el.style.visibility = "";
        if (pv) { pv.style.filter = ""; pv.style.opacity = ""; }
        cb.current(or.top < vh * 0.5);
        return;
      }
      const hold = Math.min(Math.max(-or.top, 0), Z);
      const p = Z ? hold / Z : 1;
      const a = clamp(1 - or.top / vh); // approach: stage rising from the bottom edge
      const e = ease(p), z = 1 - e;
      st.style.transform = `translate3d(0, ${hold}px, 0)`;
      const sr = st.getBoundingClientRect();
      const s = Math.pow(maxScale, z);
      const cx = O.x + (vw / 2 - sr.left - O.x) * z, cy = O.y + (vh / 2 - sr.top - O.y) * z;
      const dx = cx - s * O.x, dy = cy - s * O.y;
      const zooming = p < 1;
      const covered = p < 0.02; // fully under the dark fill: nothing else needs painting
      sv.style.display = zooming && !covered ? "" : "none";
      if (el) el.style.visibility = zooming ? "hidden" : "";
      // Huge DOM scales are costly to paint; under the fill the scene is simply hidden.
      const big = s > 40;
      sc.style.transform = zooming && !big ? `matrix(${s}, 0, 0, ${s}, ${dx}, ${dy})` : "";
      gr.setAttribute("transform", `matrix(${s} 0 0 ${s} ${dx} ${dy})`);
      // Blur only near rest; at huge scales the scene is hidden under the fill (cheap to paint).
      sc.style.filter = zooming && s < 3 ? `blur(${6 * (s - 1) / 2}px)` : "";
      sc.style.visibility = big ? "hidden" : "";
      fl.style.opacity = String(1 - ease(clamp(p / 0.25)));
      tx.style.opacity = String(1 - ease(clamp((p - 0.8) / 0.2)));
      if (pv) {
        const b = ease(a);
        pv.style.filter = a > 0 && a < 1 ? `blur(${24 * b}px)` : a >= 1 ? "blur(24px)" : "";
        pv.style.opacity = a > 0 ? String(1 - b) : "";
      }
      cb.current(a >= 0.6);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const onResize = () => { if (!disposed) { measure(); frame(); } };
    measure(); frame();
    document.fonts.ready.then(onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", onResize);
    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", onResize);
      cancelAnimationFrame(raf);
      const pv = prev(); if (pv) { pv.style.filter = ""; pv.style.opacity = ""; }
    };
  }, []);
  return (
    <div ref={outer} className="relative">
      <div ref={stage} className="relative isolate overflow-hidden pt-px">
        <div ref={scene} className="relative z-10 origin-top-left">{children}</div>
        <svg ref={svg} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible" style={{ display: "none", textRendering: "geometricPrecision" }}>
          <g ref={g}><text ref={txt} fill="var(--brand-black)">Case studies</text></g>
        </svg>
        <div ref={fill} aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 bg-[var(--brand-black)]" />
      </div>
    </div>
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
                    "cta-slide mt-6 rounded-control border border-transparent font-medium transition-colors duration-hover [--cta-box:2.75rem] [--cta-gap:1rem]",
                    pl.hi ? "bg-background text-foreground hover:bg-background-alt" : "bg-btn-indigo text-btn-indigo-foreground hover:bg-btn-indigo-hover",
                    ring,
                  )}>
                    <span data-cta-box className={cn("grid h-9 place-items-center rounded-control", pl.hi ? "bg-btn-indigo text-btn-indigo-foreground" : "bg-btn-indigo-foreground/15")}>
                      <IconChevronRight />
                    </span>
                    <span data-cta-label className="leading-9">Get started</span>
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
  // Single dark version of the website; the light version is archived.
  // The page starts dark; the portal "Theme Change" after the hero turns it light.
  const [light, setLight] = useState(false);
  const [caseDark, setCaseDark] = useState(false);
  const next = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", !light || caseDark);
    return () => root.classList.remove("dark");
  }, [light, caseDark]);
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground transition-colors duration-move ease-konsol motion-reduce:transition-none">
      <ThemeBar />
      <main>
        <Header />
        <Hero onLight={setLight} next={next} />
        <div ref={next} className="relative z-[41] bg-background origin-top">
          <Intro />
          <BluePanel />
        <Services />
        <About />
        <CasePortal onDark={setCaseDark}><CaseStudies /></CasePortal>
        <Testimonials />
        <Faq />
        <Pricing />
          <Footer />
        </div>
      </main>
    </div>
  );
}
