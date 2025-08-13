import React from "react";
import { Activity } from "../types";

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
        const pace = dayData?.averagePace;
        let level = 0;

        // Calculate intensity level based on pace (minutes per mile)
        if (count > 0 && pace) {
          if (pace < 7)
            level = 4; // 600 color - less than 7 min/mi
          else if (pace < 8)
            level = 3; // 500 color - 7-8 min/mi
          else if (pace < 9)
            level = 2; // 300 color - 8-9 min/mi
          else level = 1; // 200 color - 9+ min/mi
        } else if (count > 0) {
          // Fallback to count-based if no pace data
          level = 1;
        }

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

  const getLevelColor = (level: number): string => {
    const schemes = {
      blue: [
        "bg-blue-100/30",
        "bg-blue-200",
        "bg-blue-300",
        "bg-blue-500",
        "bg-blue-600",
      ],
      red: [
        "bg-red-100/30",
        "bg-red-200",
        "bg-red-300",
        "bg-red-500",
        "bg-red-600",
      ],
      orange: [
        "bg-orange-100/30",
        "bg-orange-200",
        "bg-orange-300",
        "bg-orange-500",
        "bg-orange-600",
      ],
    };

    return schemes[colorScheme][level];
  };

  const grid = generateGrid();

  return (
    <div className="flex justify-end">
      <div className="flex gap-0.5">
        {grid.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-0.5 flex-shrink-0">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-2.5 h-2.5 rounded-[3px] ${getLevelColor(day.level)} hover:ring-1 hover:ring-gray-400 cursor-pointer`}
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
