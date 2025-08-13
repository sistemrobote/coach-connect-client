import { createContext } from "react";
import { User, AuthResponse } from "../types/auth";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  logout: () => Promise<void>;
  login?: (authData: AuthResponse) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
