'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { Download, Eye, Search, Trash2, Upload } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Badge, Button, Card, Input, Select } from '@/components/ui/primitives';
import { contracts, eastAfricanCountries } from '@/lib/counselify-data';

export default function ContractsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [risk, setRisk] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [openActions, setOpenActions] = useState<string | null>(null);

  const filteredContracts = useMemo(() => {
    return contracts.filter((contract) => {
      const matchesSearch =
        contract.name.toLowerCase().includes(search.toLowerCase()) || contract.counterparty.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !status || contract.status === status;
      const matchesRisk =
        !risk ||
        (risk === 'low' && contract.riskScore < 40) ||
        (risk === 'medium' && contract.riskScore >= 40 && contract.riskScore <= 70) ||
        (risk === 'high' && contract.riskScore > 70);
      const matchesJurisdiction = !jurisdiction || contract.jurisdiction === jurisdiction;
      return matchesSearch && matchesStatus && matchesRisk && matchesJurisdiction;
    });
  }, [jurisdiction, risk, search, status]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-primary">Contracts</p>
            <h1 className="mt-3 font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">Contract workspace</h1>
            <p className="mt-3 max-w-2xl text-sm leading-[1.6] text-text-secondary">
              Search, filter, and review every agreement across your East African operations.
            </p>
          </div>
          <Link href="/contracts/upload">
            <Button variant="primary">
              <Upload className="h-4 w-4" />
              Upload Contract
            </Button>
          </Link>
        </div>

        <Card>
          <div className="grid gap-3 xl:grid-cols-[1.4fr,repeat(4,0.8fr)]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search contract or counterparty" className="pl-11" />
            </div>
            <Select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">Status</option>
              {['Active', 'Compliant', 'Review', 'Critical', 'High Risk'].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Select value={risk} onChange={(event) => setRisk(event.target.value)}>
              <option value="">Risk</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
            <Select value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
              <option value="">Jurisdiction</option>
              {eastAfricanCountries
                .filter((country) => country.code !== 'EAC')
                .map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
            </Select>
            <Input type="date" defaultValue="2026-04-18" />
          </div>
        </Card>

        <div className="space-y-4 lg:hidden">
          {filteredContracts.map((contract) => (
            <SwipeableContractCard key={contract.id} contract={contract} open={openActions === contract.id} onToggle={(open) => setOpenActions(open ? contract.id : null)} />
          ))}
        </div>

        <div className="hidden overflow-hidden rounded-3xl border border-border-default bg-bg-surface shadow-sm lg:block">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-bg-elevated">
              <tr>
                {['Contract Name', 'Counterparty', 'Jurisdiction', 'Risk Score', 'Status', 'Expiry Date', 'Actions'].map((header) => (
                  <th key={header} className="px-5 py-4 font-medium text-text-secondary">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="border-t border-border-default">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-text-primary">{contract.name}</p>
                    <p className="text-sm text-text-secondary">{contract.contractType}</p>
                  </td>
                  <td className="px-5 py-4 text-text-secondary">{contract.counterparty}</td>
                  <td className="px-5 py-4 text-text-secondary">{contract.jurisdiction}</td>
                  <td className="px-5 py-4">
                    <Badge variant={contract.riskScore < 40 ? 'success' : contract.riskScore <= 70 ? 'warning' : 'error'}>{contract.riskScore}</Badge>
                  </td>
                  <td className="px-5 py-4 text-text-secondary">{contract.status}</td>
                  <td className="px-5 py-4 text-text-secondary">{contract.expiryDate}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/app/contracts/${contract.id}`} className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border-default bg-bg-elevated">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button type="button" className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border-default bg-bg-elevated">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}

function SwipeableContractCard({
  contract,
  open,
  onToggle,
}: {
  contract: (typeof contracts)[number];
  open: boolean;
  onToggle: (open: boolean) => void;
}) {
  const startX = useRef<number | null>(null);

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
        <Link href={`/app/contracts/${contract.id}`}>
          <Button variant="primary" size="sm">
            <Eye className="h-4 w-4" />
            View
          </Button>
        </Link>
        <Button variant="danger" size="sm">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
      <Link
        href={`/app/contracts/${contract.id}`}
        className={`block transition-transform duration-200 ${open ? '-translate-x-[132px]' : 'translate-x-0'}`}
        onTouchStart={(event) => {
          startX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = startX.current;
          const end = event.changedTouches[0]?.clientX ?? null;
          if (start === null || end === null) return;
          if (start - end > 40) onToggle(true);
          if (end - start > 40) onToggle(false);
        }}
      >
        <Card className="min-h-[156px]">
          <div className="flex items-start justify-between gap-3">
            <p className="line-clamp-2 font-semibold text-text-primary">{contract.name}</p>
            <Badge variant={contract.riskScore < 40 ? 'success' : contract.riskScore <= 70 ? 'warning' : 'error'}>{contract.riskScore}</Badge>
          </div>
          <p className="mt-3 text-sm text-text-secondary">{contract.counterparty} · {contract.jurisdiction}</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.08em] text-text-muted">Expiry</p>
              <p className="mt-1 text-sm font-medium text-text-primary">{contract.expiryDate}</p>
            </div>
            <Badge variant="info">{contract.status}</Badge>
          </div>
        </Card>
      </Link>
    </div>
  );
}
