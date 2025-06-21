import { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { WeeklyCarousel } from "./components/WeeklyCarousel";
import { ActivitiesList } from "./components/ActivitiesList";

export const App = () => {
  const [userId, setuserId] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user_id = params.get("user_id");
    if (user_id) {
      localStorage.setItem("strava_user_id", user_id);
      setuserId(user_id);
    }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      </div>
    </div>
  );
};
