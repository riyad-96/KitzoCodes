import type { ReactNode } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function AuthProtectedWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuthContext();
  const location = useLocation();

  if (user) {
    return <Navigate to={location.state ? location.state : '/'} replace />;
  }
  return children;
}
