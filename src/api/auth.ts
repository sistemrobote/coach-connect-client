import apiClient from "./client";
import { AuthResponse, LogoutRequest } from "../types/auth";

export async function isUserAuthenticated(): Promise<boolean> {
  try {
    const response = await apiClient.get("/auth/me");
    return response.status === 200;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
}

export async function getCurrentUser(): Promise<AuthResponse> {
  const response = await apiClient.get<AuthResponse>("/auth/me");
  return response.data;
}

function clearAuthCookies(): void {
  const cookiesToClear = ["auth_token", "session", "token", "jwt"];
  const domain = window.location.hostname;
  const paths = ["/", "/auth", ""];

  // Try to clear specific cookies with various domain/path combinations
  cookiesToClear.forEach((cookieName) => {
    paths.forEach((path) => {
      // Clear without domain
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};`;
      // Clear with current domain
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=${domain}`;
      // Clear with dot-prefixed domain
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=.${domain}`;
      // Clear with explicit secure flag (in case it was set with secure)
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};secure`;
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=${domain};secure`;
    });
  });

  // Clear any existing auth-related cookies
  document.cookie.split(";").forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    const cookieName = name.trim();
    if (
      cookieName.includes("auth") ||
      cookieName.includes("token") ||
      cookieName.includes("session")
    ) {
      paths.forEach((path) => {
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};`;
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=${domain}`;
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=.${domain}`;
      });
    }
  });
}

export async function logout(options: LogoutRequest = {}): Promise<void> {
  try {
    const response = await apiClient.post("/auth/logout", {
      revoke_strava: options.revoke_strava || false,
    });

    clearAuthCookies();

    if (response.data.success !== false) {
      // Force a hard reload to ensure cookies are cleared
      window.location.replace("/login");
    }
  } catch (error) {
    console.error("Logout failed:", error);
    clearAuthCookies();
    // Force a hard reload to ensure cookies are cleared
    window.location.replace("/login");
  }
}
