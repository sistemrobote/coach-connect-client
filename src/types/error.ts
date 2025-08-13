export interface ApiError {
  response?: {
    status: number;
    statusText: string;
    data?: unknown;
  };
  request?: unknown;
  message: string;
  code?: string;
}

export interface QueryError extends Error {
  response?: {
    status: number;
    statusText: string;
    data?: unknown;
  };
}

// Type guard to check if error is an API error
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as ApiError).response === "object"
  );
}

// Type guard specifically for 401 errors
export function isUnauthorizedError(error: unknown): boolean {
  return isApiError(error) && error.response?.status === 401;
}
