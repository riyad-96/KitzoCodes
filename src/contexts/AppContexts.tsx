import type { ReactNode } from "react";
import AuthContext from "./AuthContext";

export default function AppContexts({children}: {children: ReactNode}) {
  return (
    <AuthContext>
      {children}
    </AuthContext>
  )
}
