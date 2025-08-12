import { useAthleteStats } from "../hooks/useAthleteStats";

export const TrainingLog = ({ userId: userId }: { userId: string }) => {
  const { data: stats, isError, error } = useAthleteStats(userId);
  if (isError) return <div>Error loading stats: {String(error)}</div>;
  if (!stats) return null;

  const { count, distance } = stats.all_run_totals;
  const miles = (distance / 1609.34).toLocaleString(undefined, {
    maximumFractionDigits: 1,
  });
  return (
    <div className="mt-4 flex justify-between rounded-2xl shadow-md p-4 w-full">
      <div className="flex flex-col items-start">
        <span className="text-3xl font-bold text-orange-500">{count}</span>
        <span className="text-gray-500 text-sm">Total Runs</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-3xl font-bold text-orange-500">{miles}</span>
        <span className="text-gray-500 text-sm">Total Miles</span>
      </div>
    </div>
  );
};
