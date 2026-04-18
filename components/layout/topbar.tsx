import { Bell, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Topbar() {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3 text-slate-100">
        <div className="rounded-2xl bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Dashboard</div>
        <Badge variant="low">Live</Badge>
      </div>
      <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 shadow-glass">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="search"
          placeholder="Search contracts, clauses or risks"
          className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">New review</Button>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/60 px-4 py-2 text-sm text-slate-200 hover:bg-slate-900">
          <Bell className="h-4 w-4" />
          Alerts
        </button>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2 text-sm text-slate-100 hover:bg-white/10">
          <span>Kate</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
