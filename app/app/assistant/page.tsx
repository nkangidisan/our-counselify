'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bot, Paperclip, Send } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button, Input } from '@/components/ui/primitives';
import { assistantHistory, assistantStarters } from '@/lib/counselify-data';

type Message = { id: string; role: 'user' | 'assistant'; content: string };

const answerMap: Record<string, string> = {
  'Explain the force majeure clause in my Safaricom contract':
    'The force majeure language excuses delay during events outside the parties’ control, but it is narrow on telecom network outages and lacks a clear service restoration timetable. For a Kenya distribution contract, I would tighten the clause by requiring notice within 48 hours, monthly mitigation reporting, and a termination right if the event lasts beyond 30 days.',
  'What are GDPR-equivalent data protection requirements in Kenya?':
    'Kenya’s Data Protection Act requires a lawful basis, clear purpose limitation, processor controls, secure handling, and reporting pathways for personal data incidents. In practice, you should maintain a processing register, sign processor clauses with vendors, and document cross-border transfer safeguards before moving customer data outside Kenya.',
  'Draft an NDA for a tech partnership in Uganda':
    'I would structure the NDA with a broad confidentiality definition, permitted-use restrictions, 3 year survival after termination, Uganda governing law, and a carve-out for information already known or independently developed. Add data security and source code access restrictions if the partnership includes shared product roadmaps.',
  "What's the penalty for late filing of VAT in Tanzania?":
    'Late VAT filing in Tanzania can trigger penalties, interest, and additional scrutiny depending on the return period and assessed tax exposure. Your finance team should validate the current TRA computation formula for the filing period, but operationally you should treat any late VAT return as a priority compliance event and preserve supporting schedules for review.',
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streamingMessage, setStreamingMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const groupedHistory = useMemo(() => Object.entries(assistantHistory), []);

  useEffect(() => {
    if (!loading || !streamingMessage) return;
    const response = answerMap[streamingMessage] ?? 'Counselify can answer questions about contracts, compliance obligations, document drafting, and regulatory exposure across East Africa. Ask a specific question and include the jurisdiction or contract name for the most useful result.';
    let index = 0;
    const timer = window.setInterval(() => {
      index += 6;
      setMessages((current) => {
        const next = [...current];
        const last = next[next.length - 1];
        if (last?.role === 'assistant') {
          last.content = response.slice(0, index);
        }
        return next;
      });

      if (index >= response.length) {
        window.clearInterval(timer);
        setLoading(false);
      }
    }, 30);

    return () => window.clearInterval(timer);
  }, [loading, streamingMessage]);

  const send = (message: string) => {
    if (!message.trim()) return;
    const nextMessages: Message[] = [
      ...messages,
      { id: `user-${Date.now()}`, role: 'user', content: message },
      { id: `assistant-${Date.now() + 1}`, role: 'assistant', content: '' },
    ];
    setMessages(nextMessages);
    setInput('');
    setStreamingMessage(message);
    setLoading(true);
  };

  return (
    <AppLayout>
      <div className="grid h-[calc(100vh-170px)] gap-6 xl:grid-cols-[280px,1fr]">
        <aside className="hidden h-full flex-col gap-4 xl:flex">
          <Button className="justify-center" variant="primary" onClick={() => setMessages([])}>
            New Chat
          </Button>
          <div className="glass-panel h-full overflow-auto rounded-[32px] p-4">
            {groupedHistory.map(([group, items]) => (
              <div key={group} className="mb-6 last:mb-0">
                <p className="mb-3 text-xs uppercase tracking-[0.24em] text-text-muted">{group}</p>
                <div className="space-y-2">
                  {items.map((item) => (
                    <button key={item.id} className="w-full rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:border-[rgba(99,102,241,0.35)]">
                      <p className="truncate text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-text-muted">{item.time}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="glass-panel flex h-full flex-col rounded-[32px]">
          <div className="border-b border-white/10 px-6 py-5">
            <h1 className="font-serif text-4xl text-white">AI Legal Assistant</h1>
            <p className="mt-2 text-text-secondary">Ask about your contracts, obligations, legal drafting, and East African regulatory exposure.</p>
          </div>

          <div className="flex-1 overflow-auto px-6 py-5">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center">
                <div className="mb-6 rounded-full bg-primary/15 p-5 text-primary">
                  <Bot className="h-8 w-8" />
                </div>
                <h2 className="font-serif text-5xl text-white">Good morning, Amina</h2>
                <p className="mt-3 max-w-2xl text-center text-text-secondary">
                  Start with a question about a contract, a compliance obligation, or a drafting task.
                </p>
                <div className="mt-8 grid w-full max-w-4xl gap-4 md:grid-cols-2">
                  {assistantStarters.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => send(prompt)}
                      className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-[rgba(99,102,241,0.35)]"
                    >
                      <p className="text-sm font-medium text-white">{prompt}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl rounded-[28px] px-5 py-4 ${message.role === 'user' ? 'bg-primary text-white' : 'border border-white/10 bg-white/[0.03] text-text-secondary'}`}>
                      {message.role === 'assistant' && (
                        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-text-muted">
                          <Bot className="h-4 w-4 text-primary" />
                          Counselify AI
                        </div>
                      )}
                      <p className="whitespace-pre-wrap text-sm leading-7">
                        {message.content}
                        {loading && message === messages[messages.length - 1] && <span className="animate-pulse text-primary">|</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-[28px] border border-white/10 bg-white/[0.03] px-4 py-3">
              <button className="rounded-2xl border border-white/10 p-2 text-text-secondary">
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
                placeholder="Ask anything about your contracts or legal obligations..."
                className="border-0 bg-transparent px-0 py-0 focus:ring-0"
              />
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary">Kenya</span>
              <Button variant="primary" onClick={() => send(input)} disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
