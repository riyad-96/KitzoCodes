import type { ReactNode } from 'react';
import Logo from '../components/header/Logo';
import { useAuthContext } from '../contexts/AuthContext';

export default function LoadingLayout({ children }: { children: ReactNode }) {
  const { userLoading } = useAuthContext();

  if (userLoading) {
    return (
      <div className="bg-code-50 grid h-dvh place-items-center">
        <div className="cursor-default">
          <Logo />
        </div>
      </div>
    );
  }

  return children;
}
