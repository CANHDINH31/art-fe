import { createPaintingConvert, createPaintingPayload } from "../types";

export const convertPayload = (obj: createPaintingPayload) => {
  return Object.entries(obj).reduce(
    (result: createPaintingConvert[], [key, value]) => {
      if (key.startsWith("url")) {
        const index = key.replace("url", "");
        result.push({
          url: value,
          title: obj[`title${index}`],
          price: Number(obj[`price${index}`]),
        });
      }
      return result;
    },
    []
  );
};
