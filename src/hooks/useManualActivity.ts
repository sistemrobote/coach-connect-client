import { useState, useEffect } from "react";
import { ActivitiesData } from "../components/ActivityHeatmap";

export function useManualActivity(activityType: string) {
  const [data, setData] = useState<ActivitiesData[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`manual_activity_${activityType}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      const converted = parsed.map((item: any) => ({
        ...item,
        date: new Date(item.date),
      }));
      setData(converted);
    }
  }, [activityType]);

  // Save data to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(
      `manual_activity_${activityType}`,
      JSON.stringify(data),
    );
  }, [data, activityType]);

  const addActivity = (date: Date = new Date()) => {
    const dateStr = date.toDateString();

    setData((prevData) => {
      const existing = prevData.find(
        (item) => item.date.toDateString() === dateStr,
      );

      if (existing) {
        // Update existing entry
        return prevData.map((item) =>
          item.date.toDateString() === dateStr
            ? { ...item, count: item.count + 1 }
            : item,
        );
      } else {
        // Add new entry
        return [...prevData, { date, count: 1 }];
      }
    });
  };

  const getTodayCount = () => {
    const today = new Date().toDateString();
    const todayData = data.find((item) => item.date.toDateString() === today);
    return todayData?.count || 0;
  };

  const hasCompletedToday = () => getTodayCount() > 0;

  return {
    data,
    addActivity,
    getTodayCount,
    hasCompletedToday,
  };
}
