import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react";

/**
 * Ripple — animated concentric rings, used behind the hero to draw the eye.
 * Adapted from MagicUI (https://magicui.design/docs/components/ripple) for
 * Tailwind v3 + this project's emerald palette. The `animate-ripple` keyframes
 * live in tailwind.config.ts; per-circle delay is applied inline.
 */

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className = "",
  ...props
}: RippleProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,white,transparent)] ${className}`}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;

        return (
          <div
            key={i}
            className="animate-ripple absolute rounded-full border bg-emerald/[0.06] shadow-xl motion-reduce:animate-none"
            style={
              {
                "--i": i,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "rgba(52,211,153,0.7)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
