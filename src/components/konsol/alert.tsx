import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const alertVariants = cva("rounded-card border-l-4 border px-4 py-3 flex flex-col gap-1", {
  variants: {
    status: {
      success: "bg-success-bg text-success-fg border-success-border",
      warning: "bg-warning-bg text-warning-fg border-warning-border",
      error: "bg-error-bg text-error-fg border-error-border",
      info: "bg-info-bg text-info-fg border-info-border",
    },
  },
  defaultVariants: { status: "info" },
});

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
}

/** Status message. Errors are announced immediately; others politely. */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, status, title, children, ...props }, ref) => (
    <div
      ref={ref}
      role={status === "error" ? "alert" : "status"}
      className={cn(alertVariants({ status }), className)}
      {...props}
    >
      {title && <p className="font-semibold">{title}</p>}
      {children && <div className="text-sm">{children}</div>}
    </div>
  ),
);
Alert.displayName = "Alert";
