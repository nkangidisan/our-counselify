import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let client: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  client = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase URL or Anon Key is missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable auth and data sync.');
}

export const supabase = client;

const missingEnvError = () => ({
  message: 'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
});

export const authApi = {
  async signInWithGoogle() {
    if (!supabase) return { data: null, error: missingEnvError() };
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/app` },
    });
    return { data, error };
  },

  async sendPhoneOtp(phone: string) {
    if (!supabase) return { data: null, error: missingEnvError() };
    const { data, error } = await supabase.auth.signInWithOtp({ phone });
    return { data, error };
  },

  async verifyPhoneOtp(phone: string, token: string) {
    if (!supabase) return { data: null, error: missingEnvError() };
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });
    return { data, error };
  },

  async signUp(email: string, password: string, metadata?: Record<string, unknown>) {
    if (!supabase) return { data: null, error: missingEnvError() };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    return { data, error };
  },

  async signIn(email: string, password: string) {
    if (!supabase) return { data: null, error: missingEnvError() };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  },

  async signOut() {
    if (!supabase) return { error: missingEnvError() };
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getSession() {
    if (!supabase) return { data: null, error: missingEnvError() };
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  },

  async getCurrentUser() {
    if (!supabase) return { data: null, error: missingEnvError() };
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },

  async resetPassword(email: string) {
    if (!supabase) return { data: null, error: missingEnvError() };
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password`,
    });
    return { data, error };
  },

  async updatePassword(newPassword: string) {
    if (!supabase) return { data: null, error: missingEnvError() };
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    return { data, error };
  },
};
