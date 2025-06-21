import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export type StravaStats = {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
    achievement_count: number;
  };
  all_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
    achievement_count: number;
  };
};

export async function getAthleteStats(userId: string): Promise<StravaStats> {
  const res = await axios.get<StravaStats>(`${apiBaseUrl}/athletes/stats`, {
    params: { user_id: userId },
  });
  return res.data;
}
