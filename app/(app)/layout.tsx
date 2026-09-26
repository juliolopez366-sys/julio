import { AppShell } from '@/components/app/app-shell';

export default function AppInternaLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
