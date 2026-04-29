import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase-server';

const contactSchema = z.object({
  fullName: z.string().trim().min(2),
  companyName: z.string().trim().min(2),
  email: z.string().trim().email(),
  country: z.string().trim().min(1),
  inquiryType: z.string().trim().min(1),
  message: z.string().trim().min(20),
});

const requestTracker = new Map<string, { count: number; resetAt: number }>();
const windowMs = 60_000;
const maxPerWindow = 8;

function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = requestTracker.get(ip);
  if (!current || current.resetAt < now) {
    requestTracker.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= maxPerWindow) {
    return false;
  }
  current.count += 1;
  requestTracker.set(ip, current);
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Please try again shortly.' }, { status: 429 });
  }

  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid contact form payload.' }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'Service unavailable.' }, { status: 503 });
  }

  const { error } = await supabase.from('contact_inquiries').insert({
    full_name: parsed.data.fullName,
    company_name: parsed.data.companyName,
    email: parsed.data.email,
    country: parsed.data.country,
    inquiry_type: parsed.data.inquiryType,
    message: parsed.data.message,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: 'Unable to submit contact inquiry.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
