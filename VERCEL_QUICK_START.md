# Quick Start: Fix Vercel Deployment Error

## **The Problem (Why You Got the Error)**

```
"Invalid request: env.NEXT_PUBLIC_SUPABASE_URL should be string"
```

This happens because:

1. Environment variables are NOT set in Vercel
2. Code tries to use undefined variables
3. Supabase client validation fails

## **The Solution (What I've Done)**

✅ Created `lib/env.ts` - Validates all env vars using Zod schema
✅ Updated `lib/supabase.ts` - Uses validated env vars (guaranteed to be strings)
✅ Created `.env.local` - Template for local development
✅ Added error handling - Clear error messages if vars are missing

---

## **Right Now: 3 Simple Steps**

### **Step 1: Add to `.env.local` (Local Testing)**

Open your `.env.local` file and replace with your actual credentials:

```env
# Get these from Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Test locally:

```bash
npm run dev
```

### **Step 2: Add to Vercel Dashboard**

1. Go to: https://vercel.com/dashboard
2. Select your **counselify** project
3. Click **Settings** → **Environment Variables**
4. Add these (use the SAME credentials as .env.local):

| Name                            | Value                           | Check all 3 environments                 |
| ------------------------------- | ------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://xxxxx.supabase.co`     | ✓ Production ✓ Preview ✓ Development     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...`                     | ✓ Production ✓ Preview ✓ Development     |
| `NEXT_PUBLIC_APP_URL`           | `https://yourdomain.vercel.app` | ✓ Production (set to your actual domain) |

⚠️ **Make sure to check all 3 environment checkboxes!**

### **Step 3: Redeploy**

```bash
git push origin main
```

OR manually in Vercel:

- Go to **Deployments** → Find the failed deployment
- Click **Redeploy** → **Clear Build Cache** → **Redeploy**

---

## **How to Find Your Supabase Credentials**

### **Project URL:**

1. Go to https://app.supabase.com
2. Select your project
3. Click **Settings** (bottom left)
4. Click **API**
5. Copy **Project URL** (looks like `https://xxxxx.supabase.co`)

### **Anon Key:**

Same page, scroll down to **Anon public key** - copy it

---

## **Testing After Deploy**

1. Visit your Vercel URL
2. Try to login/signup (uses Supabase auth)
3. Open DevTools (F12) → Console tab
4. Look for any red errors
5. If errors, check:
   - Are all 3 env vars set in Vercel? (check Settings → Environment Variables)
   - Is the URL format correct? (starts with `https://`)
   - Is the anon key copied exactly? (no spaces)

---

## **What Changed (Technical Details)**

| File              | Change                                        | Why                                           |
| ----------------- | --------------------------------------------- | --------------------------------------------- |
| `lib/env.ts`      | NEW - Validates env vars with Zod             | Catch missing vars at build time, not runtime |
| `lib/supabase.ts` | Updated - Uses `env` instead of `process.env` | Guaranteed to have valid values               |
| `.env.local`      | NEW - Local development template              | No more guessing which vars you need          |

---

## **Common Issues & Fixes**

**Issue:** Build still fails after adding env vars

**Fix:**

1. Go to Vercel → Deployments → Latest
2. Click **Redeploy**
3. Click **Redeploy** again
4. **Important:** Make sure you set the same env vars in Vercel that you have in `.env.local`

---

**Issue:** "401 Unauthorized" or auth doesn't work

**Fix:**

1. Check you're using the **Anon Key** (not Service Role Key)
2. Copy the anon key exactly (no extra spaces)
3. Redeploy after fixing

---

**Issue:** Need to test with different Supabase projects

**Fix:**

1. Update your `.env.local` with different credentials
2. Update Vercel env vars separately (don't mix production and dev credentials)
3. Use "Preview" environment for testing

---

## **File References**

See these files for more details:

- [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md) - Detailed Vercel guide
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Full checklist before deploying
- [lib/env.ts](./lib/env.ts) - Env validation schema
- [lib/supabase.ts](./lib/supabase.ts) - Supabase client initialization

Done! Your app should deploy successfully now. 🚀
