'use client';

import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { PublicLayout } from '@/components/layout/public-layout';
import { Button, Input, Select, TextArea } from '@/components/ui/primitives';
import { contactInquiryTypes, eastAfricanCountries } from '@/lib/counselify-data';

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  companyName: z.string().min(2, 'Company name is required.'),
  email: z.string().email('Enter a valid email address.'),
  country: z.string().min(1, 'Please select a jurisdiction.'),
  inquiryType: z.string().min(1, 'Please select an inquiry type.'),
  message: z.string().min(20, 'Message must be at least 20 characters.'),
});

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      country: '',
      inquiryType: '',
      message: '',
    },
  });

  const onSubmit = form.handleSubmit(() => {
    setSubmitted(true);
    form.reset();
  });

  return (
    <PublicLayout>
      <section className="grain-overlay hero-surface border-b border-border-default">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-primary">Contact</p>
            <h1 className="mt-4 font-serif text-6xl text-text-primary">Get in Touch</h1>
            <p className="mt-5 max-w-xl text-lg text-text-secondary">
              Have a question, need a demo, or want to discuss enterprise pricing? We&apos;re here.
            </p>

            <div className="mt-8 space-y-4">
              <Link href="https://wa.me/447908509674" target="_blank" className="surface-card flex items-center gap-4 p-4">
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-text-muted">WhatsApp</p>
                  <p className="text-text-primary">+44 7908 509674</p>
                </div>
              </Link>
              <Link href="https://www.linkedin.com/company/thecounselify/" target="_blank" className="surface-card flex items-center gap-4 p-4">
                <Linkedin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-text-muted">LinkedIn</p>
                  <p className="text-text-primary">/company/thecounselify</p>
                </div>
              </Link>
              <Link href="https://www.instagram.com/thecounselify" target="_blank" className="surface-card flex items-center gap-4 p-4">
                <Instagram className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-text-muted">Instagram</p>
                  <p className="text-text-primary">@thecounselify</p>
                </div>
              </Link>
            </div>

            <div className="mt-8 rounded-[10px] border border-[rgba(212,168,85,0.35)] bg-primary/10 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-primary">For enterprise inquiries</p>
              <p className="mt-3 text-sm text-text-secondary">
                Reach out on WhatsApp or LinkedIn for a personalized demo and custom pricing discussion.
              </p>
            </div>
          </div>

          <div className="surface-card p-6">
            <h2 className="text-3xl font-semibold text-text-primary">Send a message</h2>
            {submitted ? (
              <div className="mt-6 rounded-[10px] border border-accent-mint/30 bg-accent-mint/10 p-5 text-accent-mint">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Thank you! We&apos;ll respond within 24 hours.</span>
                </div>
              </div>
            ) : null}
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <Field label="Full Name" error={form.formState.errors.fullName?.message}>
                <Input {...form.register('fullName')} />
              </Field>
              <Field label="Company Name" error={form.formState.errors.companyName?.message}>
                <Input {...form.register('companyName')} />
              </Field>
              <Field label="Email" error={form.formState.errors.email?.message}>
                <Input {...form.register('email')} type="email" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Country/Jurisdiction" error={form.formState.errors.country?.message}>
                  <Select {...form.register('country')}>
                    <option value="">Select</option>
                    {eastAfricanCountries.filter((country) => country.code !== 'EAC').map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Inquiry Type" error={form.formState.errors.inquiryType?.message}>
                  <Select {...form.register('inquiryType')}>
                    <option value="">Select</option>
                    {contactInquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <Field label="Message" error={form.formState.errors.message?.message}>
                <TextArea {...form.register('message')} rows={6} />
              </Field>
              <Button type="submit" variant="primary" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-text-primary">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-accent-coral">{error}</span> : null}
    </label>
  );
}
