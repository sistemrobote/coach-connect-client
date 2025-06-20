import React from "react";
import { format, isThisWeek } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getRange } from "../utils/getRange";

type Props = {
  weekOffset: number;
  setWeekOffset: React.Dispatch<React.SetStateAction<number>>;
};

export const WeeklyCarousel: React.FC<Props> = ({
  weekOffset,
  setWeekOffset,
}) => {
  const { start, end } = getRange(weekOffset);

  // Display text: "Current Week" or dates
  const getLabel = () => {
    if (weekOffset === 0 || isThisWeek(start, { weekStartsOn: 1 })) {
      return "Current Week";
    }

    return `${format(start, "MMM d")}–${format(end, "MMM d, yyyy")}`;
  };

  return (
    <div className="flex items-center px-12 py-3 mb-4 w-full">
      <button
        className="text-2xl text-gray-400 hover:text-orange-500"
        onClick={() => setWeekOffset((w) => w - 1)}
        aria-label="Previous week"
      >
        <FaChevronLeft size={28} />
      </button>
      <div className="flex-1 flex flex-col items-center">
        <h1 className="mt-1 text-xl font-medium">{getLabel()}</h1>
      </div>
      <button
        className="text-2xl text-gray-400 hover:text-orange-500"
        onClick={() => setWeekOffset((w) => (w < 0 ? w + 1 : 0))}
        aria-label="Next week"
        disabled={weekOffset >= 0}
      >
        <FaChevronRight size={28} />
      </button>
    </div>
  );
};
