import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import { useSixWeeksRunsChartData } from "../hooks/useSixWeeksRunsChartData";
import { formatPace } from "../utils/formatPace";

const WeeklyRunsChart = React.memo(({ userId: userId }: { userId: string }) => {
  const {
    data: weeklyRuns,
    isLoading,
    isError,
    error,
  } = useSixWeeksRunsChartData(userId);

  if (isLoading) return undefined;
  if (isError) return <div>Error: {String(error)}</div>;

  return (
    <div className=" mt-4 w-full rounded-2xl shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        Weekly Mileage (last 6 weeks)
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={weeklyRuns}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="weekLabel" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} width={20} />
          <Tooltip formatter={(v: number) => `${v} mi`} />
          <Legend />
          <Bar
            dataKey="totalMiles"
            fill="var(--color-primary)"
            radius={[6, 6, 0, 0]}
            name="Miles"
          >
            <LabelList
              dataKey="totalMiles"
              position="top"
              formatter={(value: number) => value.toFixed(1)} // Format as "12.3"
              style={{
                fill: "var(--color-primary)",
                fontWeight: "bold",
                fontSize: 12,
              }}
            />
          </Bar>
          <Bar
            dataKey="pace"
            fill="var(--color-light-gray)"
            radius={[6, 6, 0, 0]}
            name="Pace"
          >
            <LabelList
              dataKey="pace"
              position="top"
              formatter={(value: number) => formatPace(value)}
              style={{
                fill: "var(--color-light-gray)",
                fontWeight: "bold",
                fontSize: 12,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default WeeklyRunsChart;
