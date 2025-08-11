export const formatPace = (pace: number): string => {
  const minutes = Math.floor(pace);
  const seconds = Math.round((pace - minutes) * 60);

  // If seconds round to 60, bump up minute and set seconds to 0
  const adjMinutes = seconds === 60 ? minutes + 1 : minutes;
  const adjSeconds = seconds === 60 ? 0 : seconds;

  // Pad seconds with leading zero
  return `${adjMinutes}:${adjSeconds.toString().padStart(2, "0")}`;
};
