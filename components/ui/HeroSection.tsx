import React from "react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  cta,
  className,
  children,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full flex flex-col items-center justify-center text-center py-24 md:py-36 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden",
        className
      )}
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-2xl text-slate-300 mb-8 font-medium">
            {subtitle}
          </p>
        )}
        {cta && <div className="mb-8 flex justify-center">{cta}</div>}
        {children}
      </div>
      {/* Glassmorphism effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-gradient-to-tr from-lime-400/10 via-blue-500/10 to-transparent rounded-full blur-3xl opacity-80" />
      </div>
    </section>
  );
}
