export const scoreAvgRating = (arr: any) => {
  const sum = arr?.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + Number(currentValue.value),
    0
  );
  return Math.round(Number(sum / arr?.length) / 0.25) * 0.25;
};
