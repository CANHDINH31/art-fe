import { typePaint } from "./paint";

type typeCategory = {
  id: string;
  _id: string;
  title: string;
  description: string;
  url: string;
  list_paint_id: typePaint[];
};

export type { typeCategory };
