import Link from 'next/link';
import { FileSearch, Upload, ShieldCheck, LayoutGrid, Wallet, Users } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutGrid },
  { href: '/contracts/upload', label: 'Upload', icon: Upload },
  { href: '/contracts/analysis', label: 'Analysis', icon: FileSearch },
  { href: '/admin', label: 'Admin', icon: Users },
  { href: '/pricing', label: 'Pricing', icon: Wallet },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 flex-col gap-8 border-r border-white/10 bg-slate-950/80 px-4 py-8 text-slate-200 lg:flex">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Counselify</p>
        <h2 className="text-2xl font-semibold text-white">Legal intelligence</h2>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm text-slate-300 shadow-glass">
        <p className="font-semibold text-white">Risk engine ready</p>
        <p className="mt-2 text-slate-400">Contracts processed: <span className="font-semibold text-white">312</span></p>
      </div>
    </aside>
  );
}
