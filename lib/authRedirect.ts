import { supabase } from '@/lib/supabase';

type AuthNavigator = {
  replace: (href: string) => void;
};

type ProfileAuthState = {
  id: string;
  email: string | null;
  created_at: string | null;
  onboarding_completed: boolean | null;
  last_login_at: string | null;
};

function isNewUser(profile: ProfileAuthState | null) {
  if (!profile) {
    return true;
  }

  return !profile.onboarding_completed;
}

export async function redirectAfterAuth(userId: string, navigate: AuthNavigator) {
  try {
    if (!supabase) {
      navigate.replace('/app');
      return;
    }

    const { data: userResult } = await supabase.auth.getUser();
    const user = userResult?.user ?? null;

    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id,email,created_at,onboarding_completed,last_login_at')
      .eq('id', userId)
      .maybeSingle<ProfileAuthState>();

    if (!existingProfile && user) {
      await supabase.from('profiles').upsert(
        {
          id: user.id,
          email: user.email ?? '',
          full_name: user.user_metadata?.full_name ?? null,
          onboarding_completed: false,
          last_login_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );
      navigate.replace('/onboarding');
      return;
    }

    await supabase
      .from('profiles')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', userId);

    navigate.replace(isNewUser(existingProfile) ? '/onboarding' : '/app');
  } catch {
    navigate.replace('/app');
  }
}

export { isNewUser };
