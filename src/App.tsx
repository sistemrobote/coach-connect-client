import { Login } from "./components/Login";
import { useUserId } from "./hooks/useUserId";
import { TrainingLog } from "./components/TrainingLog";
import WeeklyRunsChart from "./components/WeeklyRunsChart";
import { ActivitiesSection } from "./components/ActivitiesSection";

export const App = () => {
  const userId = useUserId();

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
        <WeeklyRunsChart userId={userId} />
        <ActivitiesSection userId={userId} />
        <TrainingLog userId={userId} />
      </div>
    </div>
  );
};
