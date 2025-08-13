import apiClient from "./client";
import { StravaStats } from "../types/stats";

export async function getAthleteStats(userId: string): Promise<StravaStats> {
  const response = await apiClient.get<StravaStats>("/athletes/stats", {
    params: { user_id: userId },
  });
  return response.data;
}

export async function getAthleteProfile(userId: string): Promise<unknown> {
  const response = await apiClient.get(`/athletes/${userId}`);
  return response.data;
}
