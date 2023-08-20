type createPaintingPayload = {
  url: string;
  title: string;
  [key: string]: string;
};

type createPaintingConvert = {
  url: string;
  title: string;
};

export type { createPaintingPayload, createPaintingConvert };
