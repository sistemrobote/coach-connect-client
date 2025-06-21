// return an array of date objects for start (monday)
// and end (sunday) of week based on supplied
// date object or current date
export function getUnixTimestampsForWeek(offset = 0) {
  // offset: 0 = this week, -1 = previous week, 1 = next week, etc.
  const now = new Date();
  // Set to Monday of current week
  const monday = new Date(now);
  const day = now.getDay();
  // If Sunday (0), set to last Monday
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  monday.setDate(diff + offset * 7);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return {
    after: Math.floor(monday.getTime() / 1000),
    before: Math.floor(sunday.getTime() / 1000),
  };
}
