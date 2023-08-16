import { typeCategory, typePaint } from "../types";

export const sortWallPainting = (category: typeCategory, sort: string) => {
  if (sort == "1") {
    category.list_paint_id.sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      const timeComparison = bDate.getTime() - aDate.getTime();

      if (timeComparison === 0) {
        return a.title.localeCompare(b.title);
      }

      return timeComparison;
    });
  }
  if (sort == "2") {
    category.list_paint_id.sort(
      (a, b) => parseInt(b.views) - parseInt(a.views)
    );
  }

  if (sort == "3") {
    category.list_paint_id.sort((a, b) => {
      const aRate = a.account_users_rate;
      const bRate = b.account_users_rate;

      if (aRate > 0 && bRate > 0) {
        return Number(b.total_score / bRate) - Number(a.total_score / aRate);
      } else if (aRate === 0 && bRate === 0) {
        return a.title.localeCompare(b.title);
      } else if (aRate === 0) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  return { ...category };
};

export const infoRating = (category: typeCategory) => {
  let totalScore = 0;
  let totalUsers = 0;
  category?.list_paint_id?.forEach((paint: typePaint) => {
    totalScore += paint?.total_score;
    totalUsers += paint?.account_users_rate;
  });
  return { totalScore, totalUsers };
};
