import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export interface AddActivityData {
  name: string;
  count: number;
  date: string;
  difficulty: "easy" | "medium" | "hard";
}

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityType: string;
  onSubmit: (data: AddActivityData) => void;
}

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  activityType,
  onSubmit,
}) => {
  const [name, setName] = useState(activityType || "push-ups");
  const [count, setCount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      count: parseInt(count),
      date,
      difficulty,
    });
    onClose();
    // Reset form
    setName(activityType || "push-ups");
    setCount("");
    setDate(new Date().toISOString().split("T")[0]);
    setDifficulty("medium");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md space-y-4 bg-white rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="activity-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Activity Name
              </label>
              <input
                id="activity-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="push-ups"
                required
              />
            </div>

            <div>
              <label
                htmlFor="activity-count"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Count
              </label>
              <input
                id="activity-count"
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="20"
                min="1"
                required
              />
            </div>

            <div>
              <label
                htmlFor="activity-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <input
                id="activity-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="activity-difficulty"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Difficulty
              </label>
              <select
                id="activity-difficulty"
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value as "easy" | "medium" | "hard")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-6 text-gray-700 bg-gray-100 hover:bg-gray-200 font-semibold rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 text-white bg-orange-500 hover:bg-orange-600 font-semibold rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Add Activity
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
