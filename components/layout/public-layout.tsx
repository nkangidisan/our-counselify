'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Menu, MessageCircle, X } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
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
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Blog', '/resources'],
      ['Careers', '/contact'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Terms', '/resources'],
      ['Privacy', '/resources'],
      ['Cookie Policy', '/resources'],
      ['AI Disclaimer', '/resources'],
      ['Compliance Disclosure', '/resources'],
    ],
  },
] as const;

export function PublicLayout({
  children,
  cta = true,
}: {
  children: React.ReactNode;
  cta?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <header className="sticky top-0 z-50 border-b border-border-default bg-[rgba(10,10,10,0.92)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex">
            {publicNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-text-secondary transition hover:text-text-primary">
                {item.label}
              </Link>
            ))}
          </nav>

          {cta && (
            <div className="hidden items-center gap-3 md:flex">
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
            </div>
          )}

          <button
            className="inline-flex rounded-lg border border-border-default bg-bg-surface p-2 text-text-secondary md:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border-default bg-bg-base md:hidden">
            <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-4 py-4 sm:px-6">
              {publicNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-transparent px-3 py-3 text-sm text-text-secondary transition hover:border-border-glow hover:bg-primary/10 hover:text-text-primary"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {cta && (
                <div className="mt-2 grid gap-2">
                  <Link href="/auth?tab=signin" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth?tab=signup" onClick={() => setOpen(false)}>
                    <Button variant="primary" className="w-full">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="page-enter">{children}</main>

      <footer className="border-t border-border-default bg-bg-surface">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr,0.8fr,0.8fr,0.8fr] lg:px-8">
          <div>
            <Logo muted />
            <p className="mt-4 max-w-sm text-sm text-text-secondary">
              Continuous compliance monitoring, intelligent contract analysis, and regulatory forecasting for East African businesses.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Link
                href="https://wa.me/447908509674"
                target="_blank"
                className="inline-flex rounded-full border border-border-default p-2 text-text-secondary transition hover:border-border-glow hover:bg-primary/10 hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/thecounselify/"
                target="_blank"
                className="inline-flex rounded-full border border-border-default p-2 text-text-secondary transition hover:border-border-glow hover:bg-primary/10 hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.instagram.com/thecounselify"
                target="_blank"
                className="inline-flex rounded-full border border-border-default p-2 text-text-secondary transition hover:border-border-glow hover:bg-primary/10 hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">{group.title}</p>
              <div className="mt-4 space-y-3 text-sm text-text-secondary">
                {group.links.map(([label, href]) => (
                  <Link key={label} href={href} className="block transition hover:text-text-primary">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Connect</p>
            <div className="mt-4 space-y-3 text-sm text-text-secondary">
              <Link href="https://wa.me/447908509674" target="_blank" className="block transition hover:text-text-primary">
                WhatsApp
              </Link>
              <Link href="https://www.linkedin.com/company/thecounselify/" target="_blank" className="block transition hover:text-text-primary">
                LinkedIn
              </Link>
              <Link href="https://www.instagram.com/thecounselify" target="_blank" className="block transition hover:text-text-primary">
                Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border-default">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-5 text-sm text-text-muted sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p>© 2025 The Counselify. All rights reserved.</p>
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
      <Link href="/auth?tab=signup">
        <Button variant="primary" size="lg">
          Start Free Trial →
        </Button>
      </Link>
      <motion.div whileHover={{ scale: 1.01 }}>
        <Link href="/features">
          <Button variant="ghost" size="lg">
            Explore Features
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
