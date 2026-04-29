'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Button, Input, Select } from '@/components/ui/primitives';
import { eastAfricanCountries } from '@/lib/counselify-data';

const allowedTypes = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const maxUploadSize = 10 * 1024 * 1024;

export default function ContractsUploadPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [counterparty, setCounterparty] = useState('');
  const [jurisdiction, setJurisdiction] = useState('Kenya');
  const [contractType, setContractType] = useState('Service Agreement');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const fileLabel = useMemo(() => {
    if (!file) return 'No file selected';
    return `${file.name} (${Math.ceil(file.size / 1024)} KB)`;
  }, [file]);

  async function submitUpload() {
    setStatus({ type: null, message: '' });

    if (!name.trim() || !counterparty.trim() || !file) {
      setStatus({ type: 'error', message: 'Contract name, counterparty, and file are required.' });
      return;
    }
    if (!allowedTypes.has(file.type)) {
      setStatus({ type: 'error', message: 'Only PDF and DOCX files are supported.' });
      return;
    }
    if (file.size > maxUploadSize) {
      setStatus({ type: 'error', message: 'File size must be 10MB or smaller.' });
      return;
    }
    setLoading(true);
    const response = await fetch('/api/contracts/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contractName: name.trim(),
        counterparty: counterparty.trim(),
        jurisdiction,
        contractType,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      }),
    });
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: 'error', message: 'Could not submit contract upload. Please try again.' });
      return;
    }

    setStatus({ type: 'success', message: 'Contract submitted for processing.' });
    router.push('/app/contracts');
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-primary">Contracts</p>
          <h1 className="mt-3 font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">Upload contract</h1>
          <p className="mt-3 text-sm leading-[1.6] text-text-secondary">Upload a PDF or DOCX (up to 10MB) to queue AI analysis and obligation extraction.</p>
        </div>

        {status.type ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-accent-green/20 bg-[var(--accent-green-subtle)] text-accent-green' : 'border-accent-red/20 bg-[var(--accent-red-subtle)] text-accent-red'}`}>
            {status.message}
          </div>
        ) : null}

        <div className="rounded-3xl border border-border-default bg-bg-surface p-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-text-primary">Contract name</span>
            <Input value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-text-primary">Counterparty</span>
            <Input value={counterparty} onChange={(event) => setCounterparty(event.target.value)} />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-text-primary">Jurisdiction</span>
              <Select value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
                {eastAfricanCountries.filter((country) => country.code !== 'EAC').map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-text-primary">Contract type</span>
              <Select value={contractType} onChange={(event) => setContractType(event.target.value)}>
                {['Service Agreement', 'NDA', 'Employment', 'Procurement', 'Partnership'].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-text-primary">Document file</span>
            <Input
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
            <span className="mt-2 block text-xs text-text-muted">{fileLabel}</span>
          </label>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => router.push('/app/contracts')}>
              Cancel
            </Button>
            <Button variant="primary" loading={loading} onClick={() => void submitUpload()}>
              Submit for Analysis
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
