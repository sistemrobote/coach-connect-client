import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ActivityData } from "../components/ActivityHeatmap";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

type Activity = {
  id: number;
  name: string;
  start_date_local: string;
  distance: number;
  average_speed: number;
  moving_time: number;
};

export function useRunningHeatmapData(userId: string | undefined) {
  return useQuery<ActivityData[]>({
    queryKey: ["runningHeatmap", userId],
    queryFn: async () => {
      if (!userId) return [];

      // Get 48 weeks of data
      const today = new Date();
      const after = Math.floor(
        new Date(today.getTime() - 48 * 7 * 24 * 60 * 60 * 1000).getTime() /
          1000,
      );
      const before = Math.floor(today.getTime() / 1000);

      const res = await axios.get<Activity[]>(`${apiBaseUrl}/activities`, {
        params: { user_id: userId, after, before },
      });

      // Group activities by date with pace calculation
      const activityByDate = new Map<
        string,
        { count: number; totalPace: number }
      >();

      res.data.forEach((activity) => {
        const date = new Date(activity.start_date_local);
        const dateKey = date.toDateString();

        // Calculate pace in minutes per mile
        // distance is in meters, moving_time is in seconds
        const distanceInMiles = activity.distance / 1609.34;
        const movingTimeInMinutes = activity.moving_time / 60;
        const paceMinPerMile = movingTimeInMinutes / distanceInMiles;

        const existing = activityByDate.get(dateKey) || {
          count: 0,
          totalPace: 0,
        };
        activityByDate.set(dateKey, {
          count: existing.count + 1,
          totalPace: existing.totalPace + paceMinPerMile,
        });
      });

      // Convert to ActivityData format
      const result: ActivityData[] = [];
      activityByDate.forEach(({ count, totalPace }, dateStr) => {
        result.push({
          date: new Date(dateStr),
          count,
          averagePace: count > 0 ? totalPace / count : undefined,
        });
      });
      console.log("🚀 ~ result>>", result);

      return result;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}
