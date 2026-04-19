'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { PublicLayout } from '@/components/layout/public-layout';
import { Button, Card } from '@/components/ui/primitives';
import { pricingComparisonSections, pricingFaqs, pricingTiers } from '@/lib/counselify-data';

function renderCell(value: string) {
  if (value === 'âœ“') {
    return <Check className="mx-auto h-4 w-4 text-accent-green" />;
  }

  if (value === 'âœ—') {
    return <span className="text-text-muted">—</span>;
  }

  return <span className="text-sm text-text-primary">{value}</span>;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileTier, setMobileTier] = useState('Professional');

  const tiers = useMemo(
    () =>
      [...pricingTiers]
        .map((tier) => ({
          ...tier,
          displayPrice: annual ? tier.annualPrice : tier.monthlyPrice,
        }))
        .sort((a, b) => Number(b.featured) - Number(a.featured)),
    [annual]
  );

  const mobileTierIndex = tiers.findIndex((tier) => tier.name === mobileTier);

  return (
    <PublicLayout>
      <section className="hero-surface border-b border-border-default">
        <div className="mx-auto max-w-[980px] px-4 py-12 text-center md:px-6 lg:py-16">
          <p className="text-xs uppercase tracking-[0.08em] text-primary">Pricing</p>
          <h1 className="mt-4 font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">Simple, transparent pricing</h1>
          <p className="mx-auto mt-4 max-w-2xl text-body leading-[1.6] text-text-secondary">
            Start free and upgrade when your legal operations need deeper automation, workflows, and collaboration.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-surface p-1 shadow-sm">
            <button
              type="button"
              className={`interactive-target rounded-full px-4 text-sm ${annual ? 'text-text-secondary' : 'bg-primary text-white'}`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`interactive-target rounded-full px-4 text-sm ${annual ? 'bg-primary text-white' : 'text-text-secondary'}`}
              onClick={() => setAnnual(true)}
            >
              Annual
            </button>
            <span className="rounded-full border border-border-gold bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              20% off
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 lg:py-16 xl:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={tier.featured ? 'border-border-gold md:scale-[1.02]' : ''}>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-card font-semibold text-text-primary">{tier.name}</h2>
                {tier.featured ? (
                  <span className="rounded-full border border-border-gold bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                    Most Popular
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-4xl font-semibold text-text-primary">
                {tier.displayPrice}
                {tier.cadence ? <span className="ml-1 text-sm font-normal text-text-secondary">{tier.cadence}</span> : null}
              </p>
              <p className="mt-3 text-sm text-text-secondary">{tier.description}</p>
              <div className="mt-5 space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-2xl border border-border-default bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <Link href={tier.ctaHref}>
                  <Button className="w-full" variant={tier.featured ? 'primary' : 'ghost'}>
                    {tier.ctaLabel}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 lg:py-16 xl:px-8">
          <div className="md:hidden">
            <div className="mb-4 flex rounded-full border border-border-default bg-bg-base p-1">
              {tiers.map((tier) => (
                <button
                  key={tier.name}
                  type="button"
                  onClick={() => setMobileTier(tier.name)}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] ${
                    mobileTier === tier.name ? 'bg-primary text-white' : 'text-text-secondary'
                  }`}
                >
                  {tier.name.charAt(0)}
                </button>
              ))}
            </div>
            <div className="sticky top-16 z-10 mb-4 grid grid-cols-4 rounded-2xl border border-border-default bg-bg-surface px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-text-muted shadow-sm">
              <span>Feature</span>
              <span className="text-center">F</span>
              <span className="text-center">P</span>
              <span className="text-center">E</span>
            </div>
            <div className="space-y-4">
              {pricingComparisonSections.map((section) => (
                <Card key={section.category}>
                  <p className="text-xs uppercase tracking-[0.08em] text-primary">{section.category}</p>
                  <div className="mt-4 space-y-3">
                    {section.rows.map((row) => (
                      <div key={`${section.category}-${row[0]}`} className="grid grid-cols-4 items-center gap-3 rounded-2xl border border-border-default bg-bg-elevated px-3 py-3 text-sm">
                        <span className="text-text-primary">{row[0]}</span>
                        <span className={`text-center ${mobileTierIndex === 0 ? 'text-primary' : 'text-text-muted'}`}>{renderCell(row[1])}</span>
                        <span className={`text-center ${mobileTierIndex === 1 ? 'text-primary' : 'text-text-muted'}`}>{renderCell(row[2])}</span>
                        <span className={`text-center ${mobileTierIndex === 2 ? 'text-primary' : 'text-text-muted'}`}>{renderCell(row[3])}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="hidden overflow-hidden rounded-3xl border border-border-default shadow-sm md:block">
            <table className="min-w-full text-sm">
              <thead className="bg-bg-elevated">
                <tr>
                  <th className="px-4 py-4 text-left text-text-primary">Feature</th>
                  <th className="px-4 py-4 text-center text-text-primary">Freemium</th>
                  <th className="px-4 py-4 text-center text-text-primary">Professional</th>
                  <th className="px-4 py-4 text-center text-text-primary">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {pricingComparisonSections.map((section) => (
                  <>
                    <tr key={section.category}>
                      <td colSpan={4} className="bg-bg-base px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                        {section.category}
                      </td>
                    </tr>
                    {section.rows.map((row) => (
                      <tr key={`${section.category}-${row[0]}`} className="border-t border-border-default bg-bg-surface">
                        <td className="px-4 py-4 text-text-secondary">{row[0]}</td>
                        <td className="px-4 py-4 text-center">{renderCell(row[1])}</td>
                        <td className="px-4 py-4 text-center">{renderCell(row[2])}</td>
                        <td className="px-4 py-4 text-center">{renderCell(row[3])}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-4 py-10 md:px-6 lg:py-16">
        <h2 className="font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">FAQ</h2>
        <div className="mt-6 space-y-3">
          {pricingFaqs.map(([question, answer], index) => {
            const open = openFaq === index;
            return (
              <Card key={question}>
                <button type="button" className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpenFaq(open ? null : index)}>
                  <span className="text-base font-semibold text-text-primary">{question}</span>
                  <ChevronDown className={`h-5 w-5 text-text-secondary transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open ? <p className="mt-4 text-sm leading-[1.6] text-text-secondary">{answer}</p> : null}
              </Card>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}
