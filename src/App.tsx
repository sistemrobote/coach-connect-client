import { useState } from "react";
import { Login } from "./components/Login";
import { WeeklyCarousel } from "./components/WeeklyCarousel";
import { ActivitiesList } from "./components/ActivitiesList";
import { useUserId } from "./hooks/useUserId";
import { TrainingLog } from "./components/TrainingLog";

export const App = () => {
  const [weekOffset, setWeekOffset] = useState(0);
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
        <WeeklyCarousel weekOffset={weekOffset} setWeekOffset={setWeekOffset} />
        <ActivitiesList userId={userId} weekOffset={weekOffset} />
        <TrainingLog />
      </div>
    </div>
  );
};
