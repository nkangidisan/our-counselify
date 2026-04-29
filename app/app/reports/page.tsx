'use client';

import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AnimatePresence, motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Badge, Button } from '@/components/ui/primitives';
import {
  reportActivity,
  reportCompliance,
  reportDeadlines,
  reportJurisdictions,
  reportRiskTrend,
  topRiskCategories,
} from '@/lib/counselify-data';

export default function ReportsPage() {
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  function downloadCsv() {
    const rows = [
      ['month', 'low', 'medium', 'high', 'critical'],
      ...reportRiskTrend.map((item) => [item.month, String(item.low), String(item.medium), String(item.high), String(item.critical)]),
      [],
      ['month', 'compliance_score'],
      ...reportCompliance.map((item) => [item.month, String(item.score)]),
      [],
      ['month', 'deadlines_hit', 'deadlines_missed'],
      ...reportDeadlines.map((item) => [item.month, String(item.hit), String(item.missed)]),
      [],
      ['jurisdiction', 'risk'],
      ...reportJurisdictions.map((item) => [item.jurisdiction, String(item.risk)]),
    ];

    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `counselify-report-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  function handleExport() {
    setExporting(true);
    downloadCsv();
    setExporting(false);
    setExportOpen(false);
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-accent-gold">Reports</p>
            <h1 className="mt-3 font-serif text-5xl text-white">Risk, compliance, and activity analytics</h1>
            <p className="mt-3 max-w-2xl text-text-secondary">Track legal operations performance over time and export audit-ready reporting packs.</p>
          </div>
          <div className="flex gap-3">
            <input type="date" defaultValue="2026-01-01" className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-secondary outline-none" />
            <Button variant="ghost" onClick={() => setExportOpen(true)}>
              Export PDF
            </Button>
            <Button variant="primary" onClick={() => setExportOpen(true)}>
              Export CSV
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <ChartCard title="Contract risk trend">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={reportRiskTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ backgroundColor: '#0D1220', borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)' }} />
                <Area type="monotone" dataKey="low" stackId="1" fill="#10B981" stroke="#10B981" />
                <Area type="monotone" dataKey="medium" stackId="1" fill="#F59E0B" stroke="#F59E0B" />
                <Area type="monotone" dataKey="high" stackId="1" fill="#FB7185" stroke="#FB7185" />
                <Area type="monotone" dataKey="critical" stackId="1" fill="#F43F5E" stroke="#F43F5E" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Compliance score over time">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={reportCompliance}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0D1220', borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)' }} />
                <Line type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} dot={{ fill: '#6366F1', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Deadlines hit vs missed">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={reportDeadlines}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ backgroundColor: '#0D1220', borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)' }} />
                <Bar dataKey="hit" fill="#10B981" radius={[10, 10, 0, 0]} />
                <Bar dataKey="missed" fill="#F43F5E" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Risk distribution by jurisdiction">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={reportJurisdictions} layout="vertical">
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis type="number" stroke="#94A3B8" />
                <YAxis type="category" dataKey="jurisdiction" stroke="#94A3B8" />
                <Tooltip contentStyle={{ backgroundColor: '#0D1220', borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)' }} />
                <Bar dataKey="risk" radius={[0, 10, 10, 0]}>
                  {reportJurisdictions.map((entry) => (
                    <Cell key={entry.jurisdiction} fill={entry.risk > 55 ? '#F43F5E' : entry.risk > 40 ? '#F59E0B' : '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
          <div className="glass-panel rounded-[32px] p-6">
            <h2 className="text-2xl font-semibold text-white">Document generation activity</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {reportActivity.map((item) => (
                <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-text-secondary">{item.label}</p>
                  <div className="mt-5 flex items-end gap-2">
                    {item.value.map((value, index) => (
                      <div key={`${item.label}-${index}`} className="flex-1 rounded-t-xl bg-primary/60" style={{ height: `${value * 8}px` }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[32px] p-6">
            <h2 className="text-2xl font-semibold text-white">Top risk categories</h2>
            <div className="mt-5 space-y-4">
              {topRiskCategories.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{item.name}</span>
                    <span className="text-white">{item.value}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#6366F1,#F59E0B)]" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {exportOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-xl"
            onClick={() => setExportOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="w-full max-w-xl rounded-[32px] border border-white/10 bg-bg-surface p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="text-3xl font-semibold text-white">Export report</h2>
              <p className="mt-3 text-text-secondary">Preview what will be included in the next reporting pack.</p>
              <div className="mt-6 space-y-3">
                {['Risk trend and jurisdiction breakdown', 'Compliance score and deadlines performance', 'Document generation activity and top risk categories'].map((item) => (
                  <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-secondary">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Badge variant="info">PDF</Badge>
                <Badge variant="success">CSV</Badge>
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setExportOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleExport} loading={exporting}>
                  <Download className="h-4 w-4" />
                  Confirm Export
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-panel rounded-[32px] p-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
