import React from "react";
import { ActivityHeatmap, ActivityData } from "./ActivityHeatmap";

interface ActivityCardProps {
  title: string;
  data: ActivityData[];
  colorScheme?: "blue" | "red" | "orange";
  icon: React.ReactNode;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
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
      className={`${getCardBackgroundColor()} rounded-2xl p-4 mb-4 border border-gray-100 `}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className={`${getIconBackgroundColor()} p-2 rounded-lg`}>
            {icon}
          </div>
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
      </div>

      <ActivityHeatmap data={data} colorScheme={colorScheme} />
    </div>
  );
};
