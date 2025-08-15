import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchManualActivities, createManualActivity } from "../api/activities";
import {
  ManualActivityData,
  CreateManualActivityRequest,
} from "../types/activity";

export function useManualActivity(activityType: string) {
  const queryClient = useQueryClient();

  // Fetch all manual activities (workouts)
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["manualActivities"],
    queryFn: fetchManualActivities,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Create manual activity mutation
  const createMutation = useMutation({
    mutationFn: createManualActivity,
    onSuccess: () => {
      // Invalidate and refetch manual activities
      queryClient.invalidateQueries({
        queryKey: ["manualActivities"],
      });
    },
    onError: (error) => {
      console.error("Failed to create manual activity:", error);
    },
  });

  // Process the data to group by date and aggregate counts
  const processedData: ManualActivityData[] = [];
  if (response?.workouts) {
    const groupedByDate = new Map<
      string,
      { count: number; difficulty: "easy" | "medium" | "hard" }
    >();

    // Filter workouts for this specific activity type and process
    const filteredWorkouts = response.workouts.filter((workout) => {
      // Match activity type more precisely - check if workout name matches the activity type
      const workoutName = workout.name.toLowerCase();
      const activityName = activityType.toLowerCase();

      // Handle different variations (push-ups, push ups, pushups, etc.)
      const normalizedWorkout = workoutName.replace(/[-_\s]/g, "");
      const normalizedActivity = activityName.replace(/[-_\s]/g, "");

      return (
        normalizedWorkout.includes(normalizedActivity) ||
        normalizedActivity.includes(normalizedWorkout)
      );
    });

    filteredWorkouts.forEach((workout) => {
      const dateKey = new Date(workout.date).toDateString();
      const existing = groupedByDate.get(dateKey);

      if (existing) {
        // Aggregate count and take the highest difficulty
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        const newDifficulty =
          difficultyOrder[workout.difficulty] >
          difficultyOrder[existing.difficulty]
            ? workout.difficulty
            : existing.difficulty;

        groupedByDate.set(dateKey, {
          count: existing.count + workout.count,
          difficulty: newDifficulty,
        });
      } else {
        groupedByDate.set(dateKey, {
          count: workout.count,
          difficulty: workout.difficulty,
        });
      }
    });

    // Convert to array format
    groupedByDate.forEach(({ count, difficulty }, dateStr) => {
      processedData.push({
        date: new Date(dateStr),
        count,
        difficulty,
      });
    });
  }

  const addActivity = async (activityData: CreateManualActivityRequest) => {
    try {
      await createMutation.mutateAsync(activityData);
    } catch (error) {
      console.error("Failed to add manual activity:", error);
      throw error;
    }
  };

  const getTodayCount = () => {
    const today = new Date().toDateString();
    const todayData = processedData.find(
      (item) => item.date.toDateString() === today,
    );
    return todayData?.count || 0;
  };

  const hasCompletedToday = () => getTodayCount() > 0;

  return {
    data: processedData,
    isLoading,
    error,
    addActivity,
    getTodayCount,
    hasCompletedToday,
    isCreating: createMutation.isPending,
  };
}
