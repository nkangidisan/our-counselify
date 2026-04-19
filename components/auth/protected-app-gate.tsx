'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

export function ProtectedAppGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/auth?tab=signin');
    }
  }, [loading, router, session]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base px-4">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2"
          style={{
            borderColor: 'var(--border)',
            borderTopColor: 'var(--primary)',
          }}
        />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base px-4">
        <div className="rounded-lg border border-border-default bg-bg-surface px-5 py-4 text-sm text-text-secondary">
          Redirecting to sign in...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
