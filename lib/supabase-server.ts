import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabaseConfig } from './env';

export function createSupabaseServerClient() {
  const config = getSupabaseConfig();
  if (!config) {
    return null;
  }

  const cookieStore = cookies();

  return createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always write cookies. Middleware or route handlers
          // should handle refresh flows when cookie writes are required.
        }
      },
    },
  });
}
