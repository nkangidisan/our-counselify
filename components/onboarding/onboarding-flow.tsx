'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const steps = ['Company', 'Contracts', 'Risk profile', 'Summary'];
const personas = [
  { title: 'In-house Counsel', description: 'Focus on corporate agreements and regulatory compliance.' },
  { title: 'Operations Manager', description: 'Simplify contract intake, review, and approval flows.' },
  { title: 'Risk Officer', description: 'Track legal exposure and remediate flagged issues quickly.' },
];

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<string | null>(null);

  const content = useMemo(() => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <p className="text-slate-400">Tell us about your team and goals.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {personas.map((persona) => (
                <button
                  key={persona.title}
                  type="button"
                  onClick={() => setSelection(persona.title)}
                  className={`rounded-3xl border p-5 text-left transition ${
                    selection === persona.title
                      ? 'border-lime-400 bg-slate-900/80 shadow-glow'
                      : 'border-white/10 bg-slate-950/70 hover:border-white/20'
                  }`}
                >
                  <p className="text-sm uppercase tracking-[0.16em] text-lime-300">Persona</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{persona.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{persona.description}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-slate-400">Choose the contract categories you review most.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {['NDA', 'Sales', 'Services', 'Lease', 'Employment', 'Vendor'].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-left text-slate-200 transition hover:border-lime-400 hover:bg-slate-900/80"
                >
                  <h3 className="text-lg font-semibold text-white">{label}</h3>
                  <p className="mt-2 text-sm text-slate-400">Smart clause summaries for {label} reviews.</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-slate-400">Set your risk tolerance so Counselify matches your team.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {['Low', 'Medium', 'High'].map((level) => (
                <button
                  key={level}
                  type="button"
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-left text-slate-200 transition hover:border-lime-400 hover:bg-slate-900/80"
                >
                  <h3 className="text-lg font-semibold text-white">{level}</h3>
                  <p className="mt-2 text-sm text-slate-400">Recommended for {level.toLowerCase()} risk workflows.</p>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <p className="text-slate-400">Review your onboarding choices and start using Counselify.</p>
            <div className="space-y-3 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm text-slate-500">Selected persona</p>
              <p className="text-lg font-semibold text-white">{selection ?? 'Not selected yet'}</p>
            </div>
            <p className="text-sm text-slate-400">Next, upload your first contract and let AI surface risk insights.</p>
          </div>
        );
    }
  }, [step, selection]);

  return (
    <Card className="rounded-[2rem] p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-lime-300">Onboarding</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Get Counselify set up</h1>
        </div>
        <div className="rounded-full bg-slate-900/75 px-4 py-2 text-sm text-slate-300">Step {step + 1} of {steps.length}</div>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-4">
        {steps.map((title, index) => (
          <div key={title} className={`rounded-3xl border px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] ${index === step ? 'border-lime-400 bg-slate-900 text-white' : 'border-white/10 bg-slate-950 text-slate-400'}`}>
            {title}
          </div>
        ))}
      </div>

      {content}

      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          Back
        </Button>
        <Button onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>
          {step === steps.length - 1 ? 'Finish setup' : 'Next step'}
        </Button>
      </div>
    </Card>
  );
}
