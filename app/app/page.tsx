'use client';

import Link from 'next/link';
import { ArrowLeft, BellRing, Clock3, Construction, MailCheck } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button, Card } from '@/components/ui/primitives';

const launchSteps = [
  {
    title: 'Final launch preparation',
    description: 'We are polishing the dashboard experience to make sure the official release feels fast, clear, and dependable.',
    icon: Construction,
  },
  {
    title: 'Core features being staged',
    description: 'Contracts, compliance, forecasting, and assistant workflows are being prepared for the official launch.',
    icon: Clock3,
  },
  {
    title: 'Email notification queued',
    description: 'We will notify you by email as soon as the dashboard is officially available.',
    icon: MailCheck,
  },
] as const;

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="overflow-hidden rounded-[32px] border border-border-gold bg-[linear-gradient(135deg,rgba(184,134,11,0.14),rgba(184,134,11,0.04)_45%,transparent_100%)] p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border-gold bg-bg-surface/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                <BellRing className="h-3.5 w-3.5" />
                Launch update
              </span>
              <h1 className="mt-4 font-serif text-[2.4rem] leading-[1.02] tracking-[-0.03em] text-text-primary sm:text-[3.4rem]">
                The Counselify dashboard is currently under construction.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-[1.7] text-text-secondary sm:text-lg">
                We are putting the finishing touches on the official dashboard experience. We will notify you via email once it is ready to launch.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Return to Homepage
                  </Button>
                </Link>
                <Link href="/features" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="w-full max-w-md border-border-gold bg-bg-surface/90">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-text-muted">Launch status</p>
                  <h2 className="mt-2 text-card font-semibold text-text-primary">Official release in progress</h2>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-[10px] border-primary/20 border-t-primary text-lg font-semibold text-primary">
                  92
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-border-default bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                  Your account is active and ready for launch access.
                </div>
                <div className="rounded-2xl border border-border-default bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                  Dashboard notifications are queued for signed-in users.
                </div>
                <div className="rounded-2xl border border-border-default bg-bg-elevated px-4 py-3 text-sm text-text-secondary">
                  Public pages remain available while we finalize the app experience.
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {launchSteps.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="h-full">
                <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-card font-semibold text-text-primary">{item.title}</h2>
                <p className="mt-3 text-sm leading-[1.6] text-text-secondary">{item.description}</p>
              </Card>
            );
          })}
        </section>

        <section className="rounded-[32px] border border-border-default bg-bg-surface p-5 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.08em] text-primary">While you wait</p>
              <h2 className="mt-2 text-card font-semibold text-text-primary">You can still explore the Counselify experience.</h2>
              <p className="mt-3 text-sm leading-[1.6] text-text-secondary">
                Browse the homepage, product overview, industries, and pricing pages while we complete the dashboard rollout.
              </p>
            </div>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Back to homepage
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
