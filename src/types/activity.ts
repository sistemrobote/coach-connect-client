export interface Activity {
  id: number;
  name: string;
  start_date_local: string;
  distance: number;
  average_speed: string;
  moving_time: number;
}

export interface ActivityFilters {
  userId: string;
  weekOffset?: number;
  after?: number;
  before?: number;
}
