import { FC, ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle, className = "", children }) => (
  <div className={`text-center mb-10 ${className}`}>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100 mb-2">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-2">{subtitle}</p>
    )}
    {children}
  </div>
);