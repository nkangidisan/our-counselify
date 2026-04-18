'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { PublicLayout } from '@/components/layout/public-layout';
import { Button } from '@/components/ui/primitives';
import { pricingComparisonSections, pricingFaqs, pricingTiers } from '@/lib/counselify-data';

function renderCell(value: string) {
  if (value === '✓') {
    return <Check className="mx-auto h-4 w-4 text-accent-mint" />;
  }

  if (value === '✗') {
    return <span className="text-text-muted">—</span>;
  }

  return <span>{value}</span>;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const tiers = useMemo(
    () =>
      pricingTiers.map((tier) => ({
        ...tier,
        displayPrice: annual ? tier.annualPrice : tier.monthlyPrice,
      })),
    [annual],
  );

  return (
    <PublicLayout>
      <section className="grain-overlay hero-surface border-b border-border-default">
        <div className="mx-auto max-w-[980px] px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Pricing</p>
          <h1 className="mt-4 font-serif text-6xl text-text-primary">Simple, Transparent Pricing</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-text-secondary">
            Start free. Scale as you grow. Upgrade anytime from your dashboard.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-surface p-1">
            <button
              className={`rounded-full px-4 py-2 text-sm ${!annual ? 'bg-primary text-black' : 'text-text-secondary'}`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm ${annual ? 'bg-primary text-black' : 'text-text-secondary'}`}
              onClick={() => setAnnual(true)}
            >
              Annual
            </button>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">20% off</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-[10px] border p-6 ${
                tier.featured
                  ? 'border-[rgba(212,168,85,0.45)] bg-[linear-gradient(180deg,rgba(212,168,85,0.1),rgba(17,17,17,1))] shadow-[0_28px_100px_rgba(0,0,0,0.35)]'
                  : 'surface-card'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-text-primary">{tier.name}</h2>
                {tier.featured && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Most Popular</span>}
              </div>
              <p className="mt-4 text-5xl font-semibold text-text-primary">
                {tier.displayPrice}
                {tier.cadence ? <span className="ml-1 text-base font-normal text-text-secondary">{tier.cadence}</span> : null}
              </p>
              <p className="mt-3">{tier.description}</p>
              <div className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-lg border border-border-default bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href={tier.ctaHref}>
                  <Button className="w-full" variant={tier.featured ? 'primary' : 'ghost'}>
                    {tier.ctaLabel}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-surface">
        <div className="mx-auto max-w-[1280px] overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 text-sm">
              <thead className="sticky top-16 z-10">
                <tr className="bg-bg-base">
                  <th className="border-b border-border-default px-4 py-4 text-left text-text-primary">Feature</th>
                  <th className="border-b border-border-default px-4 py-4 text-center text-text-primary">Freemium</th>
                  <th className="border-b border-border-default px-4 py-4 text-center text-text-primary">Professional</th>
                  <th className="border-b border-border-default px-4 py-4 text-center text-text-primary">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {pricingComparisonSections.map((section) => (
                  <>
                    <tr key={section.category}>
                      <td colSpan={4} className="bg-bg-elevated px-4 py-3 font-semibold uppercase tracking-[0.2em] text-primary">
                        {section.category}
                      </td>
                    </tr>
                    {section.rows.map((row) => (
                      <tr key={`${section.category}-${row[0]}`} className="bg-bg-surface">
                        <td className="border-b border-border-default px-4 py-4 text-text-secondary">{row[0]}</td>
                        <td className="border-b border-border-default px-4 py-4 text-center text-text-secondary">{renderCell(row[1])}</td>
                        <td className="border-b border-border-default px-4 py-4 text-center text-text-secondary">{renderCell(row[2])}</td>
                        <td className="border-b border-border-default px-4 py-4 text-center text-text-secondary">{renderCell(row[3])}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-5xl text-text-primary">FAQ</h2>
        <div className="mt-8 space-y-3">
          {pricingFaqs.map(([question, answer], index) => {
            const open = openFaq === index;
            return (
              <div key={question} className="surface-card p-5">
                <button className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpenFaq(open ? null : index)}>
                  <span className="text-lg font-semibold text-text-primary">{question}</span>
                  <ChevronDown className={`h-5 w-5 text-text-secondary transition ${open ? 'rotate-180' : ''}`} />
                </button>
                {open ? <p className="mt-4 text-sm text-text-secondary">{answer}</p> : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="surface-card p-8 text-center">
          <h2 className="font-serif text-5xl text-text-primary">Start building your legal infrastructure today</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/auth?tab=signup">
              <Button variant="primary" size="lg">
                Start Free Trial →
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
