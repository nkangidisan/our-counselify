-- Adds contract upload queue records from the upload form.
CREATE TABLE IF NOT EXISTS public.contract_uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users ON DELETE SET NULL,
    contract_name TEXT NOT NULL,
    counterparty TEXT NOT NULL,
    jurisdiction TEXT NOT NULL,
    contract_type TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contract_uploads_user_created ON public.contract_uploads(user_id, created_at DESC);

ALTER TABLE public.contract_uploads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own contract uploads" ON public.contract_uploads;
CREATE POLICY "Users can insert their own contract uploads" ON public.contract_uploads
FOR INSERT WITH CHECK (auth.uid() = user_id);
