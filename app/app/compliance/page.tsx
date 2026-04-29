'use client';

import { useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Badge, Button, Card, Select } from '@/components/ui/primitives';
import { complianceItems, eastAfricanCountries, industries } from '@/lib/counselify-data';

const statusOrder = ['Todo', 'In Progress', 'Done'] as const;
type ChecklistStatus = (typeof statusOrder)[number];
type ChecklistItem = Omit<(typeof complianceItems)[number], 'status'> & { status: ChecklistStatus };

export default function CompliancePage() {
  const [jurisdiction, setJurisdiction] = useState('Kenya');
  const [industry, setIndustry] = useState('Technology');
  const [items, setItems] = useState<ChecklistItem[]>(
    complianceItems.map((item) => ({
      ...item,
      status: item.status as ChecklistStatus,
    }))
  );
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');

  const grouped = useMemo(() => {
    return items.reduce<Record<string, typeof items>>((accumulator, item) => {
      accumulator[item.category] = [...(accumulator[item.category] ?? []), item];
      return accumulator;
    }, {});
  }, [items]);

  const complete = items.filter((item) => item.status === 'Done').length;
  const score = Math.round((complete / items.length) * 100);

  function generateChecklist() {
    setGenerating(true);
    setMessage('');
    const refreshed = complianceItems.map((item) => ({
      ...item,
      status: item.status as ChecklistStatus,
    }));
    setItems(refreshed);
    setOpenCategory(null);
    setGenerating(false);
    setMessage(`Checklist generated for ${jurisdiction} • ${industry}.`);
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-primary">Compliance Hub</p>
            <h1 className="mt-3 font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">Control checklist workspace</h1>
            <p className="mt-3 max-w-2xl text-sm leading-[1.6] text-text-secondary">
              Generate, assign, and track the legal obligations that keep your organization compliant.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Select value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
              {eastAfricanCountries
                .filter((country) => country.code !== 'EAC')
                .map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
            </Select>
            <Select value={industry} onChange={(event) => setIndustry(event.target.value)}>
              {industries.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.key}
                </option>
              ))}
            </Select>
            <Button variant="primary" onClick={generateChecklist} loading={generating}>Generate Checklist</Button>
          </div>
        </div>
        {message ? <p className="text-sm text-accent-green">{message}</p> : null}

        <Card>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.08em] text-text-muted">Compliance score</p>
              <div className="mt-3 flex items-baseline gap-4">
                <p className="text-5xl font-semibold text-text-primary">{score}%</p>
                <p className="text-sm text-text-secondary">
                  for {jurisdiction} · {industry}
                </p>
              </div>
              <p className="mt-3 text-sm text-text-secondary">Trend vs last month: +6 points from improved tax and employment controls.</p>
            </div>
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-[12px] border-primary/20 border-t-primary text-3xl font-semibold text-primary">
              {score}%
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {Object.entries(grouped).map(([category, categoryItems]) => {
            const open = openCategory === category || openCategory === null;
            return (
              <Card key={category}>
                <button type="button" className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpenCategory(open ? null : category)}>
                  <div>
                    <h2 className="text-card font-semibold text-text-primary">{category}</h2>
                    <p className="text-sm text-text-secondary">
                      {categoryItems.filter((item) => item.status === 'Done').length}/{categoryItems.length} complete
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="info">{categoryItems.length} tasks</Badge>
                    <ChevronDown className={`h-5 w-5 text-text-secondary transition-transform ${open ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {open ? (
                  <div className="mt-4 space-y-3">
                    {categoryItems.map((item) => (
                      <SwipeableChecklistItem
                        key={item.id}
                        item={item}
                        onAdvance={() =>
                          setItems((current) =>
                            current.map((entry) =>
                              entry.id === item.id
                                ? { ...entry, status: statusOrder[(statusOrder.indexOf(entry.status) + 1) % statusOrder.length] }
                                : entry
                            )
                          )
                        }
                      />
                    ))}
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

function SwipeableChecklistItem({
  item,
  onAdvance,
}: {
  item: ChecklistItem;
  onAdvance: () => void;
}) {
  const startX = useRef<number | null>(null);

  return (
    <div
      className="rounded-3xl border border-border-default bg-bg-elevated p-4"
      onTouchStart={(event) => {
        startX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = startX.current;
        const end = event.changedTouches[0]?.clientX ?? null;
        if (start !== null && end !== null && end - start > 44) {
          onAdvance();
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={onAdvance}
          className={`interactive-target mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
            item.status === 'Done' ? 'border-accent-green bg-accent-green text-white' : 'border-border-default bg-bg-surface'
          }`}
        >
          {item.status === 'Done' ? '✓' : ''}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-text-primary">{item.title}</p>
            <Badge variant={item.status === 'Done' ? 'success' : item.status === 'In Progress' ? 'warning' : 'info'}>{item.status}</Badge>
          </div>
          <p className="mt-2 text-sm text-text-secondary">Due {item.dueDate}</p>
          <p className="mt-1 text-sm text-text-muted">
            {item.jurisdiction} · {item.assignee}
          </p>
        </div>
      </div>
    </div>
  );
}
