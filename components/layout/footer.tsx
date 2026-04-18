import Link from 'next/link';
import { Sparkles, Lock, CheckCircle, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 backdrop-blur-xl pt-16 pb-8 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Product */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-lime-400 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Counselify</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered legal infrastructure for modern businesses across East Africa.
            </p>
          </div>
          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Company</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-slate-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="block text-slate-400 hover:text-white transition-colors">Contact</Link>
              <Link href="/careers" className="block text-slate-400 hover:text-white transition-colors">Careers</Link>
            </div>
          </div>
          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Legal</h3>
            <div className="space-y-2 text-sm">
              <Link href="/terms" className="block text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="block text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/cookies" className="block text-slate-400 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
          {/* Compliance & Security */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Compliance & Security</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Lock className="w-4 h-4 text-green-400" />
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Audit logs & compliance</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Users className="w-4 h-4 text-green-400" />
                <span>Role-based access control</span>
              </div>
            </div>
            <p className="text-slate-500 text-xs mt-4">
              Outputs depend on regulatory data availability and jurisdiction-specific requirements.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Counselify. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span>SOC 2 Type II Certified</span>
            <span>ISO 27001 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
