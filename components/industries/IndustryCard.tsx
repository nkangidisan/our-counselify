import { FC, ReactNode } from "react";

interface IndustryCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bullets?: string[];
  className?: string;
}

export const IndustryCard: FC<IndustryCardProps & { children?: ReactNode }> = ({ icon, title, description, bullets, className = "", children }) => (
  <div className={`glass-card hover-lift p-6 rounded-2xl shadow-glass bg-slate-900/60 border border-white/10 flex flex-col items-start ${className}`}>
    <div className="mb-3 text-lime-400">{icon}</div>
    <h3 className="text-xl font-semibold text-slate-100 mb-1">{title}</h3>
    <p className="text-slate-300 mb-2 text-sm">{description}</p>
    {children && <div className="w-full mt-auto">{children}</div>}
  </div>
);
