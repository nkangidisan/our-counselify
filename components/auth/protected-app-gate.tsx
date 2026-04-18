'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/supabase';
import { useAuthStore } from '@/lib/store';

export function ProtectedAppGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, loading, setAuth, setLoading } = useAuthStore();

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      setLoading(true);
      const { data } = await authApi.getSession();
      const session = data?.session ?? null;

      if (cancelled) return;

      if (!session?.user) {
        setAuth(false, null);
        router.replace('/auth?tab=signin');
        return;
      }

      setAuth(true, session.user);
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [router, setAuth, setLoading]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base px-4">
        <div className="rounded-lg border border-border-default bg-bg-surface px-5 py-4 text-sm text-text-secondary">
          Checking your workspace access...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
