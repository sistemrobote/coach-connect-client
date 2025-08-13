import { useQuery } from "@tanstack/react-query";
import { getAthleteStats } from "../api/getAthleteStats";

import { StravaStats } from "../types/stats";

export function useAthleteStats() {
  return useQuery<StravaStats>({
    queryKey: ["athleteStats"],
    queryFn: () => {
      return getAthleteStats();
    },
    enabled: true,
    staleTime: 1000 * 60 * 1,
    retry: 1,
  });
}
