import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuthQuery";
import { AuthContext } from "./authContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const authData = useAuth();

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}
