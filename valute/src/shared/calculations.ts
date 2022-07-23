export function calculatePercentOfChange(
  newValue: number,
  previousValue: number
) {
  const percent: number = ((newValue - previousValue) / previousValue) * 100;
  const fixedPercent: number = Number(percent.toFixed(2));
  return fixedPercent;
}
