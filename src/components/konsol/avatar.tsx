import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

export const avatarVariants = cva("relative flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: { sm: "size-8", md: "size-10", lg: "size-14" },
    ring: {
      none: "",
      background: "ring-2 ring-background",
      accent: "ring-2 ring-yellow-green",
    },
  },
  defaultVariants: { size: "md", ring: "none" },
});

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

/** Round avatar with image + fallback. */
export const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, ring, ...props }, ref) => (
    <AvatarPrimitive.Root ref={ref} className={cn(avatarVariants({ size, ring }), className)} {...props} />
  ),
);
Avatar.displayName = "Avatar";

export interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {}

export const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full object-cover", className)} {...props} />
  ),
);
AvatarImage.displayName = "AvatarImage";

export interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {}

export const AvatarFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback ref={ref}
      className={cn("flex h-full w-full items-center justify-center rounded-[inherit] bg-parchment font-heading text-xs font-semibold text-evergreen", className)}
      {...props} />
  ),
);
AvatarFallback.displayName = "AvatarFallback";

export const avatarGroupVariants = cva("flex items-center", {
  variants: { overlap: { sm: "-space-x-2", md: "-space-x-3", lg: "-space-x-4" } },
  defaultVariants: { overlap: "md" },
});

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarGroupVariants> {}

/** Overlapping row of avatars. */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, overlap, ...props }, ref) => (
    <div ref={ref} className={cn(avatarGroupVariants({ overlap }), className)} {...props} />
  ),
);
AvatarGroup.displayName = "AvatarGroup";
