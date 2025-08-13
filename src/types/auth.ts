export interface User {
  id: string;
  username: string;
  profile?: Record<string, unknown>;
}

export interface AuthResponse {
  user: User;
  success?: boolean;
}

export interface LogoutRequest {
  revoke_strava?: boolean;
}
