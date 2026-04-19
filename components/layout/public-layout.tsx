'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Menu, MessageCircle, X } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { useAuth } from '@/context/AuthProvider';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/primitives';

const publicNav = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/industries', label: 'Industries' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

const footerGroups = [
  {
    title: 'Product',
    links: [
      ['Features', '/features'],
      ['Industries', '/industries'],
      ['Pricing', '/pricing'],
      ['Resources', '/resources'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Docs', '/docs'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Terms', '/resources'],
      ['Privacy', '/resources'],
      ['Cookie Policy', '/resources'],
    ],
  },
  {
    title: 'Connect',
    links: [
      ['WhatsApp', 'https://wa.me/447908509674'],
      ['LinkedIn', 'https://www.linkedin.com/company/thecounselify/'],
      ['Instagram', 'https://www.instagram.com/thecounselify'],
    ],
  },
] as const;

export function PublicLayout({ children, cta = true }: { children: React.ReactNode; cta?: boolean }) {
  const [open, setOpen] = useState(false);
  const { session, loading } = useAuth();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <header className="sticky top-0 z-50 border-b border-border-default bg-bg-surface/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-3 px-4 md:h-[72px] md:px-6 xl:px-8">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex">
            {publicNav.map((item) => (
              <Link key={item.href} href={item.href} className="interactive-target inline-flex items-center text-sm text-text-secondary hover:text-text-primary">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            {cta && !loading ? (
              <>
                {session ? (
                  <Link href="/app">
                    <Button variant="primary" size="sm">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/auth?tab=signin">
                      <Button variant="ghost" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth?tab=signup">
                      <Button variant="primary" size="sm">
                        Start Free Trial
                      </Button>
                    </Link>
                  </>
                )}
              </>
            ) : null}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle iconOnly />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-surface text-text-primary shadow-sm"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[70] md:hidden">
          <button type="button" className="absolute inset-0 bg-black/35" onClick={() => setOpen(false)} aria-label="Close navigation overlay" />
          <div className="absolute right-0 top-0 flex h-full w-[95vw] max-w-[420px] flex-col bg-bg-surface px-5 pb-6 pt-5 shadow-md">
            <div className="flex items-center justify-between">
              <Logo compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-elevated"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-6 flex flex-1 flex-col">
              {publicNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[56px] items-center border-b border-border-default text-base text-text-primary"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-auto space-y-4 pt-6">
                <div className="flex items-center justify-between rounded-3xl border border-border-default bg-bg-elevated px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Theme</p>
                    <p className="text-sm text-text-secondary">Switch between light and dark mode</p>
                  </div>
                  <ThemeToggle />
                </div>
                {cta && !loading ? (
                  <div className="grid gap-3">
                    {session ? (
                      <Link href="/app" onClick={() => setOpen(false)}>
                        <Button className="w-full" variant="primary">
                          Go to Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link href="/auth?tab=signin" onClick={() => setOpen(false)}>
                          <Button className="w-full" variant="ghost">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/auth?tab=signup" onClick={() => setOpen(false)}>
                          <Button className="w-full" variant="primary">
                            Start Free Trial
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                ) : null}
                <div className="flex items-center justify-center gap-4 border-t border-border-default pt-4">
                  <Link href="https://wa.me/447908509674" target="_blank" className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-elevated">
                    <MessageCircle className="h-4 w-4" />
                  </Link>
                  <Link href="https://www.linkedin.com/company/thecounselify/" target="_blank" className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-elevated">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link href="https://www.instagram.com/thecounselify" target="_blank" className="interactive-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-bg-elevated">
                    <Instagram className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      ) : null}

      <main className="page-enter">{children}</main>

      <footer className="mt-12 border-t border-border-default bg-bg-surface md:mt-16">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 md:grid-cols-2 md:px-6 xl:grid-cols-4 xl:px-8">
          <div className="space-y-4">
            <Logo muted />
            <p className="max-w-sm text-sm text-text-secondary">
              Continuous compliance monitoring, contract intelligence, and regulatory forecasting for East African businesses.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-xs uppercase tracking-[0.08em] text-text-muted">{group.title}</p>
              <div className="mt-4 space-y-3 text-sm text-text-secondary">
                {group.links.map(([label, href]) => (
                  <Link key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} className="block hover:text-text-primary">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border-default">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-4 py-5 text-sm text-text-muted md:flex-row md:items-center md:justify-between md:px-6 xl:px-8">
            <p>© 2026 The Counselify. All rights reserved.</p>
            <p>AI outputs are assistive, not legal representation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PublicHeroActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link href="/auth?tab=signup" className="w-full sm:w-auto">
        <Button variant="primary" size="lg" className="w-full">
          Start Free Trial
        </Button>
      </Link>
      <Link href="/features" className="w-full sm:w-auto">
        <Button variant="ghost" size="lg" className="w-full">
          Explore Features
        </Button>
      </Link>
    </div>
  );
}
