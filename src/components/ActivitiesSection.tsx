import { useState } from "react";
import { Login } from "../components/Login";
import { WeeklyCarousel } from "../components/WeeklyCarousel";
import { ActivitiesList } from "../components/ActivitiesList";
import { useActivities } from "../hooks/useActivities";
import { SectionLoader } from "../components/SectionLoader";

export const ActivitiesSection = ({ userId: userId }: { userId: string }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const { isLoading: isLoadingActivities } = useActivities(userId, weekOffset);

  if (!userId) return <Login />;

  if (isLoadingActivities) {
    return <SectionLoader />;
  }

  return (
    <>
      <WeeklyCarousel weekOffset={weekOffset} setWeekOffset={setWeekOffset} />
      <ActivitiesList userId={userId} weekOffset={weekOffset} />
    </>
  );
};
