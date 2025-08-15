import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/client";
import { Activity, ActivitiesData } from "../types";

export function useRunningHeatmapData() {
  return useQuery<Activity[]>({
    queryKey: ["runningHeatmap", "activity"],
    queryFn: async () => {
      const today = new Date();
      const after = Math.floor(
        new Date(today.getTime() - 48 * 7 * 24 * 60 * 60 * 1000).getTime() /
          1000,
      );
      const before = Math.floor(today.getTime() / 1000);

      const res = await apiClient.get<ActivitiesData>("/activities", {
        params: { after, before },
      });

      // Group activities by date with pace calculation
      const activityByDate = new Map<
        string,
        { count: number; totalPace: number }
      >();

      res.data.activities.forEach((activity) => {
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

      const result: Activity[] = [];
      activityByDate.forEach(({ count, totalPace }, dateStr) => {
        const averagePace = count > 0 ? totalPace / count : undefined;

        // Calculate intensity level based on pace (minutes per mile)
        let level = 0;
        if (count > 0 && averagePace) {
          if (averagePace < 7)
            level = 4; // less than 7 min/mi
          else if (averagePace < 8)
            level = 3; // 7-8 min/mi
          else if (averagePace < 9)
            level = 2; // 8-9 min/mi
          else level = 1; // 9+ min/mi
        } else if (count > 0) {
          // Fallback to count-based if no pace data
          level = 1;
        }

        result.push({
          date: new Date(dateStr),
          count,
          level,
          averagePace,
        });
      });

      return result;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}
