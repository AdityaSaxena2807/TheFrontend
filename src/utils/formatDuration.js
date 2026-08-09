export const formatDuration = (duration) => {
  if (duration == null) return "0:00";

  const str = duration.toString();

  // If no decimal, treat as total seconds
  if (!str.includes(".")) {
    const totalSeconds = parseInt(str, 10);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  // Existing m.ss format handling
  const [minutesStr, decimalStr] = str.split(".");
  const minutes = parseInt(minutesStr, 10);

  let seconds = 0;
  if (decimalStr) {
    if (decimalStr.length === 1) {
      seconds = parseInt(decimalStr, 10) * 10;
    } else {
      seconds = parseInt(decimalStr.slice(0, 2), 10);
    }
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
