import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { auth } from '../configs/firebase.config';
import type { User } from 'firebase/auth';

//! type for context
type AuthContextType = {
  user: User | null;
  userLoading: boolean;
};

const NewContext = createContext<AuthContextType | null>(null);

//! context wrapper component
function AuthContext({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserLoading(false);
    });

    return unsub;
  }, []);

  return (
    <NewContext.Provider
      value={{
        user,
        userLoading,
      }}
    >
      {children}
    </NewContext.Provider>
  );
}

export default AuthContext;

//! use context hook
export function useAuthContext() {
  const context = useContext(NewContext);

  if (context === null) {
    throw new Error('useAuthContext must be used within a context Provider');
  }

  return context;
}
