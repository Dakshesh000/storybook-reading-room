import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/index";
import { cn } from "@/lib/utils";
import { ArrowBox } from "./parts";
import atlasImg from "@/assets/photography/agents/atlas.jpg";
import novaImg from "@/assets/photography/agents/nova.jpg";
import sageImg from "@/assets/photography/agents/sage.jpg";
import echoImg from "@/assets/photography/agents/echo.jpg";

/* Placeholder agents — replace with the real roster. */
type Agent = { name: string; role: string; tagline: string; stat: string; statLabel: string; img: string };
const agents: Agent[] = [
  { name: "Atlas", role: "Sales agent", tagline: "Qualifies leads and books meetings while your team sleeps.", stat: "3.4×", statLabel: "More meetings", img: atlasImg },
  { name: "Nova", role: "Support agent", tagline: "Answers tickets in seconds and escalates only what matters.", stat: "82%", statLabel: "Tickets resolved", img: novaImg },
  { name: "Sage", role: "Ops agent", tagline: "Keeps your CRM clean and your workflows running on time.", stat: "12h", statLabel: "Saved per week", img: sageImg },
  { name: "Echo", role: "Marketing agent", tagline: "Turns one idea into a week of on-brand content.", stat: "5×", statLabel: "Content output", img: echoImg },
];

const INTERVAL = 7000;

export function AgentStack() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % agents.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused, active]);

  return (
    <div className="flex flex-col gap-6" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="relative aspect-[4/5] w-full" aria-live="polite">
        {agents.map((a, i) => {
          const depth = (i - active + agents.length) % agents.length;
          const front = depth === 0;
          return (
            <article key={a.name} aria-hidden={!front} inert={!front}
              className="group absolute inset-0 flex flex-col overflow-hidden rounded-frame bg-evergreen text-white shadow-lg transition-[transform,opacity] duration-move ease-konsol motion-reduce:transition-none"
              style={{
                zIndex: agents.length - depth,
                transform: `translateY(${-depth * 14}px) scale(${1 - depth * 0.05}) rotate(${front ? 0 : (depth % 2 ? -1 : 1) * depth * 1.5}deg)`,
                opacity: depth > 2 ? 0 : 1,
              }}>
              <img src={a.img} alt="" width={768} height={960} loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-700 ease-konsol group-hover:grayscale-0 group-focus-within:grayscale-0" />
              {front && (
                <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-[agent-glare_3s_ease-in-out_infinite] motion-reduce:hidden" />
              )}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

              <h3 className="relative p-6 font-heading text-2xl font-semibold">{a.name}</h3>
              <div className="relative mt-auto p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-white/70">{a.role}</p>
                <p className="mt-2 text-lg font-medium leading-snug">{a.tagline}</p>
                <div className="mt-4 border-t border-dashed border-white/30 pt-4">
                  <p className="font-display text-4xl font-bold">{a.stat}</p>
                  <p className="font-mono text-xs uppercase tracking-wider text-white/70">{a.statLabel}</p>
                </div>
                <a href="#" className="cta-slide mt-5 inline-flex whitespace-nowrap rounded-control border border-transparent bg-yellow-green text-evergreen outline-none focus-visible:ring-2 focus-visible:ring-ring [--cta-box:2.75rem] [--cta-gap:1rem]">
                  <ArrowBox className="h-9" /><span data-cta-label className="leading-9">Meet {a.name}</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-3">
        <AvatarGroup role="tablist" aria-label="Our agents" overlap="md">
          {agents.map((a, i) => (
            <button key={a.name} type="button" role="tab" aria-selected={i === active} aria-label={`${a.name}, ${a.role}`}
              onClick={() => setActive(i)}
              className={cn("relative rounded-full outline-none transition-transform duration-move ease-konsol focus-visible:ring-2 focus-visible:ring-ring",
                i === active ? "z-10 -translate-y-1 scale-110" : "opacity-70 hover:opacity-100")}>
              <Avatar size="lg" ring={i === active ? "accent" : "none"} className={cn(i !== active && "ring-2 ring-section-blue")}>
                <AvatarImage src={a.img} alt="" />
                <AvatarFallback>{a.name[0]}</AvatarFallback>
              </Avatar>
            </button>
          ))}
        </AvatarGroup>
        <p className="font-heading text-sm font-semibold">{agents[active].name} <span className="font-sans font-normal text-section-blue-muted">· {agents[active].role}</span></p>
        <span className="relative h-0.5 w-32 overflow-hidden rounded-full bg-white/25">
          {!paused && <span key={active} aria-hidden className="absolute inset-0 origin-left animate-[agent-progress_7s_linear] bg-yellow-green" />}
        </span>
      </div>
    </div>
  );
}
