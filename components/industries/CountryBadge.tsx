import { FC } from "react";

interface CountryBadgeProps {
  country: string;
}

export const CountryBadge: FC<CountryBadgeProps> = ({ country }) => (
  <span className="inline-block bg-slate-800/80 text-slate-200 px-4 py-1 rounded-full text-sm font-medium shadow-glass hover:bg-lime-400 hover:text-slate-900 transition-colors duration-200 mb-2 mr-2">
    {country}
  </span>
);
