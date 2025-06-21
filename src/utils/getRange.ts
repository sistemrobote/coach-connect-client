import { startOfWeek, endOfWeek, addWeeks } from "date-fns";

export const getRange = (offset: number) => {
  const now = new Date();
  const start = startOfWeek(addWeeks(now, offset), { weekStartsOn: 1 });
  const end = endOfWeek(addWeeks(now, offset), { weekStartsOn: 1 });
  return { start, end };
};
