-- THE COUNSELIFY - Supabase Schema
-- Run this SQL in your Supabase project's SQL editor
-- Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company_name TEXT,
    industry TEXT,
    country TEXT,
    avatar_url TEXT,
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Organizations
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    name TEXT NOT NULL,
    logo_url TEXT,
    website TEXT,
    industry TEXT,
    country TEXT,
    primary_jurisdiction TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Contracts
CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations ON DELETE CASCADE,
    name TEXT NOT NULL,
    counterparty TEXT NOT NULL,
    jurisdiction TEXT,
    contract_type TEXT,
    risk_score INT DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (
        status IN ('active', 'completed', 'archived', 'review')
    ),
    effective_date DATE,
    expiry_date DATE,
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Contract Clauses
CREATE TABLE IF NOT EXISTS public.contract_clauses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES public.contracts ON DELETE CASCADE,
    category TEXT,
    title TEXT,
    text TEXT,
    extracted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Contract Risks
CREATE TABLE IF NOT EXISTS public.contract_risks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES public.contracts ON DELETE CASCADE,
    severity TEXT CHECK (
        severity IN ('low', 'medium', 'high', 'critical')
    ),
    clause_ref TEXT,
    description TEXT,
    recommended_action TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Compliance Items
CREATE TABLE IF NOT EXISTS public.compliance_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations ON DELETE CASCADE,
    category TEXT,
    title TEXT,
    due_date DATE,
    status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
    assigned_to TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Regulatory Signals
CREATE TABLE IF NOT EXISTS public.regulatory_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jurisdiction TEXT,
    title TEXT,
    description TEXT,
    probability INT DEFAULT 50,
    impact_level TEXT CHECK (
        impact_level IN ('low', 'medium', 'high', 'critical')
    ),
    affected_obligations TEXT [] DEFAULT ARRAY []::TEXT [],
    recommended_action TEXT,
    expected_date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Document Templates
CREATE TABLE IF NOT EXISTS public.document_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT,
    jurisdictions TEXT [] DEFAULT ARRAY []::TEXT [],
    template_content TEXT,
    variables TEXT [] DEFAULT ARRAY []::TEXT [],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Documents (Generated)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations ON DELETE CASCADE,
    template_id UUID REFERENCES public.document_templates ON DELETE
    SET NULL,
        name TEXT NOT NULL,
        content TEXT,
        status TEXT DEFAULT 'draft' CHECK (
            status IN ('draft', 'ready', 'signed', 'archived')
        ),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Assistant Conversations
CREATE TABLE IF NOT EXISTS public.assistant_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations ON DELETE CASCADE,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Assistant Messages
CREATE TABLE IF NOT EXISTS public.assistant_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.assistant_conversations ON DELETE CASCADE,
    role TEXT CHECK (role IN ('user', 'assistant')),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users ON DELETE
    SET NULL,
        organization_id UUID REFERENCES public.organizations ON DELETE CASCADE,
        action TEXT,
        resource_type TEXT,
        resource_id TEXT,
        details JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Contact Inquiries
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    inquiry_type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Contract Upload Jobs
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
-- Indexes
CREATE INDEX idx_contracts_org ON public.contracts(organization_id);
CREATE INDEX idx_contracts_expiry ON public.contracts(expiry_date);
CREATE INDEX idx_contract_clauses_contract ON public.contract_clauses(contract_id);
CREATE INDEX idx_contract_risks_contract ON public.contract_risks(contract_id);
CREATE INDEX idx_compliance_items_org ON public.compliance_items(organization_id);
CREATE INDEX idx_regulatory_signals_jurisdiction ON public.regulatory_signals(jurisdiction);
CREATE INDEX idx_documents_org ON public.documents(organization_id);
CREATE INDEX idx_assistant_messages_conversation ON public.assistant_messages(conversation_id);
CREATE INDEX idx_audit_logs_org ON public.audit_logs(organization_id);
CREATE INDEX idx_contact_inquiries_created_at ON public.contact_inquiries(created_at DESC);
CREATE INDEX idx_contract_uploads_user_created ON public.contract_uploads(user_id, created_at DESC);
-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_clauses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regulatory_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assistant_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assistant_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_uploads ENABLE ROW LEVEL SECURITY;
-- RLS Policies (Example - adjust as needed)
CREATE POLICY "Users can view their own profile" ON public.profiles FOR
SELECT USING (auth.uid() = id);
CREATE POLICY "Users can view their organization data" ON public.organizations FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view their contracts" ON public.contracts FOR
SELECT USING (
        organization_id IN (
            SELECT id
            FROM public.organizations
            WHERE user_id = auth.uid()
        )
    );
CREATE POLICY "Anyone can submit contact inquiries" ON public.contact_inquiries FOR
INSERT WITH CHECK (true);
CREATE POLICY "Users can insert their own contract uploads" ON public.contract_uploads FOR
INSERT WITH CHECK (auth.uid() = user_id);