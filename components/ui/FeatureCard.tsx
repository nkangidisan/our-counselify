import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn("bg-slate-900/80 rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col items-start gap-4", className)}>
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-lime-400 text-white">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}
