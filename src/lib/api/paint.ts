import { createPaintingConvert } from "../types";
import { request } from "../utils/request";

type typeQueryPaint = {
  page?: string;
  pageSize?: string;
  limit?: string;
  title?: string;
};

const getListPaint = (query: typeQueryPaint) =>
  request.get("/api/paints?" + new URLSearchParams(query).toString());

const getDetailPaint = (id: string) => request.get("/api/paints/" + id);

const addNewPaint = (payload: createPaintingConvert[]) =>
  request.post("/api/paints", { listPaints: payload });

const updatePaint = (payload: {
  _id: string;
  url?: string;
  title?: string;
  price?: number;
  stock?: number;
}) => request.patch("/api/paints", { listPaints: [payload] });

const detelePaint = (payload: string[]) =>
  request.post("/api/paints/delete", { listIdDelete: payload });

const addView = (id: string) => request.put("/api/paints/" + id);

export {
  getListPaint,
  addNewPaint,
  detelePaint,
  getDetailPaint,
  updatePaint,
  addView,
};
