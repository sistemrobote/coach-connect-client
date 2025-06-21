export function getLastNWeekOffsets(
  currentOffset: number,
  n: number,
): number[] {
  return Array.from({ length: n }, (_, i) => currentOffset - (n - 1) + i);
}
