import React from "react";
import { RunningActivityCard } from "./RunningActivityCard";
import { ManualActivityCard } from "./ManualActivityCard";
import { TrainingLog } from "./TrainingLog";

function Dashboard() {
  // const { user, isAuthenticated, isLoading } = useAuthContext();

  return (
    <div className="flex flex-col p-6 w-full max-w-5xl mx-auto items-center">
      <RunningActivityCard />

      <ManualActivityCard
        title="Push-ups"
        colorScheme="blue"
        icon={
          <img
            src="/icons/pushups.svg"
            alt="Push-ups icon"
            className="w-5 h-5 text-gray-600"
          />
        }
      />

      <ManualActivityCard
        title="Pull-ups"
        colorScheme="red"
        icon={
          <img
            src="/icons/pullups.svg"
            alt="Pull-ups icon"
            className="w-5 h-5 text-gray-600"
          />
        }
      />

      <TrainingLog />
    </div>
  );
}

export default Dashboard;
