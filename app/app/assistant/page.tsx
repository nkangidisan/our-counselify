'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, History, Paperclip, Pencil, Send, X } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button, Card, Input } from '@/components/ui/primitives';
import { assistantHistory, assistantStarters } from '@/lib/counselify-data';

type Message = { id: string; role: 'user' | 'assistant'; content: string };

const answerMap: Record<string, string> = {
  'Explain the force majeure clause in my Safaricom contract':
    'The force majeure clause excuses delay for events outside the parties’ control, but it is narrow on telecom outages and lacks a clear restoration timetable. Tighten it with a 48-hour notice period, mitigation reporting, and a termination right if disruption lasts beyond 30 days.',
  'What are GDPR-equivalent data protection requirements in Kenya?':
    'Kenya’s Data Protection Act requires a lawful basis, purpose limitation, processor controls, secure handling, and incident response steps. Keep a processing register, use processor clauses with vendors, and document cross-border safeguards before moving customer data.',
  'Draft an NDA for a tech partnership in Uganda':
    'Structure the NDA with a broad confidentiality definition, permitted-use restrictions, a three-year survival period, Uganda governing law, and carve-outs for information already known or independently developed. Add source-code and security restrictions if roadmaps will be shared.',
  "What's the penalty for late filing of VAT in Tanzania?":
    'Late VAT filing in Tanzania can trigger penalties, interest, and extra scrutiny depending on the tax period. Treat any late VAT return as a priority compliance event and validate the current TRA formula before filing.',
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const inputBarRef = useRef<HTMLDivElement | null>(null);

  const groupedHistory = useMemo(() => Object.entries(assistantHistory), []);

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleResize = () => {
      const nextOffset = Math.max(0, window.innerHeight - window.visualViewport!.height);
      setKeyboardOffset(nextOffset);
    };

    window.visualViewport.addEventListener('resize', handleResize);
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  const send = (message: string) => {
    if (!message.trim()) return;
    const response =
      answerMap[message] ??
      'Counselify can answer questions about contracts, compliance obligations, drafting, and regulatory exposure across East Africa. Ask a specific question and include the jurisdiction or contract name for the strongest answer.';

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', content: message },
      { id: `assistant-${Date.now() + 1}`, role: 'assistant', content: response },
    ]);
    setInput('');
    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="relative flex min-h-[calc(100vh-150px)] flex-col gap-4 xl:grid xl:grid-cols-[280px,1fr]">
        <aside className="hidden xl:block">
          <Card className="h-full overflow-auto">
            <Button className="w-full" variant="primary" onClick={() => setMessages([])}>
              New Chat
            </Button>
            <div className="mt-4 space-y-6">
              {groupedHistory.map(([group, items]) => (
                <div key={group}>
                  <p className="mb-3 text-xs uppercase tracking-[0.08em] text-text-muted">{group}</p>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <button key={item.id} type="button" className="w-full rounded-2xl border border-border-default bg-bg-elevated px-4 py-3 text-left">
                        <p className="truncate text-sm font-semibold text-text-primary">{item.title}</p>
                        <p className="mt-1 text-xs text-text-muted">{item.time}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </aside>

        <Card className="flex min-h-[calc(100vh-180px)] flex-col rounded-[28px] p-0">
          <div className="flex items-center justify-between border-b border-border-default px-4 py-4 md:px-6">
            <div>
              <h1 className="font-serif text-card font-semibold text-text-primary">AI Legal Assistant</h1>
              <p className="mt-1 text-sm text-text-secondary">Ask about contracts, obligations, drafting, and regional regulations.</p>
            </div>
            <button type="button" className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-elevated xl:hidden" onClick={() => setHistoryOpen(true)}>
              <History className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-auto px-4 py-5 md:px-6">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col justify-center">
                <div className="mx-auto mb-4 inline-flex rounded-full bg-primary/10 p-4 text-primary">
                  <Bot className="h-7 w-7" />
                </div>
                <h2 className="text-center font-serif text-section leading-[1.1] tracking-[-0.02em] text-text-primary">Good morning, Amina</h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-[1.6] text-text-secondary">
                  Start with a question about a contract, a compliance obligation, or a drafting task.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {assistantStarters.map((prompt) => (
                    <button key={prompt} type="button" onClick={() => send(prompt)} className="rounded-3xl border border-border-default bg-bg-elevated p-4 text-left">
                      <p className="text-sm font-semibold text-text-primary">{prompt}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl rounded-[24px] px-4 py-4 ${message.role === 'user' ? 'bg-primary text-white' : 'border border-border-default bg-bg-elevated text-text-secondary'}`}>
                      {message.role === 'assistant' ? (
                        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-text-muted">
                          <Bot className="h-4 w-4 text-primary" />
                          Counselify AI
                        </div>
                      ) : null}
                      <p className="whitespace-pre-wrap text-sm leading-[1.7]">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <div
          ref={inputBarRef}
          className="sticky-safe-bottom fixed inset-x-4 z-20 xl:left-[calc(280px+2rem)] xl:right-8"
          style={{ bottom: `${16 + keyboardOffset}px` }}
        >
          <div className="rounded-[28px] border border-border-default bg-bg-surface p-3 shadow-md">
            <div className="grid gap-3 sm:grid-cols-[auto,1fr,auto,auto] sm:items-center">
              <button type="button" className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-elevated">
                <Paperclip className="h-4 w-4" />
              </button>
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask anything about your contracts or obligations..."
                className="border-0 bg-transparent shadow-none"
              />
              <span className="hidden rounded-full border border-border-default bg-bg-elevated px-3 py-2 text-xs text-text-secondary sm:inline-flex">
                Kenya
              </span>
              <Button variant="primary" onClick={() => send(input)} disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMessages([])}
          className="sticky-safe-bottom fixed right-4 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-md xl:hidden"
        >
          <Pencil className="h-5 w-5" />
        </button>

        {historyOpen ? (
          <div className="fixed inset-0 z-30 xl:hidden">
            <button type="button" className="absolute inset-0 bg-black/30" onClick={() => setHistoryOpen(false)} />
            <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] border border-border-default bg-bg-surface p-4 shadow-md">
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border-default" />
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-primary">History</h2>
                <button type="button" className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-elevated" onClick={() => setHistoryOpen(false)}>
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-[50vh] overflow-auto space-y-4">
                {groupedHistory.map(([group, items]) => (
                  <div key={group}>
                    <p className="mb-2 text-xs uppercase tracking-[0.08em] text-text-muted">{group}</p>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-border-default bg-bg-elevated px-4 py-3">
                          <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                          <p className="mt-1 text-xs text-text-muted">{item.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </AppLayout>
  );
}
