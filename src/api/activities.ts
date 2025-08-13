import apiClient from "./client";
import { getUnixTimestampsForWeek } from "../utils/getUnixTimestampsForWeek";
import { Activity, ActivityFilters } from "../types/activity";

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
