import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase-server';

const uploadSchema = z.object({
  contractName: z.string().trim().min(2),
  counterparty: z.string().trim().min(2),
  jurisdiction: z.string().trim().min(1),
  contractType: z.string().trim().min(1),
  fileName: z.string().trim().min(1),
  fileSize: z.number().int().positive().max(10 * 1024 * 1024),
  mimeType: z.enum(['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
});

export async function POST(request: Request) {
  const parsed = uploadSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid upload payload.' }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'Service unavailable.' }, { status: 503 });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const { error } = await supabase.from('contract_uploads').insert({
    user_id: user.id,
    contract_name: parsed.data.contractName,
    counterparty: parsed.data.counterparty,
    jurisdiction: parsed.data.jurisdiction,
    contract_type: parsed.data.contractType,
    file_name: parsed.data.fileName,
    file_size: parsed.data.fileSize,
    mime_type: parsed.data.mimeType,
    status: 'queued',
  });

  if (error) {
    return NextResponse.json({ ok: false, error: 'Unable to queue contract upload.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
