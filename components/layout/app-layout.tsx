'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  Bot,
  CheckSquare,
  ChevronDown,
  Compass,
  FileBadge2,
  FileText,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { appSearchIndex, notifications } from '@/lib/counselify-data';
import { Button } from '@/components/ui/primitives';

const appNav = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/contracts', label: 'Contracts', icon: FileText },
  { href: '/app/assistant', label: 'AI Assistant', icon: Bot },
  { href: '/app/compliance', label: 'Compliance', icon: CheckSquare },
  { href: '/app/forecaster', label: 'Forecaster', icon: TrendingUp },
  { href: '/app/documents', label: 'Documents', icon: FileBadge2 },
  { href: '/app/reports', label: 'Reports', icon: Compass },
  { href: '/app/settings', label: 'Settings', icon: Settings },
];

const mobileNav = appNav.slice(0, 5);

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const safePathname = pathname ?? '/app';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === 'Escape') {
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return appSearchIndex;
    const query = searchTerm.toLowerCase();
    return appSearchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query),
    );
  }, [searchTerm]);

  const groupedResults = useMemo(
    () =>
      results.reduce<Record<string, typeof results>>((accumulator, item) => {
        accumulator[item.type] = [...(accumulator[item.type] ?? []), item];
        return accumulator;
      }, {}),
    [results],
  );

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 border-r border-border-default bg-bg-base transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
            <Logo href="/" compact />
            <button className="rounded-xl border border-white/10 p-2 text-text-secondary lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-4 py-5">
            <div className="surface-card rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Workspace</p>
              <div className="mt-3 flex items-center justify-between rounded-2xl border border-border-default bg-bg-elevated px-3 py-3">
                <div>
                  <p className="text-sm font-medium text-text-primary">LakeHub Growth Co.</p>
                  <p className="text-xs text-text-secondary">Kenya, Uganda, Tanzania</p>
                </div>
                <ChevronDown className="h-4 w-4 text-text-secondary" />
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3">
            {appNav.map((item, index) => {
              const active = safePathname === item.href || (item.href !== '/app' && safePathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                      active
                        ? 'border-border-glow bg-primary/10 text-white shadow-[inset_3px_0_0_0_#D4A855,0_12px_30px_rgba(212,168,85,0.12)]'
                        : 'border-transparent text-text-secondary hover:border-border-default hover:bg-bg-surface hover:text-text-primary'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? 'text-primary' : 'text-text-muted group-hover:text-primary'}`} />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="surface-card rounded-3xl p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/20 p-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Professional plan</p>
                  <p className="text-xs text-text-secondary">Streaming AI and regional monitoring enabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 border-b border-border-default bg-bg-base/90 backdrop-blur-2xl">
          <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-4 px-4 sm:px-6 lg:px-8">
            <button className="rounded-2xl border border-border-default p-2 text-text-secondary lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="group hidden flex-1 items-center gap-3 rounded-2xl border border-border-default bg-bg-surface px-4 py-3 text-left shadow-[0_18px_50px_rgba(8,11,20,0.25)] transition hover:border-border-glow md:flex"
            >
              <Search className="h-4 w-4 text-text-muted group-hover:text-primary" />
              <span className="flex-1 text-sm text-text-secondary">Search contracts, documents, deadlines, and chats</span>
              <span className="rounded-lg border border-border-default bg-bg-base px-2 py-1 text-xs text-text-muted">cmd K</span>
            </button>

            <div className="ml-auto flex items-center gap-3">
              <button
                className="rounded-2xl border border-border-default bg-bg-surface p-2 text-text-secondary transition hover:border-border-glow hover:text-text-primary"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4 md:hidden" />
                <Search className="hidden h-4 w-4 md:block" />
              </button>

              <div className="relative">
                <button
                  className="rounded-2xl border border-border-default bg-bg-surface p-2 text-text-secondary transition hover:border-border-glow hover:text-text-primary"
                  onClick={() => setNotificationsOpen((current) => !current)}
                >
                  <Bell className="h-4 w-4" />
                </button>
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-coral px-1 text-[10px] font-semibold text-white">
                  5
                </span>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-12 w-[360px] max-w-[calc(100vw-2rem)] rounded-3xl border border-border-default bg-bg-surface/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
                    >
                      <NotificationGroup title="Risk Alerts" items={notifications.riskAlerts} />
                      <NotificationGroup title="Deadline Reminders" items={notifications.deadlineReminders} />
                      <NotificationGroup title="System Updates" items={notifications.systemUpdates} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden items-center gap-3 rounded-2xl border border-border-default bg-bg-surface px-3 py-2 sm:flex">
                <div className="h-9 w-9 rounded-2xl bg-[linear-gradient(135deg,#D4A855,#CA8A04)]" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Amina Njeri</p>
                  <p className="text-xs text-text-secondary">General Counsel</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <motion.main
          key={safePathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="mx-auto max-w-[1280px] px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-10"
        >
          {children}
        </motion.main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-30 rounded-[28px] border border-border-default bg-bg-surface/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            const active = safePathname === item.href || (item.href !== '/app' && safePathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] ${
                  active ? 'bg-primary/15 text-primary' : 'text-text-secondary'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label.replace('AI Assistant', 'AI')}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/80 px-4 pt-20 backdrop-blur-xl"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="w-full max-w-3xl rounded-[32px] border border-border-default bg-bg-surface/95 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-3 rounded-2xl border border-border-default bg-bg-elevated px-4 py-4">
                <Search className="h-5 w-5 text-text-muted" />
                <input
                  autoFocus
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search contracts, clauses, checklists, or conversations"
                  className="w-full bg-transparent text-base text-text-primary outline-none placeholder:text-text-muted"
                />
                <Button variant="ghost" size="sm" onClick={() => setSearchOpen(false)}>
                  Close
                </Button>
              </div>

              <div className="mt-4 max-h-[60vh] overflow-auto pr-1">
                {Object.entries(groupedResults).map(([group, items]) => (
                  <div key={group} className="mb-5">
                    <p className="mb-2 px-2 text-xs uppercase tracking-[0.24em] text-text-muted">{group}</p>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <Link
                          key={`${item.type}-${item.title}`}
                          href={item.href}
                          className="block rounded-2xl border border-border-default bg-bg-elevated px-4 py-3 transition hover:border-border-glow hover:bg-bg-surface"
                          onClick={() => setSearchOpen(false)}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-sm font-medium text-text-primary">{item.title}</p>
                              <p className="text-sm text-text-secondary">{item.subtitle}</p>
                            </div>
                            <span className="rounded-full border border-border-default bg-bg-base px-3 py-1 text-xs text-text-muted">
                              {item.type}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotificationGroup({
  title,
  items,
}: {
  title: string;
  items: Array<{ id: string; title: string; detail: string; time: string }>;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-2 text-xs uppercase tracking-[0.24em] text-text-muted">{title}</p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border-default bg-bg-elevated p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-text-primary">{item.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
              </div>
              <button className="text-xs text-text-muted">Dismiss</button>
            </div>
            <p className="mt-2 text-xs text-text-muted">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
