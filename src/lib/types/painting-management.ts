type createPaintingPayload = {
  url: string;
  title: string;
  price: string;
  [key: string]: string;
};

type createPaintingConvert = {
  url: string;
  title: string;
  price: number;
};

export type { createPaintingPayload, createPaintingConvert };
