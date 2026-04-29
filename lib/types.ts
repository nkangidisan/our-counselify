// Database types for Supabase

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  company_name: string;
  industry: string;
  country: string;
  avatar_url?: string;
  onboarding_completed?: boolean;
  last_login_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  user_id: string;
  name: string;
  logo_url?: string;
  website?: string;
  industry: string;
  country: string;
  primary_jurisdiction: string;
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: string;
  organization_id: string;
  name: string;
  counterparty: string;
  jurisdiction: string;
  contract_type: string;
  risk_score: number;
  status: 'active' | 'completed' | 'archived' | 'review';
  effective_date?: string;
  expiry_date?: string;
  file_url: string;
  created_at: string;
  updated_at: string;
}

export interface ContractClause {
  id: string;
  contract_id: string;
  category: string;
  title: string;
  text: string;
  extracted_at: string;
}

export interface ContractRisk {
  id: string;
  contract_id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  clause_ref: string;
  description: string;
  recommended_action: string;
  created_at: string;
}

export interface ComplianceItem {
  id: string;
  organization_id: string;
  category: string;
  title: string;
  due_date: string;
  status: 'todo' | 'in_progress' | 'done';
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface RegulatorySignal {
  id: string;
  jurisdiction: string;
  title: string;
  description: string;
  probability: number;
  impact_level: 'low' | 'medium' | 'high' | 'critical';
  affected_obligations: string[];
  recommended_action: string;
  expected_date: string;
  created_at: string;
}

export interface DocumentTemplate {
  id: string;
  organization_id: string;
  name: string;
  category: string;
  jurisdictions: string[];
  template_content: string;
  variables: string[];
  created_at: string;
  updated_at: string;
}

export interface AssistantConversation {
  id: string;
  organization_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface AssistantMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
}
