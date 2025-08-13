export interface ActivityTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
  achievement_count: number;
}

export interface StravaStats {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_run_totals: ActivityTotals;
  all_run_totals: ActivityTotals;
}
