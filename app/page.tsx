import Link from 'next/link';
import { Bot, FileBadge2, FileText, Radar, Shield, TrendingUp } from 'lucide-react';
import { PublicHeroActions, PublicLayout } from '@/components/layout/public-layout';
import { Button, Card } from '@/components/ui/primitives';
import { featureSections, industryCards, pillars, pricingTiers, productFeatures } from '@/lib/counselify-data';

const featureIcons = [FileText, Bot, Shield, Radar, FileBadge2, TrendingUp];

export default function HomePage() {
  const featuredPricing = [...pricingTiers].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <PublicLayout>
      <section className="hero-surface border-b border-border-default">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-[55%,45%] lg:items-center xl:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-primary">Continuous compliance for East Africa</p>
            <h1 className="mt-4 max-w-[12ch] font-serif text-hero leading-[1.1] tracking-[-0.02em] text-text-primary">
              AI legal infrastructure for modern businesses.
            </h1>
            <p className="mt-4 max-w-[34rem] text-body leading-[1.6] text-text-secondary">
              Continuous compliance monitoring, intelligent contract analysis, and regulatory forecasting built for fast-moving legal teams.
            </p>
            <div className="mt-6">
              <PublicHeroActions />
            </div>

            <div className="mt-6 -mx-4 overflow-x-auto px-4">
              <div className="flex min-w-max gap-3">
                {['Bank-grade encryption', '12 East African jurisdictions', 'AI-first legal workflows', 'Audit-ready evidence trails'].map((chip) => (
                  <span key={chip} className="rounded-full border border-border-default bg-bg-surface px-4 py-2 text-sm text-text-secondary shadow-sm">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[560px]">
            <Card className="border-border-gold">
              <div className="flex items-start justify-between gap-4 border-b border-border-default pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-text-muted">Live product preview</p>
                  <h2 className="mt-2 text-card font-semibold text-text-primary">Compliance overview</h2>
                </div>
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-[10px] border-primary/20 border-t-primary text-2xl font-semibold text-primary">
                  84
                </div>
              </div>

              <div className="grid gap-4 py-5 md:grid-cols-2">
                <div className="rounded-3xl border border-border-default bg-bg-elevated p-4">
                  <p className="text-sm text-text-secondary">Risk flags</p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-accent-green/20 bg-[var(--accent-green-subtle)] px-4 py-3 text-sm text-accent-green">
                      Data retention clause complete
                    </div>
                    <div className="rounded-2xl border border-accent-amber/20 bg-[var(--accent-amber-subtle)] px-4 py-3 text-sm text-accent-amber">
                      Renewal terms need review
                    </div>
                    <div className="rounded-2xl border border-accent-red/20 bg-[var(--accent-red-subtle)] px-4 py-3 text-sm text-accent-red">
                      Liability cap missing
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-border-default bg-bg-elevated p-4">
                  <p className="text-sm text-text-secondary">Priority contract</p>
                  <p className="mt-3 text-lg font-semibold text-text-primary">Safaricom Distribution Agreement</p>
                  <p className="mt-6 text-sm text-text-secondary">Counterparty risk score</p>
                  <p className="mt-1 text-4xl font-semibold text-primary">67</p>
                </div>
              </div>

              <div className="rounded-3xl border border-border-default bg-bg-elevated p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-text-secondary">Next actions</p>
                  <span className="rounded-full border border-border-gold bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                    Legal Ops
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    ['Issue data transfer annex', 'Today'],
                    ['Review renewal package', 'Tomorrow'],
                  ].map(([label, due]) => (
                    <div key={label} className="flex min-h-[52px] items-center justify-between rounded-2xl border border-border-default bg-bg-surface px-4">
                      <span className="text-sm font-medium text-text-primary">{label}</span>
                      <span className="text-xs text-text-muted">{due}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-surface">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-4 py-8 md:grid-cols-3 md:px-6 xl:px-8">
          {pillars.map((pillar) => (
            <Card key={pillar.number} className="text-center md:text-left">
              <p className="font-serif text-[40px] leading-[1.1] text-primary">{pillar.number}</p>
              <h2 className="mt-3 text-card font-semibold text-text-primary">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-[1.6] text-text-secondary">{pillar.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 lg:py-16 xl:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.08em] text-primary">Platform capabilities</p>
          <h2 className="mt-3 font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">Everything your legal team needs</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productFeatures.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <Link key={feature.title} href={feature.href}>
                <Card hover className="h-full">
                  <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-card font-semibold text-text-primary">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-[1.6] text-text-secondary">{feature.description}</p>
                  <p className="mt-5 text-sm font-semibold text-primary">Learn more</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 lg:py-16 xl:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.08em] text-primary">Industry coverage</p>
            <h2 className="mt-3 font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">Built for every industry in East Africa</h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {industryCards.map((industry) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}`}>
                <Card hover className="h-full p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-primary">Industry</p>
                  <h3 className="mt-3 text-lg font-semibold text-text-primary">{industry.name}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{industry.tagline}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 lg:py-16 xl:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.08em] text-primary">How it works</p>
          <h2 className="mt-3 font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">Upload. AI analyzes. Act.</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            {
              step: 'Step 1',
              title: 'Upload',
              description: 'Drop in a PDF or DOCX, map the jurisdiction, and start review with secure workspace storage.',
            },
            {
              step: 'Step 2',
              title: 'AI analyzes',
              description: 'Counselify extracts clauses, assigns risk, flags missing protections, and prepares plain-English findings.',
            },
            {
              step: 'Step 3',
              title: 'Act',
              description: 'Create next actions, generate redlines, update compliance records, and prepare evidence for review.',
            },
          ].map((item) => (
            <Card key={item.step}>
              <p className="text-xs uppercase tracking-[0.08em] text-text-muted">{item.step}</p>
              <h3 className="mt-3 text-card font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-[1.6] text-text-secondary">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 lg:py-16 xl:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.08em] text-primary">Pricing</p>
            <h2 className="mt-3 font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">Start free, then scale with confidence.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredPricing.map((tier) => (
              <Card key={tier.name} className={tier.featured ? 'border-border-gold md:scale-[1.02]' : ''}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-card font-semibold text-text-primary">{tier.name}</h3>
                    <p className="mt-2 text-3xl font-semibold text-text-primary">
                      {tier.monthlyPrice}
                      <span className="ml-1 text-sm font-normal text-text-secondary">{tier.cadence}</span>
                    </p>
                  </div>
                  {tier.featured ? (
                    <span className="rounded-full border border-border-gold bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                      Most Popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm text-text-secondary">{tier.description}</p>
                <div className="mt-5 space-y-2">
                  {tier.features.slice(0, 4).map((feature) => (
                    <div key={feature} className="rounded-2xl border border-border-default bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                      {feature}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 lg:py-16 xl:px-8">
        <Card className="text-center">
          <h2 className="font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">Ready to transform legal operations?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-body leading-[1.6] text-text-secondary">
            Built to help East African legal teams move faster without lowering rigor.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/auth?tab=signup">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                Explore Features
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </PublicLayout>
  );
}
