'use client';

import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Badge, Button, Select } from '@/components/ui/primitives';
import { eastAfricanCountries, industries, regulatorySignals } from '@/lib/counselify-data';

export default function ForecasterPage() {
  const [jurisdiction, setJurisdiction] = useState('All');
  const [industry, setIndustry] = useState('Technology');
  const [expanded, setExpanded] = useState<string | null>(regulatorySignals[0].id);

  const filtered = regulatorySignals.filter((signal) => jurisdiction === 'All' || signal.jurisdiction === jurisdiction);

  return (
    <AppLayout>
      <div className="grid gap-6 xl:grid-cols-[1fr,320px]">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-accent-gold">Regulatory Forecaster</p>
              <h1 className="mt-3 font-serif text-5xl text-white">Forecast what may change next.</h1>
              <p className="mt-3 max-w-2xl text-text-secondary">Track likely reforms, their business impact, and the actions your team should take now.</p>
            </div>
            <div className="flex gap-3">
              <Select value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
                <option value="All">All jurisdictions</option>
                {eastAfricanCountries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Select>
              <Select value={industry} onChange={(event) => setIndustry(event.target.value)}>
                {industries.map((entry) => (
                  <option key={entry.key} value={entry.key}>
                    {entry.key}
                  </option>
                ))}
              </Select>
              <Button variant="primary">
                <Sparkles className="h-4 w-4" />
                AI Refresh Signals
              </Button>
            </div>
          </div>

          <div className="space-y-5">
            {filtered.map((signal) => (
              <div key={signal.id} className="relative rounded-[32px] border border-white/10 bg-[rgba(13,18,32,0.78)] p-6">
                <div className="absolute bottom-6 left-6 top-6 w-px bg-white/10" />
                <div className="relative pl-8">
                  <div className="absolute left-[-3px] top-2 h-3 w-3 rounded-full bg-primary shadow-[0_0_0_6px_rgba(99,102,241,0.18)]" />
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-text-muted">
                          {signal.jurisdiction}
                        </span>
                        <Badge variant={signal.impact === 'Critical' ? 'error' : signal.impact === 'High' ? 'warning' : 'info'}>
                          {signal.impact}
                        </Badge>
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold text-white">{signal.title}</h2>
                      <p className="mt-3 text-text-secondary">{signal.summary}</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-3">
                      <p className="text-sm text-text-muted">Probability</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{signal.probability}%</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 lg:grid-cols-3">
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm text-text-muted">Expected window</p>
                      <p className="mt-2 text-sm font-medium text-white">{signal.dateRange}</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 lg:col-span-2">
                      <p className="text-sm text-text-muted">Affected obligations</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {signal.obligations.map((obligation) => (
                          <span key={obligation} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary">
                            {obligation}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[24px] border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                    {signal.recommendedAction}
                  </div>

                  <button
                    onClick={() => setExpanded((current) => (current === signal.id ? null : signal.id))}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-text-secondary"
                  >
                    View Details
                    <ChevronDown className={`h-4 w-4 transition ${expanded === signal.id ? 'rotate-180' : ''}`} />
                  </button>

                  {expanded === signal.id && (
                    <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-sm text-text-secondary">
                      Counselify has mapped this signal to current contracts, filing calendars, and checklist dependencies for {industry}. Review the recommended action pack before the expected window begins.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="glass-panel h-fit rounded-[32px] p-6">
          <h2 className="text-2xl font-semibold text-white">Summary panel</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-text-muted">Top 3 watch now</p>
              <div className="mt-3 space-y-3 text-sm text-text-secondary">
                {regulatorySignals.slice(0, 3).map((signal) => (
                  <div key={signal.id} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3">
                    {signal.title}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-text-muted">Your risk exposure</p>
              <p className="mt-3 text-4xl font-semibold text-white">71</p>
              <p className="mt-2 text-sm text-text-secondary">Elevated due to regional data transfer and tax change exposure.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-text-muted">Industries most affected</p>
              <div className="mt-3 space-y-2">
                {['Technology', 'Finance', 'Trade & Commerce'].map((item) => (
                  <div key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-text-secondary">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
