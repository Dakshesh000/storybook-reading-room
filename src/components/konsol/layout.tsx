import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Centred 1280px content column with 24px side padding. */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mx-auto w-full max-w-content px-6", className)} {...props} />
));
Container.displayName = "Container";

export const sectionVariants = cva("rounded-section px-6 py-16 md:px-12 md:py-20", {
  variants: {
    tone: {
      plain: "bg-background text-foreground [--section-muted:var(--muted-foreground)]",
      alt: "bg-background-alt text-foreground [--section-muted:var(--muted-foreground)]",
      green: "bg-section-green text-section-green-foreground [--section-muted:var(--section-green-muted)]",
      blue: "bg-section-blue text-section-blue-foreground [--section-muted:var(--section-blue-muted)]",
      indigo: "bg-section-indigo text-section-indigo-foreground [--section-muted:var(--section-indigo-muted)]",
      evergreen:
        "bg-section-evergreen text-section-evergreen-foreground [--section-muted:var(--section-evergreen-muted)]",
    },
  },
  defaultVariants: { tone: "green" },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

/** Full colour section card. Text colour follows the section; use `SectionMuted` for supporting copy. */
export const Section = React.forwardRef<HTMLElement, SectionProps>(({ className, tone, ...props }, ref) => (
  <section ref={ref} className={cn(sectionVariants({ tone }), className)} {...props} />
));
Section.displayName = "Section";

export interface SectionMutedProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/** Supporting text that uses the muted colour of the surrounding Section. */
export const SectionMuted = React.forwardRef<HTMLParagraphElement, SectionMutedProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-[var(--section-muted)]", className)} {...props} />
  ),
);
SectionMuted.displayName = "SectionMuted";
