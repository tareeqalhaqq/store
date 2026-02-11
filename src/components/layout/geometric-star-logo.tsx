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
      {/* Octagonal frame */}
      <polygon
        points="50,5 79,15 95,44 90,76 65,95 35,95 10,76 5,44 21,15"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        fill="none"
      />
      {/* Inner star pattern */}
      <polygon
        points="50,20 60,42 85,42 65,56 72,78 50,65 28,78 35,56 15,42 40,42"
        fill="hsl(var(--accent))"
        fillOpacity="0.85"
      />
      <polygon
        points="50,28 57,44 75,44 61,54 66,70 50,61 34,70 39,54 25,44 43,44"
        fill="hsl(var(--primary))"
      />
    </svg>
  );
}
