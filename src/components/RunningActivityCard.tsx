import React from "react";
import { ActivityCardBase } from "./ActivityCardBase";
import { useRunningHeatmapData } from "../hooks/useRunningHeatmapData";

export const RunningActivityCard: React.FC = () => {
  const { data = [] } = useRunningHeatmapData();

  return (
    <ActivityCardBase
      title="Running"
      data={data}
      colorScheme="orange"
      icon={
        <img
          src="/icons/running.svg"
          alt="Running icon"
          className="w-5 h-5 text-gray-600"
        />
      }
    />
  );
};
