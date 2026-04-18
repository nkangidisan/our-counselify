import { AuthScreen } from '@/components/auth/auth-screen';

export default function AuthPage({ searchParams }: { searchParams?: { tab?: string } }) {
  const tab = searchParams?.tab === 'signup' ? 'signup' : 'signin';
  return <AuthScreen defaultMode={tab} />;
}
