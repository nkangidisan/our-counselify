'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Copy, Gauge, Timer } from 'lucide-react';
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AppLayout } from '@/components/layout/app-layout';
import { Badge, Button } from '@/components/ui/primitives';
import { getContractById, getContractDetail } from '@/lib/counselify-data';

const tabs = ['Summary', 'Clauses', 'Risks', 'Redlines', 'Obligations & Deadlines'] as const;

export default function ContractDetailPage() {
  const params = useParams<{ id: string }>();
  const contractId = params?.id ?? 'safaricom-distribution';
  const contract = getContractById(contractId) ?? getContractById('safaricom-distribution');
  const details = getContractDetail(contract?.id ?? 'default');
  const [tab, setTab] = useState<(typeof tabs)[number]>('Summary');
  const [streamIndex, setStreamIndex] = useState(0);

  useEffect(() => {
    setStreamIndex(0);
    const timer = window.setInterval(() => {
      setStreamIndex((current) => Math.min(current + 1, 5));
    }, 220);

    return () => window.clearInterval(timer);
  }, [contractId, tab]);

  const riskChart = useMemo(
    () => [
      { name: 'Critical', value: details.risks.filter((risk) => risk.severity === 'critical').length, color: '#F43F5E' },
      { name: 'High', value: details.risks.filter((risk) => risk.severity === 'high').length, color: '#FB7185' },
      { name: 'Medium', value: details.risks.filter((risk) => risk.severity === 'medium').length, color: '#F59E0B' },
      { name: 'Low', value: details.risks.filter((risk) => risk.severity === 'low').length, color: '#10B981' },
    ].filter((item) => item.value > 0),
    [details.risks],
  );

  if (!contract) return null;

  return (
    <AppLayout>
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="glass-panel rounded-[32px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Original document</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">{contract.name}</h1>
            </div>
            <Badge variant={contract.riskScore > 70 ? 'error' : contract.riskScore > 40 ? 'warning' : 'success'}>
              Risk {contract.riskScore}
            </Badge>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#F8FAFC] p-6 text-slate-900">
            <div className="space-y-5 text-sm leading-7">
              {details.clauses.map((clause, index) => (
                <div key={clause.title} className={`rounded-2xl px-4 py-3 ${tab === 'Clauses' && index < streamIndex ? 'bg-indigo-100/80 ring-2 ring-indigo-300' : 'bg-slate-100'}`}>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{clause.category}</p>
                  <p className="mt-2 font-semibold text-slate-900">{clause.title}</p>
                  <p className="mt-2 text-slate-700">{clause.excerpt || 'Clause not found in uploaded document.'}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {details.pages.map((page) => (
              <span key={page} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary">
                {page}
              </span>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-[32px] p-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {tabs.map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  tab === item ? 'bg-primary text-white shadow-[0_12px_32px_rgba(99,102,241,0.28)]' : 'border border-white/10 bg-white/[0.03] text-text-secondary'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="min-h-[640px]">
            {tab === 'Summary' && (
              <div className="space-y-6">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    ['Parties', contract.counterparty],
                    ['Effective Date', contract.effectiveDate],
                    ['Expiry', contract.expiryDate],
                    ['Governing Law', contract.governingLaw],
                    ['Jurisdiction', contract.jurisdiction],
                    ['Contract Type', contract.contractType],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-text-muted">{label}</p>
                      <p className="mt-2 text-sm font-medium text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 text-center">
                  <Gauge className="mx-auto h-7 w-7 text-primary" />
                  <p className="mt-3 text-5xl font-semibold text-white">{contract.riskScore}</p>
                  <p className="mt-2 text-text-secondary">Overall risk score</p>
                </div>
                <div className="space-y-3">
                  {details.plainEnglishSummary.slice(0, streamIndex).map((sentence) => (
                    <div key={sentence} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-text-secondary">
                      {sentence}
                    </div>
                  ))}
                  {streamIndex < 3 && <span className="inline-block animate-pulse text-primary">|</span>}
                </div>
              </div>
            )}

            {tab === 'Clauses' && (
              <div className="space-y-4">
                {details.clauses.map((clause, index) => (
                  <div key={clause.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-text-muted">{clause.category}</p>
                        <p className="mt-1 text-xl font-semibold text-white">{clause.title}</p>
                      </div>
                      {clause.missing && <Badge variant="error">Not Found</Badge>}
                    </div>
                    {index < streamIndex && (
                      <>
                        <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-mono text-sm text-text-secondary">{clause.excerpt || 'No direct extract available.'}</p>
                        <p className="mt-4 text-sm text-text-secondary">{clause.interpretation}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {tab === 'Risks' && (
              <div className="space-y-5">
                <div className="grid gap-5 xl:grid-cols-[0.8fr,1.2fr]">
                  <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-4">
                    <div className="h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={riskChart} dataKey="value" innerRadius={52} outerRadius={80}>
                            {riskChart.map((entry) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#0D1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {details.risks.map((risk, index) => (
                      <div key={`${risk.clauseReference}-${risk.description}`} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm text-text-muted">{risk.clauseReference}</p>
                            <p className="mt-2 font-medium text-white">{risk.description}</p>
                            {index < streamIndex && <p className="mt-3 text-sm text-text-secondary">{risk.action}</p>}
                          </div>
                          <Badge variant={risk.severity === 'critical' ? 'error' : risk.severity === 'high' ? 'warning' : risk.severity === 'medium' ? 'info' : 'success'}>
                            {risk.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'Redlines' && (
              <div className="space-y-4">
                {details.redlines.map((item, index) => (
                  <div key={item.original} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm text-text-muted">Suggested change {index + 1}</p>
                    <p className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200 line-through">{item.original}</p>
                    <p className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">{item.replacement}</p>
                    <p className="mt-4 text-sm text-text-secondary">{item.rationale}</p>
                    <Button className="mt-4" variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                      Copy Suggestion
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {tab === 'Obligations & Deadlines' && (
              <div className="space-y-4">
                {details.obligations.map((item) => (
                  <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-primary/15 p-3 text-primary">
                          <Timer className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{item.label}</p>
                          <p className="mt-1 text-sm text-text-secondary">{item.owner}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={item.status === 'Done' ? 'success' : item.status === 'In Progress' ? 'warning' : 'info'}>{item.status}</Badge>
                        <p className="mt-2 text-sm text-text-secondary">{item.dueDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
