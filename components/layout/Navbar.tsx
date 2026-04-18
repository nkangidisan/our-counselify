import Link from 'next/link';
import { Logo } from '@/components/brand/logo';

export function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border-default bg-bg-base/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-8">
          <Link href="/features" className="text-text-secondary hover:text-primary font-medium transition">Features</Link>
          <Link href="/industries" className="text-text-secondary hover:text-primary font-medium transition">Industries</Link>
          <Link href="/pricing" className="text-text-secondary hover:text-primary font-medium transition">Pricing</Link>
          <Link href="/auth?tab=signin" className="text-text-secondary hover:text-primary font-medium transition">Sign In</Link>
          <Link href="/auth?tab=signup" className="rounded-lg border border-border-glow bg-primary/10 px-4 py-2 font-semibold text-primary transition hover:bg-primary/15">Start Free Trial</Link>
        </div>
      </div>
    </nav>
  );
}
