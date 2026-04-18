import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/layout/public-layout';
import { Button } from '@/components/ui/primitives';
import { getIndustryBySlug } from '@/lib/counselify-data';

export default function IndustryDetailPage({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug);

  if (!industry) {
    notFound();
  }

  return (
    <PublicLayout>
      <section className="border-b border-border-default bg-bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm text-text-muted">
            <Link href="/" className="hover:text-text-primary">
              Home
            </Link>{' '}
            {'>'}{' '}
            <Link href="/industries" className="hover:text-text-primary">
              Industries
            </Link>{' '}
            {'>'} {industry.name}
          </p>
          <h1 className="mt-4 font-serif text-[56px] text-text-primary">{industry.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-text-secondary">{industry.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Legal landscape</p>
          <h2 className="mt-4 font-serif text-5xl text-text-primary">Legal Challenges in {industry.name}</h2>
          <div className="mt-6 space-y-4">
            {industry.landscape.map((paragraph) => (
              <p key={paragraph} className="text-base text-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">How Counselify helps</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {industry.howItHelps.map((item) => (
              <div key={item.title} className="surface-card p-6">
                <h3 className="text-2xl font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.28em] text-primary">Key regulations covered</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {industry.regulations.map((regulation) => (
            <div key={regulation.name} className="surface-card p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-text-primary">{regulation.name}</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{regulation.jurisdiction}</span>
              </div>
              <p className="mt-3 text-sm text-text-secondary">{regulation.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Relevant document templates</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {industry.templates.map((template) => (
              <div key={template} className="surface-card p-5">
                <h3 className="text-xl font-semibold text-text-primary">{template}</h3>
                <div className="mt-5">
                  <Link href="/auth?tab=signup">
                    <Button variant="primary" size="sm">
                      Use Template
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="surface-card p-8 text-center">
          <h2 className="font-serif text-5xl text-text-primary">Start managing {industry.name} compliance with AI</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/auth?tab=signup">
              <Button variant="primary" size="lg">
                Start Free Trial →
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="ghost" size="lg">
                Explore All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
