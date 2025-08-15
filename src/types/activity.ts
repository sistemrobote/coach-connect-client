export interface Activity {
  date: Date;
  count: number;
  level: number;
  averagePace?: number;
}
export interface ActivityData {
  id: number;
  name: string;
  start_date_local: string;
  distance: number;
  average_speed: string;
  moving_time: number;
}
export interface ActivitiesData {
  activities: ActivityData[];
  count: number;
  sucees: boolean;
}
export interface ActivityFilters {
  userId: string;
  weekOffset?: number;
  after?: number;
  before?: number;
}
