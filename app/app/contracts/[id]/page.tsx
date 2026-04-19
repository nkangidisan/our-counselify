'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Copy, Gauge, Timer } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { AppLayout } from '@/components/layout/app-layout';
import { Badge, Button, Card } from '@/components/ui/primitives';
import { getContractById, getContractDetail } from '@/lib/counselify-data';

const tabs = ['Document', 'Summary', 'Clauses', 'Risks', 'Redlines', 'Obligations'] as const;

export default function ContractDetailPage() {
  const params = useParams<{ id: string }>();
  const contractId = params?.id ?? 'safaricom-distribution';
  const contract = getContractById(contractId) ?? getContractById('safaricom-distribution');
  const details = getContractDetail(contract?.id ?? 'default');
  const [tab, setTab] = useState<(typeof tabs)[number]>('Summary');

  const riskChart = useMemo(
    () =>
      [
        { name: 'Critical', value: details.risks.filter((risk) => risk.severity === 'critical').length, color: '#B91C1C' },
        { name: 'High', value: details.risks.filter((risk) => risk.severity === 'high').length, color: '#B45309' },
        { name: 'Medium', value: details.risks.filter((risk) => risk.severity === 'medium').length, color: '#B8860B' },
        { name: 'Low', value: details.risks.filter((risk) => risk.severity === 'low').length, color: '#15803D' },
      ].filter((item) => item.value > 0),
    [details.risks]
  );

  if (!contract) return null;

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-primary">Contract detail</p>
            <h1 className="mt-2 font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">{contract.name}</h1>
          </div>
          <Badge variant={contract.riskScore > 70 ? 'error' : contract.riskScore > 40 ? 'warning' : 'success'}>Risk {contract.riskScore}</Badge>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
                tab === item ? 'border-border-gold bg-primary/10 text-primary' : 'border-border-default bg-bg-surface text-text-secondary'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className={`${tab === 'Document' || tab === 'Clauses' || tab === 'Summary' ? 'block' : 'hidden'} lg:block`}>
            <Card className="h-full">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-text-muted">Document</p>
                  <p className="mt-2 text-lg font-semibold text-text-primary">{contract.counterparty}</p>
                </div>
                <div className="text-sm text-text-secondary">{contract.jurisdiction}</div>
              </div>
              <div className="clause-block max-h-[70vh] overflow-auto p-4 font-mono text-[13px] leading-6">
                {details.clauses.map((clause) => (
                  <div key={clause.title} className="mb-4 rounded-lg border border-border-default bg-bg-surface p-4 last:mb-0">
                    <p className="text-xs uppercase tracking-[0.08em] text-text-muted">{clause.category}</p>
                    <p className="mt-2 font-semibold text-text-primary">{clause.title}</p>
                    <p className="mt-2 text-text-secondary">{clause.excerpt || 'Clause not found in uploaded document.'}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className={`${tab !== 'Document' ? 'block' : 'hidden'} lg:block`}>
            <Card className="h-full">
              {tab === 'Summary' && (
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {[
                      ['Parties', contract.counterparty],
                      ['Effective Date', contract.effectiveDate],
                      ['Expiry', contract.expiryDate],
                      ['Governing Law', contract.governingLaw],
                      ['Jurisdiction', contract.jurisdiction],
                      ['Contract Type', contract.contractType],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-border-default bg-bg-elevated p-4">
                        <p className="text-xs uppercase tracking-[0.08em] text-text-muted">{label}</p>
                        <p className="mt-2 text-sm font-semibold text-text-primary">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-3xl border border-border-default bg-bg-elevated p-6 text-center">
                    <Gauge className="mx-auto h-7 w-7 text-primary" />
                    <p className="mt-3 text-5xl font-semibold text-text-primary">{contract.riskScore}</p>
                    <p className="mt-2 text-sm text-text-secondary">Overall risk score</p>
                  </div>
                  <div className="space-y-3">
                    {details.plainEnglishSummary.map((sentence) => (
                      <div key={sentence} className="rounded-2xl border border-border-default bg-bg-elevated p-4 text-sm text-text-secondary">
                        {sentence}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'Clauses' && (
                <div className="space-y-4">
                  {details.clauses.map((clause) => (
                    <div key={clause.title} className="rounded-3xl border border-border-default bg-bg-elevated p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.08em] text-text-muted">{clause.category}</p>
                          <p className="mt-2 text-lg font-semibold text-text-primary">{clause.title}</p>
                        </div>
                        {clause.missing ? <Badge variant="error">Not found</Badge> : null}
                      </div>
                      <p className="mt-4 clause-block p-4 font-mono text-[13px]">{clause.excerpt || 'No direct extract available.'}</p>
                      <p className="mt-4 text-sm text-text-secondary">{clause.interpretation}</p>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'Risks' && (
                <div className="space-y-4">
                  <div className="grid gap-4 xl:grid-cols-[0.8fr,1.2fr]">
                    <div className="rounded-3xl border border-border-default bg-bg-elevated p-4">
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={riskChart} dataKey="value" innerRadius={50} outerRadius={76}>
                              {riskChart.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'var(--bg-surface)',
                                border: '1px solid var(--border)',
                                borderRadius: 16,
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {details.risks.map((risk) => (
                        <div key={`${risk.clauseReference}-${risk.description}`} className="rounded-3xl border border-border-default bg-bg-elevated p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs uppercase tracking-[0.08em] text-text-muted">{risk.clauseReference}</p>
                              <p className="mt-2 font-semibold text-text-primary">{risk.description}</p>
                              <p className="mt-3 text-sm text-text-secondary">{risk.action}</p>
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
                    <div key={item.original} className="rounded-3xl border border-border-default bg-bg-elevated p-5">
                      <p className="text-xs uppercase tracking-[0.08em] text-text-muted">Suggested change {index + 1}</p>
                      <p className="mt-4 rounded-2xl border border-accent-red/20 bg-[var(--accent-red-subtle)] p-4 text-sm text-accent-red line-through">{item.original}</p>
                      <p className="mt-4 rounded-2xl border border-accent-green/20 bg-[var(--accent-green-subtle)] p-4 text-sm text-accent-green">{item.replacement}</p>
                      <p className="mt-4 text-sm text-text-secondary">{item.rationale}</p>
                      <Button className="mt-4" variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                        Copy Suggestion
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'Obligations' && (
                <div className="space-y-4">
                  {details.obligations.map((item) => (
                    <div key={item.label} className="rounded-3xl border border-border-default bg-bg-elevated p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                            <Timer className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-text-primary">{item.label}</p>
                            <p className="mt-1 text-sm text-text-secondary">{item.owner}</p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <Badge variant={item.status === 'Done' ? 'success' : item.status === 'In Progress' ? 'warning' : 'info'}>{item.status}</Badge>
                          <p className="mt-2 text-sm text-text-secondary">{item.dueDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
