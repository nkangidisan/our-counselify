'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Eye, MoreHorizontal, Search, Upload } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Badge, Button, Input, Select } from '@/components/ui/primitives';
import { contracts, eastAfricanCountries } from '@/lib/counselify-data';

const contractTypes = ['Distribution Agreement', 'Service Level Agreement', 'Supply Agreement', 'Software License', 'Payments Addendum'];

export default function ContractsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [risk, setRisk] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [page, setPage] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [stage, setStage] = useState(0);

  const filteredContracts = useMemo(() => {
    return contracts.filter((contract) => {
      const searchMatch =
        contract.name.toLowerCase().includes(search.toLowerCase()) ||
        contract.counterparty.toLowerCase().includes(search.toLowerCase());
      const statusMatch = !status || contract.status === status;
      const riskMatch =
        !risk ||
        (risk === 'low' && contract.riskScore < 40) ||
        (risk === 'medium' && contract.riskScore >= 40 && contract.riskScore <= 70) ||
        (risk === 'high' && contract.riskScore > 70);
      const jurisdictionMatch = !jurisdiction || contract.jurisdiction === jurisdiction;
      return searchMatch && statusMatch && riskMatch && jurisdictionMatch;
    });
  }, [jurisdiction, risk, search, status]);

  const paginated = filteredContracts.slice((page - 1) * 10, page * 10);

  const openUpload = (fileName?: string) => {
    setUploadOpen(true);
    setSelectedFile(fileName ?? '2026 Commercial Services Agreement.pdf');
    setStage(0);
  };

  const analyze = () => {
    setStage(1);
    window.setTimeout(() => setStage(2), 900);
    window.setTimeout(() => setStage(3), 1800);
  };

  return (
    <AppLayout>
      <div
        className="space-y-6"
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const file = event.dataTransfer.files?.[0];
          openUpload(file?.name);
        }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-accent-gold">Contracts</p>
            <h1 className="mt-3 font-serif text-5xl text-white">Contract workspace</h1>
            <p className="mt-3 max-w-2xl text-text-secondary">Search, filter, review, and analyze every agreement across your East African operations.</p>
          </div>
          <Button variant="primary" onClick={() => openUpload()}>
            <Upload className="h-4 w-4" />
            Upload Contract
          </Button>
        </div>

        <div className="glass-panel rounded-[28px] p-4">
          <div className="grid gap-4 xl:grid-cols-[1.4fr,repeat(4,0.8fr)]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search contract or counterparty" className="pl-10" />
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
              <option value="">Risk level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
            <Select value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
              <option value="">Jurisdiction</option>
              {eastAfricanCountries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </Select>
            <Input type="date" defaultValue="2026-04-18" />
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(13,18,32,0.78)] shadow-[0_24px_100px_rgba(0,0,0,0.35)]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr>
                  {['Contract Name', 'Counterparty', 'Jurisdiction', 'Risk Score', 'Status', 'Expiry Date', 'Actions'].map((header) => (
                    <th key={header} className="px-5 py-4 text-sm font-medium text-text-secondary">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((contract) => (
                  <tr key={contract.id} className="border-b border-white/10 last:border-b-0 hover:bg-white/[0.03]">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-white">{contract.name}</p>
                        <p className="text-sm text-text-muted">{contract.contractType}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{contract.counterparty}</td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{contract.jurisdiction}</td>
                    <td className="px-5 py-4">
                      <Badge variant={contract.riskScore < 40 ? 'success' : contract.riskScore <= 70 ? 'warning' : 'error'}>
                        {contract.riskScore}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{contract.status}</td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{contract.expiryDate}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/app/contracts/${contract.id}`} className="rounded-xl border border-white/10 p-2 text-text-secondary hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button className="rounded-xl border border-white/10 p-2 text-text-secondary hover:text-white">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="rounded-xl border border-white/10 p-2 text-text-secondary hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-text-secondary">
              Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, filteredContracts.length)} of {filteredContracts.length} contracts
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => setPage((current) => Math.max(current - 1, 1))}>
                Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={page * 10 >= filteredContracts.length}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {dragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/85 backdrop-blur-xl"
          >
            <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2 }} className="rounded-[36px] border-2 border-dashed border-primary bg-primary/10 px-12 py-16 text-center">
              <Upload className="mx-auto h-10 w-10 text-primary" />
              <p className="mt-4 text-2xl font-semibold text-white">Drop contract to upload</p>
              <p className="mt-2 text-text-secondary">Files will be stored securely and prepared for clause extraction.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {uploadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-xl"
            onClick={() => setUploadOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-bg-surface p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="text-3xl font-semibold text-white">Upload contract</h2>
              <p className="mt-2 text-text-secondary">Map the file, confirm its metadata, and launch contract intelligence.</p>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-text-muted">Selected file</p>
                <p className="mt-2 font-medium text-white">{selectedFile}</p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Contract name">
                  <Input defaultValue={selectedFile.replace(/\.[^.]+$/, '')} />
                </Field>
                <Field label="Counterparty">
                  <Input defaultValue="Safaricom PLC" />
                </Field>
                <Field label="Contract type">
                  <Select defaultValue={contractTypes[0]}>
                    {contractTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Jurisdiction">
                  <Select defaultValue="Kenya">
                    {eastAfricanCountries
                      .filter((country) => country.code !== 'EAC')
                      .map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                  </Select>
                </Field>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-3 flex items-center justify-between text-sm text-text-secondary">
                  <span>Analysis progress</span>
                  <span>{stage === 0 ? 'Waiting' : stage === 1 ? 'Extracting text...' : stage === 2 ? 'Analyzing clauses...' : 'Scoring risk...'}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#6366F1,#10B981)]" style={{ width: `${stage * 33}%` }} />
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setUploadOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={analyze}>
                  Analyze Now
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-text-primary">{label}</span>
      {children}
    </label>
  );
}
