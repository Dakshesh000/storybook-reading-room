import * as React from "react";
import { cn } from "@/lib/utils";

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Stack of AccordionItems (native details/summary, keyboard accessible). */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col divide-y divide-current/20 border-y border-current/20", className)} {...props} />
));
Accordion.displayName = "Accordion";

export interface AccordionItemProps extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, "title"> {
  title: React.ReactNode;
}

export const AccordionItem = React.forwardRef<HTMLDetailsElement, AccordionItemProps>(
  ({ className, title, children, ...props }, ref) => (
    <details ref={ref} className={cn("group/acc py-1", className)} {...props}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-control py-4 text-lg font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        {title}
        <span
          aria-hidden="true"
          className="text-2xl leading-none transition-transform duration-hover ease-konsol group-open/acc:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-5 pr-10 text-[var(--section-muted,var(--foreground-secondary))] animate-reveal">{children}</div>
    </details>
  ),
);
AccordionItem.displayName = "AccordionItem";
