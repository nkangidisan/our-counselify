'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Bot,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileBadge2,
  FileText,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  UserCircle2,
  Wallet,
  X,
} from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { appSearchIndex, notifications } from '@/lib/counselify-data';
import { Button, Input } from '@/components/ui/primitives';

const primaryNav = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/contracts', label: 'Contracts', icon: FileText },
  { href: '/app/assistant', label: 'AI', icon: Bot },
  { href: '/app/compliance', label: 'Compliance', icon: CheckSquare },
];

const secondaryNav = [
  { href: '/app/forecaster', label: 'Forecaster', icon: TrendingUp },
  { href: '/app/documents', label: 'Documents', icon: FileBadge2 },
  { href: '/app/reports', label: 'Reports', icon: Compass },
  { href: '/app/settings', label: 'Settings', icon: Settings },
  { href: '/pricing', label: 'Billing', icon: Wallet },
];

const fullNav = [...primaryNav, ...secondaryNav];

function getPageTitle(pathname: string) {
  const item = fullNav.find((entry) => pathname === entry.href || (entry.href !== '/app' && pathname.startsWith(entry.href)));
  return item?.label ?? 'Workspace';
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/app';
  const pageTitle = getPageTitle(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const sheetStartY = useRef<number | null>(null);

  useEffect(() => {
    setSidebarOpen(false);
    setMoreOpen(false);
    setNotificationsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === 'Escape') {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setMoreOpen(false);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX.current = event.changedTouches[0]?.clientX ?? null;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const startX = touchStartX.current;
      const endX = event.changedTouches[0]?.clientX ?? null;

      if (startX === null || endX === null) return;

      if (!sidebarOpen && startX < 24 && endX - startX > 70) {
        setSidebarOpen(true);
      }

      if (sidebarOpen && startX - endX > 70) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [sidebarOpen]);

  const searchResults = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return appSearchIndex;
    return appSearchIndex.filter((item) => `${item.title} ${item.subtitle} ${item.type}`.toLowerCase().includes(query));
  }, [searchValue]);

  return (
    <div className="app-shell min-h-screen bg-bg-base text-text-primary">
      <div className="md:flex">
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setSidebarOpen(false)}
          className={`fixed inset-0 z-40 bg-black/30 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        />

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r border-border-default bg-bg-surface shadow-md transition-transform md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${collapsed ? 'md:w-16 lg:w-[240px]' : ''}`}
        >
          <div className="flex h-16 items-center justify-between border-b border-border-default px-4">
              <Logo compact={collapsed} />
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                    setCollapsed((current) => !current);
                    return;
                  }
                  setSidebarOpen(false);
                }}
                className="interactive-target inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-default bg-bg-elevated text-text-secondary"
              >
                <X className="h-4 w-4 md:hidden" />
                <ChevronRight className={`hidden h-4 w-4 md:block ${collapsed ? 'block' : 'hidden'}`} />
                <ChevronLeft className={`hidden h-4 w-4 md:block ${collapsed ? 'hidden' : 'block'}`} />
              </button>
            </div>

          <div className="px-3 py-4">
            <div className="rounded-3xl border border-border-default bg-bg-elevated p-4">
              <p className={`text-xs uppercase tracking-[0.08em] text-text-muted ${collapsed ? 'md:hidden lg:block' : ''}`}>Workspace</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/15" />
                <div className={`${collapsed ? 'hidden md:hidden lg:block' : ''}`}>
                  <p className="text-sm font-semibold text-text-primary">LakeHub Growth Co.</p>
                  <p className="text-xs text-text-secondary">Kenya, Uganda, Tanzania</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-2">
            {fullNav.map((item) => {
              const active = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`flex min-h-[52px] items-center gap-3 rounded-2xl border px-3 ${
                    active
                      ? 'border-border-gold bg-primary/10 text-primary'
                      : 'border-transparent text-text-secondary hover:border-border-default hover:bg-bg-hover hover:text-text-primary'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className={`${collapsed ? 'md:hidden lg:block' : ''}`}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border-default p-3">
            <div className="flex items-center justify-between rounded-3xl border border-border-default bg-bg-elevated px-4 py-3">
              <div className={`${collapsed ? 'hidden md:hidden lg:block' : ''}`}>
                <p className="text-sm font-semibold text-text-primary">Professional plan</p>
                <p className="text-xs text-text-secondary">Streaming AI enabled</p>
              </div>
              <ThemeToggle iconOnly />
            </div>
          </div>
        </aside>

        <div className={`min-w-0 flex-1 ${collapsed ? 'md:pl-16 lg:pl-[240px]' : 'md:pl-[240px]'}`}>
          <header className="sticky top-0 z-30 border-b border-border-default bg-bg-surface/95 backdrop-blur-xl">
            <div className="mx-auto flex min-h-16 max-w-[1280px] items-center gap-3 px-4 md:px-6 xl:px-8">
              {searchOpen ? (
                <div className="flex w-full items-center gap-3">
                  <Input
                    autoFocus
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Search contracts, deadlines, and documents"
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm" onClick={() => setSearchOpen(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-surface md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-semibold text-text-primary">{pageTitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-surface"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setNotificationsOpen((current) => !current)}
                      className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-surface"
                    >
                      <Bell className="h-5 w-5" />
                    </button>
                    <span className="absolute right-0 top-0 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-semibold text-white">
                      5
                    </span>
                    {notificationsOpen ? (
                      <div className="absolute right-0 top-14 w-[min(360px,calc(100vw-2rem))] rounded-3xl border border-border-default bg-bg-surface p-4 shadow-md">
                        {Object.entries(notifications).map(([group, items]) => (
                          <div key={group} className="mb-4 last:mb-0">
                            <p className="mb-2 text-xs uppercase tracking-[0.08em] text-text-muted">{group}</p>
                            <div className="space-y-2">
                              {items.slice(0, 2).map((item) => (
                                <div key={item.id} className="rounded-2xl border border-border-default bg-bg-elevated p-3">
                                  <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                                  <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <ThemeToggle iconOnly />
                  <button type="button" className="interactive-target hidden h-11 items-center gap-2 rounded-full border border-border-default bg-bg-surface px-3 md:inline-flex">
                    <UserCircle2 className="h-5 w-5" />
                    <span className="text-sm font-medium">Amina</span>
                  </button>
                </>
              )}
            </div>
          </header>

          <main className="mx-auto max-w-[1280px] px-4 pb-8 pt-6 md:px-6 xl:px-8">{children}</main>
        </div>
      </div>

      <nav className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-30 border-t border-border-default bg-bg-surface md:hidden">
        <div className="grid h-16 grid-cols-5 items-center px-2">
          {primaryNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center gap-1 py-2 text-[10px]">
                <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-primary' : 'bg-transparent'}`} />
                <Icon className={`h-5 w-5 ${active ? 'text-primary' : 'text-text-secondary'}`} />
                <span className={active ? 'text-primary' : 'text-text-secondary'}>{item.label}</span>
              </Link>
            );
          })}
          <button type="button" onClick={() => setMoreOpen(true)} className="flex flex-col items-center justify-center gap-1 py-2 text-[10px] text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-transparent" />
            <Menu className="h-5 w-5" />
            <span>More</span>
          </button>
        </div>
      </nav>

      {moreOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button type="button" className="absolute inset-0 bg-black/30" onClick={() => setMoreOpen(false)} aria-label="Close more menu overlay" />
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-[28px] border border-border-default bg-bg-surface p-4 shadow-md"
            onTouchStart={(event) => {
              sheetStartY.current = event.changedTouches[0]?.clientY ?? null;
            }}
            onTouchEnd={(event) => {
              const startY = sheetStartY.current;
              const endY = event.changedTouches[0]?.clientY ?? null;
              if (startY !== null && endY !== null && endY - startY > 70) {
                setMoreOpen(false);
              }
            }}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border-default" />
            <div className="grid gap-2">
              {secondaryNav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="flex min-h-[52px] items-center gap-3 rounded-2xl border border-border-default bg-bg-elevated px-4">
                    <Icon className="h-5 w-5 text-text-secondary" />
                    <span className="text-sm font-medium text-text-primary">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {searchOpen && searchValue ? (
        <div className="fixed inset-x-4 top-20 z-20 rounded-3xl border border-border-default bg-bg-surface p-4 shadow-md md:inset-x-auto md:right-6 md:top-20 md:w-[480px]">
          <div className="space-y-2">
            {searchResults.slice(0, 6).map((item) => (
              <Link key={`${item.type}-${item.title}`} href={item.href} onClick={() => setSearchOpen(false)} className="block rounded-2xl border border-border-default bg-bg-elevated p-3">
                <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{item.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
