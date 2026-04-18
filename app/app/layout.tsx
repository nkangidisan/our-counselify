import { ProtectedAppGate } from '@/components/auth/protected-app-gate';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedAppGate>{children}</ProtectedAppGate>;
}
