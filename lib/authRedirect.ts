import { supabase } from '@/lib/supabase';

type AuthNavigator = {
  replace: (href: string) => void;
};

export async function redirectAfterAuth(userId: string, navigate: AuthNavigator) {
  try {
    if (!supabase) {
      navigate.replace('/app');
      return;
    }

    navigate.replace('/app');
  } catch {
    navigate.replace('/app');
  }
}
