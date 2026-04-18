import * as React from 'react';
import { cn } from '@/lib/utils';

const variantStyles = {
  low: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
  medium: 'bg-amber-400/15 text-amber-300 border border-amber-400/20',
  high: 'bg-orange-500/15 text-orange-300 border border-orange-500/20',
  critical: 'bg-red-500/15 text-red-300 border border-red-500/20',
  default: 'bg-white/5 text-slate-200 border border-white/10',
} as const;

export type BadgeVariant = keyof typeof variantStyles;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
