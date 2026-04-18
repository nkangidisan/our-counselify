import { FC } from "react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  buttonText: string;
  onClick?: () => void;
}

export const CTASection: FC<CTASectionProps> = ({ title, buttonText, onClick }) => (
  <section className="py-16 text-center bg-gradient-to-r from-lime-400/10 via-blue-500/10 to-slate-900/60 animate-gradient rounded-2xl shadow-glass mt-16">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4 max-w-2xl mx-auto">
      {title}
    </h2>
    <Button variant="primary" size="lg" className="mt-2 px-8 py-3 text-base font-semibold shadow-glass" onClick={onClick}>
      {buttonText}
    </Button>
  </section>
);
