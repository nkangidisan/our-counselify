import Link from 'next/link';
import { ArrowRight, Bot, FileBadge2, FileText, Radar, Shield, TrendingUp } from 'lucide-react';
import { PublicHeroActions, PublicLayout } from '@/components/layout/public-layout';
import { Button } from '@/components/ui/primitives';
import { featureSections, industryCards, pillars, pricingTiers, productFeatures } from '@/lib/counselify-data';

const featureIcons = [FileText, Bot, Shield, Radar, FileBadge2, TrendingUp];

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="grain-overlay hero-surface relative overflow-hidden border-b border-border-default">
        <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-[1280px] items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr,0.95fr] lg:px-8 lg:py-20">
          <div className="relative z-10">
            <h1 className="max-w-3xl font-serif text-[52px] leading-[1.02] text-white sm:text-[64px] lg:text-[80px]">
              AI Legal Infrastructure
              <br />
              for Modern Businesses.
            </h1>
            <p className="mt-6 max-w-[520px] text-lg text-text-secondary">
              Continuous compliance monitoring, intelligent contract analysis, and regulatory forecasting — purpose-built for East Africa.
            </p>
            <div className="mt-8">
              <PublicHeroActions />
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-text-secondary">
              <div className="rounded-full border border-border-default bg-bg-surface px-4 py-2">🔒 Bank-grade encryption</div>
              <div className="rounded-full border border-border-default bg-bg-surface px-4 py-2">⚖️ 12 East African jurisdictions</div>
              <div className="rounded-full border border-border-default bg-bg-surface px-4 py-2">🤖 Powered by AI</div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-[110px]" />
            <div className="animate-float-slow relative rounded-[18px] border border-[rgba(212,168,85,0.45)] bg-bg-surface p-5 shadow-[0_32px_120px_rgba(0,0,0,0.45)]">
              <div className="flex flex-col gap-4 border-b border-border-default pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-text-muted">Live product preview</p>
                  <h2 className="mt-2 text-2xl font-semibold text-text-primary">Compliance overview</h2>
                </div>
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-[8px] border-primary/20 border-t-primary text-2xl font-semibold text-primary">
                  84
                </div>
              </div>

              <div className="grid gap-4 py-5 md:grid-cols-[1.1fr,0.9fr]">
                <div className="surface-card p-4">
                  <p className="text-sm text-text-secondary">Risk flags</p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-lg border border-accent-green/20 bg-accent-green/10 px-3 py-3 text-sm text-accent-green">
                      Data retention clause complete
                    </div>
                    <div className="rounded-lg border border-accent-amber/20 bg-accent-amber/10 px-3 py-3 text-sm text-accent-amber">
                      Renewal terms need review
                    </div>
                    <div className="rounded-lg border border-accent-coral/20 bg-accent-coral/10 px-3 py-3 text-sm text-accent-coral">
                      Liability cap missing
                    </div>
                  </div>
                </div>

                <div className="surface-card p-4">
                  <p className="text-sm text-text-secondary">Priority contract</p>
                  <div className="mt-4 rounded-lg border border-border-default bg-bg-elevated px-4 py-4">
                    <p className="font-medium text-text-primary">Safaricom Distribution Agreement</p>
                    <p className="mt-2 text-sm text-text-secondary">Counterparty risk score</p>
                    <p className="mt-3 text-3xl font-semibold text-primary">67</p>
                  </div>
                </div>
              </div>

              <div className="surface-card p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-text-secondary">Next actions</p>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Legal Ops</span>
                </div>
                <div className="mt-4 grid gap-3">
                  <div className="flex items-center justify-between rounded-lg border border-border-default px-3 py-3">
                    <span className="text-sm text-text-primary">Issue data transfer annex</span>
                    <span className="text-xs text-text-muted">Today</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border-default px-3 py-3">
                    <span className="text-sm text-text-primary">Review renewal package</span>
                    <span className="text-xs text-text-muted">Tomorrow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-surface">
        <div className="mx-auto grid max-w-[1280px] gap-5 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="surface-card p-6">
              <p className="text-4xl font-serif text-primary">{pillar.number}</p>
              <h2 className="mt-4 text-2xl font-semibold text-text-primary">{pillar.title}</h2>
              <p className="mt-3">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Platform capabilities</p>
          <h2 className="mt-4 font-serif text-5xl text-text-primary">Everything Your Legal Team Needs</h2>
        </div>
        <div className="stagger-children mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {productFeatures.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <Link key={feature.title} href={feature.href} className="surface-card block p-6">
                <div className="inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-text-primary">{feature.title}</h3>
                <p className="mt-3">{feature.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
                  Learn more →
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-primary">Industry coverage</p>
            <h2 className="mt-4 font-serif text-5xl text-text-primary">Built for Every Industry in East Africa</h2>
            <p className="mt-4 text-lg text-text-secondary">Click any industry to see how The Counselify serves your sector.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {industryCards.map((industry) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}`} className="surface-card block p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-primary">Industry</p>
                <h3 className="mt-3 text-2xl font-semibold text-text-primary">{industry.name}</h3>
                <p className="mt-3 text-sm text-text-secondary">{industry.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">How it works</p>
          <h2 className="mt-4 font-serif text-5xl text-text-primary">Upload. AI Analyzes. Act.</h2>
        </div>
        <div className="stagger-children mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              step: 'Step 1',
              title: 'Upload',
              description: 'Drop in a PDF or DOCX, map the jurisdiction, and start review with secure workspace storage.',
            },
            {
              step: 'Step 2',
              title: 'AI Analyzes',
              description: 'Counselify extracts clauses, assigns risk, flags missing protections, and prepares plain-English findings.',
            },
            {
              step: 'Step 3',
              title: 'Act',
              description: 'Create next actions, generate redlines, update compliance records, and prepare evidence for review.',
            },
          ].map((item) => (
            <div key={item.step} className="surface-card p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">{item.step}</p>
              <h3 className="mt-4 text-2xl font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-3">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/auth?tab=signup">
            <Button variant="primary" size="lg">
              Start Free Trial →
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-primary">Pricing</p>
            <h2 className="mt-4 font-serif text-5xl text-text-primary">Start free, then scale with confidence.</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-[10px] border p-6 ${
                  tier.featured
                    ? 'border-[rgba(212,168,85,0.45)] bg-[linear-gradient(180deg,rgba(212,168,85,0.1),rgba(17,17,17,1))] shadow-[0_28px_100px_rgba(0,0,0,0.35)]'
                    : 'surface-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-text-primary">{tier.name}</h3>
                  {tier.featured && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Most Popular</span>}
                </div>
                <p className="mt-4 text-4xl font-semibold text-text-primary">
                  {tier.monthlyPrice}
                  <span className="ml-1 text-base font-normal text-text-secondary">{tier.cadence}</span>
                </p>
                <p className="mt-3">{tier.description}</p>
                <div className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="rounded-lg border border-border-default bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/pricing" className="text-sm text-primary">
                    See full comparison →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="surface-card p-8 text-center">
          <h2 className="font-serif text-5xl text-text-primary">Ready to transform legal operations?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Built to help East African legal teams move faster without lowering rigor.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/auth?tab=signup">
              <Button variant="primary" size="lg">
                Start Free Trial →
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="ghost" size="lg">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
