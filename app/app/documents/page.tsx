'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, FileText, Save, Send } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Badge, Button, Input, Select, TextArea } from '@/components/ui/primitives';
import { documentTemplates, savedDocuments } from '@/lib/counselify-data';

const categories = ['All', 'Corporate', 'Contracts', 'Employment', 'Data Protection', 'Finance', 'IP', 'Real Estate', 'Compliance', 'Litigation', 'Tech', 'Trade', 'NGOs', 'Energy', 'Healthcare'];

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof documentTemplates)[number] | null>(null);
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState('');

  const filteredTemplates = useMemo(
    () =>
      documentTemplates.filter(
        (template) =>
          (category === 'All' || template.category === category) &&
          template.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [category, search],
  );

  const generatePreview = () => {
    setStep(2);
    setPreview(
      `NON-DISCLOSURE AGREEMENT\n\nThis Agreement is made between LakeHub Growth Co. and Kampala Digital Ventures for the purpose of evaluating a cross-border technology partnership in Uganda.\n\n1. Confidential Information\nAll product roadmaps, source code references, customer pricing, and security architecture shared under this process remain confidential.\n\n2. Permitted Use\nThe receiving party may use the information solely to evaluate the contemplated partnership and must restrict access to employees or advisors with a clear need to know.\n\n3. Duration\nThis confidentiality obligation survives for three years from disclosure.\n\n4. Governing Law\nThis Agreement is governed by the laws of Uganda with disputes referred to arbitration in Kampala.\n`,
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-accent-gold">Document Generator</p>
          <h1 className="mt-3 font-serif text-5xl text-white">Template library and AI drafting</h1>
          <p className="mt-3 max-w-2xl text-text-secondary">Create jurisdiction-ready documents with guided variables, preview streaming, and export actions.</p>
        </div>

        <div className="glass-panel rounded-[28px] p-4">
          <div className="grid gap-4 lg:grid-cols-[1fr,260px]">
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search template library" />
            <Select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.slice(1, 11).map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-3 py-2 text-xs ${category === item ? 'bg-primary text-white' : 'border border-white/10 bg-white/[0.03] text-text-secondary'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => {
                setSelectedTemplate(template);
                setStep(1);
                setPreview('');
              }}
              className="glass-panel rounded-[32px] p-6 text-left transition hover:scale-[1.01]"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-primary/15 p-3 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold text-white">{template.name}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="info">{template.category}</Badge>
                <Badge variant="default">AI-Powered</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {template.jurisdictions.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-primary">Use Template</div>
            </button>
          ))}
        </div>

        <div className="glass-panel rounded-[32px] p-6">
          <h2 className="text-2xl font-semibold text-white">Saved documents</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-b border-white/10">
                <tr>
                  {['Name', 'Template Type', 'Created', 'Status', 'Actions'].map((header) => (
                    <th key={header} className="px-4 py-3 text-sm font-medium text-text-secondary">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {savedDocuments.map((document) => (
                  <tr key={document.id} className="border-b border-white/10 last:border-b-0">
                    <td className="px-4 py-4 font-medium text-white">{document.name}</td>
                    <td className="px-4 py-4 text-sm text-text-secondary">{document.type}</td>
                    <td className="px-4 py-4 text-sm text-text-secondary">{document.created}</td>
                    <td className="px-4 py-4">
                      <Badge variant="success">{document.status}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-xl"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="w-full max-w-4xl rounded-[32px] border border-white/10 bg-bg-surface p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Template detail</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">{selectedTemplate.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className={`h-2 w-10 rounded-full ${index <= step ? 'bg-primary' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>

              {step === 1 && (
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <Field label="Party A Name">
                    <Input defaultValue="LakeHub Growth Co." />
                  </Field>
                  <Field label="Party B Name">
                    <Input defaultValue="Kampala Digital Ventures" />
                  </Field>
                  <Field label="Purpose">
                    <TextArea rows={4} defaultValue="Evaluate a technology partnership for distribution and analytics services in Uganda." />
                  </Field>
                  <Field label="Duration">
                    <Input defaultValue="36 months" />
                  </Field>
                  <Field label="Jurisdiction">
                    <Select defaultValue="Uganda">
                      {selectedTemplate.jurisdictions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Confidentiality scope">
                    <TextArea rows={4} defaultValue="Commercial, technical, financial, customer, security, and source code related information." />
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                  <p className="mb-4 text-sm text-text-muted">Preview</p>
                  <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap font-mono text-sm leading-7 text-text-secondary">{preview}</pre>
                </div>
              )}

              {step === 3 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: 'Download PDF', Icon: Download },
                    { label: 'Download DOCX', Icon: Download },
                    { label: 'Save to Library', Icon: Save },
                    { label: 'Send for Review', Icon: Send },
                  ].map(({ label, Icon }) => {
                    return (
                      <button key={label} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-[rgba(99,102,241,0.35)]">
                        <Icon className="h-5 w-5 text-primary" />
                        <p className="mt-4 text-lg font-medium text-white">{label}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setStep((current) => Math.max(current - 1, 1))} disabled={step === 1}>
                  Back
                </Button>
                {step === 1 && (
                  <Button variant="primary" onClick={generatePreview}>
                    Generate Preview
                  </Button>
                )}
                {step === 2 && (
                  <Button variant="primary" onClick={() => setStep(3)}>
                    Continue to Actions
                  </Button>
                )}
                {step === 3 && (
                  <Button variant="primary" onClick={() => setSelectedTemplate(null)}>
                    Close
                  </Button>
                )}
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
