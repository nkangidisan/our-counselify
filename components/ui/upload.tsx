import * as React from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface UploadProps extends React.HTMLAttributes<HTMLDivElement> {
  isDragActive?: boolean;
}

export function Upload({ className, isDragActive, ...props }: UploadProps) {
  return (
    <div
      className={cn(
        'rounded-[1.75rem] border-2 border-dashed bg-slate-950/70 px-6 py-12 text-center transition-colors',
        'border-white/15 text-slate-300 hover:border-lime-400 hover:bg-white/5',
        isDragActive ? 'border-lime-400 bg-lime-400/5' : '',
        className
      )}
      {...props}
    >
      <UploadCloud className="mx-auto h-12 w-12 text-lime-300" />
      <div className="mt-6 space-y-3 text-sm text-slate-400">
        <p className="text-base font-semibold text-slate-100">Drag & drop your contract</p>
        <p>or <span className="text-lime-300">browse files</span> to upload your agreement.</p>
        <p className="text-xs text-slate-500">Supports PDF, DOCX, TXT. Extracts clauses in seconds.</p>
      </div>
    </div>
  );
}
