import Link from 'next/link';
import { Check, ChevronRight } from 'lucide-react';
import { PublicLayout } from '@/components/layout/public-layout';
import { Button } from '@/components/ui/primitives';
import { featureSections } from '@/lib/counselify-data';

export default function FeaturesPage() {
  return (
    <PublicLayout>
      <section className="grain-overlay hero-surface border-b border-border-default">
        <div className="mx-auto max-w-[980px] px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <p className="text-xs uppercase tracking-[0.2em] text-primary sm:text-sm sm:tracking-[0.28em]">Features</p>
          <h1 className="mt-4 font-serif text-[2.7rem] leading-[1.02] text-text-primary sm:text-5xl lg:text-6xl">Every Feature, Built for Legal Excellence</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-text-secondary">
            From contract analysis to regulatory forecasting — the complete AI legal operating system.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="space-y-10">
          {featureSections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 rounded-[24px] border border-border-default bg-bg-surface p-4 sm:p-6 lg:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-primary sm:text-sm sm:tracking-[0.28em]">{section.eyebrow}</p>
                  <h2 className="mt-4 font-serif text-[2rem] leading-[1.05] text-text-primary sm:text-4xl lg:text-5xl">{section.title}</h2>
                  <div className="mt-6 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base text-text-secondary">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3 rounded-lg border border-border-default bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                        <Check className="mt-0.5 h-4 w-4 text-primary" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="surface-card p-4 sm:p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-text-muted sm:text-sm sm:tracking-[0.24em]">Interface preview {String(index + 1).padStart(2, '0')}</p>
                  {'score' in section.visual && (
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-text-primary">{section.visual.title}</h3>
                      <div className="mt-4 flex items-center justify-between rounded-lg border border-border-default bg-bg-elevated px-4 py-4">
                        <span className="text-sm text-text-secondary">Risk score</span>
                        <span className="text-2xl font-semibold text-primary">{section.visual.score}</span>
                      </div>
                      <div className="mt-4 space-y-3">
                        {section.visual.items.map((item) => (
                          <div key={item} className="rounded-lg border border-border-default px-4 py-3 text-sm text-text-secondary">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {'prompt' in section.visual && (
                    <div className="mt-4 space-y-4">
                      <div className="rounded-lg border border-border-default bg-bg-elevated px-4 py-4 text-sm text-text-primary">
                        {section.visual.prompt}
                      </div>
                      <div className="rounded-lg border border-[rgba(212,168,85,0.3)] bg-primary/10 px-4 py-4 text-sm text-text-secondary">
                        {section.visual.answer}
                      </div>
                    </div>
                  )}
                  {'checklist' in section.visual && (
                    <div className="mt-4 space-y-4">
                      <div className="rounded-lg border border-border-default bg-bg-elevated px-4 py-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-secondary">Workspace compliance score</span>
                          <span className="text-xl font-semibold text-primary">{section.visual.progress}%</span>
                        </div>
                      </div>
                      {section.visual.checklist.map((item) => (
                        <div key={item.label} className="flex items-center justify-between rounded-lg border border-border-default px-4 py-3 text-sm">
                          <span className="text-text-primary">{item.label}</span>
                          <span className="text-text-secondary">{item.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {'timeline' in section.visual && (
                    <div className="mt-4 space-y-3">
                      {section.visual.timeline.map((item) => (
                        <div key={item} className="rounded-lg border border-border-default px-4 py-3 text-sm text-text-secondary">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                  {'templates' in section.visual && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {section.visual.templates.map((template) => (
                        <div key={template} className="rounded-lg border border-border-default bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                          {template}
                        </div>
                      ))}
                    </div>
                  )}
                  {'chart' in section.visual && (
                    <div className="mt-4 space-y-3">
                      {section.visual.chart.map((point) => (
                        <div key={point.month} className="flex items-center gap-3 rounded-lg border border-border-default px-4 py-3">
                          <span className="w-10 text-sm text-text-muted">{point.month}</span>
                          <div className="h-2 flex-1 rounded-full bg-bg-elevated">
                            <div className="h-2 rounded-full bg-primary" style={{ width: `${point.score}%` }} />
                          </div>
                          <span className="text-sm text-text-secondary">{point.score}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="surface-card p-8 text-center">
          <h2 className="font-serif text-5xl text-text-primary">Ready to transform your legal operations?</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/auth?tab=signup">
              <Button variant="primary" size="lg">
                Start Free Trial →
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" size="lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
