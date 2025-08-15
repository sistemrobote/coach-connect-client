import React from "react";
import { Activity } from "../types";
import { getLevelColor } from "../getColors";

interface ActivityHeatmapProps {
  data: Activity[];
  colorScheme?: "blue" | "red" | "orange";
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  data,
  colorScheme = "orange",
}) => {
  const generateGrid = () => {
    const today = new Date();

    // Calculate the most recent Monday
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert Sunday to 6, others to dayOfWeek - 1
    const mostRecentMonday = new Date(today);
    mostRecentMonday.setDate(today.getDate() - daysFromMonday);

    // Start from 47 weeks before the most recent Monday (to include current week)
    const startDate = new Date(mostRecentMonday);
    startDate.setDate(mostRecentMonday.getDate() - 47 * 7);

    const grid: Array<
      Array<{ date: Date; count: number; level: number; averagePace?: number }>
    > = [];

    // Create 48 weeks of data, each starting with Monday (including current week)
    for (let week = 0; week < 48; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + week * 7 + day);

        // Find matching data
        const dayData = data.find(
          (d) => d.date.toDateString() === currentDate.toDateString(),
        );

        const count = dayData?.count || 0;
        const level = dayData?.level || 0;
        const pace = dayData?.averagePace;

        weekData.push({
          date: currentDate,
          count,
          level,
          averagePace: pace,
        });
      }
      grid.push(weekData);
    }

    return grid;
  };

  const grid = generateGrid();

  return (
    <div className="flex justify-end">
      <div className="flex gap-0.5 p-[1px]">
        {grid.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-0.5 flex-shrink-0">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-2.5 h-2.5 rounded-[3px] ${getLevelColor(day.level, colorScheme)} hover:ring-1 hover:ring-gray-400 cursor-pointer`}
                title={`${day.count} activities on ${day.date.toLocaleDateString()}${
                  day.averagePace
                    ? ` - Avg pace: ${day.averagePace.toFixed(1)} min/mi`
                    : ""
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
