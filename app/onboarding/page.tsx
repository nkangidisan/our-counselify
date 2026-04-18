'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, CheckCircle2, FileUp, Globe2, Layers3 } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { Button, Input } from '@/components/ui/primitives';
import { eastAfricanCountries, industries } from '@/lib/counselify-data';

const steps = [
  { key: 'company', title: 'Welcome to The Counselify', icon: Building2 },
  { key: 'industry', title: 'Choose your industry', icon: Layers3 },
  { key: 'jurisdiction', title: 'Select your primary jurisdiction', icon: Globe2 },
  { key: 'upload', title: 'Upload your first contract', icon: FileUp },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState('LakeHub Growth Co.');
  const [website, setWebsite] = useState('https://lakehub.africa');
  const [selectedIndustry, setSelectedIndustry] = useState('Technology & ICT');
  const [selectedCountry, setSelectedCountry] = useState('Kenya');
  const [uploadedName, setUploadedName] = useState('');

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  return (
    <div className="grain-overlay hero-surface flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl rounded-[24px] border border-border-default bg-bg-surface p-6 shadow-[0_32px_120px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="mb-8 flex items-center justify-between">
          <Logo compact />
          <div className="flex items-center gap-2">
            {steps.map((item, index) => (
              <div key={item.key} className={`h-2 w-10 rounded-full ${index <= step ? 'bg-primary' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        <div className="mb-6 h-2 rounded-full bg-white/10">
          <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={steps[step].key}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/15 p-3 text-primary">
                {(() => {
                  const Icon = steps[step].icon;
                  return <Icon className="h-5 w-5" />;
                })()}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Step {step + 1} of {steps.length}</p>
                <h1 className="font-serif text-4xl text-text-primary">{steps[step].title}</h1>
              </div>
            </div>

            {step === 0 && (
              <div className="grid gap-4">
                <label className="block">
                  <span className="mb-2 block text-sm text-text-secondary">Company name</span>
                  <Input value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-text-secondary">Website</span>
                  <Input value={website} onChange={(event) => setWebsite(event.target.value)} />
                </label>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {industries.map((industry) => (
                  <button
                    key={industry.key}
                    onClick={() => setSelectedIndustry(industry.key)}
                    className={`rounded-[28px] border p-5 text-left transition ${
                      selectedIndustry === industry.key
                        ? 'border-border-glow bg-primary/10 shadow-[0_18px_48px_rgba(212,168,85,0.14)]'
                        : 'border-border-default bg-bg-elevated'
                    }`}
                  >
                    <h2 className="text-xl font-semibold text-text-primary">{industry.key}</h2>
                    <p className="mt-2 text-sm text-text-secondary">{industry.challenges[0]}</p>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {eastAfricanCountries
                  .filter((country) => country.code !== 'EAC')
                  .map((country) => (
                    <button
                      key={country.code}
                      onClick={() => setSelectedCountry(country.name)}
                      className={`rounded-[28px] border p-5 text-left transition ${
                        selectedCountry === country.name ? 'border-border-glow bg-primary/10' : 'border-border-default bg-bg-elevated'
                      }`}
                    >
                      <p className="text-2xl">{country.flag}</p>
                      <p className="mt-3 text-sm uppercase tracking-[0.22em] text-text-muted">{country.code}</p>
                      <h2 className="mt-3 text-xl font-semibold text-text-primary">{country.name}</h2>
                    </button>
                  ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <label
                  htmlFor="contract-upload"
                  className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-border-glow bg-primary/5 p-6 text-center"
                >
                  <FileUp className="mb-4 h-10 w-10 text-primary" />
                  <h2 className="text-2xl font-semibold text-text-primary">Upload your first contract</h2>
                  <p className="mt-3 max-w-md text-text-secondary">
                    Drag in a PDF or DOCX, or choose a file to start clause extraction and risk scoring.
                  </p>
                  <input
                    id="contract-upload"
                    type="file"
                    className="hidden"
                    onChange={(event) => setUploadedName(event.target.files?.[0]?.name ?? '')}
                  />
                </label>

                {uploadedName ? (
                  <div className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                    Selected file: {uploadedName}
                  </div>
                ) : (
                  <div className="rounded-[24px] border border-border-default bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                    No file yet. You can skip and upload from the contracts workspace.
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0}>
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button variant="primary" onClick={() => setStep((current) => Math.min(current + 1, steps.length - 1))}>
              Continue
            </Button>
          ) : (
            <Button variant="primary" onClick={() => router.push('/app')}>
              Upload & Analyze →
            </Button>
          )}
        </div>

        {step === steps.length - 1 && (
          <div className="mt-6 rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-300" />
              <div>
                <p className="font-medium text-text-primary">Workspace ready</p>
                <p className="mt-1 text-sm text-emerald-200">
                  {companyName} is configured for {selectedIndustry} in {selectedCountry}. You can now move to your dashboard.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
