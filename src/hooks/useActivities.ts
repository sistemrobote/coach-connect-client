import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "../api/activities";
import type { Activity } from "../types/activity";

// Get activities from Strava
export function useActivities(userId: string | undefined, weekOffset: number) {
  return useQuery<Activity[]>({
    queryKey: ["activities", userId, weekOffset],
    queryFn: () => {
      if (!userId) return Promise.resolve([]);
      return fetchActivities(userId, weekOffset);
    },
    enabled: !!userId,
    // keepPreviousData: true,
    staleTime: 1000 * 60,
    retry: 1,
  });
}
