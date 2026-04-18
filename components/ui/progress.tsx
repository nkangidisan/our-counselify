import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
}

export function Progress({ value, className, label, ...props }: ProgressProps) {
  const percent = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('space-y-3', className)} {...props}>
      {label ? <div className="flex items-center justify-between text-sm text-slate-400">{label}<span>{percent}%</span></div> : null}
      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-400 to-cyan-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
