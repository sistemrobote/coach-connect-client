import apiClient from "./client";
import { StravaStats } from "../types/stats";

export async function getAthleteStats(): Promise<StravaStats> {
  const response = await apiClient.get<StravaStats>("/athletes/stats");
  return response.data;
}

export async function getAthleteProfile(userId: string): Promise<unknown> {
  const response = await apiClient.get(`/athletes/${userId}`);
  return response.data;
}
