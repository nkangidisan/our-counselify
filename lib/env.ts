import { z } from 'zod';

const trimmedString = z.string().trim().min(1);
const httpsUrl = trimmedString.url().refine((value) => value.startsWith('https://'), {
  message: 'Supabase URLs must start with https://',
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: httpsUrl,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: trimmedString,
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const rawPublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

const inferredAppUrl = (() => {
  const explicitAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicitAppUrl) return explicitAppUrl;

  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionUrl) return `https://${productionUrl}`;

  const previewUrl = process.env.VERCEL_URL?.trim();
  if (previewUrl) return `https://${previewUrl}`;

  return 'http://localhost:3000';
})();

const envResult = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: rawSupabaseUrl,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: rawPublishableKey,
  NEXT_PUBLIC_APP_URL: inferredAppUrl,
});

const envErrors = envResult.success ? [] : envResult.error.issues.map((issue) => issue.message);

export const env = {
  NEXT_PUBLIC_SUPABASE_URL: envResult.success ? envResult.data.NEXT_PUBLIC_SUPABASE_URL : rawSupabaseUrl,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: envResult.success ? envResult.data.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY : rawPublishableKey,
  NEXT_PUBLIC_APP_URL: envResult.success ? envResult.data.NEXT_PUBLIC_APP_URL : inferredAppUrl,
};

export const envValidation = {
  isValid: envResult.success,
  errors: envErrors,
  usedLegacyAnonKey: !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
};

export function getSupabaseConfig() {
  if (!envValidation.isValid || !env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return null;
  }

  return {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    publishableKey: env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  };
}

export function getSupabaseConfigError(context = 'this feature') {
  const details =
    envValidation.errors.length > 0
      ? envValidation.errors.join(' ')
      : 'Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to your environment.';

  return `${context} is unavailable because Supabase is not configured correctly. ${details}`;
}

export type PublicEnv = typeof env;
