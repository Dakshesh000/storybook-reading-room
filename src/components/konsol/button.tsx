import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 rounded-control font-medium whitespace-nowrap transition-colors duration-hover ease-konsol outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:bg-btn-disabled disabled:text-btn-disabled-foreground disabled:border-transparent",
  {
    variants: {
      variant: {
        green:
          "bg-btn-green text-btn-green-foreground hover:bg-btn-green-hover active:bg-btn-green-pressed",
        indigo:
          "bg-btn-indigo text-btn-indigo-foreground hover:bg-btn-indigo-hover active:bg-btn-indigo-pressed",
        outline:
          "border border-current bg-transparent text-current hover:bg-foreground/5 active:bg-foreground/10",
        ghost: "bg-transparent text-current hover:bg-foreground/5 active:bg-foreground/10",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-base",
        lg: "h-14 px-7 text-lg",
      },
    },
    defaultVariants: { variant: "indigo", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show the brand arrow on the right. Defaults to true. */
  arrow?: boolean;
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn("size-4", className)}>
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, arrow = true, children, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
      {arrow && (
        <span className="inline-flex overflow-hidden">
          <ArrowIcon className="group-hover/btn:animate-arrow" />
        </span>
      )}
    </button>
  ),
);
Button.displayName = "Button";
