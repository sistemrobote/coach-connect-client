import React, { useState } from "react";
import { ActivityCardBase } from "./ActivityCardBase";
import { useManualActivity } from "../hooks/useManualActivity";
import { AddActivityModal, AddActivityData } from "./AddActivityModal";
import { getIconBackgroundColor } from "../getColors";

interface ManualActivityCardProps {
  title: string;
  colorScheme?: "blue" | "red" | "orange";
  icon: React.ReactNode;
}

export const ManualActivityCard: React.FC<ManualActivityCardProps> = ({
  title,
  colorScheme = "blue",
  icon,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data = [],
    addActivity,
    isLoading,
    isCreating,
  } = useManualActivity(title);

  // Convert manual activity data to Activity format
  const activityData = data.map((item) => ({
    date: item.date,
    count: item.count,
    level:
      item.difficulty === "hard" ? 3 : item.difficulty === "medium" ? 2 : 1, // Convert difficulty to level
    averagePace: undefined, // Manual activities don't have pace
  }));

  const handleAddActivity = async (activityData: AddActivityData) => {
    try {
      await addActivity({
        name: activityData.name,
        count: activityData.count,
        date: activityData.date,
        difficulty: activityData.difficulty,
        description: `${title} workout`, // Optional description
        duration: 0, // Optional duration
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add activity:", error);
    }
  };

  const plusButton = (
    <button
      onClick={() => setIsModalOpen(true)}
      disabled={isCreating}
      className={`${getIconBackgroundColor(colorScheme)} p-2 rounded-lg w-[35px] h-[35px] cursor-pointer`}
    >
      {isCreating ? "..." : "+"}
    </button>
  );

  if (isLoading) {
    return (
      <div
        className={`bg-${colorScheme === "blue" ? "blue" : colorScheme === "red" ? "red" : "orange"}-50 rounded-2xl p-4 mb-4 border border-gray-100 w-full max-w-[610px] animate-pulse`}
      >
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <>
      <ActivityCardBase
        title={title}
        data={activityData}
        colorScheme={colorScheme}
        icon={icon}
        actionButton={plusButton}
      />
      <AddActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activityType={title}
        onSubmit={handleAddActivity}
      />
    </>
  );
};
