import axios from "axios";
import { getUnixTimestampsForWeek } from "../utils/getUnixTimestampsForWeek";
// import { getSixWeeksUnixTimestamps } from "../utils/getSixWeeksUnixTimestamps";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export type Activity = {
  id: number;
  name: string;
  start_date_local: string;
  distance: number;
  average_speed: string;
  moving_time: number;
};

export async function fetchActivities(
  userId: string,
  weekOffset?: number,
): Promise<Activity[]> {
  const { after, before } = getUnixTimestampsForWeek(weekOffset);

  const res = await axios.get<Activity[]>(`${apiBaseUrl}/activities`, {
    params: { user_id: userId, after, before },
  });
  return res.data;
}
