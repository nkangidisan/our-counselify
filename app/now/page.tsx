import Link from 'next/link';
import { PublicLayout } from '@/components/layout/public-layout';
import { eastAfricanCountries } from '@/lib/counselify-data';

export default function NowPage() {
  return (
    <PublicLayout>
      <section className="grain-overlay hero-surface border-b border-border-default">
        <div className="mx-auto max-w-[980px] px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Where We Operate</p>
          <h1 className="mt-4 font-serif text-6xl text-text-primary">Regional legal coverage across East Africa.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-text-secondary">
            Explore the jurisdictions currently supported across contract analysis, compliance generation, templates, and regulatory tracking.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {eastAfricanCountries.map((country) => (
            <div key={country.code} className="surface-card p-6">
              <p className="text-3xl">{country.flag}</p>
              <h2 className="mt-4 text-3xl font-semibold text-text-primary">{country.name}</h2>
              <p className="mt-3 text-sm text-text-secondary">Available for regional legal operations, compliance mapping, and jurisdiction-aware drafting workflows.</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/industries" className="text-sm text-primary">
            Explore industry coverage →
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
