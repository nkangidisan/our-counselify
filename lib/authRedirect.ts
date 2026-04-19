import { supabase } from '@/lib/supabase';

type AuthNavigator = {
  replace: (href: string) => void;
};

export async function redirectAfterAuth(userId: string, navigate: AuthNavigator) {
  try {
    if (!supabase) {
      navigate.replace('/onboarding');
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', userId)
      .single();

    if (error || !data || !data.onboarding_completed) {
      navigate.replace('/onboarding');
      return;
    }

    navigate.replace('/app');
  } catch {
    navigate.replace('/onboarding');
  }
}
