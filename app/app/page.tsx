'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  FileText,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Upload,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { AppLayout } from '@/components/layout/app-layout';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Badge, Button } from '@/components/ui/primitives';
import { complianceItems, complianceTrend, contracts, dashboardMetrics, regulatorySignals, riskDistribution } from '@/lib/counselify-data';

export default function DashboardPage() {
  const quickActions = [
    { href: '/app/contracts', title: 'Upload Contract', subtitle: 'Drag and drop or click to upload PDF/DOCX', icon: Upload, color: 'from-indigo-500 to-indigo-700' },
    { href: '/app/assistant', title: 'Ask AI Assistant', subtitle: 'Get instant legal guidance', icon: Sparkles, color: 'from-fuchsia-500 to-violet-700' },
    { href: '/app/documents', title: 'Generate Document', subtitle: '250+ templates ready', icon: FileText, color: 'from-emerald-500 to-cyan-600' },
    { href: '/app/compliance', title: 'Run Compliance Check', subtitle: 'Check against latest regulations', icon: ShieldAlert, color: 'from-amber-400 to-orange-600' },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-accent-gold">Dashboard</p>
            <h1 className="mt-3 font-serif text-5xl text-white">Legal control room</h1>
            <p className="mt-3 max-w-2xl text-text-secondary">
              Monitor contract exposure, compliance health, and regulatory movement across your East African footprint.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-text-secondary">
            Workspace focus: Kenya operations with Uganda and Tanzania watchlists enabled.
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Compliance Score" value={dashboardMetrics.complianceScore.value} suffix="/100" subtitle={dashboardMetrics.complianceScore.trend} accent="mint" />
          <MetricCard title="Active Contracts" value={dashboardMetrics.activeContracts.value} subtitle={dashboardMetrics.activeContracts.subtitle} accent="primary" />
          <MetricCard title="Open Risk Flags" value={dashboardMetrics.openRiskFlags.value} subtitle={dashboardMetrics.openRiskFlags.subtitle} accent="coral" />
          <MetricCard title="Deadlines This Month" value={dashboardMetrics.deadlinesThisMonth.value} subtitle={dashboardMetrics.deadlinesThisMonth.subtitle} accent="gold" />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="glass-panel rounded-[32px] p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Risk distribution</h2>
                <p className="text-sm text-text-secondary">Current contract risk portfolio by severity</p>
              </div>
              <Badge variant="warning">12 open flags</Badge>
            </div>
            <div className="h-[290px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskDistribution} dataKey="value" innerRadius={80} outerRadius={110} paddingAngle={4}>
                    {riskDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0D1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {riskDistribution.map((item) => (
                <div key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-secondary">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <p className="text-lg font-medium text-white">{item.value} contracts</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[32px] p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Compliance score trend</h2>
                <p className="text-sm text-text-secondary">Six-month movement across your operational controls</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={complianceTrend}>
                  <defs>
                    <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ backgroundColor: '#0D1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18 }} />
                  <Area type="monotone" dataKey="score" stroke="#6366F1" fill="url(#trendFill)" strokeWidth={3} />
                  <Line type="monotone" dataKey="score" stroke="#A5B4FC" dot={{ fill: '#A5B4FC', r: 4 }} strokeWidth={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="glass-panel rounded-[32px] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Upcoming deadlines</h2>
              <Link href="/app/compliance" className="text-sm text-primary">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {complianceItems.slice(0, 5).map((item) => (
                <div key={item.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 h-10 w-1 rounded-full ${
                          item.status === 'Todo' ? 'bg-accent-coral' : item.status === 'In Progress' ? 'bg-accent-amber' : 'bg-accent-mint'
                        }`}
                      />
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-sm text-text-secondary">
                          {item.category} • {item.jurisdiction} • {item.assignee}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right text-sm text-text-secondary">
                        <p>{item.dueDate}</p>
                        <p className="text-text-muted">Due date</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Open
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[32px] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Regulatory feed</h2>
              <Link href="/app/forecaster" className="text-sm text-primary">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {regulatorySignals.slice(0, 4).map((signal) => (
                <div key={signal.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-text-muted">
                          {signal.jurisdiction}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-text-muted">
                          {signal.dateRange}
                        </span>
                      </div>
                      <p className="mt-3 font-medium text-white">{signal.title}</p>
                      <p className="mt-2 text-sm text-text-secondary">{signal.summary}</p>
                    </div>
                    <Badge variant={signal.impact === 'Critical' ? 'error' : signal.impact === 'High' ? 'warning' : 'info'}>
                      {signal.impact}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Quick actions</h2>
            <p className="text-sm text-text-secondary">Move from analysis to execution in one click.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div key={action.href} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                  <Link href={action.href} className="group block rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-6 transition hover:scale-[1.01] hover:border-[rgba(99,102,241,0.35)]">
                    <div className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${action.color} p-3 text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xl font-semibold text-white">{action.title}</p>
                    <p className="mt-2 text-sm text-text-secondary">{action.subtitle}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm text-primary">
                      Open
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  accent,
  suffix = '',
}: {
  title: string;
  value: number;
  subtitle: string;
  accent: 'mint' | 'primary' | 'coral' | 'gold';
  suffix?: string;
}) {
  const accentMap = {
    mint: 'from-emerald-500/25 to-emerald-500/5 text-emerald-300',
    primary: 'from-primary/25 to-primary/5 text-primary',
    coral: 'from-rose-500/25 to-rose-500/5 text-rose-300',
    gold: 'from-amber-500/20 to-amber-500/5 text-amber-300',
  } as const;

  return (
    <div className="glass-panel rounded-[32px] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-text-secondary">{title}</p>
          <div className="mt-4 text-5xl font-semibold text-white">
            <AnimatedNumber value={value} />
            {suffix}
          </div>
          <p className="mt-3 text-sm text-text-secondary">{subtitle}</p>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br px-4 py-3 text-sm ${accentMap[accent]}`}>
          <CalendarDays className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
