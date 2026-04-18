"use client";
import { FC, ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionListProps {
  items: string[];
  className?: string;
}

export const AccordionList: FC<AccordionListProps> = ({ items, className = "" }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`w-full ${className}`}>
      <button
        className="flex items-center gap-2 text-lime-400 font-semibold focus:outline-none focus:ring-2 focus:ring-lime-400/50 mb-1"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>Details</span>
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`} size={18} />
      </button>
      <ul className={`pl-2 text-slate-300 text-sm space-y-1 transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
        aria-hidden={!open}
      >
        {items.map((item, i) => (
          <li key={i} className="list-disc ml-4">{item}</li>
        ))}
      </ul>
    </div>
  );
};
