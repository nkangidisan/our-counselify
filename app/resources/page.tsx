import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PublicLayout } from '@/components/layout/public-layout';
import { resources } from '@/lib/counselify-data';

export default function ResourcesPage() {
  return (
    <PublicLayout>
      <section className="mesh-hero border-b border-white/10">
        <div className="mx-auto max-w-[980px] px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-accent-gold">Resources</p>
          <h1 className="mt-4 font-serif text-6xl text-white">Learn the product, the company, and our regional operating footprint.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {resources.map((resource) => (
            <Link key={resource.href} href={resource.href} className="glass-panel rounded-[32px] p-6 transition hover:scale-[1.01]">
              <h2 className="text-2xl font-semibold text-white">{resource.title}</h2>
              <p className="mt-4 text-text-secondary">{resource.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
                Open
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
