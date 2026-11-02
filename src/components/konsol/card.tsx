import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const cardVariants = cva(
  "rounded-card border border-border bg-card text-foreground p-6 flex flex-col gap-3 transition-colors duration-move ease-konsol",
  {
    variants: {
      fill: {
        none: "",
        green: "hover:bg-section-green hover:text-section-green-foreground hover:border-transparent",
        blue: "hover:bg-section-blue hover:text-section-blue-foreground hover:border-transparent",
        indigo: "hover:bg-section-indigo hover:text-section-indigo-foreground hover:border-transparent",
      },
    },
    defaultVariants: { fill: "none" },
  },
);

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

/** Flat white card with a 1px border. `fill` makes it flood with a brand colour on hover. */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, fill, ...props }, ref) => (
  <div ref={ref} className={cn("group/card", cardVariants({ fill }), className)} {...props} />
));
Card.displayName = "Card";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("font-heading text-xl font-semibold tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-foreground-secondary group-hover/card:text-current", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";
