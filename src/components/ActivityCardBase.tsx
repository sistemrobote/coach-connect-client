import React from "react";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { Activity } from "../types/activity";

interface ActivityCardBaseProps {
  title: string;
  data: Activity[];
  colorScheme?: "blue" | "red" | "orange";
  icon: React.ReactNode;
}

export const ActivityCardBase: React.FC<ActivityCardBaseProps> = ({
  title,
  data,
  colorScheme = "orange",
  icon,
}) => {
  const getCardBackgroundColor = () => {
    switch (colorScheme) {
      case "blue":
        return "bg-blue-50";
      case "red":
        return "bg-red-50";
      case "orange":
        return "bg-orange-50";
      default:
        return "bg-orange-50";
    }
  };

  const getIconBackgroundColor = () => {
    switch (colorScheme) {
      case "blue":
        return "bg-blue-100";
      case "red":
        return "bg-red-100";
      case "orange":
        return "bg-orange-100";
      default:
        return "bg-orange-100";
    }
  };

  return (
    <div
      className={`${getCardBackgroundColor()} rounded-2xl p-4 mb-4 border border-gray-100 w-full max-w-[610px]`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className={`${getIconBackgroundColor()} p-2 rounded-lg`}>
            {icon}
          </div>
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
      </div>

      <div
        className="overflow-x-auto scrollbar-hide"
        style={{ direction: "rtl" }}
      >
        <div className="min-w-max" style={{ direction: "ltr" }}>
          <ActivityHeatmap data={data} colorScheme={colorScheme} />
        </div>
      </div>
    </div>
  );
};
