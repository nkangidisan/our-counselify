# Deployment Checklist

## **Before Deploying to Vercel**

- [ ] Have your Supabase project created
- [ ] Copy Supabase credentials (Project URL and Anon Key)
- [ ] Create `.env.local` file locally with test credentials
- [ ] Test locally: `npm run dev` - check if auth works
- [ ] Verify all imports use `lib/supabase.ts` and `lib/env.ts`

## **Vercel Deployment Steps**

1. **Set Environment Variables in Vercel Dashboard:**
   - [ ] Add `NEXT_PUBLIC_SUPABASE_URL`
   - [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - [ ] Add `NEXT_PUBLIC_APP_URL` (your Vercel domain)

2. **Deploy:**
   - [ ] Push code to GitHub: `git push origin main`
   - [ ] OR manually redeploy in Vercel dashboard
   - [ ] Wait for build to complete

3. **Verify:**
   - [ ] Check Vercel build logs for errors
   - [ ] Visit your deployed URL
   - [ ] Test login/signup functionality
   - [ ] Check browser DevTools console for errors

## **If Build Fails**

1. Click **Redeploy** in Vercel → **Clear Build Cache** → **Redeploy**
2. Check that env vars are set to all environments (Production, Preview, Development)
3. Verify Supabase URL format: `https://xxxxx.supabase.co` (with https://)
4. Verify anon key is copied exactly (no extra spaces)

## **Files You Now Have**

- ✅ `.env.local` - Local development variables (git ignored)
- ✅ `.env.example` - Template for what env vars are needed
- ✅ `lib/env.ts` - Validates env vars with Zod schema
- ✅ `lib/supabase.ts` - Initializes Supabase with validated env vars
- ✅ `VERCEL_ENV_SETUP.md` - Detailed Vercel setup guide

## **Key Differences from Before**

| Before                                                                | After                                          |
| --------------------------------------------------------------------- | ---------------------------------------------- |
| Empty string fallback: `process.env.NEXT_PUBLIC_SUPABASE_URL \|\| ''` | Validated at build time using Zod              |
| No validation → type error at runtime                                 | Validation → clear error message before deploy |
| Process.env accessed directly everywhere                              | Centralized in `lib/env.ts`                    |
| Errors only caught in production                                      | Errors caught during build                     |
