import { useQuery } from "@tanstack/react-query";
import { Activity, fetchSixWeeksActivities } from "../api/activities";

export type WeeklyRunSummary = {
  weekStart: string;
  weekLabel: string; // e.g. "Jun 17"
  totalMiles: number;
  pace: number;
};

function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekLabel(date: Date) {
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" }); // e.g. "Jun 17"
}

export function useSixWeeksRunsChartData(userId: string | undefined) {
  return useQuery({
    queryKey: ["sixWeeksActivities", userId],
    queryFn: async () => {
      if (!userId) return Promise.resolve([]);

      const allActivities = await fetchSixWeeksActivities(userId);
      const weeksMap = new Map<string, Activity[]>();
      allActivities.forEach((act) => {
        const actDate = new Date(act.start_date_local);
        const monday = getMonday(actDate);
        const mondayISO = monday.toISOString();
        if (!weeksMap.has(mondayISO)) {
          weeksMap.set(mondayISO, []);
        }
        weeksMap.get(mondayISO)!.push(act);
      });
      const weekSummaries: WeeklyRunSummary[] = Array.from(weeksMap.entries())
        .map(([mondayISO, weekActs]) => {
          const totalMiles = weekActs.reduce(
            (sum, a) => sum + a.distance / 1609.34,
            0,
          ); // assuming meters to miles
          const totalTime = weekActs.reduce((sum, a) => sum + a.moving_time, 0); // seconds
          const avgPace = totalMiles > 0 ? totalTime / 60 / totalMiles : 0; // min/mile

          return {
            weekStart: mondayISO,
            weekLabel: getWeekLabel(new Date(mondayISO)),
            totalMiles: +totalMiles.toFixed(1),
            pace: +avgPace.toFixed(2), // rounded
          };
        })
        .sort((a, b) => a.weekStart.localeCompare(b.weekStart));

      return weekSummaries;
    },
    staleTime: 1000 * 60 * 1,
  });
}
