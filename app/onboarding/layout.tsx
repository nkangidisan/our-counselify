import { ProtectedAppGate } from '@/components/auth/protected-app-gate';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedAppGate>{children}</ProtectedAppGate>;
}
