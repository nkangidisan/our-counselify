import { PublicLayout } from '@/components/layout/public-layout';
import { docsSections } from '@/lib/counselify-data';

export default function DocsPage() {
  return (
    <PublicLayout>
      <section className="mesh-hero border-b border-white/10">
        <div className="mx-auto max-w-[980px] px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-accent-gold">Docs</p>
          <h1 className="mt-4 font-serif text-6xl text-white">How to use The Counselify.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-text-secondary">
            Practical guidance for onboarding, contract analysis, compliance management, and AI-assisted legal workflows.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {docsSections.map((section) => (
            <div key={section.title} className="glass-panel rounded-[32px] p-6">
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <div className="mt-5 space-y-3">
                {section.points.map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-secondary">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
