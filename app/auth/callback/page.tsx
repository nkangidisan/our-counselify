'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { redirectAfterAuth } from '@/lib/authRedirect';
import { authApi, supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    let active = true;

    async function resolveExistingSession() {
      const { data } = await authApi.getSession();
      const session = data?.session ?? null;

      if (!active || !session?.user) {
        return;
      }

      await redirectAfterAuth(session.user.id, router);
    }

    void resolveExistingSession();

    if (!supabase) {
      router.replace('/auth?tab=signin');
      return () => {
        active = false;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!active) {
        return;
      }

      if (event === 'SIGNED_IN' && session) {
        await redirectAfterAuth(session.user.id, router);
      }

      if (event === 'SIGNED_OUT') {
        router.replace('/auth?tab=signin');
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-base px-4">
      <div className="space-y-4 text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-2"
          style={{
            borderColor: 'var(--border)',
            borderTopColor: 'var(--primary)',
          }}
        />
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Signing you in to The Counselify...</p>
      </div>
    </div>
  );
}
