import React from "react";
import { FaRunning } from "react-icons/fa";
import { useActivities } from "../hooks/useActivities";

type Props = {
  userId: string;
  weekOffset: number;
};
interface FormatPace {
  (seconds: number, meters: number): string;
}
interface FormatTime {
  (seconds: number): string;
}

export const ActivitiesList: React.FC<Props> = ({ userId, weekOffset }) => {
  const {
    data: activities,
    isLoading,
    isError,
    error,
  } = useActivities(userId, weekOffset);
  const formatPace: FormatPace = (seconds, meters) => {
    const pace = seconds / (meters / 1000); // sec per km
    const mins = Math.floor(pace / 60);
    const secs = Math.round(pace % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs} /km`;
  };

  const formatTime: FormatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  if (isLoading) return <div>Loading…</div>;
  if (isError) return <div>Error: {String(error)}</div>;
  if (!activities || activities.length === 0)
    return <div>No activities found.</div>;

  return (
    <ul className="space-y-2">
      {activities.map((activity) => (
        <li
          key={activity.id}
          className="bg-white rounded-xl shadow-md p-4 flex flex-row items-center"
        >
          <FaRunning
            className="text-orange-500 w-10 h-10 flex-shrink-0 mr-4"
            fill="#FC4C02"
          />
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold text-lg">
                {new Date(activity.start_date_local).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )}
              </span>
              <span className="font-bold text-xl text-orange-600 ml-3">
                {(activity.distance / 1609.34).toFixed(1)} mi
              </span>
            </div>
            <div className="flex flex-row space-x-6 mt-1">
              <div>
                <span className="block text-gray-500 text-xs">Duration</span>
                <span className="block font-mono text-base">
                  {formatTime(activity.moving_time)}
                </span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs">Pace</span>
                <span className="block font-mono text-base">
                  {formatPace(activity.moving_time, activity.distance)}
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
