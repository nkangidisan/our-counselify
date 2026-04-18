import React from "react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description?: string;
  cta: React.ReactNode;
  className?: string;
}

export function CTASection({ title, description, cta, className }: CTASectionProps) {
  return (
    <section className={cn("w-full py-16 flex flex-col items-center justify-center text-center bg-gradient-to-br from-lime-400/10 via-blue-500/10 to-transparent", className)}>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        {description && <p className="text-slate-300 mb-6">{description}</p>}
        <div>{cta}</div>
      </div>
    </section>
  );
}
