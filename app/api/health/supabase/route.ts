import { NextResponse } from 'next/server';
import { envValidation, getSupabaseConfig } from '@/lib/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        errors: envValidation.errors,
      },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(`${config.url}/auth/v1/settings`, {
      headers: {
        apikey: config.publishableKey,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          configured: true,
          connected: false,
          status: response.status,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      configured: true,
      connected: true,
      usingLegacyAnonKeyFallback: envValidation.usedLegacyAnonKey,
      projectUrl: config.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown Supabase connectivity error',
      },
      { status: 502 }
    );
  }
}
