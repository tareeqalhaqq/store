import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function GeometricStarLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("fill-current", className)}
      {...props}
    >
      <g transform="translate(50,50) scale(0.4)">
        <path
          d="M0,-100 L29.39, -40.45 L95.11,-30.9 L47.55,15.45 L58.78,80.9 L0,50 L-58.78,80.9 L-47.55,15.45 L-95.11,-30.9 L-29.39,-40.45 Z"
          stroke="hsl(var(--primary))"
          strokeWidth="5"
          fill="hsl(var(--accent))"
          fillOpacity="0.8"
        />
        <path
          d="M0,-80 L23.51, -32.36 L76.08,-24.72 L38.04,12.36 L47.02,64.72 L0,40 L-47.02,64.72 L-38.04,12.36 L-76.08,-24.72 L-23.51,-32.36 Z"
          fill="hsl(var(--primary))"
        />
      </g>
    </svg>
  );
}
