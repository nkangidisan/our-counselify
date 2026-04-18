import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500',
        'shadow-sm shadow-black/20 transition focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400/20',
        className
      )}
      {...props}
    />
  );
}
