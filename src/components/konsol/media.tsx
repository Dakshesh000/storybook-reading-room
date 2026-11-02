import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import blackTransparent from "@/assets/logos/The_Konsol_Logo_Black_Transparent.webp";
import whiteTransparent from "@/assets/logos/The_Konsol_Logo_White_Transparent.webp";
import blackSolid from "@/assets/logos/The_Konsol_Logo_Black_Solid.webp";
import whiteSolid from "@/assets/logos/The_Konsol_Logo_White_Solid.webp";

export const photoVariants = cva(
  "relative overflow-hidden rounded-frame",
  {
    variants: {
      tint: {
        green: "bg-section-green",
        blue: "bg-section-blue",
        indigo: "bg-section-indigo",
      },
    },
    defaultVariants: { tint: "green" },
  },
);

export interface PhotoProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof photoVariants> {
  alt: string;
  wrapperClassName?: string;
}

/** Black and white photo that floods with brand colour on hover. */
export const Photo = React.forwardRef<HTMLImageElement, PhotoProps>(
  ({ className, wrapperClassName, tint, alt, ...props }, ref) => (
    <div className={cn("group/photo", photoVariants({ tint }), wrapperClassName)}>
      <img
        ref={ref}
        alt={alt}
        className={cn(
          "h-full w-full object-cover grayscale transition-all duration-move ease-konsol group-hover/photo:mix-blend-multiply group-hover/photo:contrast-125",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Photo.displayName = "Photo";

const logoSrc = {
  black: { transparent: blackTransparent, solid: blackSolid },
  white: { transparent: whiteTransparent, solid: whiteSolid },
} as const;

export interface LogoProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /** `black` for light surfaces, `white` for dark surfaces. */
  color?: "black" | "white";
  /** `transparent` sits on any surface; `solid` includes its own square background. */
  background?: "transparent" | "solid";
}

/** The Konsol logo, from the official files. */
export const Logo = React.forwardRef<HTMLImageElement, LogoProps>(
  ({ className, color = "black", background = "transparent", alt = "The Konsol", ...props }, ref) => (
    <img ref={ref} src={logoSrc[color][background]} alt={alt} className={cn("size-10", className)} {...props} />
  ),
);
Logo.displayName = "Logo";
