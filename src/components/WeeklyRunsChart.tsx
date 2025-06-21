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
import { useUserId } from "../hooks/useUserId";
import { useWeeklyRunsChartData } from "../hooks/useWeeklyRunsChartData";

const WeeklyRunsChart = () => {
  const userId = useUserId();
  const {
    data: weeklyRuns,
    isLoading,
    isError,
    error,
  } = useWeeklyRunsChartData(userId, 0);
  if (isLoading) return <div>Loading…</div>;
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
            fill="#FC4C02"
            radius={[6, 6, 0, 0]}
            name="Miles"
          >
            <LabelList
              dataKey="totalMiles"
              position="top"
              formatter={(value: number) => value.toFixed(1)} // Format as "12.3"
              style={{ fill: "#FC4C02", fontWeight: "bold", fontSize: 12 }}
            />
          </Bar>
          <Bar dataKey="pace" fill="#b3b1b1" radius={[6, 6, 0, 0]} name="Pace">
            <LabelList
              dataKey="pace"
              position="top"
              formatter={(value: number) => value.toFixed(1)} // Format as "12.3"
              style={{ fill: "#b3b1b1", fontWeight: "bold", fontSize: 12 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyRunsChart;
