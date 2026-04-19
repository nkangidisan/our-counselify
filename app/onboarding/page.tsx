'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, CheckCircle2, FileUp, Globe2, Layers3 } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Button, Input } from '@/components/ui/primitives';
import { eastAfricanCountries, industries } from '@/lib/counselify-data';

const steps = [
  { key: 'company', title: 'Welcome to Counselify', icon: Building2 },
  { key: 'industry', title: 'Choose your industry', icon: Layers3 },
  { key: 'jurisdiction', title: 'Select your primary jurisdiction', icon: Globe2 },
  { key: 'upload', title: 'Upload your first contract', icon: FileUp },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { session } = useAuth();
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState('LakeHub Growth Co.');
  const [website, setWebsite] = useState('https://lakehub.africa');
  const [selectedIndustry, setSelectedIndustry] = useState('Technology & ICT');
  const [selectedCountry, setSelectedCountry] = useState('Kenya');
  const [uploadedName, setUploadedName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
  const Icon = steps[step].icon;

  async function handleContinue() {
    if (step < steps.length - 1) {
      setStep((current) => Math.min(current + 1, steps.length - 1));
      return;
    }

    if (!session?.user || !supabase) {
      router.push('/auth?tab=signin');
      return;
    }

    setSaveError('');
    setSaving(true);

    const { error } = await supabase.from('profiles').upsert(
      {
        id: session.user.id,
        email: session.user.email ?? '',
        full_name: session.user.user_metadata?.full_name ?? null,
        company_name: companyName,
        industry: selectedIndustry,
        country: selectedCountry,
        onboarding_completed: true,
      },
      { onConflict: 'id' }
    );

    setSaving(false);

    if (!error) {
      router.push('/app');
      return;
    }

    setSaveError('We could not save your onboarding progress. Please try again.');
  }

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="mx-auto min-h-screen max-w-[960px] bg-bg-base px-4 py-6 md:flex md:items-center md:justify-center md:px-6">
        <div className="flex min-h-[calc(100vh-3rem)] flex-col rounded-none md:min-h-[720px] md:w-full md:rounded-[32px] md:border md:border-border-default md:bg-bg-surface md:p-8 md:shadow-md">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((current) => Math.max(current - 1, 0))}
              className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-surface md:bg-bg-elevated"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Logo compact />
            <div className="w-11" />
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {steps.map((item, index) => (
              <div key={item.key} className={`h-2 w-10 rounded-full ${index <= step ? 'bg-primary' : 'bg-border-default'}`} />
            ))}
          </div>

          <div className="mt-8 flex-1">
            <div className="mx-auto max-w-[640px]">
              <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.08em] text-text-muted">
                Step {step + 1} of {steps.length}
              </p>
              <h1 className="mt-3 font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">{steps[step].title}</h1>

              {step === 0 ? (
                <div className="mt-8 grid gap-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-text-primary">Company name</span>
                    <Input value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-text-primary">Website</span>
                    <Input value={website} onChange={(event) => setWebsite(event.target.value)} />
                  </label>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {industries.map((industry) => (
                    <button
                      key={industry.key}
                      type="button"
                      onClick={() => setSelectedIndustry(industry.key)}
                      className={`rounded-3xl border p-5 text-left ${
                        selectedIndustry === industry.key ? 'border-border-gold bg-primary/10' : 'border-border-default bg-bg-surface md:bg-bg-elevated'
                      }`}
                    >
                      <h2 className="text-lg font-semibold text-text-primary">{industry.key}</h2>
                      <p className="mt-2 text-sm text-text-secondary">{industry.challenges[0]}</p>
                    </button>
                  ))}
                </div>
              ) : null}

              {step === 2 ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {eastAfricanCountries
                    .filter((country) => country.code !== 'EAC')
                    .map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => setSelectedCountry(country.name)}
                        className={`rounded-3xl border p-5 text-left ${
                          selectedCountry === country.name ? 'border-border-gold bg-primary/10' : 'border-border-default bg-bg-surface md:bg-bg-elevated'
                        }`}
                      >
                        <p className="text-2xl">{country.flag}</p>
                        <p className="mt-3 text-xs uppercase tracking-[0.08em] text-text-muted">{country.code}</p>
                        <h2 className="mt-2 text-lg font-semibold text-text-primary">{country.name}</h2>
                      </button>
                    ))}
                </div>
              ) : null}

              {step === 3 ? (
                <div className="mt-8 space-y-4">
                  <label
                    htmlFor="contract-upload"
                    className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-border-gold bg-primary/10 p-6 text-center"
                  >
                    <FileUp className="mb-4 h-10 w-10 text-primary" />
                    <h2 className="text-card font-semibold text-text-primary">Upload your first contract</h2>
                    <p className="mt-3 max-w-md text-sm leading-[1.6] text-text-secondary">
                      Drag in a PDF or DOCX, or choose a file to start clause extraction and risk scoring.
                    </p>
                    <input id="contract-upload" type="file" className="hidden" onChange={(event) => setUploadedName(event.target.files?.[0]?.name ?? '')} />
                  </label>

                  {uploadedName ? (
                    <div className="rounded-3xl border border-accent-green/20 bg-[var(--accent-green-subtle)] px-4 py-3 text-sm text-accent-green">Selected file: {uploadedName}</div>
                  ) : (
                    <div className="rounded-3xl border border-border-default bg-bg-surface md:bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                      No file yet. You can skip and upload from the contracts workspace.
                    </div>
                  )}
                </div>
              ) : null}

              {step === steps.length - 1 ? (
                <>
                  <div className="mt-6 rounded-3xl border border-accent-green/20 bg-[var(--accent-green-subtle)] p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-accent-green" />
                      <div>
                        <p className="font-semibold text-text-primary">Workspace ready</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          {companyName} is configured for {selectedIndustry} in {selectedCountry}.
                        </p>
                      </div>
                    </div>
                  </div>
                  {saveError ? <p className="mt-4 text-sm text-accent-red">{saveError}</p> : null}
                </>
              ) : null}
            </div>
          </div>

          <div className="safe-bottom-padding sticky bottom-0 mt-8 bg-bg-base pt-4 md:bg-transparent">
            <div className="mx-auto max-w-[640px]">
              <Button
                variant="primary"
                className="w-full"
                loading={saving}
                onClick={() => void handleContinue()}
              >
                {step < steps.length - 1 ? 'Continue' : 'Upload & Analyze'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
