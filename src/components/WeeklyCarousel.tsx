import React from "react";
import { format, startOfWeek, endOfWeek, addWeeks, isThisWeek } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  weekOffset: number;
  setWeekOffset: React.Dispatch<React.SetStateAction<number>>;
};

export const WeeklyCarousel: React.FC<Props> = ({
  weekOffset,
  setWeekOffset,
}) => {
  const getRange = (offset: number) => {
    const now = new Date();
    const start = startOfWeek(addWeeks(now, offset), { weekStartsOn: 1 });
    const end = endOfWeek(addWeeks(now, offset), { weekStartsOn: 1 });
    return { start, end };
  };

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
        className="text-2xl text-gray-400 hover:text-orange-500 focus:outline-none"
        onClick={() => setWeekOffset((w) => w - 1)}
        aria-label="Previous week"
      >
        <FaChevronLeft size={28} />
      </button>
      <div className="flex-1 flex flex-col items-center">
        <span className="text-base mt-1">{getLabel()}</span>
      </div>
      <button
        className="text-2xl text-gray-400 hover:text-orange-500 focus:outline-none"
        onClick={() => setWeekOffset((w) => (w < 0 ? w + 1 : 0))}
        aria-label="Next week"
        disabled={weekOffset >= 0}
      >
        <FaChevronRight size={28} />
      </button>
    </div>
  );
};
