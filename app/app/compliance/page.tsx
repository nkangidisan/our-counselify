'use client';

import { useMemo, useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Badge, Button, Select } from '@/components/ui/primitives';
import { complianceItems, eastAfricanCountries, industries } from '@/lib/counselify-data';

const statusOrder = ['Todo', 'In Progress', 'Done'] as const;

export default function CompliancePage() {
  const [jurisdiction, setJurisdiction] = useState('Kenya');
  const [industry, setIndustry] = useState('Technology');
  const [items, setItems] = useState(
    complianceItems.map((item) => ({
      ...item,
      status: item.status as (typeof statusOrder)[number],
    })),
  );

  const grouped = useMemo(() => {
    return items.reduce<Record<string, typeof items>>((accumulator, item) => {
      accumulator[item.category] = [...(accumulator[item.category] ?? []), item];
      return accumulator;
    }, {});
  }, [items]);

  const complete = items.filter((item) => item.status === 'Done').length;
  const score = Math.round((complete / items.length) * 100);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-accent-gold">Compliance Hub</p>
            <h1 className="mt-3 font-serif text-5xl text-white">Control checklist workspace</h1>
            <p className="mt-3 max-w-2xl text-text-secondary">Generate, assign, and track the legal obligations that keep your organization compliant.</p>
          </div>
          <div className="flex gap-3">
            <Select value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)} className="min-w-[170px]">
              {eastAfricanCountries
                .filter((country) => country.code !== 'EAC')
                .map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
            </Select>
            <Select value={industry} onChange={(event) => setIndustry(event.target.value)} className="min-w-[170px]">
              {industries.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.key}
                </option>
              ))}
            </Select>
            <Button variant="primary">Generate Checklist</Button>
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Compliance score banner</p>
              <div className="mt-3 flex items-baseline gap-4">
                <p className="text-6xl font-semibold text-white">{score}%</p>
                <p className="text-text-secondary">for {jurisdiction} • {industry}</p>
              </div>
              <p className="mt-3 text-text-secondary">Trend vs last month: +6 points from improved tax and employment controls.</p>
            </div>
            <div className="flex h-36 w-36 items-center justify-center rounded-full border-[14px] border-primary/25 border-t-primary">
              <span className="text-3xl font-semibold text-white">{score}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(grouped).map(([category, categoryItems]) => (
            <div key={category} className="glass-panel rounded-[32px] p-5">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{category}</h2>
                  <p className="text-sm text-text-secondary">
                    {categoryItems.filter((item) => item.status === 'Done').length}/{categoryItems.length} complete
                  </p>
                </div>
                <Badge variant="info">{categoryItems.length} tasks</Badge>
              </div>
              <div className="space-y-3">
                {categoryItems.map((item) => {
                  const overdue = item.dueDate < '2026-10-10' && item.status !== 'Done';
                  return (
                    <div
                      key={item.id}
                      className={`rounded-[24px] border px-4 py-4 ${
                        overdue ? 'border-rose-500/25 bg-rose-500/10' : 'border-white/10 bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex items-start gap-4">
                          <button
                            className={`mt-1 h-5 w-5 rounded-full border ${
                              item.status === 'Done' ? 'border-emerald-400 bg-emerald-400' : 'border-white/20 bg-transparent'
                            }`}
                            onClick={() =>
                              setItems((current) =>
                                current.map((entry) =>
                                  entry.id === item.id
                                    ? { ...entry, status: statusOrder[(statusOrder.indexOf(entry.status) + 1) % statusOrder.length] }
                                    : entry,
                                ),
                              )
                            }
                          />
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-medium text-white">{item.title}</p>
                              {overdue && <Badge variant="error">OVERDUE</Badge>}
                            </div>
                            <p className="mt-2 text-sm text-text-secondary">
                              {item.jurisdiction} • {item.assignee} • Due {item.dueDate}
                            </p>
                          </div>
                        </div>
                        <Badge variant={item.status === 'Done' ? 'success' : item.status === 'In Progress' ? 'warning' : 'info'}>{item.status}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-[32px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Compliance heatmap</h2>
            <p className="text-sm text-text-secondary">Rows are categories, columns are months.</p>
          </div>
          <div className="grid gap-3">
            {Object.keys(grouped).map((category) => (
              <div key={category} className="grid grid-cols-[180px,repeat(6,minmax(0,1fr))] items-center gap-2">
                <p className="text-sm text-text-secondary">{category}</p>
                {[62, 75, 80, 68, 88, 92].map((scoreValue, index) => (
                  <div
                    key={`${category}-${index}`}
                    className="h-10 rounded-xl"
                    style={{
                      backgroundColor:
                        scoreValue > 85 ? 'rgba(16,185,129,0.7)' : scoreValue > 70 ? 'rgba(16,185,129,0.35)' : scoreValue > 55 ? 'rgba(245,158,11,0.45)' : 'rgba(244,63,94,0.55)',
                    }}
                    title={`${category} score ${scoreValue}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
