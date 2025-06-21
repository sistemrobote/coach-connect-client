import { Activity } from "../api/activities";

export function getAveragePace(runs: Activity[]): number {
  const totalTime = runs.reduce((sum, r) => sum + r.moving_time, 0); // seconds
  const totalMiles = runs.reduce((sum, r) => sum + r.distance, 0) / 1609.34; // miles
  const avgPaceSecPerMile = totalTime / totalMiles;
  return parseFloat((avgPaceSecPerMile / 60).toFixed(2));
}
