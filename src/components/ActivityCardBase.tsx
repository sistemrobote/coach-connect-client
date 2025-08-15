import React from "react";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { Activity } from "../types/activity";
import { getCardBackgroundColor, getIconBackgroundColor } from "../getColors";

interface ActivityCardBaseProps {
  title: string;
  data: Activity[];
  colorScheme?: "blue" | "red" | "orange";
  icon: React.ReactNode;
  actionButton?: React.ReactNode;
}

export const ActivityCardBase: React.FC<ActivityCardBaseProps> = ({
  title,
  data,
  colorScheme = "orange",
  icon,
  actionButton,
}) => {
  return (
    <div
      className={`${getCardBackgroundColor(colorScheme)} rounded-2xl p-4 mb-4 border border-gray-100 w-full max-w-[610px]`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`${getIconBackgroundColor(colorScheme)} p-2 rounded-lg`}
          >
            {icon}
          </div>
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
        {actionButton && <div className="flex-shrink-0">{actionButton}</div>}
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
