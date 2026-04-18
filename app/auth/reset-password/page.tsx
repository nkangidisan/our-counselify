'use client';

import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailCheck } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { Button, Input } from '@/components/ui/primitives';
import { authApi } from '@/lib/supabase';

const schema = z.object({
  email: z.string().email('Enter a valid email address.'),
});

export default function ResetPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = form.handleSubmit(async ({ email }) => {
    setError('');
    const { error: resetError } = await authApi.resetPassword(email);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSubmitted(true);
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-base px-4">
      <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Logo compact />
          <Link href="/auth" className="text-sm text-text-secondary">
            Back to sign in
          </Link>
        </div>

        {submitted ? (
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              <MailCheck className="h-7 w-7" />
            </div>
            <h1 className="font-serif text-4xl text-white">Check your email</h1>
            <p className="mt-3 text-text-secondary">
              We sent a secure password reset link. If the address exists in Counselify, the email should arrive shortly.
            </p>
          </div>
        ) : (
          <>
            <h1 className="font-serif text-4xl text-white">Reset password</h1>
            <p className="mt-3 text-text-secondary">Enter the work email attached to your Counselify workspace.</p>
            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-text-primary">Email</span>
                <Input {...form.register('email')} type="email" placeholder="legal@company.com" />
                {form.formState.errors.email && (
                  <span className="mt-2 block text-sm text-accent-coral">{form.formState.errors.email.message}</span>
                )}
              </label>
              {error && <p className="text-sm text-accent-coral">{error}</p>}
              <Button className="w-full" variant="primary">
                Send reset link
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
