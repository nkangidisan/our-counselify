import { PublicLayout } from '@/components/layout/public-layout';

export default function AboutPage() {
  return (
    <PublicLayout>
      <section className="mesh-hero border-b border-white/10">
        <div className="mx-auto max-w-[980px] px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.28em] text-accent-gold">About</p>
          <h1 className="mt-4 font-serif text-6xl text-white">The Counselify is legal infrastructure, not just another dashboard.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-text-secondary">
            We are building an AI-native legal operating system that helps East African businesses understand contracts, maintain compliance, and anticipate regulatory change.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:px-8">
        {[
          ['Interpreter', 'Turns contracts, policies, and legal obligations into structured operational data.'],
          ['Reasoner', 'Highlights risk, gaps, conflicting terms, and remediation paths in plain English.'],
          ['Executor', 'Connects analysis to deadlines, checklists, drafting, and audit evidence.'],
        ].map(([title, description]) => (
          <div key={title} className="glass-panel rounded-[32px] p-6">
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            <p className="mt-4 text-text-secondary">{description}</p>
          </div>
        ))}
      </section>
    </PublicLayout>
  );
}
