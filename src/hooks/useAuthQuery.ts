import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, logout as apiLogout } from "../api/auth";
import { AuthResponse } from "../types/auth";
import { QueryClient } from "@tanstack/react-query";
import { isUnauthorizedError } from "../types/error";

export const AUTH_QUERY_KEY = ["auth", "user"];

export function useAuthQuery() {
  const isLoginPage = window.location.pathname === "/login";

  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error: unknown) => {
      // Don't retry on 401s (unauthorized)
      if (isUnauthorizedError(error)) return false;
      return failureCount < 2;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !isLoginPage, // Don't auto-fetch on login page
  });
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { data: authResponse, isLoading, error } = useAuthQuery();

  const logout = async () => {
    try {
      await apiLogout();
      queryClient.clear();
    } catch (error) {
      console.error("Logout failed:", error);
      queryClient.clear();
    }
  };
  // const login = (authData: AuthResponse) => {
  //   queryClient.setQueryData(AUTH_QUERY_KEY, authData);
  // };

  return {
    user: authResponse?.user || null,
    isAuthenticated: !!authResponse?.user,
    isLoading,
    error: error as Error | null,
    logout,
    // login,
  };
}

// Helper function to get cached auth data outside of React components
export interface GetCachedAuthData {
  (queryClient: QueryClient): AuthResponse | undefined;
}

export const getCachedAuthData: GetCachedAuthData = (queryClient) => {
  return queryClient.getQueryData<AuthResponse>(AUTH_QUERY_KEY);
};
