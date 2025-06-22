// utils/getSixWeeksUnixTimestamps.ts
export function getSixWeeksUnixTimestamps() {
  const now = new Date();
  // Find Monday of current week
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const currentMonday = new Date(now);
  currentMonday.setDate(diff);
  currentMonday.setHours(0, 0, 0, 0);

  // Go back 5 more weeks for 6 total weeks (including current)
  const startMonday = new Date(currentMonday);
  startMonday.setDate(currentMonday.getDate() - 7 * 5);

  // End is Sunday of this week
  const endSunday = new Date(currentMonday);
  endSunday.setDate(currentMonday.getDate() + 6);
  endSunday.setHours(23, 59, 59, 999);

  return {
    after: Math.floor(startMonday.getTime() / 1000),
    before: Math.floor(endSunday.getTime() / 1000),
  };
}
