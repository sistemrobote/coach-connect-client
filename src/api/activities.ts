import apiClient from "./client";
import { getUnixTimestampsForWeek } from "../utils/getUnixTimestampsForWeek";
import {
  Activity,
  ActivityFilters,
  CreateManualActivityRequest,
  ManualActivitiesResponse,
  CreateWorkoutResponse,
} from "../types/activity";

// Get activities from Strava
export async function fetchActivities(
  userId: string,
  weekOffset = 0,
): Promise<Activity[]> {
  const { after, before } = getUnixTimestampsForWeek(weekOffset);

  const response = await apiClient.get<Activity[]>("/activities", {
    params: { user_id: userId, after, before },
  });
  return response.data;
}

export async function fetchActivitiesWithFilters(
  filters: ActivityFilters,
): Promise<Activity[]> {
  const { userId, weekOffset = 0, after, before } = filters;

  const timestamps =
    after && before ? { after, before } : getUnixTimestampsForWeek(weekOffset);

  const response = await apiClient.get<Activity[]>("/activities", {
    params: { user_id: userId, ...timestamps },
  });
  return response.data;
}

export async function fetchActivityById(activityId: number): Promise<Activity> {
  const response = await apiClient.get<Activity>(`/activities/${activityId}`);
  return response.data;
}

// Manual Activities API (using /workouts endpoint)
export async function fetchManualActivities(): Promise<ManualActivitiesResponse> {
  const response =
    await apiClient.get<ManualActivitiesResponse>("/user/workouts");
  return response.data;
}

export async function createManualActivity(
  activityData: CreateManualActivityRequest,
): Promise<CreateWorkoutResponse> {
  const response = await apiClient.post<CreateWorkoutResponse>(
    "/user/workouts",
    activityData,
  );
  return response.data;
}

export async function deleteManualActivity(
  workoutId: string,
): Promise<{ success: boolean; message: string; deleted_workout_id: string }> {
  const response = await apiClient.delete<{
    success: boolean;
    message: string;
    deleted_workout_id: string;
  }>(`/user/workouts/${workoutId}`);
  return response.data;
}
