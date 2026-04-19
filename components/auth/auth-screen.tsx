'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowRight, CheckCircle2, Eye, EyeOff, Phone } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { Button, Input, Select } from '@/components/ui/primitives';
import { authApi, supabase } from '@/lib/supabase';
import { redirectAfterAuth } from '@/lib/authRedirect';
import { eastAfricanCountries, industryCards } from '@/lib/counselify-data';

const signInSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name.'),
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

type Mode = 'signin' | 'signup';

const phoneCodes = [
  { label: '🇰🇪 +254', value: '+254' },
  { label: '🇺🇬 +256', value: '+256' },
  { label: '🇹🇿 +255', value: '+255' },
  { label: '🇷🇼 +250', value: '+250' },
  { label: '🇪🇹 +251', value: '+251' },
] as const;

export function AuthScreen({ defaultMode = 'signin' }: { defaultMode?: Mode }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneExpanded, setPhoneExpanded] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneCode, setPhoneCode] = useState('+254');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  const activeSchema = useMemo(() => (mode === 'signin' ? signInSchema : signUpSchema), [mode]);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(activeSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const submit = form.handleSubmit(async (values) => {
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      if (mode === 'signin') {
        const { data, error } = await authApi.signIn(values.email, values.password);
        if (error) {
          setStatus({ type: 'error', message: error.message });
        } else if (data.user) {
          await redirectAfterAuth(data.user.id, router);
        } else {
          setStatus({ type: 'error', message: 'We could not complete sign in. Please try again.' });
        }
      } else {
        const { data, error } = await authApi.signUp(values.email, values.password, {
          full_name: values.fullName,
        });

        if (error) {
          setStatus({ type: 'error', message: error.message });
        } else if (data.user) {
          if (supabase) {
            await supabase.from('profiles').upsert(
              {
                id: data.user.id,
                email: data.user.email ?? values.email,
                full_name: values.fullName,
                onboarding_completed: false,
              },
              { onConflict: 'id' }
            );
          }

          router.replace('/onboarding');
        } else {
          setStatus({ type: 'success', message: 'Account created. Check your email to finish signing in.' });
        }
      }
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  });

  async function handleGoogle() {
    setLoading(true);
    const { error } = await authApi.signInWithGoogle();
    if (error) {
      setStatus({ type: 'error', message: error.message });
      setLoading(false);
    }
  }

  async function handleSendOtp() {
    setLoading(true);
    setStatus({ type: null, message: '' });
    const phone = `${phoneCode}${phoneNumber}`.replace(/\s+/g, '');
    const { error } = await authApi.sendPhoneOtp(phone);
    if (error) {
      setStatus({ type: 'error', message: error.message });
    } else {
      setOtpSent(true);
      setStatus({ type: 'success', message: 'OTP sent. Enter the 6-digit code to continue.' });
    }
    setLoading(false);
  }

  async function handleVerifyOtp() {
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const phone = `${phoneCode}${phoneNumber}`.replace(/\s+/g, '');
      const token = otp.join('');
      const { data, error } = await authApi.verifyPhoneOtp(phone, token);

      if (error) {
        setStatus({ type: 'error', message: error.message });
        return;
      }

      if (data.user) {
        await redirectAfterAuth(data.user.id, router);
        return;
      }

      setStatus({ type: 'error', message: 'We could not verify the code. Please request a new OTP.' });
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="mx-auto flex min-h-screen max-w-[520px] flex-col px-4 py-4 sm:px-5 sm:py-6 md:max-w-none md:items-center md:justify-center md:px-6">
        <div className="flex w-full flex-1 flex-col rounded-[28px] border border-border-default bg-bg-surface px-4 py-5 shadow-sm sm:px-5 sm:py-6 md:max-w-[440px] md:rounded-[32px] md:p-8 md:shadow-md">
          <div className="flex justify-center">
            <Logo href="/" />
          </div>

          <div className="mt-6 flex rounded-full border border-border-default bg-bg-elevated p-1 md:mt-8">
            {[
              ['signin', 'Sign In'],
              ['signup', 'Create Account'],
            ].map(([value, label]) => (
              <Link
                key={value}
                href={`/auth?tab=${value}`}
                className={`flex min-h-12 flex-1 items-center justify-center rounded-full px-4 text-center text-sm font-semibold ${
                  mode === value ? 'bg-primary text-white' : 'text-text-secondary'
                }`}
                onClick={() => {
                  setMode(value as Mode);
                  setStatus({ type: null, message: '' });
                  form.reset();
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {status.type ? (
            <div
              className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-accent-green/20 bg-[var(--accent-green-subtle)] text-accent-green'
                  : 'border-accent-red/20 bg-[var(--accent-red-subtle)] text-accent-red'
              }`}
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4" />
              <span>{status.message}</span>
            </div>
          ) : null}

          <div className="mt-5 space-y-3 sm:mt-6">
            <Button variant="ghost" className="w-full justify-center bg-bg-elevated" onClick={handleGoogle} loading={loading}>
              Continue with Google
            </Button>

            <div className="rounded-3xl border border-border-default bg-bg-elevated p-4">
              <button type="button" className="flex w-full items-center justify-between text-left text-sm font-semibold text-text-primary" onClick={() => setPhoneExpanded((current) => !current)}>
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Continue with Phone Number
                </span>
                <span className="text-text-muted">{phoneExpanded ? 'Hide' : 'Open'}</span>
              </button>

              {phoneExpanded ? (
                <div className="mt-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-[130px,1fr]">
                    <Select value={phoneCode} onChange={(event) => setPhoneCode(event.target.value)}>
                      {phoneCodes.map((code) => (
                        <option key={code.value} value={code.value}>
                          {code.label}
                        </option>
                      ))}
                    </Select>
                    <Input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder="712 345 678" />
                  </div>
                  {!otpSent ? (
                    <Button variant="primary" className="w-full" onClick={handleSendOtp} loading={loading}>
                      Send OTP
                    </Button>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {otp.map((digit, index) => (
                          <Input
                            key={index}
                            value={digit}
                            maxLength={1}
                            onChange={(event) => {
                              const next = [...otp];
                              next[index] = event.target.value.replace(/\D/g, '');
                              setOtp(next);
                            }}
                            className="h-12 px-0 text-center"
                          />
                        ))}
                      </div>
                      <Button variant="primary" className="w-full" onClick={handleVerifyOtp} loading={loading}>
                        Verify & Continue
                      </Button>
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-default" />
            </div>
            <div className="relative mx-auto w-fit bg-bg-surface px-3 text-sm text-text-muted">or continue with email</div>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' ? (
              <Field label="Full Name" error={form.formState.errors.fullName?.message}>
                <Input {...form.register('fullName')} />
              </Field>
            ) : null}

            <Field label="Email" error={form.formState.errors.email?.message}>
              <Input {...form.register('email')} type="email" />
            </Field>

            <Field label="Password" error={form.formState.errors.password?.message}>
              <div className="relative">
                <Input {...form.register('password')} type={showPassword ? 'text' : 'password'} className="pr-11" />
                <button
                  type="button"
                  className="interactive-target absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-text-muted"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>
          </form>

          <div className="safe-bottom-padding sticky bottom-0 mt-6 bg-bg-surface pt-4 md:mt-8 md:bg-transparent">
            <Button type="submit" variant="primary" className="w-full" loading={loading} onClick={() => void submit()}>
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
              {!loading ? <ArrowRight className="h-4 w-4" /> : null}
            </Button>
            <div className="mt-4 text-center text-sm text-text-secondary">
              {mode === 'signin' ? (
                <>
                  <Link href="/reset-password" className="text-primary">
                    Forgot password?
                  </Link>
                  <span className="mx-2 text-text-muted">|</span>
                  <Link href="/auth?tab=signup" className="text-primary">
                    Don&apos;t have an account? Sign up
                  </Link>
                </>
              ) : (
                <Link href="/auth?tab=signin" className="text-primary">
                  Already have an account? Sign in
                </Link>
              )}
            </div>
          </div>

          {mode === 'signup' ? (
            <div className="mt-6 rounded-3xl border border-border-default bg-bg-elevated p-4">
              <p className="text-sm font-semibold text-text-primary">Workspace onboarding starts immediately after signup</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {industryCards.slice(0, 6).map((industry) => (
                  <span key={industry.slug} className="rounded-full border border-border-default px-3 py-1 text-xs text-text-secondary">
                    {industry.name}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {eastAfricanCountries.slice(0, 6).map((country) => (
                  <span key={country.code} className="rounded-full border border-border-default px-3 py-1 text-xs text-text-secondary">
                    {country.flag} {country.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-text-primary">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-accent-red">{error}</span> : null}
    </label>
  );
}
