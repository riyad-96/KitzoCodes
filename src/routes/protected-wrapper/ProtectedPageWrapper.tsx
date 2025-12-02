import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export default function ProtectedPageWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/login" state={location.pathname} />;
  }

  return children;
}
