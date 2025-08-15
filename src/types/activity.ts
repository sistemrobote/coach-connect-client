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

export interface ManualActivity {
  id: string;
  name: string;
  count: number;
  date: string; // ISO date string from server
  difficulty: "easy" | "medium" | "hard";
  duration: number;
  description: string;
  created_at: number;
  updated_at: number;
}

export interface ManualActivityData {
  date: Date;
  count: number;
  difficulty: "easy" | "medium" | "hard";
}

export interface CreateManualActivityRequest {
  name: string;
  count: number;
  date: string;
  difficulty: "easy" | "medium" | "hard";
  duration?: number;
  description?: string;
}

export interface ManualActivitiesResponse {
  success: boolean;
  workouts: ManualActivity[];
  count: number;
}

export interface CreateWorkoutResponse {
  success: boolean;
  message: string;
  workout: ManualActivity;
}
