import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------- Icons (inline, currentColor) ---------- */
type IconProps = { className?: string };
const base = "size-4 shrink-0";
export const IconArrowRight = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn(base, className)}>
    <path d="M2.5 8h10.5M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconArrowLeft = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn(base, className)}>
    <path d="M13.5 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconArrowUpRight = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn(base, className)}>
    <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconChevron = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn(base, className)}>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconChevronRight = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn(base, className)}>
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconMenu = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cn("size-5", className)}>
    <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const IconClose = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cn("size-5", className)}>
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const IconPlay = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={cn(base, className)}>
    <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" />
  </svg>
);
export const IconStar = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-6", className)}>
    <path d="M12 2.5l2.9 6.2 6.6.7-5 4.5 1.4 6.6L12 17.2l-5.9 3.3 1.4-6.6-5-4.5 6.6-.7z" fill="currentColor" />
  </svg>
);
export const IconChart = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn("size-3.5", className)}>
    <path d="M3 13V8M6.5 13V4M10 13V7M13.5 13V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
export const IconDots = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={cn("size-3", className)}>
    <circle cx="4" cy="8" r="1.2" fill="currentColor" /><circle cx="8" cy="8" r="1.2" fill="currentColor" /><circle cx="12" cy="8" r="1.2" fill="currentColor" />
  </svg>
);
export const IconX = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={cn(base, className)}>
    <path d="M2.5 2.5h3l8 11h-3zM13 2.5L9 7M3 13.5L7 9" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
  </svg>
);
export const IconLinkedIn = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn(base, className)}>
    <path d="M3.5 6.5v6M3.5 3.5v.01M7 12.5v-6M7 9a2.5 2.5 0 015 0v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const IconYouTube = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn(base, className)}>
    <rect x="1.75" y="3.5" width="12.5" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6.75 6v4l3.5-2z" fill="currentColor" />
  </svg>
);

/* Client logo glyphs: simple distinct marks, one per name */
export function ClientGlyph({ i }: { i: number }) {
  const p = [
    <path key="0" d="M8 2l5 3v6l-5 3-5-3V5z" />,
    <><circle key="a" cx="8" cy="5" r="2.5" /><circle key="b" cx="8" cy="11" r="2.5" /></>,
    <><circle key="a" cx="8" cy="8" r="2.5" /><path key="b" d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" /></>,
    <path key="0" d="M4 12L12 4M6 4h6v6" />,
    <path key="0" d="M8 2l6 3-6 3-6-3zM2 8l6 3 6-3M2 11l6 3 6-3" />,
    <path key="0" d="M2 5h8a2 2 0 100-4M2 9h11a2 2 0 110 4M2 7h6" />,
    <path key="0" d="M3 3h4v4H3zM9 9h4v4H9zM7 5h4v4" />,
    <path key="0" d="M2 11c3-6 9-6 12 0M5 11a3 3 0 016 0" />,
    <path key="0" d="M2 8h12M8 2v12" />,
    <circle key="0" cx="8" cy="8" r="5.5" />,
  ][i % 10];
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
      {p}
    </svg>
  );
}

/* ---------- Black-and-white photo that warms to colour on hover ---------- */
export function BwImg({ className, alt, src }: { className?: string; alt: string; src: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn("grayscale contrast-[1.08] transition-[filter] duration-[900ms] ease-konsol hover:grayscale-0", className)}
    />
  );
}

/* ---------- Fade + rise on scroll ---------- */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-reveal ease-konsol motion-reduce:transform-none",
        on ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------- Characters ink in from muted to full colour ---------- */
/** Text inks in character by character. `fill` is the colour the inked characters take (defaults to the text colour). */
export function InkReveal({ text, delay = 400, step = 28, fill = "text-current" }: { text: string; delay?: number; step?: number; fill?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const chars = Array.from(text);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let wait: ReturnType<typeof setTimeout> | undefined;
    let tick: ReturnType<typeof setInterval> | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      wait = setTimeout(() => {
        if (reduce) return setN(chars.length);
        tick = setInterval(() => setN((c) => (c >= chars.length ? c : c + 1)), step);
      }, delay);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(wait);
      clearInterval(tick);
    };
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <span ref={ref} aria-label={text}>
      {chars.map((c, i) => (
        <span key={i} aria-hidden="true" className={cn("transition-colors duration-hover", i < n ? fill : "text-border")}>
          {c}
        </span>
      ))}
    </span>
  );
}

/* ---------- Section label with accent rule ---------- */
export function Eyebrow({ label, accent = "indigo" }: { label: string; accent?: "indigo" | "green" | "blue" }) {
  const bar = { indigo: "bg-indigo", green: "bg-yellow-green", blue: "bg-smart-blue" }[accent];
  return (
    <header>
      <div className="relative h-px bg-border">
        <span className={cn("absolute left-0 top-0 h-[3px] w-36 -translate-y-px", bar)} />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-label text-muted-foreground">/{label}</p>
    </header>
  );
}

/* ---------- CTA with arrow box (reference "cta") ---------- */
export function ArrowBox({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <span data-cta-box className={cn("grid place-items-center rounded-control bg-background text-foreground", className)}>
      {children ?? <IconArrowRight />}
    </span>
  );
}
