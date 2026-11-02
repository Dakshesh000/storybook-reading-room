import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface MonoLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** Small uppercase Roboto Mono label (12px, 0.06em tracking). */
export const MonoLabel = React.forwardRef<HTMLSpanElement, MonoLabelProps>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("font-mono text-xs uppercase tracking-label", className)} {...props} />
));
MonoLabel.displayName = "MonoLabel";

export interface HighlightProps extends React.HTMLAttributes<HTMLElement> {}

/** Marker behind a key word or stat. */
export const Highlight = React.forwardRef<HTMLElement, HighlightProps>(({ className, ...props }, ref) => (
  <mark
    ref={ref}
    className={cn("bg-highlight text-inherit px-1 rounded-[2px] box-decoration-clone", className)}
    {...props}
  />
));
Highlight.displayName = "Highlight";

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

/** Inline link for body copy. */
export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-link underline underline-offset-4 decoration-1 hover:decoration-2 transition-all duration-hover rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className,
    )}
    {...props}
  />
));
TextLink.displayName = "TextLink";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-label",
  {
    variants: {
      variant: {
        neutral: "border-border bg-background-alt text-foreground",
        green: "border-transparent bg-section-green text-section-green-foreground",
        indigo: "border-transparent bg-section-indigo text-section-indigo-foreground",
        outline: "border-current bg-transparent text-current",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
));
Badge.displayName = "Badge";
