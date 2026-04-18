import React from "react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  cta?: React.ReactNode;
  highlight?: boolean;
  className?: string;
}

export function PricingCard({
  title,
  price,
  features,
  cta,
  highlight = false,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-slate-950/90 border-white/10 shadow-xl p-8 flex flex-col items-center gap-6 transition-all",
        highlight ? "ring-2 ring-lime-400 scale-105 z-10" : "",
        className
      )}
    >
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <div className="text-4xl font-extrabold text-lime-400 mb-4">{price}</div>
      <ul className="space-y-2 mb-6 w-full">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
            <span className="w-4 h-4 inline-flex items-center justify-center text-lime-400">•</span>
            {feature}
          </li>
        ))}
      </ul>
      {cta && <div className="w-full">{cta}</div>}
    </div>
  );
}
