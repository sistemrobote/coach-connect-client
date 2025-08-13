import React from "react";
import { ActivityCardBase } from "./ActivityCardBase";
import { useManualActivity } from "../hooks/useManualActivity";

interface ManualActivityCardProps {
  activityType: string;
  title: string;
  colorScheme?: "blue" | "red" | "orange";
  icon: React.ReactNode;
}

export const ManualActivityCard: React.FC<ManualActivityCardProps> = ({
  activityType,
  title,
  colorScheme = "blue",
  icon,
}) => {
  const { data = [] } = useManualActivity(activityType);

  // Convert manual activity data to Activity format
  const activityData = data.map((item) => ({
    date: item.date,
    count: item.count,
    averagePace: undefined, // Manual activities don't have pace
  }));

  return (
    <ActivityCardBase
      title={title}
      data={activityData}
      colorScheme={colorScheme}
      icon={icon}
    />
  );
};
