# Vercel Environment Variables Setup Guide

## **Step 1: Get Your Supabase Credentials**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings → API**
4. Copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Anon Public Key** (starts with `eyJhbG...`)

## **Step 2: Set Environment Variables in Vercel**

### **Option A: Using Vercel Dashboard (Recommended)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add these variables:

| Variable                        | Value                             | Environments                     |
| ------------------------------- | --------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://xxxxx.supabase.co`       | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...`                       | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL`           | `https://yourdomain.com`          | Production                       |
| `NEXT_PUBLIC_APP_URL`           | `https://your-preview.vercel.app` | Preview                          |

⚠️ **IMPORTANT:**

- **DO NOT** set a secret `SUPABASE_SERVICE_ROLE_KEY` in client-side code
- Use `NEXT_PUBLIC_` prefix ONLY for values that should be exposed to the browser
- Never commit actual keys to GitHub (they're public!)

### **Option B: Using Vercel CLI**

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Enter: https://xxxxx.supabase.co
# Select environments: Production, Preview, Development

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Enter: eyJhbG...
# Select environments: Production, Preview, Development

vercel env add NEXT_PUBLIC_APP_URL
# Enter: https://yourdomain.com (or preview URL)
```

## **Step 3: Redeploy Your Project**

After setting environment variables:

```bash
git push origin main
```

Or manually trigger a redeploy in Vercel Dashboard:

1. Go to your project
2. Click **Redeploy**
3. Select **Use existing Git commit** → **Deploy**

## **Step 4: Verify the Deployment**

✅ Check build logs in Vercel Dashboard:

- Go to **Deployments** → Latest
- Look for **Build Logs**
- Search for any errors about missing environment variables

✅ Test your app:

- Visit your deployed URL
- Try logging in or any Supabase feature
- Check browser console for errors

## **Troubleshooting**

| Error                                       | Cause                        | Solution                                          |
| ------------------------------------------- | ---------------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL should be string` | Env var not set in Vercel    | Add it in Vercel Settings → Environment Variables |
| `Invalid URL`                               | Wrong Supabase URL format    | Verify it looks like `https://xxxxx.supabase.co`  |
| `401 Unauthorized`                          | Wrong anon key               | Copy the key exactly from Supabase (no spaces)    |
| `Build succeeds but app broken`             | Using old Vercel build cache | Click **Redeploy** and select "Clear Build Cache" |

## **Next.js Environment Variables Behavior**

- Variables are embedded at **build time** (not runtime)
- You must **redeploy** after changing env vars
- `NEXT_PUBLIC_*` variables are exposed to browser (secure only public data)
- Regular variables (no prefix) are only available on server-side
