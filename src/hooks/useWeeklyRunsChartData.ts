import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "../api/activities";
import { getLastNWeekOffsets } from "../utils/getLastNWeekOffsets";
import { getAveragePace } from "../utils/getAveragePace";
import { format } from "date-fns";
import { getRange } from "../utils/getRange";

export type WeeklyRunSummary = {
  weekStart: string;
  weekLabel: string; // e.g. "Jun 17"
  totalMiles: number;
  pace: number;
};

export function useWeeklyRunsChartData(
  userId: string | undefined,
  weekOffset: number,
  weeksCount = 6,
) {
  const weekOffsets = getLastNWeekOffsets(weekOffset, weeksCount);

  return useQuery<WeeklyRunSummary[]>({
    queryKey: ["weeklyRunsChart", userId, ...weekOffsets],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return [];

      const all: WeeklyRunSummary[] = [];
      for (const offset of weekOffsets) {
        const acts = await fetchActivities(userId, offset);
        const totalMiles =
          acts.reduce((sum, a) => sum + a.distance, 0) / 1609.34;
        const pace = getAveragePace(acts);
        const { start, end } = getRange(offset);
        all.push({
          totalMiles: parseFloat(totalMiles.toFixed(1)),
          pace: pace,
          weekLabel: `${format(start, "MMM dd")}–${format(end, "dd")}`,
          weekStart: "sdfsfd",
        });
      }
      return all;
    },
    staleTime: 1000 * 60 * 1,
  });
}
