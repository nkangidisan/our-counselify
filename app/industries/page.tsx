import Link from 'next/link';
import { PublicLayout } from '@/components/layout/public-layout';
import { eastAfricanCountries, industryCards } from '@/lib/counselify-data';

function EastAfricaMap() {
  return (
    <svg viewBox="0 0 420 260" className="h-auto w-full">
      <rect x="40" y="34" width="84" height="74" rx="12" fill="rgba(212,168,85,0.18)" stroke="rgba(212,168,85,0.45)" />
      <rect x="132" y="58" width="72" height="82" rx="12" fill="rgba(212,168,85,0.14)" stroke="rgba(212,168,85,0.38)" />
      <rect x="214" y="74" width="92" height="94" rx="12" fill="rgba(212,168,85,0.18)" stroke="rgba(212,168,85,0.45)" />
      <rect x="318" y="102" width="52" height="98" rx="12" fill="rgba(212,168,85,0.12)" stroke="rgba(212,168,85,0.35)" />
      <rect x="116" y="148" width="74" height="62" rx="12" fill="rgba(212,168,85,0.14)" stroke="rgba(212,168,85,0.38)" />
      <rect x="202" y="176" width="78" height="44" rx="12" fill="rgba(212,168,85,0.12)" stroke="rgba(212,168,85,0.35)" />
    </svg>
  );
}

export default function IndustriesPage() {
  return (
    <PublicLayout>
      <section className="grain-overlay hero-surface border-b border-border-default">
        <div className="mx-auto max-w-[1080px] px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Industries</p>
          <h1 className="mt-4 font-serif text-6xl text-text-primary">Built for every regulated sector operating across East Africa.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-text-secondary">
            The Counselify adapts its checklists, templates, and risk models to the legal reality of each industry we serve.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {industryCards.map((industry) => (
            <Link key={industry.slug} href={`/industries/${industry.slug}`} className="surface-card block p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-primary">Industry</p>
              <h2 className="mt-3 text-2xl font-semibold text-text-primary">{industry.name}</h2>
              <p className="mt-3 text-sm text-text-secondary">{industry.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border-default bg-bg-surface">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr,1.1fr] lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-primary">Where We Operate</p>
            <h2 className="mt-4 font-serif text-5xl text-text-primary">Legal coverage across East Africa</h2>
            <p className="mt-4 text-lg text-text-secondary">
              Regional teams can work across national obligations while keeping local context visible.
            </p>
          </div>
          <div className="surface-card p-4">
            <EastAfricaMap />
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {eastAfricanCountries.map((country) => (
              <div key={country.code} className="rounded-full border border-border-default bg-bg-base px-4 py-2 text-sm text-text-secondary">
                <span className="mr-2">{country.flag}</span>
                {country.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
