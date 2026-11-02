import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* Placeholder agents — replace with the real roster. */
type Agent = { name: string; role: string; tagline: string; skills: string[]; stat: string; statLabel: string; tone: string; ink: string };
const agents: Agent[] = [
  { name: "Atlas", role: "Sales agent", tagline: "Qualifies leads and books meetings while your team sleeps.", skills: ["Lead scoring", "Outreach", "Calendar booking"], stat: "3.4×", statLabel: "More meetings", tone: "bg-yellow-green", ink: "text-evergreen" },
  { name: "Nova", role: "Support agent", tagline: "Answers tickets in seconds and escalates only what matters.", skills: ["Ticket triage", "Knowledge base", "Escalation"], stat: "82%", statLabel: "Tickets resolved", tone: "bg-indigo", ink: "text-white" },
  { name: "Sage", role: "Ops agent", tagline: "Keeps your CRM clean and your workflows running on time.", skills: ["Data cleanup", "Reporting", "Workflow sync"], stat: "12h", statLabel: "Saved per week", tone: "bg-parchment", ink: "text-evergreen" },
  { name: "Echo", role: "Marketing agent", tagline: "Turns one idea into a week of on-brand content.", skills: ["Copywriting", "Scheduling", "Analytics"], stat: "5×", statLabel: "Content output", tone: "bg-evergreen", ink: "text-parchment" },
];

const INTERVAL = 4000;

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
      {/* Card stack */}
      <div className="relative aspect-[4/5] w-full" aria-live="polite">
        {agents.map((a, i) => {
          const depth = (i - active + agents.length) % agents.length; // 0 = front
          return (
            <article key={a.name} aria-hidden={depth !== 0}
              className={cn(
                "absolute inset-0 flex flex-col rounded-frame p-6 shadow-lg transition-[transform,opacity] duration-move ease-konsol motion-reduce:transition-none",
                a.tone, a.ink,
              )}
              style={{
                zIndex: agents.length - depth,
                transform: `translateY(${-depth * 14}px) scale(${1 - depth * 0.05}) rotate(${depth === 0 ? 0 : (depth % 2 ? -1 : 1) * depth * 1.5}deg)`,
                opacity: depth > 2 ? 0 : 1,
              }}>
              <div className="flex items-center gap-3">
                <AgentAvatar agent={a} className="size-12 ring-2 ring-current/20" />
                <div>
                  <h3 className="font-heading text-xl font-semibold">{a.name}</h3>
                  <p className="font-mono text-xs uppercase tracking-wider opacity-70">{a.role}</p>
                </div>
              </div>
              <p className="mt-6 text-lg font-medium leading-snug">{a.tagline}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {a.skills.map((s) => (
                  <li key={s} className="rounded-full border border-current/30 px-3 py-1 text-xs">{s}</li>
                ))}
              </ul>
              <div className="mt-auto border-t border-dashed border-current/30 pt-4">
                <p className="font-display text-4xl font-bold">{a.stat}</p>
                <p className="font-mono text-xs uppercase tracking-wider opacity-70">{a.statLabel}</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Avatar bar */}
      <div role="tablist" aria-label="Our agents" className="flex items-center justify-between gap-2 rounded-frame bg-background/15 p-2">
        {agents.map((a, i) => (
          <button key={a.name} type="button" role="tab" aria-selected={i === active} aria-label={`${a.name}, ${a.role}`}
            onClick={() => setActive(i)}
            className={cn(
              "relative flex flex-1 flex-col items-center gap-1 overflow-hidden rounded-control px-1 py-2 text-xs transition-colors duration-hover outline-none focus-visible:ring-2 focus-visible:ring-ring",
              i === active ? "bg-background text-foreground" : "hover:bg-background/20",
            )}>
            <AgentAvatar agent={a} className={cn("size-10 transition-transform duration-move", i === active && "scale-110")} />
            <span className="font-medium">{a.name}</span>
            {i === active && !paused && (
              <span key={active} aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[agent-progress_4s_linear] bg-indigo" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function AgentAvatar({ agent, className }: { agent: Agent; className?: string }) {
  return (
    <span aria-hidden className={cn("grid shrink-0 place-items-center rounded-full font-heading font-semibold", agent.tone, agent.ink, className)}>
      {agent.name[0]}
    </span>
  );
}
