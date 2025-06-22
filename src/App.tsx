import { useState } from "react";
import { Login } from "./components/Login";
import { WeeklyCarousel } from "./components/WeeklyCarousel";
import { ActivitiesList } from "./components/ActivitiesList";
import { useUserId } from "./hooks/useUserId";
import { TrainingLog } from "./components/TrainingLog";
import WeeklyRunsChart from "./components/WeeklyRunsChart";
import { useActivities } from "./hooks/useActivities";
import { useWeeklyRunsChartData } from "./hooks/useWeeklyRunsChartData";
import { ScaleLoader } from "react-spinners";

export const App = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const userId = useUserId();
  // const { isLoading: isLoadingChart } = useWeeklyRunsChartData(
  //   userId,
  //   weekOffset,
  // );
  const { isLoading: isLoadingActivities } = useActivities(userId, weekOffset);

  if (!userId) return <Login />;

  return (
    <div className="flex items-center justify-center py-2">
      <div
        className="
      w-full 
      md:w-2/3 
      p-4
    "
      >
        {isLoadingActivities ? (
          <div className="flex justify-center">
            <ScaleLoader
              color="var(--color-primary)"
              loading={true}
              height={50}
              aria-label="Loading Spinner"
            />
          </div>
        ) : (
          <>
            <WeeklyCarousel
              weekOffset={weekOffset}
              setWeekOffset={setWeekOffset}
            />
            {/* <WeeklyRunsChart weekOffset={weekOffset} /> */}
            <ActivitiesList userId={userId} weekOffset={weekOffset} />
            <TrainingLog />
          </>
        )}
      </div>
    </div>
  );
};
