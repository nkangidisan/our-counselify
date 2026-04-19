'use client';

import Link from 'next/link';
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ArrowRight, Sparkles, Upload, FileText, ShieldAlert } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Badge, Button, Card } from '@/components/ui/primitives';
import { complianceItems, complianceTrend, dashboardMetrics, regulatorySignals, riskDistribution } from '@/lib/counselify-data';

const chartTooltip = {
  contentStyle: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 16,
    boxShadow: 'var(--shadow-md)',
  },
};

export default function DashboardPage() {
  const quickActions = [
    { href: '/app/contracts', title: 'Upload Contract', subtitle: 'Review a new PDF or DOCX', icon: Upload },
    { href: '/app/assistant', title: 'Ask AI Assistant', subtitle: 'Get drafting and clause help', icon: Sparkles },
    { href: '/app/documents', title: 'Generate Document', subtitle: 'Start from a template', icon: FileText },
    { href: '/app/compliance', title: 'Run Compliance Check', subtitle: 'Refresh your obligation list', icon: ShieldAlert },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-primary">Dashboard</p>
            <h1 className="mt-3 font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">Legal control room</h1>
            <p className="mt-3 max-w-2xl text-sm leading-[1.6] text-text-secondary">
              Monitor contract exposure, compliance health, and regulatory movement across your East African footprint.
            </p>
          </div>
          <div className="rounded-3xl border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-secondary shadow-sm">
            Workspace focus: Kenya operations with Uganda and Tanzania watchlists enabled.
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <MetricCard title="Compliance" value={dashboardMetrics.complianceScore.value} subtitle="+6 this month" />
          <MetricCard title="Contracts" value={dashboardMetrics.activeContracts.value} subtitle="active" />
          <MetricCard title="Risk Flags" value={dashboardMetrics.openRiskFlags.value} subtitle="open" />
          <MetricCard title="Deadlines" value={dashboardMetrics.deadlinesThisMonth.value} subtitle="this month" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-card font-semibold text-text-primary">Risk distribution</h2>
                <p className="text-sm text-text-secondary">Current contract risk portfolio</p>
              </div>
              <Badge variant="warning">12 open flags</Badge>
            </div>
            <div className="h-[220px] md:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskDistribution} dataKey="value" innerRadius={52} outerRadius={80} paddingAngle={4}>
                    {riskDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip {...chartTooltip} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {riskDistribution.map((item) => (
                <div key={item.name} className="rounded-2xl border border-border-default bg-bg-elevated px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-text-secondary">{item.name}</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-text-primary">{item.value} contracts</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-4">
              <h2 className="text-card font-semibold text-text-primary">Compliance score trend</h2>
              <p className="text-sm text-text-secondary">Six-month movement across your controls</p>
            </div>
            <div className="h-[220px] md:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={complianceTrend}>
                  <defs>
                    <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip {...chartTooltip} />
                  <Area type="monotone" dataKey="score" stroke="var(--primary)" fill="url(#trendFill)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-card font-semibold text-text-primary">Upcoming deadlines</h2>
              <Link href="/app/compliance" className="text-sm font-semibold text-primary">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {complianceItems.slice(0, 4).map((item) => (
                <div key={item.id} className="rounded-2xl border border-border-default bg-bg-elevated px-4 py-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {item.category} · {item.jurisdiction} · {item.assignee}
                      </p>
                    </div>
                    <div className="text-sm text-text-secondary">{item.dueDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-card font-semibold text-text-primary">Regulatory feed</h2>
              <Link href="/app/forecaster" className="text-sm font-semibold text-primary">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {regulatorySignals.slice(0, 4).map((signal) => (
                <div key={signal.id} className="rounded-2xl border border-border-default bg-bg-elevated px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-border-default bg-bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-text-muted">
                          {signal.jurisdiction}
                        </span>
                        <span className="rounded-full border border-border-default bg-bg-surface px-3 py-1 text-[11px] text-text-muted">
                          {signal.dateRange}
                        </span>
                      </div>
                      <p className="mt-3 font-semibold text-text-primary">{signal.title}</p>
                      <p className="mt-2 text-sm text-text-secondary">{signal.summary}</p>
                    </div>
                    <Badge variant={signal.impact === 'Critical' ? 'error' : signal.impact === 'High' ? 'warning' : 'info'}>{signal.impact}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-card font-semibold text-text-primary">Quick actions</h2>
            <p className="text-sm text-text-secondary">Move from analysis to execution quickly.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <Card hover className="h-full">
                    <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-text-primary">{action.title}</p>
                    <p className="mt-2 text-sm text-text-secondary">{action.subtitle}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Open
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function MetricCard({ title, value, subtitle }: { title: string; value: number; subtitle: string }) {
  return (
    <Card className="min-h-[124px] p-4 md:p-5">
      <p className="text-sm text-text-secondary">{title}</p>
      <div className="mt-3 text-4xl font-semibold text-text-primary">
        <AnimatedNumber value={value} />
      </div>
      <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>
    </Card>
  );
}
