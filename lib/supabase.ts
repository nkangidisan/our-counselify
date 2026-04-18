'use client';

import { AuthError } from '@supabase/supabase-js';
import { env, envValidation, getSupabaseConfigError } from './env';
import { getSupabaseBrowserClient } from './supabase-browser';

function getClientOrError(context: string) {
  const client = getSupabaseBrowserClient();

  if (!client) {
    return {
      client: null,
      error: new AuthError(getSupabaseConfigError(context)),
    };
  }

  return { client, error: null };
}

function getRedirectUrl(path: string) {
  if (typeof window !== 'undefined') {
    return new URL(path, window.location.origin).toString();
  }

  return new URL(path, env.NEXT_PUBLIC_APP_URL).toString();
}

export const supabase = getSupabaseBrowserClient();

export const supabaseStatus = {
  configured: Boolean(supabase),
  errors: envValidation.errors,
  usedLegacyAnonKey: envValidation.usedLegacyAnonKey,
};

export const authApi = {
  async signInWithGoogle() {
    const { client, error } = getClientOrError('Google sign-in');
    if (!client) return { data: null, error };

    return client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: getRedirectUrl('/app') },
    });
  },

  async sendPhoneOtp(phone: string) {
    const { client, error } = getClientOrError('Phone sign-in');
    if (!client) return { data: null, error };

    return client.auth.signInWithOtp({ phone });
  },

  async verifyPhoneOtp(phone: string, token: string) {
    const { client, error } = getClientOrError('Phone verification');
    if (!client) return { data: null, error };

    return client.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });
  },

  async signUp(email: string, password: string, metadata?: Record<string, unknown>) {
    const { client, error } = getClientOrError('Account creation');
    if (!client) return { data: null, error };

    return client.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
  },

  async signIn(email: string, password: string) {
    const { client, error } = getClientOrError('Email sign-in');
    if (!client) return { data: null, error };

    return client.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    const { client, error } = getClientOrError('Sign-out');
    if (!client) return { error };

    return client.auth.signOut();
  },

  async getSession() {
    const { client, error } = getClientOrError('Session lookup');
    if (!client) return { data: { session: null }, error };

    return client.auth.getSession();
  },

  async getCurrentUser() {
    const { client, error } = getClientOrError('User lookup');
    if (!client) return { data: { user: null }, error };

    return client.auth.getUser();
  },

  async resetPassword(email: string) {
    const { client, error } = getClientOrError('Password reset');
    if (!client) return { data: null, error };

    return client.auth.resetPasswordForEmail(email, {
      redirectTo: getRedirectUrl('/auth/reset-password'),
    });
  },

  async updatePassword(newPassword: string) {
    const { client, error } = getClientOrError('Password update');
    if (!client) return { data: null, error };

    return client.auth.updateUser({ password: newPassword });
  },
};
