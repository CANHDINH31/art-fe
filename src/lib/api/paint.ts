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

const addNewPaint = (payload: { url: string; title: string }) =>
  request.post("/api/paints", { listPaints: [payload] });

const updatePaint = (payload: { _id: string; url?: string; title?: string }) =>
  request.patch("/api/paints", { listPaints: [payload] });

const detelePaint = (payload: string[]) =>
  request.post("/api/paints/delete", { listIdDelete: payload });

export { getListPaint, addNewPaint, detelePaint, getDetailPaint, updatePaint };
