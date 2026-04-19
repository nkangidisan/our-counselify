'use client';

import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  href?: string;
  compact?: boolean;
  muted?: boolean;
};

export function Logo({ href = '/', compact = false, muted = false }: LogoProps) {
  return (
    <Link href={href} className="interactive-target inline-flex items-center gap-3">
      <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-border-gold bg-bg-surface shadow-sm">
        <Image src="/logo.png" alt="The Counselify" fill className="object-contain p-1.5" priority />
      </div>
      {!compact ? (
        <div className="space-y-0.5">
          <p className="max-w-[120px] truncate font-serif text-[clamp(22px,3vw,28px)] font-semibold leading-none tracking-[-0.02em] text-primary">
            Counselify
          </p>
          <p className={`text-[11px] uppercase tracking-[0.08em] ${muted ? 'text-text-muted' : 'text-text-secondary'}`}>AI Legal Infrastructure</p>
        </div>
      ) : null}
    </Link>
  );
}
