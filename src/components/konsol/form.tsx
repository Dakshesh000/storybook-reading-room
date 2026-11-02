import * as React from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-control border border-input bg-card text-foreground px-3 text-base placeholder:text-muted-foreground transition-colors duration-hover outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring disabled:bg-btn-disabled disabled:text-btn-disabled-foreground disabled:cursor-not-allowed aria-[invalid=true]:border-error-border";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(fieldBase, "h-11", className)} {...props} />
));
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldBase, "min-h-28 py-2", className)} {...props} />
));
Textarea.displayName = "Textarea";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium text-foreground", className)} {...props} />
));
Label.displayName = "Label";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
}

/** Label + control + helper/error text, wired with aria-describedby. Pass the control as children. */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, label, htmlFor, hint, error, children, ...props }, ref) => {
    const msgId = `${htmlFor}-msg`;
    const child = React.isValidElement<Record<string, unknown>>(children)
      ? React.cloneElement(children, {
          id: htmlFor,
          "aria-describedby": hint || error ? msgId : undefined,
          "aria-invalid": error ? true : undefined,
        })
      : children;
    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
        <Label htmlFor={htmlFor}>{label}</Label>
        {child}
        {(error || hint) && (
          <p id={msgId} className={cn("text-sm", error ? "text-error-fg" : "text-muted-foreground")}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);
Field.displayName = "Field";
