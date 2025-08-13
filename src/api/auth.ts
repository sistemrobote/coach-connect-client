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

export async function logout(options: LogoutRequest = {}): Promise<void> {
  try {
    const response = await apiClient.post("/auth/logout", {
      revoke_strava: options.revoke_strava || false,
    });

    if (response.data.success !== false) {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Logout failed:", error);
    window.location.href = "/login";
  }
}
