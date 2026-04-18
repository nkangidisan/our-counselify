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
    <Link href={href} className="group inline-flex items-center gap-3">
      <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-[rgba(212,168,85,0.35)] bg-[#17130d] shadow-[0_18px_44px_rgba(0,0,0,0.42)]">
        <Image src="/logo.png" alt="The Counselify" fill className="object-contain p-1.5 transition duration-300 group-hover:scale-105" />
      </div>
      {!compact && (
        <div className="space-y-0.5">
          <p className="font-serif text-2xl font-semibold leading-none text-text-primary">The Counselify</p>
          <p className={`text-xs uppercase tracking-[0.28em] ${muted ? 'text-text-muted' : 'text-text-secondary'}`}>
            AI Legal Infrastructure
          </p>
        </div>
      )}
    </Link>
  );
}
