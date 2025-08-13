import { useQuery } from "@tanstack/react-query";
import { getAthleteStats } from "../api/getAthleteStats";

import { StravaStats } from "../types/stats";

export function useAthleteStats(athleteId: string | undefined) {
  return useQuery<StravaStats>({
    queryKey: ["athleteStats", athleteId],
    queryFn: () => {
      if (!athleteId) return Promise.reject("No athlete or token");
      return getAthleteStats(athleteId);
    },
    enabled: !!athleteId,
    staleTime: 1000 * 60 * 1,
    retry: 1,
  });
}
