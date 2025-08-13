import { QueryClient } from "@tanstack/react-query";
import { isUnauthorizedError } from "../types/error";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000, // 1 minute default
      refetchOnWindowFocus: false,
      retry: (failureCount, error: unknown) => {
        // Don't retry on auth errors
        if (isUnauthorizedError(error)) return false;
        return failureCount < 2;
      },
    },
  },
});
